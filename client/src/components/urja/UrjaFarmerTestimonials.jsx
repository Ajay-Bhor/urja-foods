import React from 'react';
import { Star, CheckCircle2, MapPin, ThumbsUp, PhoneCall, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaFarmerTestimonials() {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  const testimonials = [
    {
      name: isMarathi ? 'संतोष जाधवर' : isHindi ? 'संतोष जाधवर' : 'Santosh Jadhavar',
      village: isMarathi ? 'बारामती, जि. पुणे' : isHindi ? 'बारामती, पुणे' : 'Baramati, Dist. Pune',
      farmType: isMarathi ? '१४ संकरित गायींचा गोठा' : isHindi ? '१४ संकर गायों की डेयरी' : '14 HF Crossbred Cows Dairy Farm',
      productUsed: 'Urja Supreme Gold (5000)',
      metricLabel: isMarathi ? 'दूध वाढ' : isHindi ? 'दूध वृद्धि' : 'Milk Yield Jump',
      metricValue: '+२.८ लिटर / दिवस',
      metricSub: isMarathi ? 'फॅट ४.३% व एसएनएफ ८.८' : isHindi ? 'फैट ४.३% व एसएनएफ ८.८' : 'Fat 4.3% & SNF 8.8',
      quote: isMarathi
        ? 'गेल्या ६ महिन्यांपासून गोठ्यातील सर्व गायींना उर्जा सुप्रीम गोल्ड ५००० सुरू केला. दूध उत्पादनात प्रति गाय २.८ लिटरची स्पष्ट वाढ झाली. सर्वात महत्त्वाचे म्हणजे गायी वेळेवर गाभण राहिल्या आणि शरीराची चकाकी वाढली. उर्जाचे पशुवैद्यकीय अधिकारी स्वतः गोठ्यावर येऊन मार्गदर्शन करतात.'
        : isHindi
        ? 'विगत ६ माह से सभी गायों को ऊर्जा सुप्रीम गोल्ड ५००० दे रहे हैं। प्रति गाय २.८ लीटर दूध उत्पादन बढ़ा है। गाय समय पर गाभिन होती हैं। ऊर्जा के डॉक्टर समय-समय पर फार्म पर आकर मुफ्त सलाह देते हैं।'
        : 'Switched all 14 milking cows to Urja Supreme Gold 5000 six months ago. Daily milk yield jumped by 2.8 litres per cow with stable 4.3% fat and 8.8 SNF. What I cherish most is that Urja’s veterinary doctor visits our farm regularly. It feels like family support, not just buying feed bags.',
      rating: 5,
      avatar: '👨‍🌾',
      badge: isMarathi ? 'प्रमाणित दूध उत्पादक' : isHindi ? 'प्रमाणित दुग्ध उत्पादक' : 'Verified Dairy Farmer'
    },
    {
      name: isMarathi ? 'बाबासाहेब काळे' : isHindi ? 'बाबासाहेब काले' : 'Babasaheb Kale',
      village: isMarathi ? 'नारायणगाव, ता. जुन्नर' : isHindi ? 'नारायणगांव, जुन्नर' : 'Narayangaon, Tal. Junnar',
      farmType: isMarathi ? '२०,००० पक्षी ब्रॉयलर फार्म (EC Shed)' : isHindi ? '२०,००० पक्षी ब्रॉयलर फार्म' : '20,000 Birds Broiler Farm (EC Shed)',
      productUsed: 'Urja Broiler Pellets & EC Tech',
      metricLabel: isMarathi ? 'मॉर्टॅलिटी प्रमाण' : isHindi ? 'जीवितता दर' : 'Livability Rate',
      metricValue: '९८.४% जिवंत प्रमाण',
      metricSub: isMarathi ? 'एफसीआर १.५१ (अँटिबायोटिक-मुक्त)' : isHindi ? 'एफसीआर १.५१ (दवा मुक्त)' : 'FCR 1.51 (Antibiotic-Free)',
      quote: isMarathi
        ? 'उर्जाच्या १००% युरोपियन क्लायमेट कंट्रोल्ड शेडमध्ये मी कॉन्ट्रॅक्ट ब्रॉयलर फार्मिंग करतो. कडक उन्हाळ्यातही शेडमधील तापमान २४ अंश नियंत्रित राहते. पक्ष्यांचे वजन ३८ व्या दिवशी २.२ किलो भरते. वेळेवर पिल्ले, वेळेवर खाद्य आणि थेट बँक खात्यात नफा — उर्जाने माझे शेतीचे स्वप्न पूर्ण केले.'
        : isHindi
        ? 'ऊर्जा के यूरोपियन क्लाइमेट कंट्रोल्ड शेड में ब्रॉयलर फार्मिंग करता हूँ। गर्मियों में भी तापमान २४ डिग्री रहता है। ३८वें दिन वजन २.२ किग्रा मिलता है। समय पर भुगतान और शत-प्रतिशत सहयोग मिलता है।'
        : 'Partnering with Urja in contract broiler farming using their European EC Shed infrastructure has transformed my life. Even during 42°C summer heat, automated cooling keeps the birds at 24°C. We achieved 2.2 kg average weight at 38 days with 98.4% livability and zero antibiotics.',
      rating: 5,
      avatar: '🐓',
      badge: isMarathi ? 'प्रमाणित पोल्ट्री व्यावसायिक' : isHindi ? 'प्रमाणित पोल्ट्री भागीदार' : 'Certified Poultry Partner'
    },
    {
      name: isMarathi ? 'दत्तात्रय थोरात' : isHindi ? 'दत्तात्रेय थोरात' : 'Dattatray Thorat',
      village: isMarathi ? 'संगमनेर, जि. अहमदनगर' : isHindi ? 'संगमनेर, अहमदनगर' : 'Sangamner, Dist. Ahmednagar',
      farmType: isMarathi ? '९ मुऱ्हा म्हशींचा गोठा' : isHindi ? '९ मुर्राह भैंस डेयरी' : '9 Murrah Buffaloes Dairy Farm',
      productUsed: 'Urja Malai Plus (8000)',
      metricLabel: isMarathi ? 'फॅट टक्केवारी' : isHindi ? 'फैट प्रतिशत' : 'Fat Percentage',
      metricValue: '८.२% फॅट',
      metricSub: isMarathi ? 'घट्ट मलई व भरपूर एसएनएफ' : isHindi ? 'गाढ़ी मलाई एवं ठोस' : 'Rich Cream & High Density',
      quote: isMarathi
        ? 'म्हैशींच्या दुधात फॅट कमी लागणे हा आमचा नेहमीचा त्रास होता. उर्जा मलाई प्लस ८००० सुरू केल्यावर अवघ्या १२ दिवसांत फॅट ७.१ वरून ८.२% वर पोहोचले. डेअरीकडून प्रति लिटर ५ रुपये जास्तीचा भाव मिळत आहे. शेतकऱ्यांच्या घामाची कदर फक्त उर्जाच करू शकते!'
        : isHindi
        ? 'भैंस के दूध में कम फैट आना पुरानी समस्या थी। ऊर्जा मलाई प्लस ८००० शुरू करने के १२ दिनों में फैट ७.१ से बढ़कर ८.२% हो गया। ५ रुपये प्रति लीटर अतिरिक्त भाव मिल रहा है।'
        : 'Low fat percentage was a persistent headache with our Murrah buffaloes. After switching to Urja Malai Plus 8000, fat jumped from 7.1% to 8.2% within 12 days. Dairy pays us Rs 5 extra per litre. Urja truly understands the ground realities of rural milk producers.',
      rating: 5,
      avatar: '🥛',
      badge: isMarathi ? 'प्रगतीशील शेतकरी' : isHindi ? 'प्रगतिशील किसान' : 'Progressive Dairy Producer'
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-stone-200/80 text-left relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isMarathi ? 'बळीराजाचा खरा विश्वास' : isHindi ? 'अन्नदाता का विश्वास' : 'Real Voices from the Ground'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {isMarathi ? 'आपल्या शेतकरी बांधवांचे प्रत्यक्ष अनुभव' : isHindi ? 'हमारे किसान भाइयों के वास्तविक अनुभव' : 'Real Stories from Our 10,000+ Partner Farmers'}
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {isMarathi
              ? 'पुणे, अहमदनगर, नाशिक व पश्चिम महाराष्ट्रातील शेतकऱ्यांनी उर्जा पशुखाद्य व युरोपियन शेड्स वापरून मिळवलेला भरघोस नफा.'
              : isHindi
              ? 'पुणे, अहमदनगर, नासिक और पश्चिमी महाराष्ट्र के किसानों के प्रत्यक्ष अनुभव व सफलता।'
              : 'Honest, verified experiences from dairy and poultry farmers across Western Maharashtra who rely on Urja feeds for daily livelihoods.'}
          </p>
        </div>

        {/* 3 Real Farmer Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="card-shine rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-[#fbfbf8] to-white border border-stone-200 shadow-md hover:shadow-2xl hover:border-emerald-400 hover:shadow-glow-emerald hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between group relative"
            >
              <div className="space-y-4">
                
                {/* Farmer Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="font-black text-stone-900 text-base">{t.name}</h4>
                      <div className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{t.village}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 font-mono shadow-2xs">
                    {t.badge}
                  </span>
                </div>

                {/* Star Rating with Twinkle */}
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 animate-sparkle-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
                  ))}
                  <span className="text-xs text-stone-500 ml-1 font-bold">5.0 Verified</span>
                </div>

                {/* Metric Highlight Pill */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-sm group-hover:border-emerald-300 transition-colors">
                  <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    {t.metricLabel}
                  </div>
                  <div className="text-xl font-black text-emerald-900 font-mono mt-0.5">
                    {t.metricValue}
                  </div>
                  <div className="text-xs text-emerald-700 mt-1 font-semibold">
                    {t.metricSub} • <strong className="text-stone-900">{t.productUsed}</strong>
                  </div>
                </div>

                {/* Farmer Quote */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed italic border-l-2 border-emerald-400 pl-3.5 pt-1">
                  "{t.quote}"
                </p>

              </div>

              {/* Verified Trust Strip */}
              <div className="mt-6 pt-4 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-[11px] font-semibold">{t.farmType}</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Human Community Banner */}
        <div className="card-shine mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-harvest-400/10 rounded-full blur-3xl pointer-events-none animate-orb-float"></div>

          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-3xl shrink-0 animate-bounce-subtle">
              🤝
            </div>
            <div>
              <div className="font-black text-white text-base sm:text-lg">
                {isMarathi ? '१०,००० हून अधिक शेतकरी कुटुंबांचे जीवन समृद्ध' : isHindi ? '१०,००० से अधिक किसान परिवारों की समृद्धि का आधार' : 'Enriching Over 10,000 Rural Farmer Households Daily'}
              </div>
              <div className="text-xs text-emerald-200 mt-0.5 font-medium">
                {isMarathi ? 'महाराष्ट्रातील प्रत्येक गावात उर्जा पशुखाद्य व पशुवैद्यकीय डॉक्टरांचे मार्गदर्शन' : isHindi ? 'महाराष्ट्र के हर गांव में ऊर्जा पशु आहार व विशेषज्ञ पशु चिकित्सक मार्गदर्शन' : 'Serving Talukas across Pune, Ahmednagar, Nashik, and Western Maharashtra'}
              </div>
            </div>
          </div>

          <a
            href="tel:+917028939900"
            className="btn-shine relative z-10 px-7 py-4 rounded-2xl bg-harvest-400 hover:bg-harvest-300 text-stone-900 text-xs sm:text-sm font-black shadow-lg hover:shadow-2xl whitespace-nowrap transition-all flex items-center gap-2 hover:scale-[1.03] active:scale-95"
          >
            <PhoneCall className="w-4 h-4 text-stone-900 animate-pulse" />
            <span>{isMarathi ? 'शेतकरी मदत केंद्र: ७०२८९३९९००' : isHindi ? 'किसान सहायता: ७०२८९३९९००' : 'Farmer Support (+91-7028939900)'}</span>
          </a>
        </div>

      </div>
    </section>
  );
}

