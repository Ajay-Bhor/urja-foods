import React from 'react';
import { ArrowRight, Sparkles, CheckCircle, Factory, ShieldCheck, Wheat, PhoneCall, Cpu, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaHomeHighlights({ onNavigate, onInquireClick }) {
  const { t } = useLanguage();

  return (
    <div className="w-full space-y-16 py-12">
      
      {/* ============================================================ */}
      {/* 1. ABOUT URJA SPOTLIGHT TEASER (Modern High-End Card)        */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-shine bg-white rounded-3xl border border-slate-200/90 shadow-glass-card p-8 sm:p-12 lg:p-16 overflow-hidden relative text-left transition-all duration-500 hover:shadow-bento-elevated hover:border-emerald-300">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none animate-orb-float"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-urja-50 text-urja-800 text-xs font-bold border border-urja-200 shadow-xs animate-bounce-subtle">
                <Sparkles className="w-3.5 h-3.5 text-urja-600" />
                <span>{t.about.tag}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                <span className="text-gradient-emerald">{t.about.title}</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {t.about.p1}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {t.about.pillars.slice(0, 2).map((pillar, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:bg-emerald-50/50 hover:border-emerald-300 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                      <CheckCircle className="w-4 h-4 text-urja-600 shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onNavigate('about')}
                  className="btn-shine inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-urja-700 to-urja-600 hover:from-urja-800 hover:to-urja-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 group"
                >
                  <span>Learn More About Urja Legacy</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              {/* Floating Pune Legacy Badge */}
              <div className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white border border-white/20 text-[11px] font-bold shadow-lg animate-float-slow">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>20+ Years Legacy Since 2005</span>
              </div>

              <div className="card-shine relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-100 group">
                <img
                  src="/new-project-14.jpg"
                  alt="Urja Foods Corporate Infrastructure"
                  className="w-full h-84 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-14.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-[11px] font-bold text-harvest-300">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Corporate Headquarters</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{t.about.cardTitle}</span>
                    <span className="text-xs font-mono font-bold text-urja-700 bg-urja-50 px-2 py-0.5 rounded border border-urja-200">Pune, MH</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{t.about.cardDesc}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. BENTO-GRID CORE DIVISIONS SHOWCASE                        */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-urja-700 bg-urja-100/80 px-4 py-1.5 rounded-full border border-urja-200">
            {t.services.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            {t.services.subtitle}
          </p>
        </div>

        {/* High-Tech Modern Bento-Grid Layout with Card-Shine and Micro-Animations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
          
          {/* Bento Item 1: 150 TPD Feed Plant (Featured Wide Card - 7 Columns) */}
          <div className="card-shine md:col-span-7 bento-card p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/50 to-emerald-50/30 border border-slate-200/90 hover:border-emerald-400/80 hover:shadow-glow-emerald">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-13 h-13 rounded-2xl bg-urja-100 text-urja-800 flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                  <Factory className="w-6 h-6 text-urja-700" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>150 TPD CAPACITY</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                150 TPD Automated Pellet Feed Plant
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                Fully computerized batch weighing, high-pressure steam conditioners, and pellet coolers in Nirgudsar, Pune. Producing nutrient-dense, dust-free rations with strict ISO quality standards.
              </p>

              {/* Mini tech specs pill list */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 shadow-2xs hover:border-emerald-300 transition-colors">Steam Cooked</span>
                <span className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 shadow-2xs hover:border-emerald-300 transition-colors">Zero Antibiotics</span>
                <span className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 shadow-2xs hover:border-emerald-300 transition-colors">Automated Micro-Dosing</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('services')}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-urja-700 hover:text-urja-800 group"
              >
                <span>Explore Automated Milling Division</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bento Item 2: European EC Houses (5 Columns) */}
          <div className="card-shine md:col-span-5 bento-card p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-slate-50/50 to-amber-50/30 border border-slate-200/90 hover:border-amber-400/80 hover:shadow-glow-harvest">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-13 h-13 rounded-2xl bg-harvest-100 text-harvest-800 flex items-center justify-center shadow-xs group-hover:rotate-6 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-harvest-700" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>100% EC TECH</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                European EC Broiler Housing
              </h3>
              
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pioneers in Maharashtra with fully computerized tunnel ventilation, automated pad cooling, and automatic pan feeding for superior low-mortality poultry rearing.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 shadow-2xs hover:border-amber-300 transition-colors">FCR 1.5 Benchmark</span>
                <span className="text-[11px] font-semibold bg-white px-2.5 py-1 rounded-lg border border-slate-200 text-slate-700 shadow-2xs hover:border-amber-300 transition-colors">Zero Medication</span>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => onNavigate('technology')}
                className="inline-flex items-center gap-2 text-xs font-extrabold text-harvest-700 hover:text-harvest-800 group"
              >
                <span>View European EC Technology</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bento Item 3: Scientific Cattle Feed (6 Columns) */}
          <div className="card-shine md:col-span-6 bento-card p-8 flex flex-col justify-between bg-white border border-slate-200/90 hover:border-emerald-300 hover:shadow-glow-emerald">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                <Wheat className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Scientific Cattle Nutrition (Pashu Aahar)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supreme Gold 5000, Malai Plus 8000, and Milk O Milk formulated with bypass proteins, chelated trace minerals, and vitamins for sustained milk yield and high SNF.
              </p>
            </div>

            <button
              onClick={() => onNavigate('products')}
              className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-urja-700 hover:text-urja-800 group"
            >
              <span>Browse Feed Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

          {/* Bento Item 4: Modern Hatchery & Vaccine Technology (6 Columns) */}
          <div className="card-shine md:col-span-6 bento-card p-8 flex flex-col justify-between bg-white border border-slate-200/90 hover:border-amber-300 hover:shadow-glow-harvest">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-harvest-100 text-harvest-800 flex items-center justify-center shadow-xs">
                <Cpu className="w-6 h-6 text-harvest-700" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Modern Hatchery & Auto-Vaccinated Chicks
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                State-of-the-art incubation plant equipped with automated maternal vaccination to ensure day-old broiler chicks have superior vitality, uniform weight, and natural disease resistance.
              </p>
            </div>

            <button
              onClick={() => onNavigate('services')}
              className="mt-6 inline-flex items-center gap-2 text-xs font-extrabold text-urja-700 hover:text-urja-800 group"
            >
              <span>Explore Hatchery Operations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl border border-slate-300 hover:border-urja-500 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs hover:shadow-md transition-all group"
          >
            <span>{t.services.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MODERN DEALERSHIP & FARMER HELPLINE CTA BANNER            */}
      {/* ============================================================ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-shine rounded-3xl bg-gradient-to-r from-urja-950 via-slate-900 to-urja-900 p-8 sm:p-12 lg:p-14 text-white text-left relative overflow-hidden shadow-2xl border border-urja-800/80">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-harvest-500/20 rounded-full blur-3xl pointer-events-none animate-orb-float"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-harvest-500/20 text-harvest-300 border border-harvest-500/35 text-xs font-bold animate-bounce-subtle">
                <Award className="w-3.5 h-3.5 text-harvest-400" />
                <span>Partner with Urja Foods & Agro</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Become an Authorized Feed Dealer or Contract Farmer
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
                Serving over 10,000 farmers with European standard technology and guaranteed financial growth. Direct supply from our 150 TPD Nirgudsar plant.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
              <button
                onClick={() => {
                  onNavigate('contact');
                  if (onInquireClick) onInquireClick('Dealership Inquiry');
                }}
                className="btn-shine flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-harvest-500 to-harvest-600 hover:from-harvest-600 hover:to-harvest-700 text-slate-950 font-black text-sm shadow-xl shadow-harvest-950/40 hover:scale-[1.03] active:scale-95 transition-all group"
              >
                <span>Apply for Dealership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="tel:+917028939900"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs transition-all backdrop-blur-md hover:scale-[1.02]"
              >
                <PhoneCall className="w-4 h-4 text-harvest-400 animate-pulse" />
                <span>+91-7028939900</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
