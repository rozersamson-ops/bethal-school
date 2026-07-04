import React from "react";
// @ts-ignore
import logoImg from "../assets/images/logo_image_1783175266367.jpg";

interface CrestLogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({
  className = "w-14 h-14 md:w-18 md:h-18",
  showText = false,
  light = false
}) => {
  const textColor = "text-slate-100";
  const subTextColor = "text-gold-500";

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {/* Responsive Logo Container */}
      <div className={`relative ${className} group overflow-hidden border border-slate-850/80 bg-slate-950 flex items-center justify-center p-0.5 shadow-md group-hover:border-gold-500/50 transition duration-300`}>
        {/* Animated neon background border pulse on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-gold-500 via-gold-700 to-gold-400 opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse" />
        
        {/* Real Logo Image */}
        <img
          src={logoImg}
          alt="Bethel Crest Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover relative z-10 transition duration-500 group-hover:scale-105"
          onError={(e) => {
            // Fallback to SVG if image fails
            (e.target as HTMLElement).style.display = "none";
          }}
        />

        {/* High-Fidelity SVG Fallback Icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-2 z-0">
          <svg
            className="w-full h-full"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M75 55L85 68L100 50L115 68L125 55L120 80H80L75 55Z"
              fill="#FF007F"
              stroke="#00D2B4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="75" cy="55" r="2.5" fill="#00D2B4" />
            <circle cx="100" cy="50" r="3" fill="#00D2B4" />
            <circle cx="125" cy="55" r="2.5" fill="#00D2B4" />
            <path
              d="M65 75C65 75 65 145 100 160C135 145 135 75 135 75L100 70L65 75Z"
              stroke="#FF007F"
              strokeWidth="4"
              strokeLinejoin="round"
              fill="#FAF9FC"
            />
            <text
              x="100"
              y="125"
              fontFamily="serif"
              fontSize="48"
              fontWeight="bold"
              fill="#09031C"
              textAnchor="middle"
            >
              B
            </text>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="mt-3 flex flex-col items-center">
          <h1 className={`font-serif tracking-widest uppercase font-extrabold text-xl md:text-2xl lg:text-3xl ${textColor}`}>
            Bethel
          </h1>
          <p className="font-serif tracking-[0.25em] text-[10px] md:text-xs font-semibold uppercase mt-0.5 text-gold-500">
            School of Music
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="h-[1px] w-6 bg-slate-850"></span>
            <span className={`font-serif tracking-widest text-[9px] font-medium uppercase ${subTextColor}`}>
              EST. 2010
            </span>
            <span className="h-[1px] w-6 bg-slate-850"></span>
          </div>
          <p className="italic font-display text-[10px] md:text-[11px] mt-2.5 text-slate-400 font-light tracking-wide max-w-xs">
            Nurturing Talent. Inspiring Excellence.
          </p>
        </div>
      )}
    </div>
  );
};
