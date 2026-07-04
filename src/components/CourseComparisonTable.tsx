import React from "react";
import { Award, Clock, Compass, Layers, CheckCircle } from "lucide-react";

interface ComparisonRow {
  instrument: string;
  duration: string;
  boards: string[];
  level: string;
  frequency: string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    instrument: "Piano & Keyboard",
    duration: "12 Mos per Grade",
    boards: ["Trinity College London", "ABRSM"],
    level: "Beginner - Advanced",
    frequency: "2 Classes / Week",
    highlight: true,
  },
  {
    instrument: "Violin ( Suzuki / Traditional )",
    duration: "12 Mos per Grade",
    boards: ["Trinity College London", "ABRSM"],
    level: "Beginner - Advanced",
    frequency: "2 Classes / Week",
  },
  {
    instrument: "Guitar ( Classical / Rock / Pop )",
    duration: "10-12 Mos per Grade",
    boards: ["Trinity", "ABRSM", "Rock & Pop"],
    level: "Beginner - Advanced",
    frequency: "2 Classes / Week",
  },
  {
    instrument: "Drums ( Snare & Acoustic Kit )",
    duration: "8-12 Mos per Grade",
    boards: ["Trinity (Rock & Pop)"],
    level: "Beginner - Advanced",
    frequency: "2 Classes / Week",
  },
  {
    instrument: "Vocal ( Classical & Contemporary )",
    duration: "12 Mos per Grade",
    boards: ["Trinity College", "ABRSM"],
    level: "Beginner - Advanced",
    frequency: "2 Classes / Week",
    highlight: true,
  },
  {
    instrument: "Flute & Woodwinds",
    duration: "10-12 Mos per Grade",
    boards: ["Trinity College", "ABRSM"],
    level: "Beginner - Advanced",
    frequency: "2 Classes / Week",
  },
  {
    instrument: "Music Theory Co-Curriculum",
    duration: "6 Months per Grade",
    boards: ["Trinity College", "ABRSM"],
    level: "All Candidates",
    frequency: "1 Intensive / Week",
  },
];

export const CourseComparisonTable: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 text-gold-500 font-mono text-[9px] font-bold tracking-widest uppercase rounded-none">
          Quick Comparison
        </span>
        <h3 className="font-serif text-xl font-black text-slate-100 uppercase tracking-wide">
          Course Comparison matrix
        </h3>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Compare durations, certifying international syndicates, and student skill streams to choose your optimal learning path.
        </p>
      </div>

      {/* Responsive View - Desktop Table, Mobile Stacked Cards */}
      <div className="bg-slate-905 border border-slate-850 rounded-none overflow-hidden shadow-xl">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-850 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-5">Instrument / Stream</th>
                <th className="py-4 px-4">Est. Duration</th>
                <th className="py-4 px-4">Certification Boards</th>
                <th className="py-4 px-4">Skill Level Range</th>
                <th className="py-4 px-4">Weekly Sessions</th>
                <th className="py-4 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850/60">
              {COMPARISON_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className={`transition duration-150 hover:bg-slate-800/40 ${
                    row.highlight ? "bg-gold-500/[0.02]" : ""
                  }`}
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${row.highlight ? "bg-gold-500 animate-ping" : "bg-gold-700"}`} />
                      <span className="font-serif font-black text-sm text-slate-100">
                        {row.instrument}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                      {row.duration}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-wrap gap-1">
                      {row.boards.map((b, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-1.5 py-0.5 bg-slate-950 border border-slate-850 text-[9px] font-bold text-slate-400 uppercase rounded-none tracking-wide"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300">
                      <Layers className="w-3.5 h-3.5 text-gold-700 shrink-0" />
                      {row.level}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-xs text-slate-300">
                      {row.frequency}
                    </div>
                  </td>
                  <td className="py-4 px-5 text-right">
                    <span className="inline-flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-none">
                      <CheckCircle className="w-2.5 h-2.5" /> Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Accordion Cards */}
        <div className="md:hidden divide-y divide-slate-850">
          {COMPARISON_DATA.map((row, idx) => (
            <div
              key={idx}
              className={`p-5 space-y-4 text-left ${
                row.highlight ? "bg-gold-500/[0.03]" : "bg-slate-950/20"
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${row.highlight ? "bg-gold-500 animate-pulse" : "bg-gold-700"}`} />
                  <h4 className="font-serif font-black text-sm text-slate-100 uppercase tracking-wide">
                    {row.instrument}
                  </h4>
                </div>
                <span className="inline-flex items-center gap-0.5 text-[8px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-none">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Duration</span>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Clock className="w-3 h-3 text-gold-500" />
                    <span>{row.duration}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Skill Stream</span>
                  <div className="flex items-center gap-1 text-slate-300">
                    <Compass className="w-3 h-3 text-gold-700" />
                    <span>{row.level}</span>
                  </div>
                </div>

                <div className="space-y-1 col-span-2">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Certification Boards</span>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {row.boards.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-1.5 py-0.5 bg-slate-950 border border-slate-850 text-[8px] font-bold text-slate-400 uppercase rounded-none"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 col-span-2 pt-1 border-t border-slate-850/60">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Weekly Commitment:</span>
                    <span className="font-bold text-slate-300">{row.frequency}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
