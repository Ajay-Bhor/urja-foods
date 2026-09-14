import React from 'react';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

export default function UrjaPageHeader({ title, subtitle, badge, pageName, onNavigate }) {
  return (
    <div className="relative bg-gradient-to-r from-[#04110b] via-[#071911] to-[#04110b] text-white py-14 sm:py-20 border-b border-emerald-950 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-harvest-400/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-stone-400 mb-4" aria-label="Breadcrumb">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
          <span className="text-harvest-400 font-bold">{pageName}</span>
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/70 text-emerald-200 border border-emerald-700/60 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-harvest-400" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-stone-300 text-sm sm:text-base max-w-4xl mt-3 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

