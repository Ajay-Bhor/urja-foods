import React from 'react';
import { Phone, Mail, MapPin, Award, ArrowUp, ShieldCheck, Activity, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaFooter({ onNavigate }) {
  const { t, language } = useLanguage();
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  const handleNav = (e, pageId) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#07140e] via-[#050e0a] to-[#020504] text-white border-t border-emerald-950 text-left relative overflow-hidden">
      
      {/* Top green accent strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-harvest-400 to-emerald-500"></div>

      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-harvest-400/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
        
        {/* Plant Live Operational Status Bar */}
        <div className="mb-12 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-emerald-200">
              {isMarathi
                ? 'उर्जा १५० टन/दिवस अत्याधुनिक संगणकीय प्लांट — निर्गुडे, आंबेगाव (पुणे) येथे अविरत कार्यरत'
                : isHindi
                ? 'ऊर्जा १५० टन/दिन आधुनिक कंप्यूटराइज्ड प्लांट — निरगुडसर, पुणे में निरंतर कार्यरत'
                : 'Urja 150 TPD Computerized Milling & Pelleting Plant — Active & Operating Live in Nirgudsar, Pune'}
            </span>
          </div>

          <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-lg bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
            ISO 9001:2015 & ICAR Compliant
          </span>
        </div>

        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleNav(e, 'home')}
              className="flex items-center gap-3 group"
            >
              <img
                src="https://www.urjafoods.net/wp-content/uploads/2021/06/logo.png"
                alt="Urja Foods & Agro Logo"
                className="h-12 object-contain group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <span className="font-black text-2xl tracking-tight text-white flex items-center gap-1.5">
                  URJA <span className="text-harvest-400 font-extrabold">FOODS</span>
                </span>
                <span className="text-[10px] text-emerald-300/80 block font-bold tracking-wider uppercase font-mono">
                  & Agro Pvt. Ltd. • Pune
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-harvest-300 font-bold">
              <Award className="w-4 h-4 text-harvest-400 shrink-0" />
              <span>{t.footer.motto}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 font-mono">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li><a href="#home" onClick={(e) => handleNav(e, 'home')} className="hover:text-emerald-400 transition-colors">{t.nav.home}</a></li>
              <li><a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-emerald-400 transition-colors">{t.nav.about}</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, 'services')} className="hover:text-emerald-400 transition-colors">{t.nav.services}</a></li>
              <li><a href="#products" onClick={(e) => handleNav(e, 'products')} className="hover:text-emerald-400 transition-colors">{t.nav.products}</a></li>
              <li><a href="#brands" onClick={(e) => handleNav(e, 'brands')} className="hover:text-emerald-400 transition-colors">{t.nav.brands}</a></li>
              <li><a href="#technology" onClick={(e) => handleNav(e, 'technology')} className="hover:text-emerald-400 transition-colors">{t.nav.tech}</a></li>
              <li><a href="#careers" onClick={(e) => handleNav(e, 'careers')} className="hover:text-emerald-400 transition-colors">{t.nav.careers || 'Careers'}</a></li>
              <li><a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-emerald-400 transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          {/* Col 3: Product Highlights */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 font-mono">
              {t.footer.featuredProducts}
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-stone-300">
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Urja Supreme Gold (5000)</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Urja Malai Plus (8000)</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Urja Milk O Milk</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest-400"></span>
                <span>Urja Max Magic Peak Energy</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest-400"></span>
                <span>Broiler Finisher-1 Pellets</span>
              </li>
              <li className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-harvest-400"></span>
                <span>Layer Concentrates (35% & 50%)</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Office & Plant */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-emerald-300 font-mono">
              {t.footer.plantContact}
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {t.contact.addressText}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-harvest-400 shrink-0" />
                <a href="tel:+917028939900" className="hover:text-white font-mono font-bold text-white">
                  +91-7028939900
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-harvest-400 shrink-0" />
                <a href="mailto:info@urjafoods.net" className="hover:text-white font-mono">
                  info@urjafoods.net
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-stone-300 leading-relaxed font-sans">
                {t.footer.capacityInfo}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Internal QA / HR Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-stone-400">
          <div>
            Copyright © {new Date().getFullYear()} <strong className="text-stone-200">Urja Foods & Agro Pvt. Ltd.</strong> {t.footer.rights}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a
              href="#hr-portal"
              onClick={(e) => handleNav(e, 'hr-portal')}
              className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Internal HR Portal</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <a
              href="#automation-testing"
              onClick={(e) => handleNav(e, 'automation-testing')}
              className="text-stone-300 hover:text-harvest-400 transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-4 h-4 text-harvest-400" />
              <span>QA Automation Suite</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <a
              href="https://www.linkedin.com/company/urja-foods-and-agro-pvt-ltd/"
              target="_blank"
              rel="noreferrer"
              className="text-stone-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 text-stone-500" />
            </a>
            <span className="text-stone-700 hidden sm:inline">•</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors ml-1"
            >
              <span>{t.footer.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

