import React, { useState } from "react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, Image as ImageIcon } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = [
    { id: "all", label: "Show All" },
    { id: "classes", label: "Workshops & Classes" },
    { id: "performances", label: "Live Performances" },
    { id: "campus", label: "Our Campus" },
    { id: "exams", label: "Exam Candids" }
  ];

  const filteredItems = filter === "all"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <div className="space-y-12">
      {/* 1. Page Header */}
      <div className="text-center space-y-3">
        <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
          Visual Recitals
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-100 uppercase tracking-wide">
          Our Gallery
        </h1>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Explore our vibrant musical family. Glimpses of daily training, acoustic concerts, examinations, and our scenic Ooty estate.
        </p>
      </div>

      {/* 2. Filter tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-none transition-all duration-200 cursor-pointer ${
              filter === cat.id
                ? "bg-slate-100 text-slate-950 font-bold border border-slate-100"
                : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-850"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Photo Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={item.id}
              onClick={() => setLightboxItem(item)}
              className="group relative bg-slate-905 border border-slate-850 rounded-none overflow-hidden cursor-pointer aspect-[4/3] shadow-md hover:shadow-xl transition-all"
            >
              {/* Photo */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition"></div>

              {/* Hover overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="w-10 h-10 rounded-full bg-gold-500 text-slate-950 flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                <span className="text-[9px] bg-gold-500/10 border border-gold-500/20 text-gold-400 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider mb-1 inline-block">
                  {item.category}
                </span>
                <h3 className="font-serif font-bold text-slate-200 text-sm truncate">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 4. Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 md:p-8 backdrop-blur-sm"
          >
            {/* Close button outside */}
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-6 right-6 p-2 bg-slate-900 text-slate-400 hover:text-white border border-slate-850 rounded-none transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative bg-slate-900 border border-slate-850 max-w-4xl w-full rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh]"
            >
              {/* Photo Area */}
              <div className="md:w-3/5 bg-slate-950 flex items-center justify-center overflow-hidden h-[300px] md:h-auto">
                <img
                  src={lightboxItem.imageUrl}
                  alt={lightboxItem.title}
                  className="object-contain w-full h-full max-h-[60vh]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Info Area */}
              <div className="md:w-2/5 p-6 md:p-8 text-left flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div>
                    <span className="text-[9px] bg-gold-500/10 border border-gold-500/20 text-gold-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest inline-block mb-2">
                      {lightboxItem.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-slate-100">
                      {lightboxItem.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed font-light">
                    {lightboxItem.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-4 flex items-center gap-3 text-[11px] text-slate-500 font-mono">
                  <ImageIcon className="w-4 h-4 text-gold-500" />
                  <span>Bethel Music School — Ooty</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
