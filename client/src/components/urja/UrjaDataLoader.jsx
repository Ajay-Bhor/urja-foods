import React from 'react';
import { Sparkles, Database, Activity, RefreshCw } from 'lucide-react';

/**
 * Modern High-End Data Loading Animation Suite
 * Supports:
 * - 'skeleton-catalog': Shimmering product/service card skeletons
 * - 'spinner-hud': High-tech telemetry radar spinner with status pills
 * - 'inline-pulse': Compact inline data-fetching indicator
 * - 'page-splash': Brand preloader screen with glowing dual rings and progress bar
 */
export default function UrjaDataLoader({
  type = 'skeleton-catalog',
  count = 6,
  message = 'Loading data from Urja Agro Engine...',
  subMessage = 'Fetching live records from MySQL database'
}) {

  // ================= 1. SKELETON CATALOG CARDS =================
  if (type === 'skeleton-catalog') {
    return (
      <div className="w-full space-y-6 animate-pulse">
        {/* Skeleton Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-10 w-28 bg-slate-200/70 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-beam" />
            </div>
          ))}
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(count)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col justify-between relative group"
            >
              {/* Shimmer Light Beam Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/30 to-transparent animate-shimmer-beam z-10 pointer-events-none" />

              <div>
                {/* Image Stage Placeholder */}
                <div className="h-64 bg-slate-100/80 p-6 flex flex-col items-center justify-center relative border-b border-slate-100">
                  <div className="w-28 h-36 bg-slate-200/70 rounded-2xl animate-pulse flex items-center justify-center">
                    <Activity className="w-8 h-8 text-slate-300 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                  <div className="absolute top-4 right-4 h-6 w-20 bg-slate-200/80 rounded-full" />
                  <div className="absolute bottom-3 left-4 h-5 w-16 bg-slate-200/80 rounded-lg" />
                </div>

                {/* Content Placeholder */}
                <div className="p-7 space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-28 bg-emerald-100/70 rounded" />
                    <div className="h-6 w-3/4 bg-slate-200/80 rounded-lg" />
                    <div className="h-3 w-1/2 bg-slate-200/60 rounded" />
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="h-3 w-full bg-slate-200/60 rounded" />
                    <div className="h-3 w-5/6 bg-slate-200/60 rounded" />
                  </div>

                  {/* Spec Pills Placeholder */}
                  <div className="flex gap-2 pt-2">
                    <div className="h-6 w-20 bg-slate-100 rounded-lg" />
                    <div className="h-6 w-16 bg-slate-100 rounded-lg" />
                    <div className="h-6 w-24 bg-slate-100 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Action Button Skeleton */}
              <div className="p-7 pt-0 flex gap-2.5">
                <div className="h-11 w-28 bg-slate-100 rounded-2xl" />
                <div className="h-11 flex-1 bg-urja-200/60 rounded-2xl" />
              </div>
            </div>
          ))}
        </div>

        {/* Status text */}
        <div className="flex items-center justify-center gap-2 pt-4 text-xs font-mono text-slate-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{message}</span>
        </div>
      </div>
    );
  }

  // ================= 2. SPINNER HUD (High-Tech Telemetry Box) =================
  if (type === 'spinner-hud') {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-5">
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer rotating gradient ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 border-r-harvest-400 animate-spin" />
          
          {/* Inner counter-rotating ring */}
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-urja-600 border-l-emerald-300 animate-spin"
            style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}
          />

          {/* Center glowing pulse dot */}
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center shadow-glow-emerald">
            <Database className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-1.5 max-w-sm">
          <div className="text-base font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-harvest-500 animate-bounce-subtle" />
            <span>{message}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-mono">
            {subMessage}
          </p>
        </div>

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono font-bold text-emerald-800 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>MySQL 8.0 • 150 TPD Telemetry Sync Active</span>
        </div>
      </div>
    );
  }

  // ================= 3. INLINE PULSE =================
  if (type === 'inline-pulse') {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
        <RefreshCw className="w-3.5 h-3.5 text-urja-600 animate-spin" />
        <span>{message}</span>
      </div>
    );
  }

  // ================= 4. FULL BRAND PAGE PRELOADER =================
  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center text-white px-6 select-none animate-page-instant">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-orb-float" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-harvest-400/15 rounded-full blur-3xl pointer-events-none animate-orb-float" style={{ animationDelay: '-6s' }} />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-6">
        
        {/* Animated Brand Mark with Dual Orbit Rings */}
        <div className="relative w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-white/10 border-t-emerald-400 border-r-harvest-400 animate-spin" style={{ animationDuration: '1.8s' }} />
          <div className="absolute inset-3 rounded-full border-2 border-white/10 border-b-emerald-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }} />
          
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-glow-emerald">
            <span className="font-black text-2xl tracking-tighter text-white">UF</span>
          </div>
        </div>

        {/* Brand Titles */}
        <div className="space-y-2">
          <div className="text-2xl sm:text-3xl font-black tracking-tight">
            URJA <span className="text-harvest-400">FOODS</span>
          </div>
          <div className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
            & Agro Pvt. Ltd. • Creating Energy
          </div>
          <p className="text-xs text-slate-400 pt-1">
            {message}
          </p>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden relative border border-white/10">
          <div className="h-full bg-gradient-to-r from-emerald-500 via-harvest-400 to-emerald-400 rounded-full animate-[shimmerBeam_1.4s_ease-in-out_infinite] w-full" />
        </div>

        {/* Status Telemetry */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Connecting to Nirgudsar 150 TPD Facility Cloud</span>
        </div>
      </div>
    </div>
  );
}
