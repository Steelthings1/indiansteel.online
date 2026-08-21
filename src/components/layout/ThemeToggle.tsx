import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ThemeMode } from '../../types';

interface ThemeToggleProps {
  variant?: 'compact' | 'segmented';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'segmented', className = '' }) => {
  const { themeMode, setThemeMode, resolvedTheme } = useApp();

  const options: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
    { mode: 'system', label: 'System', icon: <Laptop className="w-3.5 h-3.5" /> },
  ];

  // Compact 1-button cycler
  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={() => {
          const next = themeMode === 'light' ? 'dark' : themeMode === 'dark' ? 'system' : 'light';
          setThemeMode(next);
        }}
        title={`Theme: ${themeMode.toUpperCase()} (Click to change)`}
        className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-mono font-bold ${
          resolvedTheme === 'dark'
            ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:border-brand-orange/50'
            : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900 hover:border-brand-orange shadow-sm'
        } ${className}`}
      >
        {themeMode === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
        {themeMode === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
        {themeMode === 'system' && <Laptop className="w-4 h-4 text-brand-orange" />}
        <span className="capitalize">{themeMode}</span>
      </button>
    );
  }

  // Segmented 3-button pill switch (Default)
  return (
    <div
      className={`inline-flex items-center p-1 rounded-xl border backdrop-blur-md transition-all ${
        resolvedTheme === 'dark'
          ? 'bg-slate-950/80 border-slate-800/90'
          : 'bg-slate-100/90 border-slate-300 shadow-inner'
      } ${className}`}
      role="group"
      aria-label="Theme mode switcher"
    >
      {options.map(opt => {
        const isActive = themeMode === opt.mode;
        return (
          <button
            key={opt.mode}
            type="button"
            onClick={() => setThemeMode(opt.mode)}
            title={`Switch to ${opt.label} Mode`}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all duration-200 ${
              isActive
                ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/30 scale-105'
                : resolvedTheme === 'dark'
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            {opt.icon}
            <span className="hidden sm:inline">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
};
