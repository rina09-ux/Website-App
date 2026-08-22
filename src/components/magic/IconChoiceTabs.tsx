import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export interface IconChoiceItem {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  /** Tailwind text color class used for the active state, e.g. 'text-blue-600' */
  colorClass?: string;
}

interface IconChoiceTabsProps {
  items: IconChoiceItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** Optional small caption shown before the icon row, e.g. "Skenario:" */
  caption?: string;
  className?: string;
}

/**
 * Compact icon-only selector for mobile. Tapping an icon selects it and
 * flashes a small tooltip bubble at the icon's edge with its full label,
 * instead of wrapping long text across several stacked buttons.
 */
export const IconChoiceTabs: React.FC<IconChoiceTabsProps> = ({
  items,
  activeId,
  onChange,
  caption,
  className = '',
}) => {
  const [tooltipId, setTooltipId] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSelect = (id: string) => {
    onChange(id);
    setTooltipId(id);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setTooltipId(null), 2200);
  };

  return (
    <div className={`flex items-center gap-2 flex-wrap ${className}`}>
      {caption && (
        <span className="text-slate-500 mr-1 text-[11px] uppercase font-mono shrink-0">{caption}</span>
      )}
      <div className="flex items-center gap-1.5">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          const color = item.colorClass || 'text-blue-600';
          const bgColor = color.replace('text-', 'bg-');
          const posClass =
            idx === 0
              ? 'left-0'
              : idx === items.length - 1
              ? 'right-0'
              : 'left-1/2 -translate-x-1/2';

          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-label={item.label}
                aria-pressed={isActive}
                title={item.label}
                className={`w-10 h-10 flex items-center justify-center rounded-xl border shrink-0 transition-all ${
                  isActive
                    ? `${bgColor} border-transparent text-white shadow-md`
                    : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {tooltipId === item.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute z-30 ${posClass} bottom-full mb-2 max-w-[220px] px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-[11px] font-semibold leading-snug shadow-xl pointer-events-none whitespace-normal`}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
