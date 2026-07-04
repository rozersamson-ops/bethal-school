import React, { useState } from "react";
import { motion } from "motion/react";
import { Calendar, Award, Music, Bell, ExternalLink, ArrowRight, Clock, MapPin } from "lucide-react";

interface NewsItem {
  id: number;
  category: "exams" | "competitions" | "recitals" | "general";
  title: string;
  date: string;
  month: string;
  day: string;
  time?: string;
  location: string;
  description: string;
  badge: string;
  isUrgent?: boolean;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 1,
    category: "exams",
    title: "Trinity College London Practical Exams",
    date: "Sept 14 - Sept 20, 2026",
    month: "SEP",
    day: "14",
    time: "09:00 AM onwards",
    location: "Bethel Campus (Authorized Center)",
    description: "Official practical exam sessions for Grades 1 to 8 (Piano, Violin, Guitar, and Vocals). Exam entry submissions must be finalized with physical signatures by July 28th.",
    badge: "Registration Open",
    isUrgent: true,
  },
  {
    id: 2,
    category: "exams",
    title: "ABRSM Online Theory Assessments",
    date: "October 5, 2026",
    month: "OCT",
    day: "05",
    time: "All Day Slotting",
    location: "Digital Lab, Bethel School",
    description: "Digital theory exams for candidates of Grade 1 through 5. Bethel will host intensive mock preparation sessions every Saturday beginning August 8th.",
    badge: "Prep Starting Aug 8",
    isUrgent: false,
  },
  {
    id: 3,
    category: "competitions",
    title: "All-India Youth Music Sonata Festival",
    date: "November 12 - 14, 2026",
    month: "NOV",
    day: "12",
    time: "10:00 AM - 06:00 PM",
    location: "Royal Concert Hall, Bangalore",
    description: "The premier national music competition. Bethel School is sponsoring 6 elite candidates in Piano and Violin categories. Daily rehearsals will be conducted in the main hall.",
    badge: "Competition Entry",
    isUrgent: false,
  },
  {
    id: 4,
    category: "recitals",
    title: "Annual Bethel Winter Gala Recital",
    date: "December 18, 2026",
    month: "DEC",
    day: "18",
    time: "04:30 PM - 07:30 PM",
    location: "Assembly Rooms Theater, Ooty",
    description: "Our hallmark event of the year! All students will perform on stage, displaying solo, chamber, and ensemble masteries. Families are warmly invited to book seats starting November 1st.",
    badge: "Public Concert",
    isUrgent: false,
  }
];

export const NewsEventsSection: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "exams" | "competitions" | "recitals">("all");

  const filteredItems = NEWS_DATA.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
    <div id="news-events" className="space-y-8 bg-slate-905 border border-slate-850 p-6 md:p-8 rounded-none">
      
      {/* Upper header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-850 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 text-gold-500 font-mono text-[9px] font-bold tracking-widest uppercase rounded-none">
              Bulletins
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gold-700 font-bold tracking-wider uppercase">
              <Bell className="w-3.5 h-3.5 animate-bounce" /> Live Board
            </span>
          </div>
          <h2 className="font-serif text-2xl font-black text-slate-100 uppercase tracking-wide">
            News, Exam Schedules & events
          </h2>
          <p className="text-xs text-slate-400">
            Stay informed about the latest Trinity/ABRSM cycles, national piano festivals, and academic achievements.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          {[
            { id: "all", label: "All updates" },
            { id: "exams", label: "Exams / Boards" },
            { id: "competitions", label: "Competitions" },
            { id: "recitals", label: "School Recitals" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id as any)}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider border rounded-none transition-all cursor-pointer ${
                filter === cat.id
                  ? "bg-slate-100 border-slate-100 text-slate-950"
                  : "bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Urgent Broad Alert Strip */}
      <div className="bg-amber-500/5 border-l-2 border-amber-500 p-4 rounded-none flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="px-1.5 py-0.5 bg-amber-500 text-slate-950 font-mono text-[8px] font-extrabold tracking-widest uppercase rounded-none">
            URGENT NOTICE
          </span>
          <p className="text-slate-300 font-medium">
            Trinity practical exam fee collections close on <span className="text-amber-500 font-bold">July 25, 2026</span>. Delayed requests cannot be processed.
          </p>
        </div>
        <a 
          href="#contact" 
          className="text-gold-500 hover:text-gold-400 font-bold tracking-wider uppercase text-[10px] flex items-center gap-1 transition"
        >
          Contact Registrar <ArrowRight className="w-3 h-3" />
        </a>
      </div>

      {/* News/Events dynamic grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className={`flex flex-col md:flex-row border bg-slate-950 rounded-none overflow-hidden transition duration-300 hover:border-gold-500/40 relative ${
              item.isUrgent ? "border-gold-500/30 shadow-md shadow-gold-500/5" : "border-slate-850"
            }`}
          >
            {/* Left side ticket/date badge (mimicking ticket stub) */}
            <div className="md:w-32 bg-slate-905 border-b md:border-b-0 md:border-r border-slate-850 p-4 flex md:flex-col items-center justify-center text-center shrink-0 space-y-1">
              <span className="font-mono text-xs font-bold text-slate-500 tracking-widest uppercase md:block">
                {item.month}
              </span>
              <span className="font-serif text-3xl font-black text-gold-500 md:block leading-none">
                {item.day}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hidden md:block">
                2026
              </span>
            </div>

            {/* Right side event contents */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[8px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-none border ${
                    item.category === "exams"
                      ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
                      : item.category === "competitions"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                      : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-[9px] text-slate-500 font-mono font-bold tracking-wider">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-slate-100 text-sm md:text-base hover:text-gold-500 transition cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Footer specs */}
              <div className="pt-2 border-t border-slate-850/60 flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-500">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.time || "TBD"}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {item.location}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};
