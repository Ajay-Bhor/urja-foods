import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LanguageSwitcher({ variant = 'topbar' }) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { code: 'mr', label: 'मराठी', subLabel: 'Marathi' },
    { code: 'en', label: 'English', subLabel: 'English' },
    { code: 'hi', label: 'हिन्दी', subLabel: 'Hindi' },
  ];

  const currentOption = options.find((opt) => opt.code === language) || options[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'topbar') {
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {/* Dropdown Trigger Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 bg-urja-950/90 hover:bg-urja-900 border border-urja-700/80 hover:border-harvest-400/70 text-slate-200 hover:text-white px-2.5 py-1 rounded-lg text-xs font-medium transition-all shadow-sm focus:outline-none focus:ring-1 focus:ring-harvest-400"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label="Select Language"
        >
          <Globe className="w-3.5 h-3.5 text-harvest-400 shrink-0" />
          <span className="font-semibold text-white tracking-wide">{currentOption.label}</span>
          <ChevronDown
            className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-harvest-400' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            role="listbox"
            className="absolute right-0 mt-1.5 w-40 bg-urja-950/95 backdrop-blur-md rounded-xl border border-urja-700/90 shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="px-3 py-1 border-b border-urja-800/80">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                भाषा निवडा / Select
              </span>
            </div>

            {options.map((opt) => {
              const isSelected = language === opt.code;
              return (
                <button
                  key={opt.code}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                    isSelected
                      ? 'bg-urja-800/90 text-harvest-300 font-bold'
                      : 'text-slate-200 hover:bg-urja-900 hover:text-white'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">{opt.label}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{opt.subLabel}</span>
                  </div>
                  {isSelected && (
                    <span className="flex items-center justify-center w-4 h-4 rounded-full bg-harvest-400/20 text-harvest-400">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // Navbar & Mobile Drawer Variant
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 hover:border-urja-500 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-urja-500/20"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-urja-600 shrink-0" />
        <span className="font-bold text-slate-900">{currentOption.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-urja-600' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-slate-200 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-3 py-1 border-b border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Select Language
            </span>
          </div>

          {options.map((opt) => {
            const isSelected = language === opt.code;
            return (
              <button
                key={opt.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                  isSelected
                    ? 'bg-urja-50 text-urja-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{opt.label}</span>
                  <span className="text-[10px] text-slate-500">{opt.subLabel}</span>
                </div>
                {isSelected && (
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-urja-100 text-urja-700">
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
