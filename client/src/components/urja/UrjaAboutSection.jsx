import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaAboutSection({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-stone-200/80 relative overflow-hidden text-left">
      {/* Dynamic ambient blurs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Modern Glass Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-2xl bg-stone-100 group">
              <img
                src="/urja-company-team.jpg"
                alt="Urja Foods Agro Operations"
                className="w-full h-[380px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-14.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent"></div>
              
              {/* Floating legacy card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 text-left shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-800 text-white flex flex-col items-center justify-center font-black text-xl shrink-0 shadow-md">
                    <span>20</span>
                    <span className="text-[9px] font-mono tracking-wider uppercase text-emerald-200">Years</span>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-sm sm:text-base">
                      {t.about.cardTitle}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {t.about.cardDesc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="hidden sm:block absolute -top-5 -right-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-xl max-w-[190px] text-left border-2 border-white ring-2 ring-emerald-600/20">
              <div className="font-black text-2xl font-mono">150 TPD</div>
              <div className="text-xs font-semibold text-emerald-100 mt-0.5">{t.about.millingBadge}</div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{t.about.tag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {t.about.title}
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              {t.about.p2}
            </p>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {t.about.pillars.map((pillar, i) => (
                <div key={i} className="p-4 rounded-2xl bg-stone-50/80 hover:bg-emerald-50/50 border border-stone-200/80 transition-colors">
                  <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('services') : null}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-700 text-white font-bold text-sm shadow-md hover:bg-emerald-800 transition-colors"
              >
                <span>{t.about.btn1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                type="button"
                onClick={() => onNavigate ? onNavigate('contact') : null}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl border border-stone-300 text-stone-700 font-bold text-sm hover:bg-stone-50 transition-colors"
              >
                <span>{t.about.btn2}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
