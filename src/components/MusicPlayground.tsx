import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Music, Play, RotateCcw, Volume2, Sparkles, Award, Star, Activity, Mic } from "lucide-react";

interface Note {
  name: string;
  freq: number;
  color: string;
  shadow: string;
}

const NOTES: Note[] = [
  { name: "C4", freq: 261.63, color: "bg-rose-500 text-white", shadow: "shadow-rose-500/50" },
  { name: "D4", freq: 293.66, color: "bg-orange-500 text-white", shadow: "shadow-orange-500/50" },
  { name: "E4", freq: 329.63, color: "bg-amber-500 text-slate-950", shadow: "shadow-amber-500/50" },
  { name: "F4", freq: 349.23, color: "bg-emerald-400 text-slate-950", shadow: "shadow-emerald-400/50" },
  { name: "G4", freq: 392.00, color: "bg-cyan-400 text-slate-950", shadow: "shadow-cyan-400/50" },
  { name: "A4", freq: 440.00, color: "bg-indigo-500 text-white", shadow: "shadow-indigo-500/50" },
  { name: "B4", freq: 493.88, color: "bg-purple-500 text-white", shadow: "shadow-purple-500/50" },
  { name: "C5", freq: 523.25, color: "bg-pink-500 text-white", shadow: "shadow-pink-500/50" },
];

const SONGS = [
  {
    title: "Mary Had a Little Lamb",
    notes: ["E4", "D4", "C4", "D4", "E4", "E4", "E4", "D4", "D4", "D4", "E4", "G4", "G4"],
    difficulty: "Easy"
  },
  {
    title: "Ode to Joy (Beethoven)",
    notes: ["E4", "E4", "F4", "G4", "G4", "F4", "E4", "D4", "C4", "C4", "D4", "E4", "E4", "D4", "D4"],
    difficulty: "Medium"
  },
  {
    title: "Twinkle Twinkle Little Star",
    notes: ["C4", "C4", "G4", "G4", "A4", "A4", "G4", "F4", "F4", "E4", "E4", "D4", "D4", "C4"],
    difficulty: "Easy"
  },
  {
    title: "Jingle Bells",
    notes: ["E4", "E4", "E4", "E4", "E4", "E4", "E4", "G4", "C4", "D4", "E4"],
    difficulty: "Easy"
  },
  {
    title: "Joy to the World",
    notes: ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"],
    difficulty: "Medium"
  }
];

export const MusicPlayground: React.FC = () => {
  const [instrument, setInstrument] = useState<"piano" | "violin" | "guitar" | "drums" | "vocal" | "flute">("piano");
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingSong, setIsPlayingSong] = useState(false);
  const [songIndex, setSongIndex] = useState(0); // Which song is selected
  const [currentSongStep, setCurrentSongStep] = useState(0); // Progress in current song
  const [synthVolume, setSynthVolume] = useState(0.3);
  const [starsAwarded, setStarsAwarded] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [visualizerHeightMultiplier, setVisualizerHeightMultiplier] = useState(1);
  
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context on demand
  const getAudioContext = (): AudioContext | null => {
    if (typeof window === "undefined") return null;
    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  // Trigger brief spike in visualizer height
  const triggerVisualizerBurst = () => {
    setVisualizerHeightMultiplier(2.5);
    setTimeout(() => {
      setVisualizerHeightMultiplier(1.8);
    }, 150);
    setTimeout(() => {
      setVisualizerHeightMultiplier(1);
    }, 400);
  };

  // Sound Synth Generator
  const playSound = (noteName: string, freq: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    setActiveNote(noteName);
    triggerVisualizerBurst();
    setTimeout(() => setActiveNote(null), 300);

    // Interactive Song Checklist Game Progress
    const currentSong = SONGS[songIndex];
    if (currentSong && noteName === currentSong.notes[currentSongStep]) {
      const nextStep = currentSongStep + 1;
      if (nextStep >= currentSong.notes.length) {
        // Completed Song!
        setStarsAwarded(prev => prev + 1);
        setCurrentSongStep(0);
        setShowSuccessToast(true);
        setTimeout(() => setShowSuccessToast(false), 4000);
        
        // Play success arpeggio
        playArpeggio();
      } else {
        setCurrentSongStep(nextStep);
      }
    }

    // Synthesizer logic
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(synthVolume, ctx.currentTime + 0.02);

      if (instrument === "piano") {
        osc.type = "sine";
        // Warm sub harmonic
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "triangle";
        subOsc.frequency.setValueAtTime(freq / 2, ctx.currentTime);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subGain.gain.setValueAtTime(0.001, ctx.currentTime);
        subGain.gain.linearRampToValueAtTime(synthVolume * 0.4, ctx.currentTime + 0.05);
        subGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        subOsc.start(ctx.currentTime);
        subOsc.stop(ctx.currentTime + 0.6);

        // Exponential decay
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1500, ctx.currentTime);
      } else if (instrument === "violin") {
        osc.type = "sawtooth";
        // Vibrato effect
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(6, ctx.currentTime); // 6 Hz vibrato
        lfoGain.gain.setValueAtTime(8, ctx.currentTime); // pitch variation depth
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start(ctx.currentTime);
        lfo.stop(ctx.currentTime + 1.2);

        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(2000, ctx.currentTime);
        filter.Q.setValueAtTime(1.5, ctx.currentTime);
      } else if (instrument === "guitar") {
        osc.type = "triangle";
        // Brief metal pluck overlay
        const pluck = ctx.createOscillator();
        const pluckGain = ctx.createGain();
        pluck.type = "sawtooth";
        pluck.frequency.setValueAtTime(freq * 3, ctx.currentTime);
        pluck.connect(pluckGain);
        pluckGain.connect(ctx.destination);
        pluckGain.gain.setValueAtTime(synthVolume * 0.6, ctx.currentTime);
        pluckGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        pluck.start(ctx.currentTime);
        pluck.stop(ctx.currentTime + 0.1);

        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        filter.type = "peaking";
        filter.frequency.setValueAtTime(800, ctx.currentTime);
        filter.gain.setValueAtTime(10, ctx.currentTime);
      } else if (instrument === "drums") {
        // Synthesizing a high-grade percussive hit
        osc.type = "sine";
        // Drum pitch sweep
        osc.frequency.setValueAtTime(freq * 1.5, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      } else if (instrument === "vocal") {
        // Human hum/vocal synthesizer with nice warmth and vocal vibrato
        osc.type = "sine";
        
        const overtone = ctx.createOscillator();
        const overtoneGain = ctx.createGain();
        overtone.type = "triangle";
        overtone.frequency.setValueAtTime(freq * 2, ctx.currentTime);
        overtone.connect(overtoneGain);
        overtoneGain.connect(ctx.destination);
        
        overtoneGain.gain.setValueAtTime(0.001, ctx.currentTime);
        overtoneGain.gain.linearRampToValueAtTime(synthVolume * 0.25, ctx.currentTime + 0.08);
        overtoneGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        
        overtone.start(ctx.currentTime);
        overtone.stop(ctx.currentTime + 1.1);

        // Gentle vocal vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.setValueAtTime(5.5, ctx.currentTime); 
        vibratoGain.gain.setValueAtTime(5, ctx.currentTime);
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        vibratoGain.connect(overtone.frequency);
        vibrato.start(ctx.currentTime);
        vibrato.stop(ctx.currentTime + 1.1);

        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
      } else if (instrument === "flute") {
        // Pure woodwind flute with sweet vibrato and a breathy chirp
        osc.type = "sine";
        
        const breath = ctx.createOscillator();
        const breathGain = ctx.createGain();
        breath.type = "triangle";
        breath.frequency.setValueAtTime(1200, ctx.currentTime);
        breath.connect(breathGain);
        breathGain.connect(ctx.destination);
        breathGain.gain.setValueAtTime(synthVolume * 0.3, ctx.currentTime);
        breathGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        breath.start(ctx.currentTime);
        breath.stop(ctx.currentTime + 0.06);

        // Flute vibrato/tremolo
        const tremolo = ctx.createOscillator();
        const tremoloGain = ctx.createGain();
        tremolo.frequency.setValueAtTime(7, ctx.currentTime); 
        tremoloGain.gain.setValueAtTime(4, ctx.currentTime);
        tremolo.connect(tremoloGain);
        tremoloGain.connect(osc.frequency);
        tremolo.start(ctx.currentTime);
        tremolo.stop(ctx.currentTime + 1.0);

        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      }

      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn("Synth failed to start", e);
    }
  };

  const playArpeggio = () => {
    const ctx = getAudioContext();
    if (!ctx) return;
    const arpNotes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    arpNotes.forEach((freq, idx) => {
      setTimeout(() => {
        try {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          osc.connect(gain);
          gain.connect(ctx.destination);
          gain.gain.setValueAtTime(0.15, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.5);
        } catch (e) {}
      }, idx * 100);
    });
  };

  // Demo autoplay loop
  const handleAutoplayDemo = () => {
    if (isPlayingSong) return;
    setIsPlayingSong(true);
    let step = 0;
    const song = SONGS[songIndex];
    
    const playNext = () => {
      if (step >= song.notes.length) {
        setIsPlayingSong(false);
        return;
      }
      const noteName = song.notes[step];
      const match = NOTES.find(n => n.name === noteName);
      if (match) {
        playSound(match.name, match.freq);
      }
      step++;
      setTimeout(playNext, 450);
    };
    playNext();
  };

  const handleResetSong = () => {
    setCurrentSongStep(0);
  };

  return (
    <div id="music-playground" className="bg-slate-905 border border-slate-850 p-6 md:p-8 rounded-none shadow-xl max-w-4xl mx-auto text-left relative overflow-hidden">
      {/* Absolute Neon Glow background decor */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-700/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-850 pb-6 mb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 text-gold-500 font-mono text-[9px] font-bold tracking-widest uppercase rounded-none">
              Lab Module
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gold-700 font-bold tracking-wider uppercase">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> Live Synth
            </span>
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-black text-slate-100 uppercase tracking-wide flex items-center gap-2">
            Bethel Interactive Sound Lab
          </h2>
          <p className="text-xs text-slate-400">
            Interact with real-time digital synthesis. Toggle instruments, trigger audio waveforms, or play along with the song guide.
          </p>
        </div>

        {/* Gamified Star Badges */}
        <div className="flex items-center gap-3 bg-slate-950 border border-slate-850 px-4 py-2.5 rounded-none self-start md:self-center">
          <div className="text-left">
            <p className="text-[8px] text-slate-500 font-extrabold uppercase tracking-widest">Grading Medals</p>
            <p className="text-xs font-serif font-bold text-slate-300">Practice Score</p>
          </div>
          <div className="flex items-center gap-1 text-gold-500">
            {starsAwarded === 0 ? (
              <span className="text-xs text-slate-600 font-semibold italic">No medals yet</span>
            ) : (
              Array.from({ length: Math.min(starsAwarded, 5) }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-gold-500"
                >
                  <Award className="w-5 h-5 fill-gold-500/20" />
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Control Station on left, keys/pads on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Controls: Left Panel (3/12 wide) */}
        <div className="lg:col-span-4 space-y-5 bg-slate-950/60 p-5 border border-slate-850 rounded-none">
          {/* Instrument select */}
          <div className="space-y-2">
            <label className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
              1. Choose Waveform
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "piano", label: "Grand Piano", emoji: "🎹", activeStyle: "bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/20" },
                { id: "violin", label: "Solo String", emoji: "🎻", activeStyle: "bg-cyan-500 border-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20" },
                { id: "guitar", label: "Lead Riff", emoji: "🎸", activeStyle: "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" },
                { id: "drums", label: "Impact Synth", emoji: "🥁", activeStyle: "bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/20" },
                { id: "vocal", label: "Vocal / Mic", emoji: "🎤", activeStyle: "bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-500/20" },
                { id: "flute", label: "Solo Flute", emoji: "🪈", activeStyle: "bg-emerald-500 border-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" },
              ].map((inst) => (
                <button
                  key={inst.id}
                  onClick={() => setInstrument(inst.id as any)}
                  className={`px-2 py-2.5 text-[10px] font-bold uppercase tracking-wider border rounded-none flex flex-col items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    instrument === inst.id
                      ? inst.activeStyle
                      : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900"
                  }`}
                >
                  <span className="text-lg">{inst.emoji}</span>
                  {inst.label}
                </button>
              ))}
            </div>
          </div>

          {/* Volume adjust slider */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-bold tracking-widest">
              <span>Volume Gain</span>
              <span className="font-mono">{Math.round(synthVolume * 100)}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="range"
                min="0.05"
                max="0.6"
                step="0.01"
                value={synthVolume}
                onChange={(e) => setSynthVolume(parseFloat(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>
          </div>

          {/* Visualizer Display Box */}
          <div className="space-y-2 pt-2">
            <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block">
              Audio Waveform Monitor
            </span>
            <div className="bg-slate-950 h-16 border border-slate-850 rounded-none px-4 flex items-end justify-between gap-[2px] overflow-hidden">
              {Array.from({ length: 18 }).map((_, idx) => {
                // Generate a randomized base speed or delay
                const delay = (idx % 4) * 0.15;
                const baseHeight = [30, 70, 50, 90, 40, 80, 60, 95, 35, 75, 55, 85, 45, 65, 50, 85, 30, 40][idx];
                const activeFactor = activeNote ? visualizerHeightMultiplier : 1;
                const dynamicHeight = Math.min(baseHeight * activeFactor, 100);
                
                return (
                  <div
                    key={idx}
                    style={{
                      height: `${dynamicHeight}%`,
                      transition: activeNote ? "height 0.08s ease-out" : "height 0.3s ease-in-out",
                      animationDelay: `${delay}s`,
                    }}
                    className={`w-full max-w-[6px] rounded-t-sm ${
                      idx % 3 === 0
                        ? "bg-gradient-to-t from-violet-600 to-pink-500"
                        : idx % 3 === 1
                        ? "bg-gradient-to-t from-pink-500 to-amber-400"
                        : "bg-gradient-to-t from-amber-400 to-cyan-400"
                    } ${activeNote ? "" : "animate-pulse"}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Synthesizer Keyboard & Game Panel (8/12 wide) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Song Selector / Training Quest */}
          <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-none text-xs">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-3 border-b border-slate-850 pb-3">
              <span className="text-[10px] text-gold-500 font-extrabold uppercase tracking-widest flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-gold-500/20" /> Performance Training Guide
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={songIndex}
                  onChange={(e) => {
                    setSongIndex(parseInt(e.target.value));
                    setCurrentSongStep(0);
                  }}
                  className="bg-slate-950 text-slate-300 text-[10px] font-bold border border-slate-850 px-2 py-1 rounded-none outline-none focus:border-gold-500"
                >
                  {SONGS.map((s, idx) => (
                    <option key={idx} value={idx}>
                      {s.title} ({s.difficulty})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleResetSong}
                  className="p-1 hover:text-white bg-slate-900 border border-slate-850 rounded-none"
                  title="Reset score"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Song note checklist blocks */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <span>Play notes in order to complete:</span>
                <span className="font-mono text-gold-500 font-extrabold">
                  Step {currentSongStep} / {SONGS[songIndex].notes.length}
                </span>
              </div>
              
              {/* Checklist visual sequence */}
              <div className="flex flex-wrap gap-1.5">
                {SONGS[songIndex].notes.map((note, idx) => {
                  const isCompleted = idx < currentSongStep;
                  const isCurrent = idx === currentSongStep;
                  return (
                    <div
                      key={idx}
                      className={`px-2 py-1.5 text-[10px] font-mono font-bold tracking-wider rounded-none border ${
                        isCompleted
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 line-through"
                          : isCurrent
                          ? "bg-gold-500/10 border-gold-500 text-gold-500 animate-pulse scale-105"
                          : "bg-slate-950 border-slate-850 text-slate-500"
                      }`}
                    >
                      {note}
                    </div>
                  );
                })}
              </div>

              {/* Autoplay / Practice assistance */}
              <div className="pt-2 flex justify-between items-center">
                <p className="text-[10px] text-slate-500 italic">
                  Tip: The glowing gold note above is your next key! Tap it below to perform the melody.
                </p>
                <button
                  onClick={handleAutoplayDemo}
                  disabled={isPlayingSong}
                  className="px-3 py-1 bg-slate-900 hover:bg-slate-850 border border-slate-850 hover:border-slate-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition"
                >
                  <Play className="w-3 h-3" /> Autoplay Note Guide
                </button>
              </div>
            </div>
          </div>

          {/* Keyboards Container */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">
                2. Tap Keys to Trigger Waveform
              </span>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest hidden md:inline">
                Hover keys for glowing music vibes
              </span>
            </div>

            {/* Simulated Synth Playboard keys */}
            <div className="grid grid-cols-8 gap-1 md:gap-2 h-44 md:h-52">
              {NOTES.map((note) => {
                const isNextSongNote = SONGS[songIndex].notes[currentSongStep] === note.name;
                const isPressed = activeNote === note.name;
                
                return (
                  <button
                    key={note.name}
                    onClick={() => playSound(note.name, note.freq)}
                    className={`relative select-none h-full flex flex-col justify-between items-center pt-4 pb-6 border font-mono rounded-none transition-all duration-150 cursor-pointer ${note.color} ${note.shadow} ${
                      isPressed ? "scale-95 translate-y-1 brightness-110" : "hover:scale-[1.02]"
                    } ${
                      isNextSongNote
                        ? "ring-2 ring-gold-500 ring-offset-4 ring-offset-slate-950 animate-bounce"
                        : ""
                    }`}
                  >
                    {/* Tiny visual light indicator */}
                    <span className={`w-2 h-2 rounded-full bg-white opacity-80 ${isPressed ? "animate-ping" : ""}`} />

                    {/* Note details */}
                    <div className="flex flex-col items-center">
                      <span className="text-xs md:text-sm font-extrabold tracking-tight">
                        {note.name}
                      </span>
                      <span className="text-[8px] md:text-[9px] font-medium opacity-70 font-mono hidden sm:inline">
                        {Math.round(note.freq)}Hz
                      </span>
                    </div>

                    {/* Helper badge when it's the target note */}
                    {isNextSongNote && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold-600 text-slate-950 font-sans text-[8px] font-extrabold px-1.5 py-0.5 uppercase tracking-wider rounded-none whitespace-nowrap shadow-md z-10">
                        NEXT
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* Success Modal / Floating Toast on Song Completed */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 border-2 border-emerald-500 p-4 max-w-sm flex items-center gap-4 shadow-2xl"
          >
            <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 flex items-center justify-center rounded-none shrink-0 border border-emerald-500/20">
              <Award className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-sm text-slate-100 uppercase tracking-wide">Excellent Performance!</h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-normal">
                You successfully played the full melody! Bethel Grading Medal has been awarded. Keep playing to earn more!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
