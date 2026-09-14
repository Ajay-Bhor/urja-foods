import React from 'react';
import { Home, Factory, Egg, Utensils, ShieldCheck, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaServicesSection({ onInquireClick, onNavigate }) {
  const { t } = useLanguage();

  const serviceImages = [
    'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-29.jpg',
    'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-30.jpg',
    'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-31.jpg',
    'https://www.urjafoods.net/wp-content/uploads/2021/06/505.png',
    'https://www.urjafoods.net/wp-content/uploads/2025/08/Supreme-Gold-Front-300x300.webp'
  ];

  const serviceIcons = [
    <Home key="srv-1" className="w-5 h-5 text-emerald-700" />,
    <Factory key="srv-2" className="w-5 h-5 text-harvest-600" />,
    <Egg key="srv-3" className="w-5 h-5 text-amber-600" />,
    <Utensils key="srv-4" className="w-5 h-5 text-rose-600" />,
    <ShieldCheck key="srv-5" className="w-5 h-5 text-emerald-600" />
  ];

  const services = t.services.items.map((serv, idx) => ({
    ...serv,
    image: serviceImages[idx % serviceImages.length],
    icon: serviceIcons[idx % serviceIcons.length]
  }));

  return (
    <section id="services" className="py-20 md:py-28 bg-[#f9faf7] border-b border-stone-200/80 text-left relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t.services.tag}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {t.services.title}
          </h2>
          
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {services.map((serv, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-md hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Service Image banner */}
                <div className="h-56 sm:h-64 overflow-hidden bg-stone-100 relative">
                  <img
                    src={serv.image}
                    alt={serv.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-14.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent"></div>

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-stone-800 shadow-md">
                    {serv.tag}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100/80 shrink-0">
                      {serv.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-700 transition-colors">
                        {serv.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {serv.desc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-700 font-medium">
                    {serv.points.map((p, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('contact');
                    if (onInquireClick) onInquireClick(serv.title);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-stone-100 hover:bg-emerald-700 hover:text-white text-stone-800 text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-emerald-700 group-hover:text-white shadow-sm"
                >
                  <span>{t.services.inquireBtn} {serv.title.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

