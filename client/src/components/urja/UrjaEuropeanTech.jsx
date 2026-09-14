import React from 'react';
import { Wind, Thermometer, ShieldAlert, Cpu, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaEuropeanTech({ onInquireClick, onNavigate }) {
  const { t } = useLanguage();

  const featureIcons = [
    <Wind key="feat-1" className="w-5 h-5 text-emerald-400" />,
    <Thermometer key="feat-2" className="w-5 h-5 text-harvest-400" />,
    <ShieldAlert key="feat-3" className="w-5 h-5 text-emerald-300" />,
    <Cpu key="feat-4" className="w-5 h-5 text-indigo-400" />
  ];

  const techFeatures = t.technology.features.map((feat, idx) => ({
    ...feat,
    icon: featureIcons[idx % featureIcons.length]
  }));

  return (
    <section id="technology" className="py-20 md:py-28 bg-[#04110b] text-white relative overflow-hidden text-left border-y border-emerald-950 select-none">
      {/* Background ambient light with orb float */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-orb-float"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-harvest-400/10 rounded-full blur-3xl pointer-events-none animate-orb-float" style={{ animationDelay: '-8s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-emerald-200 text-xs font-bold shadow-xs animate-bounce-subtle">
              <Sparkles className="w-3.5 h-3.5 text-harvest-400 shrink-0" />
              <span>{t.technology.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent animate-gradient-flow block">
                {t.technology.title}
              </span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.technology.subtitle}
            </p>

            {/* 4 Feature Points with Card-Shine and Micro-Interactions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {techFeatures.map((feat, i) => (
                <div
                  key={i}
                  className="card-shine p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/60 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 shadow-lg hover:shadow-glow-emerald"
                >
                  <div className="mb-2.5 p-2 rounded-xl bg-white/10 w-fit group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {feat.icon}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-1 group-hover:text-emerald-300 transition-colors">
                    {feat.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('contact');
                  if (onInquireClick) onInquireClick('Contract Farming in European EC Sheds');
                }}
                className="btn-shine inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-extrabold text-sm shadow-xl shadow-emerald-950/60 hover:scale-[1.03] active:scale-95 transition-all group"
              >
                <span>{t.technology.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Visual Image & Metrics Card with Live HUD Telemetry */}
          <div className="lg:col-span-6 relative">
            
            {/* Live Floating Sensor HUD Pill */}
            <div className="absolute -top-5 right-4 z-30 hidden sm:flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/90 backdrop-blur-xl border border-emerald-500/50 shadow-xl text-[11px] font-mono text-emerald-300 animate-float-slow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>EC SENSOR: 22.4°C • OPTIMAL</span>
            </div>

            <div className="card-shine rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-white/10 to-white/5 border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-emerald-500/40">
              <div className="rounded-2xl overflow-hidden relative group">
                <img
                  src="https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-29.jpg"
                  alt="Urja European EC Sheds"
                  className="w-full h-96 sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-14.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#04110b] via-transparent to-transparent pointer-events-none"></div>

                {/* Animated Climate Control HUD Strip */}
                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <div className="px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-[10px] font-mono flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>AUTOMATED PAD COOLING</span>
                  </div>
                </div>
                
                {/* Metric Overlays with Animated Value Hover */}
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3">
                  {t.technology.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-[#04110b]/90 border border-emerald-900/60 backdrop-blur-md text-center hover:border-emerald-500/60 hover:scale-105 transition-all cursor-default group"
                    >
                      <div className="font-black text-harvest-400 text-base sm:text-lg font-mono group-hover:text-harvest-300 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-[10px] text-stone-300 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

