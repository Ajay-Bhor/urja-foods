import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingUp, ArrowRight, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function UrjaFarmerCalculator({ onNavigate, onInquireClick }) {
  const { language } = useLanguage();
  const isMarathi = language === 'mr';
  const isHindi = language === 'hi';

  const [animalType, setAnimalType] = useState('cow'); // 'cow' | 'buffalo'
  const [animalCount, setAnimalCount] = useState(8);
  const [currentYield, setCurrentYield] = useState(12); // litres per animal/day

  // Calculation formulas based on ICAR dairy nutrition standards:
  // Maintenance feed ~1.5kg + 400g per litre of milk produced
  const dailyFeedPerAnimal = animalType === 'cow'
    ? Math.round((1.5 + currentYield * 0.4) * 10) / 10
    : Math.round((2.0 + currentYield * 0.45) * 10) / 10;

  const totalMonthlyBags = Math.ceil((dailyFeedPerAnimal * animalCount * 30) / 50);
  
  // Typical milk yield jump with bypass protein feed
  const expectedGainPerAnimal = animalType === 'cow' ? 2.4 : 1.8; // litres/day
  const totalExtraMilkMonthly = Math.round(expectedGainPerAnimal * animalCount * 30);
  
  // Current Maharashtra average milk rate (Cow ₹34/L, Buffalo ₹56/L)
  const milkRate = animalType === 'cow' ? 34 : 56;
  const extraMonthlyRevenue = Math.round(totalExtraMilkMonthly * milkRate);

  const recommendedFeed = animalType === 'cow'
    ? (currentYield > 14 ? 'Urja Supreme Gold (5000)' : 'Urja Milk O Milk')
    : 'Urja Malai Plus (8000)';

  const presets = [
    { label: isMarathi ? '५ लहान गोठा' : isHindi ? '५ छोटा डेयरी' : '5 Farm', count: 5 },
    { label: isMarathi ? '१० मध्यम गोठा' : isHindi ? '१० मध्यम' : '10 Medium', count: 10 },
    { label: isMarathi ? '२० व्यावसायिक' : isHindi ? '२० डेयरी' : '20 Commercial', count: 20 },
    { label: isMarathi ? '३५ मोठा गोठा' : isHindi ? '३५ बड़ा फार्म' : '35 Large Farm', count: 35 }
  ];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200/80 text-left relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-harvest-400/15 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold border border-emerald-200 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>{isMarathi ? 'गोठा नफा व आहार गणक' : isHindi ? 'डेयरी मुनाफा कैलकुलेटर' : 'Smart Herd Nutrition & Profit Calculator'}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            {isMarathi ? 'आपल्या गोठ्यातील दूध वाढ व जास्तीचा नफा तपासा' : isHindi ? 'अपने डेयरी फार्म के दूध उत्पादन और मुनाफे का अनुमान लगाएं' : 'Maximize Milk Yield & Boost Monthly Dairy Profits'}
          </h2>
          
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {isMarathi
              ? 'आपल्या जनावरांची संख्या व सध्याचे दूध निवडा. उर्जा संतुलित आहारामुळे मिळणारा जास्तीचा नफा व अचूक बॅग्स आवश्यकता येथे त्वरित तपासा.'
              : isHindi
              ? 'पशुओं की संख्या और वर्तमान दूध उत्पादन चुनें। ऊर्जा संतुलित आहार से होने वाले अतिरिक्त मुनाफे की सटीक गणना करें।'
              : 'Estimate exact monthly 50kg feed bag requirement and calculate additional gross milk revenue achieved through scientifically balanced nutrition.'}
          </p>
        </div>

        {/* Interactive Calculator Workspace Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-stone-200 shadow-2xl p-6 sm:p-10 lg:p-12 max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Interactive Inputs */}
            <div className="lg:col-span-6 space-y-7 flex flex-col justify-between">
              
              {/* Step 1: Livestock Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] flex items-center justify-center font-black">1</span>
                    <span>{isMarathi ? 'जनावराचा प्रकार निवडा:' : isHindi ? 'पशु का प्रकार चुनें:' : 'Select Livestock Species:'}</span>
                  </label>
                  <span className="text-[11px] font-semibold text-stone-500">
                    {animalType === 'cow' ? (isMarathi ? 'गायींसाठी खास आहार' : 'Cow Profile') : (isMarathi ? 'म्हशींसाठी खास आहार' : 'Buffalo Profile')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <button
                    type="button"
                    onClick={() => setAnimalType('cow')}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      animalType === 'cow'
                        ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-stone-50 hover:bg-stone-100/80 text-stone-700 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🐄</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${animalType === 'cow' ? 'border-emerald-600 bg-emerald-600' : 'border-stone-300'}`}>
                        {animalType === 'cow' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <div className="font-bold text-stone-900 text-sm">{isMarathi ? 'संकरित गाय (HF / जर्सी)' : isHindi ? 'संकर गाय (HF/Jersey)' : 'Crossbred Cow (HF/Jersey)'}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{isMarathi ? 'जास्त दूध व बायपास प्रोटीन' : 'High Volume + Bypass Protein'}</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAnimalType('buffalo')}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                      animalType === 'buffalo'
                        ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                        : 'bg-stone-50 hover:bg-stone-100/80 text-stone-700 border-stone-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">🐃</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${animalType === 'buffalo' ? 'border-emerald-600 bg-emerald-600' : 'border-stone-300'}`}>
                        {animalType === 'buffalo' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <div className="font-bold text-stone-900 text-sm">{isMarathi ? 'म्हैस (मुऱ्हा / मेहसाणा)' : isHindi ? 'भैंस (मुर्राह/जाफराबादी)' : 'Milking Buffalo (Murrah)'}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{isMarathi ? '८.०%+ फॅट व घट्ट मलई' : '8.0%+ Fat & Heavy Solids'}</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Animal Count with Quick Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] flex items-center justify-center font-black">2</span>
                    <span>{isMarathi ? 'दुभत्या जनावरांची संख्या:' : isHindi ? 'दुधारू पशुओं की संख्या:' : 'Number of Milking Animals:'}</span>
                  </label>
                  <span className="text-base font-black font-mono text-emerald-900 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shadow-sm">
                    {animalCount} {isMarathi ? 'जनावरे' : isHindi ? 'पशु' : 'Animals'}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  {presets.map((p) => (
                    <button
                      key={p.count}
                      type="button"
                      onClick={() => setAnimalCount(p.count)}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                        animalCount === p.count
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-stone-100/80 hover:bg-stone-200 text-stone-600 border-stone-200'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="1"
                  max="50"
                  value={animalCount}
                  onChange={(e) => setAnimalCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1.5 font-mono">
                  <span>१ जनावर</span>
                  <span>२५ जनावरे</span>
                  <span>५० जनावरे</span>
                </div>
              </div>

              {/* Step 3: Current Daily Yield per Animal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[11px] flex items-center justify-center font-black">3</span>
                    <span>{isMarathi ? 'प्रति जनावर दैनिक सरासरी दूध:' : isHindi ? 'प्रति पशु दैनिक औसत दूध:' : 'Average Daily Milk Yield per Animal:'}</span>
                  </label>
                  <span className="text-base font-black font-mono text-emerald-900 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 shadow-sm">
                    {currentYield} {isMarathi ? 'लिटर' : 'Litres'}/Day
                  </span>
                </div>

                <input
                  type="range"
                  min="4"
                  max="35"
                  value={currentYield}
                  onChange={(e) => setCurrentYield(Number(e.target.value))}
                  className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none"
                />
                <div className="flex justify-between text-[11px] text-stone-400 mt-1.5 font-mono">
                  <span>४ L (Desi / Buffalo)</span>
                  <span>१८ L (Standard HF)</span>
                  <span>३५ L (High-Yield Dairy)</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs text-stone-600 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  {isMarathi
                    ? 'उर्जा बायपास प्रोटीन व चीलेटेड मिनरल्समुळे पचनक्रिया सुधारते व दूध टिकून राहते.'
                    : 'Bypass nutrition ensures metabolic efficiency, avoiding body-weight loss during peak lactation.'}
                </span>
              </div>

            </div>

            {/* Right Column: Premium High-Impact Output Card with Card-Shine */}
            <div className="card-shine lg:col-span-6 bg-gradient-to-br from-[#0c2419] via-[#091f16] to-[#04120c] rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden border border-emerald-900/50 hover:border-emerald-500/40 transition-all duration-500">
              
              {/* Subtle background glow circle with Orb Float */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none animate-orb-float"></div>
              
              <div className="space-y-6 relative z-10">
                {/* Header Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-800/60">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      {isMarathi ? 'उर्जा शिफारस व नफा विश्लेषण' : isHindi ? 'अनुशंसित आहार और लाभ विश्लेषण' : 'Urja Nutrition & Profit Analysis'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-700/60">
                    ICAR Nutrition Compliant
                  </span>
                </div>

                {/* Recommended Product Box */}
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:border-emerald-400/50 transition-all">
                  <div className="text-xs text-emerald-200/90 font-medium">
                    {isMarathi ? 'आपल्या गोठ्यासाठी सर्वोत्तम संतुलित खाद्य:' : isHindi ? 'आपके फार्म के लिए सर्वश्रेष्ठ आहार:' : 'Ideal Recommended Balanced Formulation:'}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center justify-between">
                    <span>{recommendedFeed}</span>
                    <Sparkles className="w-5 h-5 text-harvest-400 shrink-0 animate-bounce-subtle" />
                  </div>
                  <div className="text-[11px] text-emerald-300/80 mt-1 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-harvest-400 shrink-0" />
                    <span>~{dailyFeedPerAnimal} kg / {isMarathi ? 'जनावर / दिवस' : 'animal / day'} (50kg Steam Pellets)</span>
                  </div>
                </div>

                {/* 2 Key Stat Cards with Hover Lift */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-400/40 transition-all duration-300">
                    <div className="text-xs text-stone-300 font-medium">{isMarathi ? 'दरमहा ५० किलो बॅग्स' : 'Monthly 50kg Bags'}</div>
                    <div className="text-2xl font-black text-white font-mono mt-1">{totalMonthlyBags} <span className="text-sm font-semibold text-emerald-300">Bags</span></div>
                    <div className="text-[10px] text-stone-400 mt-1">{animalCount} {isMarathi ? 'जनावरांसाठी' : 'milking heads'}</div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300">
                    <div className="text-xs text-stone-300 font-medium">{isMarathi ? 'अपेक्षित जास्तीचे दूध' : 'Extra Monthly Milk'}</div>
                    <div className="text-2xl font-black text-harvest-300 font-mono mt-1">+{totalExtraMilkMonthly.toLocaleString('en-IN')} <span className="text-sm font-semibold">L</span></div>
                    <div className="text-[10px] text-stone-400 mt-1">~+{expectedGainPerAnimal} L / {isMarathi ? 'जनावर / दिवस' : 'animal/day'}</div>
                  </div>
                </div>

                {/* Net Extra Monthly Income Highlight Box with Animated Gradient Flow */}
                <div className="card-shine p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 animate-gradient-flow text-white shadow-2xl relative overflow-hidden border border-emerald-400/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-100 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-white animate-bounce-subtle" />
                      <span>{isMarathi ? 'अंदाजे जास्तीचे मासिक उत्पन्न:' : isHindi ? 'अतिरिक्त अनुमानित मासिक आय:' : 'Estimated Extra Monthly Dairy Income:'}</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white font-mono shadow-xs">
                      ₹{milkRate}/L
                    </span>
                  </div>
                  
                  <div className="text-3xl sm:text-4xl font-black font-mono mt-2 tracking-tight text-white drop-shadow-md">
                    +₹{extraMonthlyRevenue.toLocaleString('en-IN')} <span className="text-sm font-bold text-emerald-100">/ {isMarathi ? 'महिना' : isHindi ? 'माह' : 'Month'}</span>
                  </div>
                  
                  <div className="text-[11px] text-emerald-100 mt-1 font-medium">
                    * {isMarathi
                        ? 'पश्चिम महाराष्ट्र सरासरी दूध भाव आणि सुधारित फॅट/एसएनएफ वर आधारित.'
                        : 'Calculated using Western Maharashtra dairy procurement rates & peak lactation retention.'}
                  </div>
                </div>
              </div>

              {/* Call to Action CTA with Button Shine */}
              <div className="pt-6 mt-6 border-t border-emerald-800/60 relative z-10">
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) onNavigate('contact');
                    if (onInquireClick) onInquireClick(`${recommendedFeed} - Need ${totalMonthlyBags} Bags for ${animalCount} animals`);
                  }}
                  className="btn-shine w-full py-4 px-6 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 text-sm font-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group hover:scale-[1.02] active:scale-95"
                >
                  <span>{isMarathi ? 'या पशुखाद्याची चौकशी व डीलर दर मिळवा' : isHindi ? 'इस आहार की पूछताछ करें और डीलर मूल्य पाएं' : 'Get Factory Price Quote for This Quantity'}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

