import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  instrument: string;
  quote: string;
  rating: number;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Amara Sharma",
    role: "Violin Student (Age 14)",
    instrument: "Trinity Grade 5 Distinction",
    quote: "The professional training at Bethel prepared me for my Trinity Grade 5 Exam, which I passed with distinction! The mentors make learning technical drills incredibly engaging, and the performance masterclasses are so inspiring.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Dr. David Kurian",
    role: "Parent of Ethan (Age 9)",
    instrument: "Piano Grade 2 Prep",
    quote: "Bethel has completely transformed how my son interacts with music. He used to view practice as a chore, but now he runs to the piano. The teachers are patient, structured, and instill a true love for musical craftsmanship.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Nisha Rao",
    role: "Flute & Vocal Student (Age 18)",
    instrument: "ABRSM Grade 7 Candidate",
    quote: "Overcoming stage fright was my biggest challenge. The supportive student recitals and interactive labs at Bethel gave me the confidence to perform on stage. I am now preparing for my ABRSM exams with complete confidence!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
  }
];

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <div id="student-testimonials" className="bg-slate-905 border border-slate-850 p-8 rounded-none relative overflow-hidden">
      {/* Visual background decorations */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-gold-400/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-32 h-32 bg-gold-700/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="px-2 py-0.5 bg-gold-500/10 border border-gold-500/30 text-gold-500 font-mono text-[9px] font-bold tracking-widest uppercase rounded-none">
            Bethel Family
          </span>
          <h2 className="font-serif text-2xl font-black text-slate-100 uppercase tracking-wide">
            Words From Our Students & Parents
          </h2>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Discover how our customized curriculum, exam-focused training, and vibrant environment empower aspiring musicians.
          </p>
        </div>

        {/* Testimonial card carousel */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full bg-slate-950 p-6 md:p-8 border border-slate-850"
            >
              {/* Photo */}
              <div className="md:col-span-4 flex justify-center">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-none overflow-hidden border border-slate-850 bg-slate-900 group">
                  <img
                    src={active.image}
                    alt={active.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-65" />
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-1.5 py-0.5 bg-gold-500 text-white font-mono text-[8px] font-bold uppercase tracking-wider rounded-none">
                      {active.instrument}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Content */}
              <div className="md:col-span-8 space-y-4 flex flex-col justify-center">
                <div className="flex items-center gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -left-6 -top-4 w-10 h-10 text-gold-500/10 pointer-events-none" />
                  <p className="font-display italic text-slate-200 text-sm md:text-base leading-relaxed pl-2">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                </div>

                <div className="border-t border-slate-850 pt-3 flex justify-between items-center">
                  <div>
                    <h4 className="font-serif font-black text-slate-100 text-sm uppercase tracking-wide">
                      {active.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                      {active.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handlePrev}
              className="p-2 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-none transition shadow-lg cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={handleNext}
              className="p-2 bg-slate-950 border border-slate-850 text-slate-400 hover:text-white rounded-none transition shadow-lg cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center gap-2 pt-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-none transition-all duration-300 ${
                idx === currentIndex ? "bg-gold-500 w-6" : "bg-slate-800 hover:bg-slate-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
