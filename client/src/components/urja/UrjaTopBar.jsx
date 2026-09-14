import React from 'react';
import { Phone, Mail, MapPin, Award } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function UrjaTopBar() {
  const { t } = useLanguage();

  return (
    <div className="bg-urja-900 text-white text-xs border-b border-urja-800/80 py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Contact Info */}
        <div className="flex items-center gap-6">
          <a
            href="tel:+917028939900"
            className="flex items-center gap-2 hover:text-harvest-300 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-harvest-400" />
            <span className="font-semibold">+91-7028939900</span>
          </a>

          <a
            href="mailto:info@urjafoods.net"
            className="flex items-center gap-2 hover:text-harvest-300 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-harvest-400" />
            <span>{t.topBar.email}</span>
          </a>

          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-harvest-400" />
            <span>{t.topBar.location}</span>
          </div>
        </div>

        {/* Right: Heritage Motto & Language Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-harvest-300 font-medium">
            <Award className="w-3.5 h-3.5" />
            <span>{t.topBar.motto}</span>
          </div>

          <span className="px-2 py-0.5 rounded bg-urja-800 text-[10px] font-semibold text-urja-200 border border-urja-700">
            {t.topBar.iso}
          </span>

          {/* Language Switcher */}
          <LanguageSwitcher variant="topbar" />
        </div>

      </div>
    </div>
  );
}
