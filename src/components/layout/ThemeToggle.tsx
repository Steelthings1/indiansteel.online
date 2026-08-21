import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeMode } from '../../types';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { themeMode, setThemeMode, resolvedTheme } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4 text-indigo-400" /> },
    { mode: 'system', label: 'System', icon: <Laptop className="w-4 h-4 text-brand-orange" /> },
  ];

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      
      {/* Single Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme mode"
        title={`Current Theme: ${themeMode.toUpperCase()} (Click to change)`}
        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-300 relative group shadow-sm ${
          resolvedTheme === 'dark'
            ? 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-brand-orange hover:text-white shadow-black/40'
            : 'bg-white border-slate-300 text-slate-700 hover:border-brand-orange hover:text-slate-900 shadow-slate-200'
        }`}
      >
        {/* Dynamic Dual Sun/Moon Single Icon Glyph */}
        <div className="relative w-5 h-5 flex items-center justify-center">
          {themeMode === 'light' && (
            <Sun className="w-5 h-5 text-amber-500 animate-in spin-in-180 duration-300" />
          )}
          {themeMode === 'dark' && (
            <Moon className="w-5 h-5 text-indigo-400 animate-in spin-in-180 duration-300" />
          )}
          {themeMode === 'system' && (
            <div className="relative flex items-center justify-center">
              <Laptop className="w-5 h-5 text-brand-orange" />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            </div>
          )}
        </div>

        {showLabel && (
          <span className="ml-2 text-xs font-mono font-bold capitalize hidden md:inline">
            {themeMode}
          </span>
        )}
      </button>

      {/* Dropdown Menu (Light, Dark, System) */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-36 rounded-2xl border shadow-2xl p-1.5 z-50 animate-in fade-in-50 zoom-in-95 duration-150 backdrop-blur-xl ${
            resolvedTheme === 'dark'
              ? 'bg-slate-950/95 border-slate-800 text-slate-200 shadow-black/80'
              : 'bg-white/95 border-slate-200 text-slate-800 shadow-slate-300'
          }`}
        >
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2.5 py-1 font-bold border-b border-slate-800/50 mb-1">
            Theme Mode
          </div>

          {options.map((opt) => {
            const isSelected = themeMode === opt.mode;
            return (
              <button
                key={opt.mode}
                type="button"
                onClick={() => {
                  setThemeMode(opt.mode);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  isSelected
                    ? 'bg-brand-orange text-white font-bold shadow-md shadow-brand-orange/20'
                    : resolvedTheme === 'dark'
                    ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      )}

    </div>
  );
};
