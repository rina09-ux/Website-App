import React from 'react';

interface MascotProps {
  variant?: 'hero' | 'scanning' | 'agent' | 'defense' | 'quantum';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  glow?: boolean;
}

export const NusaSentinelMascot: React.FC<MascotProps> = ({
  variant = 'hero',
  size = 'md',
  className = '',
  glow = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64 sm:w-80 sm:h-80',
  };

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${sizeMap[size]} ${className}`}>
      {/* Ambient Pulsing Halo */}
      {glow && (
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse pointer-events-none" />
      )}

      {/* Cyber Sentinel Mascot SVG */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        <defs>
          <linearGradient id="armorGradient" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0f172a" />
            <stop offset="0.5" stopColor="#1e293b" />
            <stop offset="1" stopColor="#0f766e" />
          </linearGradient>

          <linearGradient id="blueCore" x1="60" y1="60" x2="140" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="0.5" stopColor="#325FE8" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>

          <linearGradient id="quantumLaser" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#325FE8" />
            <stop offset="1" stopColor="#a855f7" />
          </linearGradient>

          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="glow" />
            <feComposite in="SourceGraphic" in2="glow" operator="over" />
          </filter>
        </defs>

        {/* Orbiting Quantum Defense Rings */}
        <ellipse
          cx="100"
          cy="100"
          rx="82"
          ry="34"
          stroke="url(#quantumLaser)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          className="animate-[spin_12s_linear_infinite] origin-center opacity-60"
          transform="rotate(-25 100 100)"
        />
        <ellipse
          cx="100"
          cy="100"
          rx="75"
          ry="28"
          stroke="#325FE8"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          className="animate-[spin_8s_linear_infinite_reverse] origin-center opacity-40"
          transform="rotate(35 100 100)"
        />

        {/* Cyber Wings / Aerodynamic Shields (Garuda-Inspired) */}
        {/* Left Wing */}
        <path
          d="M40 85 C20 70 12 105 28 128 C42 145 68 140 68 140 C52 120 48 100 40 85 Z"
          fill="url(#armorGradient)"
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        <path
          d="M48 95 L26 122"
          stroke="#325FE8"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Right Wing */}
        <path
          d="M160 85 C180 70 188 105 172 128 C158 145 132 140 132 140 C148 120 152 100 160 85 Z"
          fill="url(#armorGradient)"
          stroke="#60a5fa"
          strokeWidth="1.5"
        />
        <path
          d="M152 95 L174 122"
          stroke="#325FE8"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Main Body Chassis */}
        <path
          d="M100 42 C72 42 62 65 64 100 C66 138 88 165 100 172 C112 165 134 138 136 100 C138 65 128 42 100 42 Z"
          fill="url(#armorGradient)"
          stroke="#475569"
          strokeWidth="2"
        />

        {/* Cyber Crest (Falcon / Garuda Crown) */}
        <polygon
          points="100,24 112,46 100,42 88,46"
          fill="#325FE8"
          stroke="#60a5fa"
          strokeWidth="1.5"
          filter="url(#glowFilter)"
        />
        <polygon
          points="100,16 107,32 100,28 93,32"
          fill="#38bdf8"
        />

        {/* Cyber Visor / High-Tech Eye Display */}
        <path
          d="M74 76 C82 70 118 70 126 76 C128 86 120 95 100 96 C80 95 72 86 74 76 Z"
          fill="#022c22"
          stroke="#325FE8"
          strokeWidth="2"
        />
        
        {/* Holographic Visor Scan Line */}
        <rect
          x="78"
          y="80"
          width="44"
          height="8"
          rx="4"
          fill="url(#blueCore)"
          filter="url(#glowFilter)"
        />
        {/* Dual Focusing Diodes */}
        <circle cx="88" cy="84" r="2.5" fill="#ffffff" />
        <circle cx="112" cy="84" r="2.5" fill="#ffffff" />

        {/* Core Quantum Reactor (Center Chest) */}
        <circle
          cx="100"
          cy="124"
          r="16"
          fill="#042f2e"
          stroke="#60a5fa"
          strokeWidth="2"
        />
        {/* Reactor Tri-Force / Quantum Lattice */}
        <polygon
          points="100,113 111,130 89,130"
          fill="url(#blueCore)"
          filter="url(#glowFilter)"
        />
        <circle cx="100" cy="124" r="4" fill="#ffffff" />

        {/* Floating Satellite Droid (Guard Companion Orb) */}
        <g className="animate-bounce duration-1000">
          <circle
            cx="165"
            cy="52"
            r="12"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="1.5"
          />
          <circle cx="165" cy="52" r="5" fill="#38bdf8" filter="url(#glowFilter)" />
          <path d="M165 42 L165 37" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Holographic Security Shield Beacon in Hand/Foot */}
        <path
          d="M90 162 L100 176 L110 162 Z"
          fill="#325FE8"
          opacity="0.9"
        />

        {/* Scanning Laser Beam (Optional Dynamic Look) */}
        {variant === 'scanning' && (
          <path
            d="M100 96 L40 180 M100 96 L160 180"
            stroke="#60a5fa"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.5"
          />
        )}
      </svg>

      {/* Floating Status Badge */}
      <div className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-50/90 border border-blue-500/40 text-[10px] font-mono text-blue-600 shadow-md flex items-center gap-1.5 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
        <span>NusaSentinel v4.8</span>
      </div>
    </div>
  );
};
