import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface CertLogoItem {
  id: string;
  src: string;
  alt: string;
  label: string;
  /** Hex color used for the glow / drop-shadow when active, e.g. '#2563eb' */
  glowColor: string;
}

interface LiveCertLogosProps {
  items: CertLogoItem[];
  className?: string;
}

/**
 * Logos float directly on the page (no card/box). They sit muted in
 * grayscale by default; tapping one brings it to full color with a soft
 * glow that follows the logo's own silhouette, plus a short-lived tooltip
 * with the certification's name.
 */
export const LiveCertLogos: React.FC<LiveCertLogosProps> = ({ items, className = '' }) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const activate = (id: string) => {
    setActiveId(id);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setActiveId(null), 2400);
  };

  return (
    <div className={`grid grid-cols-4 items-center gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 ${className}`}>
      {items.map((item, idx) => {
        const isActive = activeId === item.id;
        const posClass =
          idx === 0 ? 'left-0' : idx === items.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2';

        return (
          <div key={item.id} className="relative flex justify-center">
            <motion.button
              type="button"
              onClick={() => activate(item.id)}
              onMouseEnter={() => activate(item.id)}
              aria-label={item.label}
              animate={{
                scale: isActive ? 1.1 : 1,
                filter: isActive
                  ? `grayscale(0) opacity(1) drop-shadow(0 0 10px ${item.glowColor}66)`
                  : 'grayscale(1) opacity(0.55) drop-shadow(0 0 0 transparent)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="block cursor-pointer bg-transparent border-0 p-0"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="h-9 sm:h-10 w-auto max-w-[64px] sm:max-w-[80px] object-contain select-none"
                draggable={false}
              />
            </motion.button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute z-30 ${posClass} bottom-full mb-2.5 max-w-[180px] px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-semibold leading-snug shadow-xl pointer-events-none whitespace-normal text-center`}
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
