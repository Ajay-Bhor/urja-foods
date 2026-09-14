import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaFarmerFaq({ onNavigate }) {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';

  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: isMarathi
        ? 'उर्जा सुप्रीम गोल्ड (५०००) आणि मलाई प्लस (८०००) मध्ये काय फरक आहे?'
        : 'What is the difference between Urja Supreme Gold (5000) and Malai Plus (8000)?',
      a: isMarathi
        ? 'उर्जा सुप्रीम गोल्ड (५०००) हे खास करून जास्त दूध देणाऱ्या संकरित (HF/जर्सी) गायींसाठी बायपास प्रोटीन व सूक्ष्म खनिजांसह तयार केले आहे, जेणेकरून दूध उत्पादनात २ ते ३ लिटरची वाढ होते. तर उर्जा मलाई प्लस (८०००) मध्ये बायपास फॅटचे प्रमाण जास्त असून ते दुधातील फॅट (Fat) व मलईची घट्ट टक्केवारी वाढवण्यासाठी सर्वोत्तम आहे.'
        : 'Urja Supreme Gold (5000) is formulated with high bypass protein and chelated minerals tailored for high-yielding HF and Jersey cows to maximize daily milk volume (+2 to 3 Litres). Urja Malai Plus (8000) contains elevated bypass fats specifically engineered to boost milk fat percentage and SNF in heavy milking cows and Murrah buffaloes.'
    },
    {
      q: isMarathi
        ? 'उर्जाच्या युरोपियन ईसी शेडमध्ये कॉन्ट्रॅक्ट ब्रॉयलर फार्मिंग कशी केली जाते?'
        : 'How does Contract Broiler Farming operate with Urja Foods?',
      a: isMarathi
        ? 'उर्जा कंपनी शेतकऱ्याला १००% लसीकरण झालेली निरोगी डे-ओल्ड पिल्ले, स्वतःच्या १५० टन प्लांटमध्ये बनलेले दर्जेदार खाद्य आणि पशुवैद्यकीय औषधे थेट शेतावर पुरवते. शेतकरी १००% युरोपियन क्लायमेट कंट्रोल्ड शेडमध्ये पक्षी वाढवतो. पक्ष्यांची वाढ झाल्यावर कंपनी निश्चित व्यवस्थापन मोबदला थेट शेतकऱ्याच्या बँक खात्यात जमा करते.'
        : 'Urja provides the farmer with auto-vaccinated healthy day-old broiler chicks, steam-pelleted feed from our 150 TPD automated plant, and veterinary doctor supervision directly at your shed. The farmer provides the European EC shed infrastructure and care. Upon batch maturity, Urja lifts the birds and transfers guaranteed growing charges directly to the farmer’s bank account.'
    },
    {
      q: isMarathi
        ? 'आमच्या गावात किंवा तालुक्यात उर्जा पशुखाद्याची डीलरशिप कशी मिळू शकते?'
        : 'How can I become an authorized Urja Foods Feed Dealer in my Taluka?',
      a: isMarathi
        ? 'गावातील किंवा तालुक्यातील कृषी सेवा केंद्र, डेअरी संस्था किंवा नवीन तरुण व्यावसायिक उर्जाची अधिकृत डीलरशिप घेऊ शकतात. यासाठी कमीत कमी २०० चौ. फूट जागा आणि प्राथमिक भांडवल आवश्यक आहे. कंपनी थेट फॅक्टरीतून पुरवठा, जाहिरात साहित्य आणि आकर्षक कमिशन मार्जिन देते.'
        : 'Agro-input retailers, dairy societies, or rural entrepreneurs can apply for an authorized dealership. A secure storage space of at least 200 sq. ft. and working capital is required. Urja provides direct dispatch from the Nirgudsar plant, promotional branding, and attractive dealer margins.'
    },
    {
      q: isMarathi
        ? 'उर्जाचे चिकन १००% अँटिबायोटिक-मुक्त कसे असते?'
        : 'How does Urja guarantee 100% Antibiotic-Free chicken meat?',
      a: isMarathi
        ? 'आपल्या शेड्स १००% युरोपियन एन्व्हायर्नमेंटल कंट्रोल्ड (EC) आहेत, जिथे स्वयंचलित कुलिंग पॅड्स व टनेल फॅन्समुळे बाहेरील धूळ, जंतू व उष्णतेचा ताण पक्ष्यांपर्यंत पोहोचत नाही. पक्षी नैसर्गिकरित्या निरोगी राहिल्यामुळे त्यांना प्रतिबंधात्मक अँटिबायोटिक्स देण्याची गरजच पडत नाही.'
        : 'Our birds are raised in 100% European Environmental Controlled houses where automated sensors regulate humidity, temperature, and fresh air exchanges. Because the birds live in biosecure, stress-free microclimates, they build natural immunity and never require preventive antibiotic drugs.'
    },
    {
      q: isMarathi
        ? 'पशुखाद्यासोबत गोठ्यावर डॉक्टरांचे मार्गदर्शन मिळते का?'
        : 'Do you provide free veterinary field visits for dairy farmers?',
      a: isMarathi
        ? 'होय! उर्जा फुड्सकडे तज्ज्ञ पशुवैद्यकीय डॉक्टरांची स्वतंत्र टीम आहे. गोठ्यातील जनावरांचे आरोग्य, गाभण राहण्याच्या समस्या आणि आहाराचे वेळापत्रक यावर आमचे प्रतिनिधी शेतकऱ्यांच्या प्रत्यक्ष गोठ्यावर भेट देऊन मोफत मार्गदर्शन करतात.'
        : 'Yes! Urja Foods maintains a dedicated field veterinary team in Western Maharashtra. Our field officers visit dairy farms in person to inspect herd health, address conception issues, and design custom daily feeding schedules free of cost.'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-[#fdfdfc] border-b border-stone-200/80 text-left relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold border border-stone-200 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-stone-600" />
            <span>{isMarathi ? 'शेतकऱ्यांचे प्रश्न — उर्जाची उत्तरे' : 'Frequently Asked Questions'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {isMarathi ? 'वारंवार विचारले जाणारे महत्त्वाचे प्रश्न' : 'Clear Answers to Everyday Farmer & Partner Inquiries'}
          </h2>
          
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isMarathi
              ? 'पशुखाद्य, डीलरशिप व कॉन्ट्रॅक्ट फार्मिंगबद्दल मनात कोणतीही शंका असल्यास येथे माहिती वाचा.'
              : 'Everything you need to know about balanced feeding schedules, dealership terms, and European contract poultry farming.'}
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-emerald-400 shadow-lg ring-2 ring-emerald-400/20'
                    : 'bg-[#faf9f6] border-stone-200/90 hover:border-stone-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-stone-900 text-sm sm:text-base transition-colors"
                >
                  <span className="flex items-center gap-3.5">
                    <span className={`w-7 h-7 rounded-xl text-xs font-mono font-black flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-emerald-700 text-white'
                        : 'bg-stone-200/80 text-stone-700'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="font-extrabold">{faq.q}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-stone-600 leading-relaxed border-t border-emerald-100 bg-white">
                    <p className="pl-10">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions? Help card */}
        <div className="mt-12 p-7 rounded-3xl bg-gradient-to-r from-stone-100 to-stone-50 border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="font-extrabold text-stone-900 text-base">
                {isMarathi ? 'मनात अजून काही प्रश्न आहेत का?' : 'Still have a specific question?'}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                {isMarathi ? 'आमचे प्रतिनिधी थेट फोनवर तुमच्याशी सविस्तर संवाद साधतील.' : 'Speak directly with our Nirgudsar Pune field veterinary team.'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-5 py-3 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all shadow-sm"
            >
              {isMarathi ? 'चौकशी अर्ज भरा' : 'Submit Question'}
            </button>
            <a
              href="tel:+917028939900"
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-bold transition-all shadow-sm font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>+91-7028939900</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

