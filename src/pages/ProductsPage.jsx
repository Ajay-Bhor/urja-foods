import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, Sparkles, ArrowRight, CheckCircle2, Factory, PhoneCall } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import ProductCatalog from '../components/ProductCatalog';

export default function ProductsPage({ onSelectProduct, onQuickInquire }) {
  const qualityPillars = [
    {
      title: 'Bypass Protein & Fat (UDP/RDP)',
      desc: 'Formulated with high rumen undegradable protein and bypass fats to maximize bio-availability directly in the small intestine for higher butterfat (FAT & SNF) in dairy cows.',
    },
    {
      title: 'Steam Conditioned Pelleting',
      desc: 'Our 150 TPD computerized plant conditions mash with controlled pressurized steam, gelatinizing starches for superior digestibility and eliminating dust or feed wastage.',
    },
    {
      title: 'Chelated Trace Minerals',
      desc: 'Enriched with zinc, copper, cobalt, selenium, and vitamins A, D3, and E to boost herd fertility, reduce somatic cell count, and prevent postpartum metabolic disorders.',
    },
    {
      title: 'Multi-Batch Laboratory Testing',
      desc: 'Every incoming raw grain and outgoing feed lot is tested for crude protein, moisture, calcium-phosphorus ratio, and mycotoxin levels to ensure 100% purity.',
    },
  ];

  return (
    <div className="products-page-view">
      {/* 1. Header Banner */}
      <PageBanner
        badge="Laboratory-Certified Nutrition"
        title="Scientific Feeds & Livestock Products"
        subtitle="Explore our proven range of high-fat cattle feeds, high-FCR broiler crumbles, and layer concentrates formulated at our 150 TPD automated plant in Nirgudsar, Pune."
        breadcrumb="Products & Feed"
      />

      {/* 2. Interactive Product Catalog */}
      <div id="catalog-section">
        <ProductCatalog
          onSelectProduct={onSelectProduct}
          onQuickInquire={onQuickInquire}
        />
      </div>


      {/* 4. Manufacturing Quality & Formulation Standards */}
      <section className="section bg-subtle" id="feed-standards">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-green">Nutrition Science</div>
            <h2>The Urja Quality Guarantee</h2>
            <p className="section-subtitle">
              Every bag of Urja Pashu Aahar and Broiler Nutrition is crafted to rigorous nutritional standards.
            </p>
          </div>

          <div className="standards-grid">
            {qualityPillars.map((item, idx) => (
              <div className="standard-card" key={idx}>
                <div className="standard-card-icon">
                  <CheckCircle2 size={24} color="var(--primary)" />
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Dealership & Bulk Inquiries CTA */}
      <section className="section section-dark bg-dark-mesh">
        <div className="container text-center">
          <div className="badge badge-dark-pill">Bulk Supply & Dealerships</div>
          <h2 style={{ color: '#ffffff', maxWidth: '720px', margin: '1rem auto' }}>
            Looking for Bulk Feed Supply or Dealership Opportunities?
          </h2>
          <p style={{ color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
            We partner with agricultural supply stores, dairy cooperatives, and poultry dealers across Maharashtra with attractive margins and dedicated field delivery.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-gold" style={{ padding: '1rem 2.2rem' }}>
              <span>Request Dealership Quotation</span>
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+917028939900" className="btn btn-outline-white" style={{ padding: '1rem 2.2rem' }}>
              <PhoneCall size={18} />
              <span>Talk to Feed Specialist: +91-7028939900</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
