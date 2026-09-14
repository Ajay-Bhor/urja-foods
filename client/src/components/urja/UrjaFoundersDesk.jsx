import React from 'react';
import { Quote, Award, Heart, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaFoundersDesk() {
  const { language } = useLanguage();

  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  const content = {
    badge: isMarathi ? 'संस्थापकांचे मनोगत' : isHindi ? 'संस्थापक का संदेश' : "Founder's Executive Vision",
    title: isMarathi ? 'शेतकरी बांधवांसाठी समर्पित २० वर्षांचा समृद्ध प्रवास' : isHindi ? 'किसान भाइयों के लिए समर्पित २० वर्षों की यात्रा' : '20 Years of Devotion to our Farming Community',
    subtitle: isMarathi ? 'श्री. प्रमोद आनंदराव हिंगे — संस्थापक व प्रबंध संचालक, उर्जा फुड्स ॲण्ड ॲग्रो' : isHindi ? 'श्री. प्रमोद आनंदराव हिंगे — संस्थापक एवं प्रबंध निदेशक, ऊर्जा फूड्स' : 'Mr. Pramod Anandrao Hinge — Founder & Managing Director, Urja Foods & Agro',
    quoteP1: isMarathi
      ? 'माझा जन्म आंबेगाव तालुक्यातील निरगुडसर येथील एका सामान्य शेतकरी कुटुंबात झाला. पहाटे चार वाजता गोठ्यात गायींची सेवा करणारा शेतकरी आणि रात्रंदिवस राबूनही मिळणारा अनिश्चित नफा मी स्वतः अनुभवला आहे. म्हणूनच २००५ साली जेव्हा उर्जाची स्थापना केली, तेव्हा एकच ध्यास होता — शेतकऱ्यांच्या घामाला योग्य दाम आणि जनावरांना सकस, शुद्ध आहार मिळायलाच हवा.'
      : isHindi
      ? 'मेरा जन्म आंबेगांव तहसील के निरगुडसर में एक सामान्य किसान परिवार में हुआ। सुबह चार बजे से गौमाता की सेवा करने वाले अन्नदाता का परिश्रम मैंने खुद जिया है। इसीलिए २००५ में जब ऊर्जा की नींव रखी, तो सिर्फ एक ही संकल्प था — किसान के पसीने का सही मूल्य और मवेशियों को पौष्टिक, मिलावट-मुक्त आहार।'
      : 'I was born into a humble farming family in Nirgudsar, Ambegaon. I witnessed firsthand the sacrifices of our farmers waking up at 4 AM to tend to their cattle, often facing uncertain returns despite tireless toil. When I founded Urja Foods in 2005 with a small feed mill, my pledge was simple: never compromise on quality, because a farmer’s family livelihood depends on every single bag of feed.',
    quoteP2: isMarathi
      ? 'गेल्या २० वर्षांत उर्जाने महाराष्ट्रात पहिल्यांदा १००% युरोपियन क्लायमेट कंट्रोल्ड शेड्स आणल्या, १५० टन प्रति दिवस स्वयंचलित फीड प्लांट उभारला. परंतु आमचे खरे यश तंत्रज्ञानात नाही, तर पश्चिम महाराष्ट्रातील १०,००० हून अधिक शेतकरी बांधवांनी उर्जावर दाखवलेल्या अढळ विश्वासात आहे.'
      : isHindi
      ? 'विगत २० वर्षों में ऊर्जा ने महाराष्ट्र में पहली बार १००% यूरोपीय पर्यावरण नियंत्रित पोल्ट्री शेड्स स्थापित किए और १५० टन/दिन का आधुनिक फीड प्लांट लगाया। पर हमारी सच्ची पूंजी टेक्नोलॉजी नहीं, बल्कि १०,००० से अधिक किसान भाइयों का अटूट भरोसा है।'
      : 'Over the past 20 years, Urja introduced Maharashtra’s first 100% European Climate-Controlled poultry sheds and built a 150 Tons Per Day automated plant. Yet, our truest achievement is not our machinery — it is the unwavering trust placed in us by over 10,000 hardworking rural families across Western Maharashtra.',
    signOff: isMarathi ? 'आपला नम्र,' : isHindi ? 'आपका स्नेही,' : 'Warmly yours,',
    signatureTitle: isMarathi ? 'प्रमोद आनंदराव हिंगे' : isHindi ? 'प्रमोद आनंदराव हिंगे' : 'Pramod Anandrao Hinge',
    signatureRole: isMarathi ? 'संस्थापक व प्रबंध संचालक' : isHindi ? 'संस्थापक एवं प्रबंध निदेशक' : 'Founder & Managing Director',
    pillars: isMarathi
      ? ['शेतकऱ्यांचे आर्थिक सक्षमीकरण', '१००% शुद्ध, भेसळमुक्त आहार', 'ग्रामीण भागात २५०+ थेट रोजगार', 'शेतकऱ्यांच्या पाठीशी खंबीर साथ']
      : isHindi
      ? ['किसानों का आर्थिक सशक्तिकरण', '१००% शुद्ध, मिलावट-मुक्त आहार', 'ग्रामीण क्षेत्र में २५०+ रोजगार', 'किसान के साथ सदैव खड़े']
      : ['Farmer Economic Empowerment', '100% Pure, Unadulterated Feed', '250+ Direct Rural Jobs in Pune', 'Always Standing by our Farmers']
  };

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#fbfbf8] via-white to-[#fbfbf8] border-y border-stone-200/80 relative overflow-hidden text-left">
      {/* Dynamic Warm Sun & Emerald Background Blurs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-stone-200/90 shadow-2xl shadow-stone-900/5 p-8 sm:p-12 lg:p-16 overflow-hidden relative">
          
          {/* Subtle Golden Top Accent Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-harvest-400 to-emerald-600"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Founder Portrait & Trust Badges */}
            <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative">
                {/* Photo frame with warm natural styling and gold rim */}
                <div className="card-shine rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-stone-950/15 bg-stone-100 w-72 h-96 sm:w-96 sm:h-[440px] relative group ring-1 ring-stone-200 hover:shadow-glow-emerald transition-all duration-500">
                  <img
                    src="/new-project-14.jpg"
                    alt={content.signatureTitle}
                    className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-14.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent"></div>
                  
                  {/* Floating Identity Card at bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200 text-left shadow-lg group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <div className="font-extrabold text-stone-900 text-sm sm:text-base">{content.signatureTitle}</div>
                      <ShieldCheck className="w-4 h-4 text-emerald-600 animate-pulse" />
                    </div>
                    <div className="text-xs text-emerald-800 font-bold mt-0.5">{content.signatureRole}</div>
                    <div className="text-[11px] text-stone-500 mt-1 font-mono">Nirgudsar, Ambegaon, Pune • Est. 2005</div>
                  </div>
                </div>

                {/* Floating "Son of the Soil" Badge with gentle floating animation */}
                <div className="absolute -top-4 -right-4 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-600 text-white shadow-xl shadow-emerald-900/20 flex items-center gap-2 text-xs font-black ring-4 ring-white animate-float-slow">
                  <Heart className="w-4 h-4 fill-harvest-300 text-harvest-300 shrink-0 animate-pulse" />
                  <span>{isMarathi ? 'मातीशी नाळ जोडलेले नेतृत्व' : isHindi ? 'मिट्टी से जुड़ा नेतृत्व' : 'Son of the Soil'}</span>
                </div>
              </div>

              {/* 4 Guiding Human Values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-8 w-full">
                {content.pillars.map((pill, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-stone-50/80 hover:bg-emerald-50/70 border border-stone-200/80 hover:border-emerald-300 text-xs font-bold text-stone-800 transition-all duration-300 hover:-translate-y-0.5 group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Heartfelt Letter from the Founder */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-harvest-100 text-harvest-800 border border-harvest-200 shadow-sm shrink-0 mt-1 animate-bounce-subtle">
                  <Quote className="w-6 h-6 rotate-180" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{content.badge}</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
                    {content.title}
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-normal">
                <p className="border-l-4 border-harvest-500 pl-4 sm:pl-5 italic text-stone-800 bg-harvest-50/60 py-3 rounded-r-2xl text-base sm:text-lg leading-relaxed">
                  "{content.quoteP1}"
                </p>

                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {content.quoteP2}
                </p>
              </div>

              {/* Founder Sign-off & 20 Years Dedication Badge */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div>
                  <div className="text-xs text-stone-500 font-semibold">{content.signOff}</div>
                  <div className="font-extrabold text-xl text-stone-900 font-serif tracking-wide mt-1">
                    {content.signatureTitle}
                  </div>
                  <div className="text-xs text-emerald-800 font-bold mt-0.5">
                    {content.signatureRole}, Urja Foods & Agro Pvt. Ltd.
                  </div>
                </div>

                <div className="inline-flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-stone-900 to-stone-800 text-white text-xs font-bold shadow-md">
                  <Award className="w-4 h-4 text-harvest-400 shrink-0" />
                  <span>20+ Years Dedicated to Rural Prosperity</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

