import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function UrjaNavbar({ currentPage = 'home', onNavigate }) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'services', label: t.nav.services },
    { id: 'products', label: t.nav.products },
    { id: 'brands', label: t.nav.brands },
    { id: 'technology', label: t.nav.tech },
    { id: 'careers', label: t.nav.careers || 'Careers' },
    { id: 'contact', label: t.nav.contact }
  ];

  const handleItemClick = (e, pageId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-md py-3.5 border-b border-slate-100/90 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo -> Navigates to Home page */}
        <a
          href="#home"
          onClick={(e) => handleItemClick(e, 'home')}
          className="flex items-center gap-3 group shrink-0"
          title="Urja Foods & Agro - Home"
        >
          <img
            src="https://www.urjafoods.net/wp-content/uploads/2021/06/logo.png"
            alt="Urja Foods & Agro Pvt. Ltd."
            className="h-11 sm:h-13 object-contain group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="flex flex-col text-left">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-urja-950 leading-none">
              URJA <span className="text-harvest-600">FOODS</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-semibold tracking-wider uppercase mt-1">
              & Agro Pvt. Ltd. • Creating Energy
            </span>
          </div>
        </a>

        {/* Desktop Navigation with Modern Pill Indicators */}
        <nav className="hidden xl:flex items-center gap-1 text-sm font-semibold text-slate-700 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleItemClick(e, item.id)}
                className={`relative px-3.5 py-1.5 rounded-xl transition-all duration-300 text-xs font-bold ${
                  isActive
                    ? 'text-urja-900 bg-white shadow-xs border border-slate-200/90 font-extrabold shadow-urja-sm scale-[1.02]'
                    : 'text-slate-600 hover:text-urja-800 hover:bg-white/60'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-urja-600 animate-pulse"></span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right Action: Language Switcher & Quick Dealership Lead CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher variant="navbar" />
          
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="btn-shine hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-urja-700 via-urja-600 to-emerald-700 hover:from-urja-800 hover:to-urja-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95 group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            <span>{t.contact?.tag || 'Inquiry'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile menu hamburger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-urja-800 hover:bg-slate-100 transition-colors border border-slate-200/70"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5 space-y-4 text-left shadow-2xl animate-slide-up">
          {/* Mobile Language Switcher */}
          <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Language:</span>
            <LanguageSwitcher variant="navbar" />
          </div>

          <nav className="flex flex-col space-y-1.5 text-base font-semibold text-slate-700">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleItemClick(e, item.id)}
                  className={`py-2.5 px-3.5 rounded-xl flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-urja-50 text-urja-800 font-bold border border-urja-200'
                      : 'hover:text-urja-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-sm">{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-urja-600 animate-pulse"></span>}
                </a>
              );
            })}
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onNavigate) onNavigate('contact');
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-urja-700 to-urja-600 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <span>{t.contact?.tag || 'Dealership Inquiry'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
