import React, { useState, useRef, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function Topbar() {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsLangOpen(false);
      }
    }

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLangOpen]);

  const currentLang = supportedLanguages.find((lang) => lang.code === language) || supportedLanguages[0];

  return (
    <div className="topbar">
      <div className="container topbar-content">
        {/* Left: Contact Info */}
        <div className="topbar-left">
          <a href="tel:+917028939900" className="topbar-item" id="topbar-phone">
            <Phone size={14} />
            <span>+91-7028939900</span>
          </a>
          <a href="mailto:info@urjafoods.net" className="topbar-item" id="topbar-email">
            <Mail size={14} />
            <span>info@urjafoods.net</span>
          </a>
          <div className="topbar-item" id="topbar-location">
            <MapPin size={14} />
            <span>{t('topbarLocation')}</span>
          </div>
        </div>

        {/* Right: Operational Hours, Certification Badge & Language Switcher */}
        <div className="topbar-right">
          <div className="topbar-item" id="topbar-hours">
            <Clock size={13} />
            <span>{t('topbarHours')}</span>
          </div>
          <span className="topbar-badge" id="topbar-cert-badge">
            <ShieldCheck size={13} />
            <span>{t('topbarCert')}</span>
          </span>

          {/* Elegant Multi-Language Dropdown */}
          <div className="topbar-lang-wrapper" ref={langDropdownRef}>
            <button
              type="button"
              className={`topbar-lang-trigger ${isLangOpen ? 'open' : ''}`}
              id="topbar-lang-selector"
              aria-label={`Select Language, currently ${currentLang.label}`}
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen(!isLangOpen)}
            >
              <Globe size={13} className="topbar-lang-globe" />
              <span className="topbar-lang-current-label">{currentLang.label}</span>
              <ChevronDown size={12} className={`topbar-lang-chevron ${isLangOpen ? 'open' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="topbar-lang-dropdown" role="listbox" aria-label="Languages">
                {supportedLanguages.map((lang) => {
                  const isSelected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      className={`topbar-lang-option ${isSelected ? 'active' : ''}`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      title={`Switch to ${lang.label}`}
                    >
                      <div className="topbar-lang-option-content">
                        <span className="topbar-lang-option-name">{lang.label}</span>
                        <span className="topbar-lang-option-badge">{lang.shortLabel}</span>
                      </div>
                      {isSelected && <Check size={13} className="topbar-lang-check" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
