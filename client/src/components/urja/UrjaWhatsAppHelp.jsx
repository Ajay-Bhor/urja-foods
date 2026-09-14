import React, { useState } from 'react';
import { MessageSquare, Phone, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaWhatsAppHelp() {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  const [isOpen, setIsOpen] = useState(false);

  const phone = '+917028939900';
  const whatsappUrl = `https://wa.me/917028939900?text=${encodeURIComponent(
    isMarathi
      ? 'सस्नेह नमस्कार उर्जा फुड्स, मला पशुखाद्य व डीलरशिपबद्दल अधिक माहिती हवी आहे.'
      : 'Hello Urja Foods, I would like to inquire about cattle feed supply and dealership opportunities.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans">
      
      {/* Expanded Quick Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden text-left animate-slide-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 to-urja-800 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg">
                  👨‍⚕️
                </div>
                <div>
                  <div className="font-bold text-sm">
                    {isMarathi ? 'उर्जा शेतकरी मदत कक्ष' : 'Urja Farmer Helpline'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                    <span>{isMarathi ? 'पशुवैद्यकीय अधिकारी उपलब्ध' : 'Field Nutritionist Online'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-emerald-100"
                aria-label="Close helpline box"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body message */}
          <div className="p-4 space-y-3 bg-[#fdfdfb] text-xs text-stone-700 leading-relaxed">
            <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-emerald-950">
              <p className="font-medium">
                {isMarathi
                  ? 'सस्नेह नमस्कार! गोठ्यातील गाय-म्हशींचे दूध वाढ, फॅट सुधारणा किंवा ब्रॉयलर फार्मिंगसाठी थेट आमच्या तज्ज्ञांशी संवाद साधा.'
                  : 'Namaskar! Connect directly with our Nirgudsar Pune agro specialists for milk yield guidance, dealer terms, or feed bookings.'}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isMarathi ? 'व्हॉट्सॲपवर संदेश पाठवा' : 'Chat on WhatsApp (+91-7028939900)'}</span>
              </a>

              <a
                href={`tel:${phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-black text-white font-bold text-xs shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-harvest-400" />
                <span>{isMarathi ? 'थेट फोन करा' : 'Call Helpline Directly'}</span>
              </a>
            </div>
          </div>

          <div className="bg-stone-50 px-4 py-2 border-t border-stone-100 text-[10px] text-stone-400 text-center font-mono">
            Urja Foods & Agro • Nirgudsar, Pune
          </div>

        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-urja-700 hover:from-emerald-700 hover:to-urja-800 text-white font-bold text-xs shadow-xl shadow-emerald-900/30 hover:scale-105 active:scale-95 transition-all border border-emerald-400/40"
        title="Open Farmer WhatsApp Helpline"
      >
        <div className="relative">
          <MessageSquare className="w-4 h-4 fill-white text-white" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 border border-emerald-800"></span>
        </div>
        <span>{isMarathi ? 'शेतकरी मदत कक्ष' : 'Farmer Help (WhatsApp)'}</span>
      </button>

    </div>
  );
}
