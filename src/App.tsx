import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CrestLogo } from "./components/CrestLogo";
import { HomeSection } from "./components/HomeSection";
import { CoursesSection } from "./components/CoursesSection";
import { AboutSection } from "./components/AboutSection";
import { AdmissionsSection } from "./components/AdmissionsSection";
import { GallerySection } from "./components/GallerySection";
import { ContactSection } from "./components/ContactSection";
import { Menu, X, Phone, Mail, MapPin, Award, Shield } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState<string>("home");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientNotes, setAmbientNotes] = useState<{ id: number; char: string; left: number; delay: number; duration: number; size: number }[]>([]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeView]);

  // Generate floating notes once
  useEffect(() => {
    const chars = ["♩", "♪", "♫", "♬", "♭", "♮", "♯", "𝄞", "𝄢"];
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      left: Math.random() * 95,
      delay: Math.random() * 6,
      duration: 12 + Math.random() * 16,
      size: 14 + Math.random() * 24,
    }));
    setAmbientNotes(generated);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "courses", label: "Courses" },
    { id: "about", label: "About Us" },
    { id: "admissions", label: "Admissions" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case "home":
        return (
          <HomeSection
            onNavigate={(view) => setActiveView(view)}
            onSelectCourse={(courseId) => {
              setSelectedCourseId(courseId);
              setActiveView("courses");
            }}
          />
        );
      case "courses":
        return (
          <CoursesSection
            selectedCourseId={selectedCourseId}
            onSelectCourse={setSelectedCourseId}
            onApplyCourse={(courseId) => {
              setSelectedCourseId(courseId);
              setActiveView("admissions");
            }}
          />
        );
      case "about":
        return <AboutSection />;
      case "admissions":
        return <AdmissionsSection preselectedCourseId={selectedCourseId} />;
      case "gallery":
        return <GallerySection />;
      case "contact":
        return <ContactSection />;
      default:
        return <HomeSection onNavigate={setActiveView} onSelectCourse={setSelectedCourseId} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-slate-950 bg-pattern relative">
      {/* Floating Ambient Music Notes Canvas */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-25">
        {ambientNotes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ y: "105vh", opacity: 0, scale: 0.7 }}
            animate={{
              y: "-15vh",
              opacity: [0, 0.75, 0.75, 0],
              x: ["0px", `${(note.id % 2 === 0 ? 1 : -1) * 35}px`, "0px"]
            }}
            transition={{
              duration: note.duration,
              delay: note.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${note.left}%`,
              fontSize: `${note.size}px`,
            }}
            className="absolute font-sans text-gold-500 font-bold"
          >
            {note.char}
          </motion.div>
        ))}
      </div>

      {/* 1. Header Banner strip */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-900 py-2.5 px-4 md:px-8 text-center flex flex-wrap justify-between items-center gap-3 relative z-30">
        <div className="flex items-center gap-4 text-xs text-slate-400 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5 font-medium">
            <Phone className="w-3.5 h-3.5 text-gold-500" />
            9865865425 | 8015196369
          </span>
          <span className="h-3 w-[1px] bg-slate-800 hidden sm:inline"></span>
          <span className="items-center gap-1.5 font-medium hidden sm:flex select-all">
            <Mail className="w-3.5 h-3.5 text-gold-500" />
            shoolofmusicbethel@gmail.com
          </span>
        </div>
        <div className="flex items-center gap-4 mx-auto sm:mx-0 text-[11px] font-semibold text-gold-500 uppercase tracking-widest">
          <span>Ooty, Nilgiris</span>
          <span className="h-2.5 w-[1px] bg-slate-800"></span>
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5" />
            Trinity & ABRSM Center
          </span>
        </div>
      </div>

      {/* 2. Primary Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur border-b border-slate-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand Logo left */}
          <div
            onClick={() => {
              setActiveView("home");
              setSelectedCourseId(null);
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-12 h-12 transform group-hover:scale-105 transition-transform">
              <CrestLogo className="w-full h-full" />
            </div>
            <div className="text-left">
              <h1 className="font-serif font-extrabold text-slate-100 text-lg md:text-xl tracking-wider uppercase leading-none group-hover:text-gold-400 transition-colors">
                Bethel
              </h1>
              <p className="font-serif text-[10px] text-gold-500 tracking-[0.2em] font-bold uppercase mt-1 leading-none">
                School of Music
              </p>
            </div>
          </div>

          {/* Desktop Links middle */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveView(link.id);
                    if (link.id !== "courses") setSelectedCourseId(null);
                  }}
                  className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition relative cursor-pointer ${
                    isActive
                      ? "text-gold-500 font-bold bg-slate-900"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute bottom-0 inset-x-4 h-[2px] bg-gold-500 rounded-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call to action right */}
          <div className="hidden lg:block">
            <button
              onClick={() => {
                setSelectedCourseId(null);
                setActiveView("admissions");
              }}
              className="px-5 py-2.5 rounded-none bg-slate-100 text-slate-950 hover:bg-slate-950 hover:text-slate-100 border border-slate-100 hover:border-slate-850 font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
            >
              Admissions Open 2026
            </button>
          </div>

          {/* Mobile Hamburguer button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-900 text-slate-300 hover:text-white rounded-none border border-slate-850"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-slate-950 border-b border-slate-900 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-3">
                {navLinks.map((link) => {
                  const isActive = activeView === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveView(link.id);
                        if (link.id !== "courses") setSelectedCourseId(null);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider transition ${
                        isActive
                          ? "bg-slate-900 text-gold-400 border border-slate-850"
                          : "text-slate-450 hover:text-slate-200 bg-slate-900/10 hover:bg-slate-900/35 border border-transparent"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => {
                    setSelectedCourseId(null);
                    setActiveView("admissions");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-950 text-slate-950 hover:text-slate-100 border border-slate-100 hover:border-slate-850 font-bold text-xs tracking-widest uppercase rounded-none transition"
                >
                  Admissions Open 2026
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 3. Main Stage Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. Elegant Brand Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          {/* Column 1: Logo & Motto */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12">
                <CrestLogo className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-serif font-extrabold text-slate-100 uppercase tracking-wide">Bethel</h3>
                <p className="font-serif text-[9px] text-gold-500 tracking-widest uppercase font-bold">School of Music</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing premium, international standard music coaching to Ooty and the Nilgiris community. Accredited training partner for Trinity College London and ABRSM exams since 2010.
            </p>
            <p className="italic text-slate-500 text-xs font-serif">&ldquo;Nurturing Talent. Inspiring Excellence.&rdquo;</p>
          </div>

          {/* Column 2: Quick navigation */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-serif text-slate-200 font-bold text-xs uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => {
                      setActiveView(l.id);
                      if (l.id !== "courses") setSelectedCourseId(null);
                    }}
                    className="hover:text-gold-400 transition"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Course Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-slate-200 font-bold text-xs uppercase tracking-wider">Our Programs</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => { setSelectedCourseId("keyboard-piano"); setActiveView("courses"); }} className="hover:text-gold-400 transition">
                  Keyboard & Piano
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCourseId("violin"); setActiveView("courses"); }} className="hover:text-gold-400 transition">
                  Violin Masterclasses
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCourseId("guitar"); setActiveView("courses"); }} className="hover:text-gold-400 transition">
                  Guitar (Acoustic & Electric)
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCourseId("drums"); setActiveView("courses"); }} className="hover:text-gold-400 transition">
                  Drums (Full Kit Rudiments)
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCourseId("vocal"); setActiveView("courses"); }} className="hover:text-gold-400 transition">
                  Vocal Training
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact/Address */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-serif text-slate-200 font-bold text-xs uppercase tracking-wider">Nilgiris Campus</h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="font-light leading-relaxed">
                  Next to Punjab National Bank,<br />Green Fields, Ooty,<br />The Nilgiris.
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="font-light font-mono">9865865425 | 8015196369</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="font-light select-all">shoolofmusicbethel@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Sub-footer strip (Mottos & Badges) */}
        <div className="border-t border-slate-900 bg-slate-950/60 py-8 px-4 text-center space-y-4">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif text-slate-400 border-b border-slate-900 pb-4 mb-4">
            <div className="flex items-center gap-1">
              <span className="font-bold tracking-widest text-slate-300">LEARN. PERFORM. EXCEL.</span>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest font-semibold font-mono">
              <span>TRINITY COLLEGE LONDON</span>
              <span className="h-3 w-[1px] bg-slate-800"></span>
              <span>ABRSM</span>
            </div>
          </div>

          <p className="font-serif italic text-gold-400 font-bold text-base tracking-widest flex items-center justify-center gap-2 select-none">
            🎵 Where Passion Meets Music Excellence 🎵
          </p>

          <p className="text-[10px] text-slate-600 font-mono pt-2">
            &copy; {new Date().getFullYear()} Bethel School of Music. All rights reserved. Designed with premium visual pairings.
          </p>
        </div>
      </footer>
    </div>
  );
}
