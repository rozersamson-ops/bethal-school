import React from "react";

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

export const PianoIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <path d="M2 14h20" />
    <path d="M6 14v7" />
    <path d="M10 14v7" />
    <path d="M14 14v7" />
    <path d="M18 14v7" />
    <path d="M8 3v7h2V3z" fill={color} opacity="0.15" />
    <path d="M14 3v7h2V3z" fill={color} opacity="0.15" />
    <rect x="8" y="3" width="2" height="7" fill={color} />
    <rect x="14" y="3" width="2" height="7" fill={color} />
  </svg>
);

export const ViolinIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Violin Body outline */}
    <path d="M9 15c-1.5 0-3-1-3-3s1.5-3 2.5-4c0.5-0.5 0.5-1.5 0-2C7.5 5 7 3.5 8.5 2.5S11 3 11 5c0 0.5 0.5 1 1 1s1-0.5 1-1c0-2 1-4 2.5-2.5s-1 2.5-2 3.5c-0.5 0.5-0.5 1.5 0 2c1 1 2.5 2 2.5 4s-1.5 3-3 3h-3z" />
    {/* Violin Neck */}
    <path d="M12 15v5m-1 0h2m-2 2h2" />
    {/* f-holes */}
    <path d="M8 10.5c0.5 0.5 0.5 1 0 1.5s-0.5 0.5-0.5 1M14 10.5c-0.5 0.5-0.5 1 0 1.5s0.5 0.5 0.5 1" opacity="0.7" />
    {/* Bow */}
    <path d="M4 20L20 4" strokeWidth="1.5" />
    <path d="M4.5 18L18 4.5" strokeWidth="1" strokeDasharray="1,1" opacity="0.5" />
  </svg>
);

export const GuitarIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Guitar body */}
    <path d="M9 18c-2 0-4-1.5-4-3.5S6.5 11 8.5 11h.5v-4h2v4h.5c2 0 3.5 1.5 3.5 3.5s-2 3.5-4 3.5h-2z" />
    {/* Neck */}
    <path d="M10 7V2.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V7" />
    {/* Tuning pegs */}
    <path d="M9.5 3.5H8M9.5 5H8M13.5 3.5h1.5M13.5 5h1.5" />
    {/* Sound hole */}
    <circle cx="11" cy="14.5" r="1.5" fill={color} opacity="0.15" />
    <circle cx="11" cy="14.5" r="1.5" />
    {/* Strings */}
    <path d="M10.5 7v7M11.5 7v7" opacity="0.7" />
  </svg>
);

export const DrumsIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Snare / Tom Drum */}
    <ellipse cx="12" cy="7" rx="9" ry="3.5" />
    <ellipse cx="12" cy="7" rx="9" ry="3.5" fill={color} opacity="0.1" />
    <path d="M3 7v10c0 1.9 4 3.5 9 3.5s9-1.6 9-3.5V7" />
    {/* Drum tension rods */}
    <path d="M6 9.5v8.5M12 10.5V21M18 9.5v8.5" opacity="0.6" />
    {/* Drum sticks */}
    <path d="M5 4l14 13" strokeWidth="1.5" />
    <circle cx="5" cy="4" r="0.7" fill={color} />
    <path d="M19 4L5 13" strokeWidth="1.5" />
    <circle cx="19" cy="4" r="0.7" fill={color} />
  </svg>
);

export const VocalIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" fill={color} opacity="0.15" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3M8 22h8" />
    {/* Sound waves */}
    <path d="M2 10a8 8 0 0 1 .5-2.8M22 10a8 8 0 0 0-.5-2.8" opacity="0.4" />
    <path d="M5 7a10 10 0 0 1 1-1.5M19 7a10 10 0 0 0-1-1.5" opacity="0.6" />
  </svg>
);

export const TheoryIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" fill={color} opacity="0.1" />
    {/* Musical note on the page */}
    <circle cx="17" cy="11" r="1.5" fill={color} />
    <path d="M18.5 7.5v3.5M17 9.5l1.5-1" strokeWidth="1.5" />
    <path d="M6 8h3M6 11h3" opacity="0.6" />
  </svg>
);

export const FluteIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size = 24, color = "currentColor" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Transverse flute represented diagonally */}
    <path d="M2 20L20 2" strokeWidth="2.5" />
    {/* Mouthpiece */}
    <ellipse cx="18.5" cy="3.5" rx="1.5" ry="0.8" transform="rotate(-45 18.5 3.5)" fill={color} />
    {/* Keys / Holes along the body */}
    <circle cx="15" cy="7" r="1" fill={color} />
    <circle cx="12" cy="10" r="1" fill={color} />
    <circle cx="9" cy="13" r="1" fill={color} />
    <circle cx="6" cy="16" r="1" fill={color} />
    {/* End joints */}
    <path d="M1.5 19.5l1 1M18.5 2.5l1 1" opacity="0.7" />
  </svg>
);

interface InstrumentIconRendererProps {
  iconName: string;
  className?: string;
  size?: number;
  color?: string;
}

export const InstrumentIconRenderer: React.FC<InstrumentIconRendererProps> = ({
  iconName,
  className,
  size,
  color
}) => {
  switch (iconName) {
    case "Piano":
      return <PianoIcon className={className} size={size} color={color} />;
    case "Violin":
      return <ViolinIcon className={className} size={size} color={color} />;
    case "Guitar":
      return <GuitarIcon className={className} size={size} color={color} />;
    case "Drums":
      return <DrumsIcon className={className} size={size} color={color} />;
    case "Mic":
      return <VocalIcon className={className} size={size} color={color} />;
    case "BookOpen":
      return <TheoryIcon className={className} size={size} color={color} />;
    case "Wind":
      return <FluteIcon className={className} size={size} color={color} />;
    default:
      return (
        <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
  }
};
