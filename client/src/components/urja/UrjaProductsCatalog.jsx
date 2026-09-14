import React, { useState, useEffect } from 'react';
import { Package, ChevronRight, Check, Eye, Sparkles, Zap, X, RefreshCw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import UrjaDataLoader from './UrjaDataLoader';

const DEFAULT_PRODUCTS = [
  {
    id: 'supreme-gold-5000',
    name: 'Urja Supreme Gold (5000)',
    marathiName: 'उर्जा सुप्रीम गोल्ड (५०००)',
    category: 'cattle',
    categoryName: 'Cattle Feed (Milking)',
    tag: 'Bestseller',
    badgeColor: 'emerald',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Supreme-Gold-Front-300x300.webp',
    description: 'High-energy cattle pellet feed specially balanced with bypass protein and essential minerals to boost milk yield and high SNF.',
    specs: ['Protein: 22% Min', 'Fat: 4.5% Min', 'Fiber: 8.5% Max', 'Moisture: 10% Max'],
    packaging: '50 kg Bag',
    benefits: ['Substantial increase in milk quantity', 'Improves milk fat percentage', 'Maintains cattle body condition']
  },
  {
    id: 'malai-plus-8000',
    name: 'Urja Malai Plus (8000)',
    marathiName: 'उर्जा मलाई प्लस (८०००)',
    category: 'cattle',
    categoryName: 'Cattle Feed (High Yield)',
    tag: 'Premium Quality',
    badgeColor: 'amber',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Malai-Plus-Front-300x300.webp',
    description: 'Advanced nutritional pellet formula fortified with micro-minerals and bypass fats, tailored for heavy milking cows and buffaloes.',
    specs: ['Protein: 24% Min', 'Fat: 5.5% Min', 'Calcium: 1.2% Min', 'Phosphorus: 0.6% Min'],
    packaging: '50 kg Bag',
    benefits: ['Prevents post-calving metabolic issues', 'Enhances creamy milk texture', 'Supports healthy reproductive cycle']
  },
  {
    id: 'milk-o-milk',
    name: 'Urja Milk O Milk',
    marathiName: 'उर्जा मिल्क ओ मिल्क',
    category: 'cattle',
    categoryName: 'Cattle Feed (Milking)',
    tag: 'Daily Milking',
    badgeColor: 'emerald',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Milk-O-Milk-Front-300x300.webp',
    description: 'Balanced dairy concentrate promoting regular ruminal fermentation and sustained daily milk synthesis throughout the lactation period.',
    specs: ['Protein: 20% Min', 'Fat: 3.5% Min', 'Digestible Energy: High', 'Form: Pelleted'],
    packaging: '50 kg Bag',
    benefits: ['Optimal feed conversion ratio', 'Easily digestible ingredients', 'Economical daily feed solution']
  },
  {
    id: 'max-magic',
    name: 'Urja Max Magic',
    marathiName: 'उर्जा मॅक्स मॅजिक',
    category: 'cattle',
    categoryName: 'Cattle Feed (Peak Lactation)',
    tag: 'Peak Energy',
    badgeColor: 'amber',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Max-Magic-Front-300x300.webp',
    description: 'Maximum energy dense cattle ration for high-yielding crossbred cows to sustain peak lactation curves without weight loss.',
    specs: ['Energy: High Density', 'Added Enzymes & Probiotics', 'Chelated Minerals', 'Steam Cooked'],
    packaging: '50 kg Bag',
    benefits: ['Prolongs peak lactation period', 'Fast digestion & zero bloating', 'Strengthens immunity']
  },
  {
    id: 'calf-starter-gold',
    name: 'Urja Calf Starter Gold',
    marathiName: 'उर्जा काल्फ स्टार्टर गोल्ड',
    category: 'cattle',
    categoryName: 'Calf Nutrition',
    tag: 'Growth Formula',
    badgeColor: 'blue',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/New-Project-2021-07-06T103829.787-300x194.jpg',
    description: 'Scientifically crafted starter crumble for young calves to stimulate rapid rumen papillae development and early weaning.',
    specs: ['Crude Protein: 24%', 'Milk Solids Enriched', 'Essential Amino Acids', 'Micro Pellets'],
    packaging: '25 kg / 50 kg Bag',
    benefits: ['Accelerates calf weight gain', 'Reduces weaning mortality', 'Builds robust future herd']
  },
  {
    id: 'broiler-finisher-1',
    name: 'Urja Broiler Finisher-1',
    marathiName: 'उर्जा ब्रॉयलर फिनिशर-१',
    category: 'poultry',
    categoryName: 'Poultry & Broiler Feed',
    tag: 'European Standard',
    badgeColor: 'teal',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/New-Project-2021-07-06T103907.054-300x194.jpg',
    description: '100% antibiotic-free broiler finisher pellet produced in a fully automated 150 TPD computerized plant for optimum FCR and carcass yield.',
    specs: ['Protein: 19.5% Min', 'Metabolizable Energy: 3150 kcal/kg', 'Zero Antibiotic Residues', 'Uniform Pellet Size'],
    packaging: '50 kg Bag',
    benefits: ['Superior Feed Conversion Ratio (FCR)', 'Uniform bird body weight', 'Produces juicy, antibiotic-free meat']
  },
  {
    id: 'gavran-feed-starter-finisher',
    name: 'Gavran & Deshi Breeder Feed',
    marathiName: 'गावरान व देशी ब्रीडर फीड',
    category: 'poultry',
    categoryName: 'Deshi Poultry Feed',
    tag: 'Natural Formula',
    badgeColor: 'orange',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/gavrnstrtr-300x194.jpg',
    description: 'Custom formulated for indigenous country chicken breeds (Gavran / Deshi), ensuring natural feather shine, disease resistance, and robust vitality.',
    specs: ['Natural Grains & Pulses', 'Herbal Extracts Added', 'Balanced Amino Profile', 'Crumbles & Pellets'],
    packaging: '50 kg Bag',
    benefits: ['Enhanced natural taste & firmness', 'Lower mortality in village settings', 'Fast feathering & active birds']
  },
  {
    id: 'layer-concentrate-35-50',
    name: 'Layer Concentrate (35% & 50%)',
    marathiName: 'लेयर कॉन्सन्ट्रेट (३५% व ५०%)',
    category: 'layer',
    categoryName: 'Commercial Layer Concentrate',
    tag: 'Max Egg Production',
    badgeColor: 'purple',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/prt-300x194.jpg',
    description: 'High-potency amino acid and mineral concentrate designed to be blended with local grains for top egg production and sturdy shell quality.',
    specs: ['Available: 35% & 50% Mix', 'Methionine & Lysine Fortified', 'Calcium & Phytase Boosted', 'Dust Free Mash/Pellet'],
    packaging: '50 kg Bag',
    benefits: ['Sustains >92% peak egg laying rate', 'Thick, crack-resistant brown & white shells', 'Reduces overall feed mixing cost']
  },
  {
    id: 'layer-pre-mix',
    name: 'Layer Pre-Mix (5% & 35%)',
    marathiName: 'लेयर प्री-मिक्स (५% व ३५%)',
    category: 'layer',
    categoryName: 'Commercial Pre-Mixes',
    tag: 'Custom Blending',
    badgeColor: 'purple',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/New-Project-2021-07-06T104000.163-300x194.jpg',
    description: 'Precision trace mineral, vitamin, and toxin-binder premix to manufacture cost-effective farm-made feeds with complete batch uniformity.',
    specs: ['Active Vitamins A, D3, E, B-Complex', 'Toxin Binders Included', 'High Bioavailability', 'Fine Premix'],
    packaging: '25 kg Bag',
    benefits: ['Eliminates nutritional deficiencies', 'Protects against mycotoxins', 'Optimizes feed efficiency']
  }
];

export default function UrjaProductsCatalog({ onSelectProduct, onNavigate }) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loading, setLoading] = useState(false);
  const [detailModal, setDetailModal] = useState(null);

  // Fetch products from backend MySQL API with default fallback
  const fetchCatalogData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/urja/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (err) {
      console.warn('API error, using default products catalog:', err);
    } finally {
      // Gentle 500ms delay to smoothly display the skeleton animation
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchCatalogData();
  }, []);

  const handleCategorySwitch = (categoryId) => {
    if (categoryId === activeCategory) return;
    setLoading(true);
    setActiveCategory(categoryId);
    setTimeout(() => {
      setLoading(false);
    }, 380);
  };

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-16 sm:py-20 bg-transparent text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-urja-100 text-urja-800 text-xs font-bold border border-urja-200 shadow-xs animate-bounce-subtle">
            <Package className="w-3.5 h-3.5 text-urja-600" />
            <span>{t.products.tag}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            <span className="text-gradient-emerald">{t.products.title}</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
            {t.products.subtitle}
          </p>
        </div>

        {/* Modern Filter Pills & Live Data Refresh Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-200/60 backdrop-blur-md rounded-2xl border border-slate-300/60 shadow-xs">
            {t.products.tabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleCategorySwitch(tab.id)}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-white text-urja-900 shadow-sm font-extrabold border border-slate-200 scale-[1.02]'
                      : 'text-slate-600 hover:text-urja-800 hover:bg-white/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Refresh Data Trigger to Test Animation */}
          <button
            onClick={fetchCatalogData}
            disabled={loading}
            className="p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-600 hover:text-urja-700 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 text-xs font-bold disabled:opacity-50"
            title="Reload live products from database"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-urja-600 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden md:inline">Reload Catalog</span>
          </button>
        </div>

        {/* Conditional Data Loading Animation vs Products Grid */}
        {loading ? (
          <UrjaDataLoader
            type="skeleton-catalog"
            count={6}
            message="Streaming formulation specifications from Urja database..."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left animate-page-instant">
          {filtered.map((prod) => (
            <div
              key={prod.id}
              className="card-shine product-card flex flex-col justify-between group shadow-sm bg-white hover:border-emerald-300 hover:shadow-glow-emerald hover:-translate-y-2 transition-all duration-500"
            >
              <div>
                {/* Product Image Stage */}
                <div className="h-64 bg-gradient-to-b from-slate-50 to-slate-100/70 p-6 flex items-center justify-center relative overflow-hidden border-b border-slate-100 rounded-t-3xl">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    loading="lazy"
                    className="max-h-52 w-auto object-contain group-hover:scale-110 group-hover:rotate-1 transition-transform duration-500 drop-shadow-md"
                    onError={(e) => {
                      e.target.src = 'https://www.urjafoods.net/wp-content/uploads/2021/06/logo.png';
                    }}
                  />
                  {prod.tag && (
                    <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-[11px] font-extrabold bg-white/95 backdrop-blur-md text-urja-800 shadow-sm border border-emerald-200 animate-bounce-subtle">
                      {prod.tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 left-4 px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-white/95 text-slate-700 border border-slate-200 shadow-xs">
                    {prod.packaging}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-7 space-y-4">
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-urja-700 bg-urja-50 px-2.5 py-0.5 rounded border border-urja-200">
                      {prod.categoryName}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-urja-700 transition-colors mt-2">
                      {prod.name}
                    </h3>
                    <div className="text-xs text-slate-500 font-semibold mt-0.5">
                      {prod.marathiName}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>

                  {/* Specifications Pills */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {prod.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 text-[11px] font-mono font-semibold text-slate-700 border border-slate-200/80 hover:border-emerald-300 transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  {/* Key Benefits Checklist */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    {prod.benefits.slice(0, 2).map((b, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-7 pt-0 flex gap-2.5">
                <button
                  onClick={() => setDetailModal(prod)}
                  className="px-4 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors hover:border-slate-300"
                  title="View Full Specifications"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{t.products.viewSpecs}</span>
                </button>

                <button
                  onClick={() => {
                    if (onNavigate) onNavigate('contact');
                    if (onSelectProduct) onSelectProduct(prod.name);
                  }}
                  className="btn-shine flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-urja-600 to-urja-700 hover:from-urja-700 hover:to-urja-800 text-white text-xs font-extrabold transition-all shadow-md shadow-urja-900/20 hover:shadow-lg flex items-center justify-center gap-1.5 active:scale-95 group"
                >
                  <span>{t.products.bookQuote}</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>
        )}

        {/* Modal for Detailed Specifications */}
        {detailModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-page-instant">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-left space-y-5 shadow-2xl relative">
              <button
                onClick={() => setDetailModal(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <img
                  src={detailModal.image}
                  alt={detailModal.name}
                  className="w-20 h-20 object-contain p-2 bg-slate-50 rounded-2xl border border-slate-200"
                />
                <div>
                  <span className="text-xs font-extrabold uppercase text-urja-700">{detailModal.categoryName}</span>
                  <h3 className="text-xl font-extrabold text-slate-900">{detailModal.name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{detailModal.marathiName}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {detailModal.description}
              </p>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  {t.products.modalTitle}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {detailModal.specs.map((s, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-semibold text-slate-800">
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  {t.products.modalBenefits}
                </div>
                {detailModal.benefits.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    const name = detailModal.name;
                    setDetailModal(null);
                    if (onNavigate) onNavigate('contact');
                    if (onSelectProduct) onSelectProduct(name);
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-urja-700 to-urja-600 text-white font-extrabold text-sm shadow-md hover:from-urja-800 hover:to-urja-700 transition-all"
                >
                  {t.products.modalCta}
                </button>
                <button
                  onClick={() => setDetailModal(null)}
                  className="px-5 py-3.5 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 transition-colors"
                >
                  {t.products.modalClose}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
