import React from 'react';
import { Award, CheckCircle2, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaBrandsSection({ onNavigate, onInquireClick }) {
  const { t, language } = useLanguage();
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  const brands = [
    {
      name: 'Urja Malai Cattle Feed',
      marathi: 'उर्जा मलाई पशु आहार',
      category: isMarathi ? 'उच्च फॅट पशुखाद्य' : isHindi ? 'हाई फैट कैटल फीड' : 'High-Fat Dairy Feed',
      logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/504.png',
      desc: isMarathi
        ? 'बायपास फॅट आणि उच्च ऊर्जेचे धान्य यांच्या संयोगाने तयार केलेले, दुधातील फॅट आणि मलईची टक्केवारी वाढवणारे प्रिमियम खाद्य.'
        : isHindi
        ? 'बायपास फैट और उच्च ऊर्जा अनाज से निर्मित, दूध में फैट व मलाई की प्रतिशतता बढ़ाने वाला पौष्टिक आहार।'
        : 'Formulated with bypass fat and high-energy cereals for peak milk lactation and rich cream fat.'
    },
    {
      name: 'Chicken Feast',
      marathi: 'चिकन फिस्ट',
      category: isMarathi ? 'अँटिबायोटिक-मुक्त चिकन' : isHindi ? 'एंटीबायोटिक-मुक्त चिकन' : 'Antibiotic-Free Fresh Meat',
      logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/505.png',
      desc: isMarathi
        ? '१००% युरोपियन क्लायमेट कंट्रोल्ड शेड्समध्ये पूर्णपणे रासायनिक औषध अवशेषविरहित, ताजे, पौष्टिक व रसाळ चिकन.'
        : isHindi
        ? '१००% यूरोपियन पर्यावरण नियंत्रित शेड्स में निर्मित रासायनिक अवशेष रहित, ताजा और पौष्टिक चिकन।'
        : 'Farm-to-fork tender, juicy chicken produced in European EC sheds with zero chemical residues.'
    },
    {
      name: 'Urja Cattle Feed',
      marathi: 'उर्जा कॅटल फीड',
      category: isMarathi ? 'संतुलित गोठा पोषण' : isHindi ? 'संतुलित डेयरी पोषण' : 'Balanced Dairy Nutrition',
      logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/503.png',
      desc: isMarathi
        ? 'पश्चिम महाराष्ट्रातील संकरित गायी व म्हशींसाठी १००% स्टीम पॅलेटेड, संतुलित व पाचक दैनंदिन आहार.'
        : isHindi
        ? 'संकर गायों और भैंसों के लिए १००% स्टीम पेलेटेड, सुपाच्य और संतुलित दैनिक आहार।'
        : 'Complete herd nutrition for milking cows, crossbreds, and buffaloes in Western Maharashtra.'
    },
    {
      name: 'Urja Poultry Feed',
      marathi: 'उर्जा पोल्ट्री फीड',
      category: isMarathi ? 'ब्रॉयलर व लेअर पॅलेट्स' : isHindi ? 'ब्रॉयलर एवं लेयर पेलेट्स' : 'Broiler & Layer Pellets',
      logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/502.png',
      desc: isMarathi
        ? 'आमच्या १५० टन प्रति दिवस अत्याधुनिक स्वयंचलित प्लांटमध्ये तयार होणारे उच्च एफसीआर ब्रॉयलर व लेअर पॅलेट्स.'
        : isHindi
        ? '१५० टन/दिन के स्वचालित प्लांट में उत्पादित उच्च एफसीआर ब्रॉयलर और लेयर फीड पेलेट्स।'
        : 'High FCR steam-pelleted feed manufactured in our computerized 150 TPD automated plant.'
    },
    {
      name: 'Max Magic Eggs',
      marathi: 'मॅक्स मॅजिक एग्स',
      category: isMarathi ? 'ताजी नैसर्गिक अंडी' : isHindi ? 'ताजे टेबल अंडे' : 'Farm Fresh Table Eggs',
      logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-1.png',
      desc: isMarathi
        ? 'उच्च दर्जाच्या लेअर आहारातून उत्पादित मजबूत कवचाची, प्रोटिनयुक्त व ताजी पौष्टिक टेबल अंडी.'
        : isHindi
        ? 'उच्च गुणवत्ता लेयर पोषण से उत्पादित मजबूत छिलके वाले, प्रोटीन युक्त ताजे अंडे।'
        : 'Nutrient-rich, strong-shelled farm fresh eggs produced from high-grade layer nutrition.'
    },
    {
      name: 'Urja Fertilizer',
      marathi: 'उर्जा सेंद्रिय खते',
      category: isMarathi ? 'सेंद्रिय कृषी निविष्ठा' : isHindi ? 'जैविक कृषि खाद' : 'Organic Agricultural Inputs',
      logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/501.png',
      desc: isMarathi
        ? 'ऊस, फळबागा व भाजीपाल्यासाठी जमिनीचा कस वाढवणारे सेंद्रिय खत व जिवाणू संवर्धक खते.'
        : isHindi
        ? 'गन्ना, बागवानी और फसलों की मिट्टी की उर्वरता बढ़ाने वाली जैविक खाद और कम्पोस्ट।'
        : 'Nutrient-dense organic compost and bio-fertilizers enriching soil health for sugarcane and crops.'
    }
  ];

  return (
    <section id="brands" className="py-20 md:py-28 bg-[#fafaf8] border-b border-stone-200/80 relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-harvest-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-harvest-100 text-harvest-800 text-xs font-bold border border-harvest-200 shadow-sm">
            <Award className="w-3.5 h-3.5 text-harvest-600" />
            <span>{t.brands.tag}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {t.brands.title}
          </h2>
          
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {t.brands.subtitle}
          </p>
        </div>

        {/* 6 Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 text-left">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="bg-white/95 backdrop-blur-md rounded-3xl p-7 border border-stone-200/80 shadow-md hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle top card glow on hover */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-harvest-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div>
                {/* Logo Frame */}
                <div className="h-32 flex items-center justify-center p-4 bg-gradient-to-b from-stone-50 to-stone-100/60 rounded-2xl mb-5 border border-stone-100 relative group-hover:bg-emerald-50/40 transition-colors">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-20 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="font-black text-stone-800 text-base group-hover:text-emerald-800 transition-colors">
                    {brand.name}
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {brand.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-harvest-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-lg font-black text-stone-900 group-hover:text-emerald-700 transition-colors pt-1">
                    {brand.name}
                  </h3>
                  
                  <div className="text-xs text-stone-500 font-semibold">
                    {brand.marathi}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                    {brand.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action / Verified Strip */}
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>{t.brands.verified}</span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('contact');
                    if (onInquireClick) onInquireClick(`Dealership & Supply Inquiry for ${brand.name}`);
                  }}
                  className="text-stone-400 group-hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>{isMarathi ? 'चौकशी' : 'Inquire'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

