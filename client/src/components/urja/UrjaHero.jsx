import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, CheckCircle, Award, Factory, Wheat, Flame, ShieldCheck, Zap, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaHero({ onInquireClick, onNavigate }) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  // High-resolution company facility images from official urjafoods.net
  const companySlides = [
    {
      image: '/home-new.webp',
      fallback: 'https://www.urjafoods.net/wp-content/uploads/2025/08/home-new.webp',
      facilityTag: '150 TPD Pellet Feed Plant',
      facilityDesc: 'Nirgudsar, Ambegaon, Pune — Automated Pelleting & Silos',
      icon: Factory,
      animClass: 'animate-ken-burns-1'
    },
    {
      image: '/banner-slider-1.webp',
      fallback: 'https://www.urjafoods.net/wp-content/uploads/2025/07/Add-this-image-in-baner.webp',
      facilityTag: 'Scientific Pashu Aahar',
      facilityDesc: 'Supreme Gold 5000 & Malai Plus 8000 Cattle Feeds',
      icon: Wheat,
      animClass: 'animate-ken-burns-2'
    },
    {
      image: '/slider-plant-11.jpg',
      fallback: 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-11.jpg',
      facilityTag: 'Computerized Milling Lines',
      facilityDesc: 'Steam-Conditioned Steam Cooked Pellets & Uniform Nutrition',
      icon: Flame,
      animClass: 'animate-ken-burns-3'
    },
    {
      image: '/slide-1-1.jpg',
      fallback: 'https://www.urjafoods.net/wp-content/uploads/2021/06/slide-1-1.jpg',
      facilityTag: 'Agro Innovation Since 2005',
      facilityDesc: 'Serving 10,000+ Farmers Across Western Maharashtra',
      icon: Award,
      animClass: 'animate-ken-burns-1'
    }
  ];

  const totalSlides = companySlides.length;

  // Continuous auto-sliding animation between company images (every 6.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((curr) => (curr + 1) % totalSlides);
    }, 6500);

    return () => clearInterval(timer);
  }, [totalSlides]);

  // Get active translation data matching current slide index
  const activeTranslation = t.hero.slides[currentSlide % t.hero.slides.length] || t.hero.slides[0];
  const activeCompany = companySlides[currentSlide];

  return (
    <section
      id="home"
      className="relative overflow-hidden text-white min-h-[620px] lg:min-h-[740px] flex flex-col justify-between select-none"
    >
      {/* ============================================================ */}
      {/* 1. BACKGROUND COMPANY IMAGE ANIMATION LAYER                  */}
      {/* ============================================================ */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {companySlides.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.facilityTag}
              loading={idx === 0 ? 'eager' : 'lazy'}
              fetchPriority={idx === 0 ? 'high' : 'auto'}
              decoding="async"
              className={`w-full h-full object-cover object-center ${
                currentSlide === idx ? slide.animClass : 'scale-100'
              }`}
              onError={(e) => {
                if (slide.fallback) {
                  e.target.src = slide.fallback;
                }
              }}
            />
          </div>
        ))}

        {/* Cinematic Overlays: ensures high contrast & readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/50 z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/70 z-20"></div>
        <div className="absolute inset-0 bg-urja-950/20 mix-blend-multiply z-20"></div>

        {/* Ambient Morphing Glowing Energy Spheres with Orb Float Animation */}
        <div className="absolute -top-24 right-1/4 w-[540px] h-[540px] bg-harvest-500/15 rounded-full blur-3xl pointer-events-none animate-orb-float z-20"></div>
        <div className="absolute -bottom-24 left-10 w-[500px] h-[500px] bg-urja-500/20 rounded-full blur-3xl pointer-events-none animate-orb-float z-20" style={{ animationDelay: '-6s' }}></div>

        {/* Floating Ambient Sparkles / Light Orbs */}
        <div className="absolute top-1/3 left-1/5 w-2 h-2 rounded-full bg-emerald-400/80 blur-[1px] animate-sparkle-twinkle"></div>
        <div className="absolute top-2/3 right-1/3 w-2.5 h-2.5 rounded-full bg-harvest-300/80 blur-[1px] animate-sparkle-twinkle" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-1/4 right-1/6 w-1.5 h-1.5 rounded-full bg-white/70 blur-[1px] animate-sparkle-twinkle" style={{ animationDelay: '2.1s' }}></div>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN HERO CONTENT CONTAINER                               */}
      {/* ============================================================ */}
      <div className="relative z-30 py-12 sm:py-16 md:py-20 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div key={currentSlide} className="lg:col-span-7 text-left space-y-6 animate-slide-up">
              
              {/* Modern Trust & Facility Badges with Floating Animation */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-harvest-500/20 text-harvest-300 border border-harvest-500/40 text-xs font-bold backdrop-blur-md shadow-xs animate-bounce-subtle">
                  <Sparkles className="w-3.5 h-3.5 text-harvest-400 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>{activeTranslation.badge}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-slate-200 border border-white/20 text-xs font-semibold backdrop-blur-md hover:bg-white/20 transition-all cursor-default">
                  <activeCompany.icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{activeCompany.facilityTag}</span>
                </span>
              </div>

              {/* Main Headline with Modern Gradient Glow & Fluid Movement */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] drop-shadow-md">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-harvest-200 bg-clip-text text-transparent animate-gradient-flow block">
                  {activeTranslation.title}
                </span>
              </h1>

              {/* Tagline highlight with Animated Checkmark */}
              <div className="text-harvest-300 font-bold text-sm sm:text-base flex items-center gap-2.5 drop-shadow-sm">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-5 h-5 rounded-full bg-harvest-400/30 animate-pulse-ripple"></div>
                  <CheckCircle className="w-4 h-4 shrink-0 text-harvest-400 relative z-10" />
                </div>
                <span>{activeTranslation.tagline}</span>
              </div>

              {/* Subtitle */}
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl drop-shadow">
                {activeTranslation.subtitle}
              </p>

              {/* Action Buttons with High-End Glass Shine Streaks */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate ? onNavigate('products') : null}
                  className="btn-shine flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-urja-500 via-emerald-500 to-urja-600 hover:from-urja-600 hover:to-urja-700 text-white font-extrabold text-sm shadow-xl shadow-urja-950/60 hover:scale-[1.03] active:scale-95 transition-all group"
                >
                  <span>{activeTranslation.cta1}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('contact');
                    if (onInquireClick) onInquireClick('Hero Inquire');
                  }}
                  className="glass-pill-glow flex items-center gap-2 px-7 py-4 rounded-2xl text-white font-semibold text-sm hover:scale-[1.03] active:scale-95 transition-all"
                >
                  <span>{activeTranslation.cta2}</span>
                </button>
              </div>

              {/* Highlight Stats Strip with Hover Glow */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/15 max-w-xl">
                {activeTranslation.stats?.map((stat, i) => (
                  <div key={i} className="text-left group cursor-default">
                    <div className="text-2xl sm:text-3xl font-extrabold text-harvest-400 font-mono drop-shadow-sm group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-300 mt-0.5 font-medium group-hover:text-white transition-colors">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Interactive Slide Switcher Pills with Progress Bar */}
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {companySlides.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-500 relative overflow-hidden ${
                        currentSlide === idx
                          ? 'w-10 bg-harvest-400 shadow-glow-harvest'
                          : 'w-2.5 bg-white/30 hover:bg-white/60'
                      }`}
                      title={s.facilityTag}
                      aria-label={`Slide ${idx + 1}: ${s.facilityTag}`}
                    >
                      {currentSlide === idx && (
                        <div
                          key={`prog-${idx}`}
                          className="h-full bg-white/90 rounded-full animate-[shimmerBeam_6.5s_linear]"
                        />
                      )}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-mono text-slate-400 pl-1">
                  0{currentSlide + 1} / 0{totalSlides}
                </span>
              </div>

            </div>

            {/* Right Visual Glassmorphic Company Card Column with Floating Interactive Badges */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-lg">

                {/* Floating Tech Badge 1 (Top Left) */}
                <div className="absolute -top-6 -left-6 z-40 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 shadow-xl shadow-black/60 animate-float-slow">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="absolute w-4 h-4 rounded-full bg-emerald-400/50 animate-pulse-ripple"></span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-white font-mono">150 TPD Pellet Plant</div>
                    <div className="text-[10px] text-emerald-300 font-semibold">Automated Micro-Dosing</div>
                  </div>
                </div>

                {/* Floating Tech Badge 2 (Bottom Right) */}
                <div className="absolute -bottom-6 -right-4 z-40 hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-harvest-500/40 shadow-xl shadow-black/60 animate-float-delayed">
                  <div className="relative flex items-center justify-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-harvest-400"></span>
                    <span className="absolute w-4 h-4 rounded-full bg-harvest-400/50 animate-pulse-ripple"></span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-white font-mono">100% European EC</div>
                    <div className="text-[10px] text-harvest-300 font-semibold">Climate-Controlled Sheds</div>
                  </div>
                </div>
                
                {/* Modern Glassmorphic Facility Card with 3D Depth & Hover Card-Shine */}
                <div className="card-shine rounded-3xl p-4 bg-slate-950/70 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/80 transition-all duration-500 hover:shadow-glow-emerald">
                  <div className="rounded-2xl overflow-hidden relative shadow-lg min-h-[290px] sm:min-h-[350px] bg-slate-900 border border-white/10 group">
                    <img
                      src={activeCompany.image}
                      alt={activeCompany.facilityTag}
                      loading="eager"
                      className="w-full h-72 sm:h-84 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        if (activeCompany.fallback) {
                          e.target.src = activeCompany.fallback;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/35 to-transparent pointer-events-none"></div>
                    
                    {/* Live Facility Badge overlay inside card with pulsating radar */}
                    <div className="absolute top-3 left-3 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-white/20 text-[11px] font-bold text-harvest-300 shadow-md">
                      <div className="relative flex items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        <span className="absolute w-3.5 h-3.5 rounded-full bg-emerald-400/60 animate-ping"></span>
                      </div>
                      <span>Facility Spotlight</span>
                    </div>

                    {/* Facility Caption at bottom of card */}
                    <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-white/15 text-left transition-transform group-hover:-translate-y-1 duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-white">
                          {activeCompany.facilityTag}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-urja-700 text-white font-mono font-bold shadow-xs">
                          URJA FOODS
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-300 mt-1 block">
                        {activeCompany.facilityDesc}
                      </span>
                    </div>
                  </div>

                  {/* Trust Footer Pill inside card */}
                  <div className="mt-3 flex items-center justify-between text-xs px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                    <span className="flex items-center gap-1.5 text-harvest-300 font-semibold">
                      <Award className="w-3.5 h-3.5 text-harvest-400 shrink-0" />
                      <span>European EC & ISO Standard</span>
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">Nirgudsar, Pune</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MODERN FULL-WIDTH LIVE METRICS TICKER STRIP               */}
      {/* ============================================================ */}
      <div className="relative z-30 bg-slate-950/85 backdrop-blur-xl border-t border-white/10 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
            
            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-urja-500/20 border border-urja-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-urja-400 transition-transform">
                <Factory className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div className="text-xs sm:text-sm font-extrabold text-white font-mono">150 TPD Mill</div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Automated Pelleting Plant</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-harvest-500/20 border border-harvest-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-harvest-400 transition-transform">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <div className="text-xs sm:text-sm font-extrabold text-white font-mono">100% European EC</div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Computerized Broiler Houses</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-emerald-400 transition-transform">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <div className="text-xs sm:text-sm font-extrabold text-white font-mono">10,000+ Farmers</div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Trusted Across Maharashtra</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-harvest-500/20 border border-harvest-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-harvest-400 transition-transform">
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
                  <div className="text-xs sm:text-sm font-extrabold text-white font-mono">20+ Years Trust</div>
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-400">Founded in 2005, Pune</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
