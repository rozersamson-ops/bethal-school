import React, { useRef, useEffect, useState } from "react";
import { Radio, Flame, Sparkles, Volume2, ShieldCheck, Play, Pause } from "lucide-react";

interface VisualizerPreset {
  id: string;
  name: string;
  speed: number;
  multiplier: number;
  wavesCount: number;
  colorTheme: string[];
}

const PRESETS: VisualizerPreset[] = [
  {
    id: "jazz",
    name: "Acoustic Jazz Duo",
    speed: 0.05,
    multiplier: 45,
    wavesCount: 4,
    colorTheme: ["#FF007F", "#FF8F00", "#00D2B4"]
  },
  {
    id: "rock",
    name: "Stadium Rock Concert",
    speed: 0.12,
    multiplier: 85,
    wavesCount: 6,
    colorTheme: ["#FF007F", "#6200EE", "#00D2B4"]
  },
  {
    id: "classic",
    name: "Symphonic Ensemble",
    speed: 0.02,
    multiplier: 25,
    wavesCount: 3,
    colorTheme: ["#FF8F00", "#E4DCF1", "#00D2B4"]
  },
  {
    id: "electro",
    name: "Neon Synthwave Beats",
    speed: 0.09,
    multiplier: 65,
    wavesCount: 5,
    colorTheme: ["#FF007F", "#00D2B4", "#3700B3"]
  }
];

export const LiveVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activePreset, setActivePreset] = useState<VisualizerPreset>(PRESETS[3]);
  const [sensitivity, setSensitivity] = useState<number>(50); // slider 1-100
  const [isPulsing, setIsPulsing] = useState<boolean>(true);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resizeCanvas = () => {
      const container = containerRef.current;
      if (container && canvas) {
        canvas.width = container.clientWidth;
        canvas.height = 140; // Elegant sleek compact visualizer
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isPulsing) {
        phaseRef.current += activePreset.speed;
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw subtle background grid lines
      ctx.strokeStyle = "rgba(195, 128, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      for (let j = 0; j < height; j += 20) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Draw multiple layers of harmonic waves
      for (let w = 0; w < activePreset.wavesCount; w++) {
        ctx.beginPath();
        
        const waveColor = activePreset.colorTheme[w % activePreset.colorTheme.length];
        ctx.strokeStyle = waveColor;
        ctx.lineWidth = w === 0 ? 3 : 1.5;

        // Apply visual transparency based on wave tier
        ctx.globalAlpha = w === 0 ? 0.9 : 0.45;

        // Visual shadow glow
        ctx.shadowBlur = w === 0 ? 12 : 4;
        ctx.shadowColor = waveColor;

        for (let x = 0; x < width; x += 3) {
          // Compound sinusoidal waves with secondary high frequency vibrations for a realistic "live sound" look
          const frequency1 = 0.006 + w * 0.003;
          const frequency2 = 0.02 + w * 0.005;
          const phase = phaseRef.current + w * (Math.PI / 4);

          // Combined amplitude scaling based on UI sensitivity
          const baseAmp = (activePreset.multiplier * (sensitivity / 50)) * 0.55;
          
          // Natural Gaussian edge-dampening so the waves gently fade out on left and right borders of the widget
          const borderFade = Math.sin((x / width) * Math.PI);

          const y = centerY + 
            Math.sin(x * frequency1 + phase) * baseAmp * borderFade +
            Math.cos(x * frequency2 - phase) * (baseAmp * 0.3) * borderFade;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Reset composite context attributes for general draws
      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;

      // Draw central pulse nodes mimicking real microphone frequencies
      const totalBars = 32;
      const barWidth = 4;
      const barSpacing = 5;
      const startX = (width - (totalBars * (barWidth + barSpacing))) / 2;

      for (let i = 0; i < totalBars; i++) {
        const offsetPhase = phaseRef.current * 1.5 + i * 0.15;
        // Generate pseudo-random organic frequency peaks
        const signalLevel = Math.abs(Math.sin(offsetPhase) * Math.cos(offsetPhase * 0.7));
        const barHeight = signalLevel * (60 * (sensitivity / 50));
        
        const x = startX + i * (barWidth + barSpacing);
        const y = height - barHeight - 10;

        // Draw neon glow frequencies
        ctx.fillStyle = i % 2 === 0 ? "#FF007F" : "#00D2B4";
        ctx.fillRect(x, y, barWidth, barHeight);
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [activePreset, sensitivity, isPulsing]);

  return (
    <div id="live-visualizer" className="bg-slate-905 border border-slate-850 p-6 rounded-none text-left space-y-6">
      
      {/* Visual Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-850 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
            </span>
            <span className="text-[10px] text-gold-500 font-mono font-bold uppercase tracking-wider">
              Sound Lab Console
            </span>
          </div>
          <h3 className="font-serif text-lg font-black text-slate-100 uppercase tracking-wide">
            Live Frequency Visualizer
          </h3>
          <p className="text-[11px] text-slate-400">
            Interactive sound wave simulator representing live acoustic pulses across Ooty masterclass studios.
          </p>
        </div>

        {/* Start / Pause controls */}
        <button
          onClick={() => setIsPulsing(!isPulsing)}
          className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest border rounded-none flex items-center gap-1.5 transition cursor-pointer ${
            isPulsing 
              ? "bg-slate-950 border-gold-500/40 text-gold-500" 
              : "bg-gold-500 text-white border-gold-500"
          }`}
        >
          {isPulsing ? (
            <>
              <Pause className="w-3 h-3" /> Stop Pulse
            </>
          ) : (
            <>
              <Play className="w-3 h-3 fill-white" /> Live Feed
            </>
          )}
        </button>
      </div>

      {/* Visualizer Canvas Area */}
      <div ref={containerRef} className="w-full bg-slate-950 border border-slate-850 p-1 relative overflow-hidden">
        <canvas ref={canvasRef} className="block w-full" />
        
        {/* Preset Name Overlay */}
        <div className="absolute left-4 top-4 bg-slate-905/90 backdrop-blur-sm px-2.5 py-1 border border-slate-850 text-[10px] font-mono text-slate-300">
          <span className="text-gold-500 font-bold uppercase mr-1.5">Stream:</span>
          {activePreset.name}
        </div>

        {/* Real-time Indicator Tag */}
        <div className="absolute right-4 top-4 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Realtime Audio</span>
        </div>
      </div>

      {/* Interactive Controller Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Presets Column */}
        <div className="md:col-span-8 space-y-2">
          <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block">
            Select Music Style Stream:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p)}
                className={`px-2 py-2 text-[10px] font-bold uppercase tracking-wider border rounded-none transition-all duration-150 cursor-pointer ${
                  activePreset.id === p.id
                    ? "bg-slate-100 border-slate-100 text-slate-950"
                    : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
                }`}
              >
                {p.id}
              </button>
            ))}
          </div>
        </div>

        {/* Sensitivity Column */}
        <div className="md:col-span-4 space-y-2">
          <div className="flex justify-between items-center text-[9px] text-slate-400 uppercase font-bold tracking-widest">
            <span>Mic Sensitivity:</span>
            <span className="font-mono text-gold-500 font-bold">{sensitivity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={sensitivity}
            onChange={(e) => setSensitivity(Number(e.target.value))}
            className="w-full accent-gold-500 h-1 bg-slate-950 border border-slate-850 cursor-pointer"
          />
        </div>

      </div>

    </div>
  );
};
