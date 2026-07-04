import React from "react";
import { motion } from "motion/react";
import { COURSES } from "../data";
import { CrestLogo } from "./CrestLogo";
import { InstrumentIconRenderer } from "./InstrumentIcons";
import { MusicPlayground } from "./MusicPlayground";
import { NewsEventsSection } from "./NewsEventsSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { LiveVisualizer } from "./LiveVisualizer";
import { MusicTheoryGame } from "./MusicTheoryGame";
import { ArrowRight, Music, Shield, Award, Users, BookOpen, Star, HelpCircle } from "lucide-react";

interface HomeSectionProps {
  onNavigate: (view: string) => void;
  onSelectCourse: (courseId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate, onSelectCourse }) => {
  const features = [
    {
      title: "Expert & Experienced Faculty",
      description: "Learn from teachers holding top credentials (FTCL, LRSM, LTCL) and decades of international performance background.",
      icon: <Users className="w-5 h-5 text-gold-400" />
    },
    {
      title: "Individual Attention",
      description: "One-on-one tailored mentoring focusing on the unique pace, mechanics, and musical goals of every single candidate.",
      icon: <Star className="w-5 h-5 text-gold-400" />
    },
    {
      title: "Trinity College London Preparation",
      description: "Official, grade-wise curriculum training for practical and theory exams. Achieve high global distinctions.",
      icon: <Award className="w-5 h-5 text-gold-400" />
    },
    {
      title: "ABRSM Exam Preparation",
      description: "Rigorous preparation tracks for the Associated Board of the Royal Schools of Music, valid worldwide.",
      icon: <Shield className="w-5 h-5 text-gold-400" />
    },
    {
      title: "Modern Infrastructure",
      description: "Practice in acoustically-treated studio spaces using state-of-the-art Pearl acoustic drum kits, woodwinds, and keyboards.",
      icon: <Music className="w-5 h-5 text-gold-400" />
    },
    {
      title: "Performance Opportunities",
      description: "Get on stage! Participate in annual concerts, acoustic recitals, gala showcases, and local collaborative ensembles.",
      icon: <BookOpen className="w-5 h-5 text-gold-400" />
    }
  ];

  return (
    <div className="space-y-16">
      {/* 1. Hero Banner */}
      <section className="relative rounded-none overflow-hidden bg-slate-950 border border-slate-850 shadow-2xl">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?q=80&w=1600')] bg-cover bg-center opacity-25"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 py-12 md:p-16 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 text-slate-950 rounded-none text-[10px] font-bold tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse"></span>
              Admissions Open 2026
            </div>

            <div className="space-y-2">
              <p className="font-serif text-gold-500 text-sm md:text-base font-semibold tracking-widest uppercase">
                Ooty's Premier Academy of Music
              </p>
              <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-slate-100 leading-tight tracking-tight">
                Where Passion Meets <br className="hidden md:inline" /> <span className="text-gold-500 italic font-serif font-black tracking-tighter">Music Excellence</span>
              </h1>
            </div>

            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-xl">
              Nurturing Nilgiris' musical talent since 2010. Offering world-class, grade-wise instrumental training and classical certifications affiliated with **Trinity College London** & **ABRSM**.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => onNavigate("admissions")}
                className="px-6 py-3 rounded-none bg-slate-100 text-slate-950 hover:bg-slate-950 hover:text-slate-100 border border-slate-100 hover:border-slate-850 font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
              >
                Enroll for 2026 Today
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("courses")}
                className="px-6 py-3 rounded-none bg-slate-900 text-slate-100 hover:bg-slate-950 hover:text-slate-100 font-bold text-xs tracking-widest uppercase border border-slate-850 hover:border-slate-700 transition duration-300"
              >
                Explore Courses Offered
              </button>
            </div>

            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-850">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                Accredited Training Partner:
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-900 border border-slate-850 rounded-none px-3 py-1.5 flex items-center justify-center text-[10px] font-extrabold text-slate-300 tracking-[0.15em] uppercase">
                  TRINITY COLLEGE LONDON
                </div>
                <div className="bg-slate-900 border border-slate-850 rounded-none px-3 py-1.5 flex items-center justify-center text-[10px] font-extrabold text-slate-300 tracking-[0.15em] uppercase">
                  ABRSM
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Banner Card */}
          <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-slate-900/80 backdrop-blur border border-slate-850 p-8 rounded-none w-full max-w-sm text-center space-y-6 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"></div>
              
              <CrestLogo className="w-20 h-20" />
              
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-slate-100 tracking-wider uppercase">Bethel</h3>
                <p className="font-serif text-xs text-gold-400 tracking-[0.2em] uppercase">School of Music</p>
                <p className="text-[10px] text-slate-500 italic mt-1">Ooty Campus — EST. 2010</p>
              </div>

              <div className="border-t border-b border-slate-800 py-3 text-slate-300 text-xs italic tracking-wide">
                &ldquo;Learn. Perform. Excel.&rdquo;
              </div>

              <div className="space-y-1 text-slate-400 text-[11px] font-mono">
                <p>Ooty, Nilgiris, Tamil Nadu</p>
                <p>Admissions Helpline: 9865865425</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Sound Playground */}
      <section className="pt-2">
        <MusicPlayground />
      </section>

      {/* Live Frequency Visualizer */}
      <section className="pt-2">
        <LiveVisualizer />
      </section>

      {/* 2. Core Pillars / Features Grid */}
      <section className="space-y-10">
        <div className="text-center space-y-3">
          <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
            Why Bethel Music School
          </p>
          <h2 className="font-serif text-2xl md:text-3.5xl font-bold text-slate-100">
            Nurturing Musical Aspirations Since 2010
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-slate-905 hover:bg-slate-900 border border-slate-850 p-6 rounded-none space-y-4 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-none bg-slate-950 border border-slate-850 flex items-center justify-center">
                  {f.icon}
                </div>
                <h3 className="font-serif font-bold text-slate-100 text-base">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Quick Courses Overview */}
      <section className="space-y-10">
        <div className="flex flex-wrap justify-between items-end gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-2">
            <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
              Our Curriculum
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100">
              Explore Our Core Programs
            </h2>
          </div>
          <button
            onClick={() => onNavigate("courses")}
            className="text-xs text-gold-400 hover:text-gold-300 font-bold tracking-wider uppercase flex items-center gap-1.5 transition"
          >
            See Course Syllabuses
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {COURSES.slice(0, 4).map((c, i) => (
            <div
              key={c.id}
              onClick={() => onSelectCourse(c.id)}
              className="group bg-slate-905 border border-slate-850 hover:border-gold-500/30 rounded-none overflow-hidden transition duration-300 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-lg hover:shadow-gold-500/5"
            >
              <div className="p-5 space-y-3">
                <div className="w-10 h-10 rounded-none border border-slate-850 bg-slate-950 group-hover:bg-gold-500/10 text-slate-400 group-hover:text-gold-500 flex items-center justify-center transition">
                  <InstrumentIconRenderer iconName={c.iconName} className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-slate-200 group-hover:text-slate-100 transition text-base">
                  {c.name}
                </h3>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {c.description}
                </p>
              </div>
              <div className="px-5 py-3 bg-slate-950/50 border-t border-slate-900 text-[10px] text-slate-400 flex justify-between items-center group-hover:text-gold-400 group-hover:bg-slate-900/30 transition">
                <span>{c.difficulty}</span>
                <span className="flex items-center gap-1 font-semibold">
                  Syllabus <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News, Exams & Events Bulletin Section */}
      <section className="pt-2">
        <NewsEventsSection />
      </section>

      {/* 4. Affiliations & Certifications */}
      <section className="bg-slate-905 border border-slate-850 rounded-none p-8 md:p-12 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-[0.03] text-gold-500">
          <Music className="w-96 h-96 -mr-20 -mb-20" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
              Global Certifications
            </h3>
            <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-100">
              Affiliated Preparation Center for International Graded Exams
            </h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-2xl">
              Bethel School of Music aligns its lessons with the world-renowned exam boards of the United Kingdom. Candidates can opt to take examinations twice a year under the direct auspices of:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <strong>Trinity College London</strong> (Practical & Theory Graded Exams)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <strong>ABRSM</strong> (Associated Board of the Royal Schools of Music)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <strong>Trinity Rock & Pop</strong> (Vocals, Drums, Guitar, Keyboards)
              </li>
              <li className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500"></span>
                <strong>Performance Diplomas</strong> (ATCL, LTCL, FTCL)
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-slate-950/80 p-5 rounded-none border border-slate-850 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Affiliated Board</p>
              <h4 className="font-serif font-extrabold text-slate-200 text-sm tracking-wider">TRINITY COLLEGE LONDON</h4>
              <p className="text-[10px] text-slate-400 mt-1">Practical and theory grades 1 to 8 prep</p>
            </div>
            <div className="bg-slate-950/80 p-5 rounded-none border border-slate-850 text-center">
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Affiliated Board</p>
              <h4 className="font-serif font-extrabold text-slate-200 text-sm tracking-wider">ABRSM EXAMS</h4>
              <p className="text-[10px] text-slate-400 mt-1">Associated Board of Royal Schools of Music</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Music Theory Mini-Game */}
      <section className="pt-2">
        <MusicTheoryGame />
      </section>

      {/* Rotating Student & Parent Testimonials */}
      <section className="pt-2">
        <TestimonialsSection />
      </section>

      {/* 5. Annual Callout / Banner */}
      <section className="bg-slate-950 border border-slate-850 p-8 rounded-none text-center space-y-4">
        <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.2em]">Admissions Announcement</p>
        <h2 className="font-serif text-xl md:text-3xl font-extrabold text-slate-100">
          Begin Your Musical Journey in Ooty Today
        </h2>
        <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Unlock your potential. Our limited 2026 intake ensures that every student gets maximum focus and individual attention. Sessions are starting soon!
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate("admissions")}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-950 text-slate-950 hover:text-slate-100 border border-slate-100 hover:border-slate-850 font-bold text-xs rounded-none transition tracking-widest uppercase cursor-pointer shadow-md"
          >
            Start Admission Inquiry
          </button>
        </div>
      </section>
    </div>
  );
};
