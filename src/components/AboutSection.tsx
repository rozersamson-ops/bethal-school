import React from "react";
import { FACULTY } from "../data";
import { Award, Music, BookOpen, Clock, MapPin, ShieldCheck } from "lucide-react";

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* 1. Page Header */}
      <div className="text-center space-y-3">
        <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
          About Our Academy
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-100 uppercase tracking-wide">
          Our Story & Philosophy
        </h1>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Nurturing Nilgiris' musical aspirations and coaching candidates towards worldwide-accredited graded distinctions since 2010.
        </p>
      </div>

      {/* 2. Brand Narrative Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        <div className="space-y-6 text-left">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-slate-100">
              The Journey of Bethel
            </h2>
            <p className="text-xs text-gold-400 font-bold uppercase tracking-wider">
              Est. 2010 in Ooty, Tamil Nadu
            </p>
          </div>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Bethel School of Music was established in 2010 under the vision of <strong>Prof. Samson Rozer</strong> to offer premium, structured musical learning to the Nilgiris district. Nestled in Ooty, our school acts as a peaceful sanctuary where pupils of all age brackets find encouragement to perfect their crafts.
          </p>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            At Bethel, we look beyond simple hobby playing. We train pupils using a complete musical roadmap that integrates perfect mechanical posture, note reading fluency, auditory training, and analytical music theory. This makes us the leading local prep partner for global boards like <strong>Trinity College London</strong> and the <strong>ABRSM</strong>.
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-850">
            <div>
              <p className="font-serif text-2xl font-extrabold text-gold-400">16+</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Years of Excellence</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-extrabold text-gold-400">500+</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Students Certified</p>
            </div>
            <div>
              <p className="font-serif text-2xl font-extrabold text-gold-400">100%</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Exam Pass Rate</p>
            </div>
          </div>
        </div>

        {/* Brand Mission Callout Cards */}
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-slate-905 border border-slate-850 p-6 rounded-none text-left space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-gold-500">
              <Award className="w-20 h-20" />
            </div>
            <h3 className="font-serif text-gold-500 font-bold text-sm tracking-wider uppercase">Our Mission</h3>
            <p className="font-serif text-slate-100 text-lg italic">&ldquo;Nurturing Talent. Inspiring Excellence.&rdquo;</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              To discover and shape artistic talent inside every student, giving them high technical control, physical precision, and expressive confidence.
            </p>
          </div>

          <div className="bg-slate-905 border border-slate-850 p-6 rounded-none text-left space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-gold-500">
              <Music className="w-20 h-20" />
            </div>
            <h3 className="font-serif text-gold-500 font-bold text-sm tracking-wider uppercase">Our Values</h3>
            <p className="font-serif text-slate-100 text-lg italic">&ldquo;Learn. Perform. Excel.&rdquo;</p>
            <p className="text-xs text-slate-400 leading-relaxed">
              We focus on thorough foundational playing, healthy practice disciplines, real stage presence, and regular, objective measurements.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Meet the Faculty */}
      <section className="space-y-10 border-t border-slate-850/60 pt-16">
        <div className="text-center space-y-2">
          <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">Our Mentors</p>
          <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-100 uppercase tracking-wider">Expert & Experienced Faculty</h2>
          <div className="w-16 h-[2px] bg-gold-500/30 mx-auto mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {FACULTY.map((f) => (
            <div
              key={f.id}
              className="bg-slate-905 border border-slate-850 rounded-none overflow-hidden shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Photo frame */}
                <div className="relative aspect-square w-full bg-slate-950 overflow-hidden">
                  <img
                    src={f.imageUrl}
                    alt={f.name}
                    className="object-cover w-full h-full transition duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Floating credentials */}
                  <div className="absolute bottom-3 inset-x-3 text-left">
                    <p className="text-[10px] text-gold-400 font-bold uppercase tracking-wider bg-slate-950/80 px-2 py-1 rounded inline-block border border-gold-500/20 max-w-full truncate">
                      {f.qualifications.split(",")[0]}
                    </p>
                  </div>
                </div>

                <div className="px-5 space-y-2 text-left">
                  <div>
                    <h3 className="font-serif font-bold text-slate-150 text-base">{f.name}</h3>
                    <p className="text-xs text-gold-500 font-medium">{f.role}</p>
                  </div>
                  
                  <p className="text-xs text-slate-400 line-clamp-4 leading-relaxed font-light">
                    {f.bio}
                  </p>
                </div>
              </div>

              {/* Specializations list */}
              <div className="px-5 py-4 border-t border-slate-850 bg-slate-950/40 text-left mt-4">
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">Specializes In:</p>
                <div className="flex flex-wrap gap-1">
                  {f.instruments.map((ins, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] bg-slate-950 text-slate-300 border border-slate-850 px-1.5 py-0.5 rounded-none"
                    >
                      {ins}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Physical Studio / Ooty Atmosphere callout */}
      <section className="bg-slate-905 border border-slate-850 p-8 md:p-12 rounded-none text-left grid grid-cols-1 lg:grid-cols-3 gap-8 items-center max-w-5xl mx-auto shadow-md">
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] text-gold-500 font-extrabold uppercase tracking-widest flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              Ooty Hill Station Campus
            </span>
            <h3 className="font-serif text-xl md:text-2xl font-bold text-slate-100 uppercase tracking-wide">Inspiring, Peaceful Music Ecosystem</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Located in <strong>Green Fields, Ooty</strong>, adjacent to Punjab National Bank, our academy occupies an inspiring, noise-isolated physical environment. Our custom-designed classrooms feature state-of-the-art Pearl acoustic drum kits, high-grade piano keyboards, quality orchestral strings, and full air conditioning, creating the ultimate learning canvas for candidates.
          </p>
        </div>
        <div className="bg-slate-950 border border-slate-850 p-6 rounded-none flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Acoustically-Treated Rooms
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Pearl Drums & Pearl Cymbals
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Yamaha Keyboards & Pianos
          </div>
        </div>
      </section>
    </div>
  );
};
