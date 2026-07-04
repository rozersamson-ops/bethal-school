import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Award, RotateCcw, Check, X, HelpCircle, ArrowRight, Music, Volume2, Star } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What does the dynamic marking 'Piano' (p) instruct a performer to do?",
    options: ["Play loudly with aggression", "Play softly and quietly", "Speed up the tempo gradually", "Pause for two full beats"],
    answerIndex: 1,
    explanation: "'Piano' translates literally to 'soft' or 'gentle' in Italian, instructing musicians to play at a quieter dynamic volume."
  },
  {
    id: 2,
    question: "How many beats does a Semibreve (Whole Note) receive in standard 4/4 time signature?",
    options: ["1 Beat", "2 Beats", "3 Beats", "4 Beats"],
    answerIndex: 3,
    explanation: "A Semibreve represents a whole note, which spans across all 4 beats in a standard common time measure."
  },
  {
    id: 3,
    question: "Which of the following is the lowest line on a standard Treble Clef staff?",
    options: ["Line E", "Line G", "Line B", "Line F"],
    answerIndex: 0,
    explanation: "The lines of Treble Clef from bottom to top are E - G - B - D - F (easily remembered as 'Every Good Boy Does Fine')."
  },
  {
    id: 4,
    question: "Which syllabus board is globally famous for its specialized 'Rock & Pop' practical exam tracks?",
    options: ["ABRSM", "Trinity College London", "Suzuki Academy", "Royal Conservatory of Music"],
    answerIndex: 1,
    explanation: "Trinity College London offers a distinct and highly acclaimed 'Rock & Pop' graded exam syllabus featuring modern tracks and real band structures."
  },
  {
    id: 5,
    question: "Though constructed primarily of silver, nickel, or gold metal, which instrument belongs to the Woodwind family?",
    options: ["Violin", "Flute", "Acoustic Guitar", "Snare Drum"],
    answerIndex: 1,
    explanation: "The Flute belongs to the Woodwind family because it was historically carved from wood and relies on a splitting column of air rather than brass lips to produce sound."
  }
];

export const MusicTheoryGame: React.FC = () => {
  const [gameState, setGameState] = useState<"welcome" | "playing" | "finished">("welcome");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState("");

  // Play a beautiful synthetic beep tone using Web Audio API!
  const playSound = (type: "correct" | "incorrect" | "victory") => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "correct") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === "incorrect") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220.00, ctx.currentTime); // A3
        osc.frequency.exponentialRampToValueAtTime(146.83, ctx.currentTime + 0.25); // D3
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "victory") {
        // Melodious arpeggio
        osc.type = "triangle";
        const now = ctx.currentTime;
        const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 1046.50]; // C Major scale ascent
        gain.gain.setValueAtTime(0.1, now);
        freqs.forEach((f, idx) => {
          osc.frequency.setValueAtTime(f, now + idx * 0.08);
        });
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.65);
      }
    } catch (e) {
      // Ignored if browser policy blocks audio autostart
    }
  };

  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    setGameState("playing");
    setCurrentQIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || isAnswered) return;
    setIsAnswered(true);
    const correctIdx = QUESTIONS[currentQIndex].answerIndex;
    if (selectedAnswer === correctIdx) {
      setScore((s) => s + 1);
      playSound("correct");
    } else {
      playSound("incorrect");
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQIndex + 1 < QUESTIONS.length) {
      setCurrentQIndex((idx) => idx + 1);
    } else {
      setGameState("finished");
      playSound("victory");
    }
  };

  const handleRestart = () => {
    setGameState("welcome");
    setPlayerName("");
    setScore(0);
    setCurrentQIndex(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
  };

  const currentQuestion = QUESTIONS[currentQIndex];
  const isCorrect = selectedAnswer === currentQuestion?.answerIndex;

  return (
    <div id="theory-minigame" className="bg-slate-905 border border-slate-850 p-6 md:p-8 rounded-none text-left relative overflow-hidden">
      {/* Visual glowing layout lines */}
      <div className="absolute right-0 top-0 w-48 h-48 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-48 h-48 bg-gold-700/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto space-y-6">
        {/* Module title header */}
        <div className="text-center space-y-2 pb-4 border-b border-slate-850">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-500/10 border border-gold-500/30 text-gold-500 rounded-none font-mono text-[9px] font-black uppercase tracking-wider">
            <Music className="w-3.5 h-3.5 animate-spin" /> Interactive Hub
          </div>
          <h2 className="font-serif text-2xl font-black text-slate-100 uppercase tracking-wide">
            Music Theory Mini-Game
          </h2>
          <p className="text-xs text-slate-400">
            Challenge your notation mastery, graded board details, and instrument families to qualify for a certificate.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {gameState === "welcome" && (
            <motion.form
              key="welcome"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onSubmit={handleStartGame}
              className="space-y-6 py-4"
            >
              <div className="bg-slate-950 p-6 border border-slate-850 space-y-4 text-center">
                <Trophy className="w-12 h-12 text-gold-500 mx-auto animate-bounce" />
                <h3 className="font-serif font-black text-slate-100 text-sm uppercase tracking-wide">
                  Earn Your Music Master Badge
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Pass this 5-question test with a score of <span className="text-gold-500 font-bold">4 or more</span> to instantly unlock your personal digital Badge of Honor!
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">
                  Enter Your Name (for certificate):
                </label>
                <input
                  type="text"
                  required
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="e.g., Emily Watson"
                  className="w-full px-4 py-3 text-xs bg-slate-950 border border-slate-850 text-slate-100 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 rounded-none placeholder-slate-700"
                />
              </div>

              <button
                type="submit"
                disabled={!playerName.trim()}
                className="w-full py-3.5 bg-gold-500 text-white font-mono font-bold text-xs uppercase tracking-widest hover:bg-gold-400 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed rounded-none flex items-center justify-center gap-2 shadow-lg shadow-gold-500/10"
              >
                Launch Challenge <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}

          {/* Playing Screen */}
          {gameState === "playing" && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Score bar & Question numbering */}
              <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-850/60 pb-3">
                <span className="font-mono font-bold uppercase tracking-wider text-[10px]">
                  Candidate: <span className="text-gold-500">{playerName}</span>
                </span>
                <span className="font-mono text-slate-300">
                  Question {currentQIndex + 1} of {QUESTIONS.length}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1 bg-slate-950">
                <div
                  className="h-full bg-gold-500 transition-all duration-300"
                  style={{ width: `${((currentQIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="space-y-3">
                <h3 className="font-serif font-black text-slate-100 text-base md:text-lg leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Multiple choice options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((opt, oIdx) => {
                  let buttonStyle = "bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700";
                  let checkIcon = null;

                  if (selectedAnswer === oIdx) {
                    buttonStyle = "bg-gold-500/10 border-gold-500 text-gold-500";
                  }

                  if (isAnswered) {
                    if (oIdx === currentQuestion.answerIndex) {
                      buttonStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400";
                      checkIcon = <Check className="w-4 h-4 shrink-0 text-emerald-400" />;
                    } else if (selectedAnswer === oIdx) {
                      buttonStyle = "bg-rose-500/10 border-rose-500 text-rose-500";
                      checkIcon = <X className="w-4 h-4 shrink-0 text-rose-500" />;
                    } else {
                      buttonStyle = "bg-slate-950/40 border-slate-900 text-slate-600 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`w-full p-3.5 text-xs text-left border rounded-none transition-all flex items-center justify-between gap-3 cursor-pointer ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {checkIcon}
                    </button>
                  );
                })}
              </div>

              {/* Explanatory notes & buttons */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 border border-slate-850 text-xs text-slate-300 space-y-2 leading-relaxed"
                  >
                    <p className="font-bold uppercase tracking-wider text-[9px] text-gold-500 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5" /> Explanation Note:
                    </p>
                    <p>{currentQuestion.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="pt-2">
                {!isAnswered ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="w-full py-3 bg-slate-100 text-slate-950 hover:bg-slate-950 hover:text-slate-100 border border-slate-100 hover:border-slate-850 text-xs font-mono font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed rounded-none transition-all cursor-pointer"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full py-3 bg-gold-500 text-white hover:bg-gold-400 text-xs font-mono font-bold uppercase tracking-widest rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {currentQIndex + 1 === QUESTIONS.length ? "Finish & Grade" : "Proceed Next"} <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Finished & Badge screen */}
          {gameState === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="text-center space-y-6 py-4"
            >
              {/* Score summary */}
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-mono font-bold uppercase tracking-widest">
                  Challenge Scorecard
                </p>
                <p className="text-4xl font-serif font-black text-slate-100">
                  {score} / {QUESTIONS.length} Correct
                </p>
              </div>

              {score >= 4 ? (
                /* Glowing Gold Badge of Honor */
                <div className="bg-slate-950 p-6 border border-gold-500/40 relative overflow-hidden space-y-4">
                  {/* Glowing background rays */}
                  <div className="absolute inset-0 bg-radial-gradient from-gold-500/10 via-transparent to-transparent opacity-60 animate-pulse pointer-events-none" />

                  <div className="relative z-10 space-y-4">
                    <div className="w-20 h-20 bg-gold-500/10 border-2 border-gold-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-gold-500/25">
                      <Award className="w-10 h-10 text-gold-500 animate-spin" style={{ animationDuration: "12s" }} />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-serif font-black text-slate-100 text-base uppercase tracking-wider">
                        Music Master Badge
                      </h4>
                      <p className="font-mono text-gold-500 font-bold text-[10px] uppercase tracking-[0.25em]">
                        Certified Music Theoretician
                      </p>
                    </div>

                    <div className="border-t border-slate-850 pt-3">
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                        Awarded To:
                      </p>
                      <p className="text-lg font-serif font-black text-slate-100 mt-0.5">
                        {playerName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-light italic mt-1 leading-relaxed">
                        Presented by Bethel School of Music for successfully passing the graded examinations trivia.
                      </p>
                    </div>

                    <div className="flex justify-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Failed summary status */
                <div className="bg-slate-950 p-6 border border-slate-850 space-y-4">
                  <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                    You scored <span className="text-rose-500 font-bold">{score} / 5</span>. You need a score of 4 or 5 to unlock the prestigious Music Master badge.
                  </p>
                  <p className="text-[11px] text-slate-500 italic">
                    Review the trivia notes and try again! Constant practice leads to mastery.
                  </p>
                </div>
              )}

              {/* Action row */}
              <div className="flex gap-3">
                <button
                  onClick={handleRestart}
                  className="flex-1 py-3 bg-slate-950 border border-slate-850 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-mono font-bold uppercase tracking-widest rounded-none transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Try Again
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
