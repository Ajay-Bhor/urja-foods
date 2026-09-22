import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Bird,
  Milk,
  Wheat,
  Egg,
  Store,
  Sprout,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Award,
  TrendingUp,
  Sparkles,
  PhoneCall,
  Check,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';
import { BUSINESSES_DATA, BUSINESS_ALIASES } from '../data/businessesData';

// Map IDs to specific Lucide icons
const ICONS_MAP = {
  'urja-foods': <Bird size={32} />,
  'urja-pashu-aahar': <Milk size={32} />,
  'poushtik-chicken': <Store size={32} />,
  'urja-organic': <Sprout size={32} />,
  'urja-soya': <Wheat size={32} />,
  'contract-farming': <Bird size={32} />,
  'cattle-feeds': <Milk size={32} />,
  'poultry-feeds': <Wheat size={32} />,
  hatchery: <Egg size={32} />,
  'chicken-feast': <Store size={32} />,
  'bio-fertilizers': <Sprout size={32} />,
};

export default function BusinessDetailPage({ onQuickInquire }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const resolvedId = BUSINESS_ALIASES[id] || id;
  const business = BUSINESSES_DATA.find((b) => b.id === resolvedId);

  // If ID doesn't match any business, show a clean fallback
  if (!business) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2>Business Vertical Not Found</h2>
        <p style={{ color: 'var(--text-muted)', margin: '1rem 0 2rem' }}>
          The business or service vertical you are looking for does not exist or has moved.
        </p>
        <Link to="/businesses" className="btn btn-primary">
          <ArrowLeft size={18} />
          <span>Return to All Businesses</span>
        </Link>
      </div>
    );
  }

  // Other 5 businesses for cross-navigation
  const otherBusinesses = BUSINESSES_DATA.filter((b) => b.id !== business.id);

  const handleCtaClick = () => {
    if (onQuickInquire) {
      onQuickInquire(business.title);
    } else {
      navigate('/contact');
    }
  };

  return (
    <div className="business-detail-page">
      {/* 1. Header Banner */}
      <PageBanner
        badge={business.badge}
        title={business.title}
        subtitle={business.tagline}
        breadcrumb={business.shortTitle}
      />

      {/* 2. Main Narrative & Quick Stats */}
      <section className="section bg-white">
        <div className="container">
          <div className="business-detail-hero-grid">
            {/* Left Narrative Column */}
            <div className="business-hero-narrative">
              <div className="business-hero-badge-row">
                <span
                  className="badge"
                  style={{
                    backgroundColor: business.tagBg,
                    color: business.tagColor,
                    fontSize: '0.85rem',
                    padding: '0.35rem 0.85rem',
                  }}
                >
                  {business.tag}
                </span>
                <span className="business-hero-icon-pill" style={{ color: business.accentColor }}>
                  {ICONS_MAP[business.id]}
                </span>
              </div>

              <h2 className="business-hero-title">
                Pioneering Excellence in {business.shortTitle}
              </h2>

              <p className="business-hero-desc">{business.overview}</p>

              {/* Farmer Benefits Checklist */}
              <div className="business-hero-highlights">
                <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '0.85rem', fontWeight: 700 }}>
                  Key Advantages for Our Partners:
                </h4>
                <ul className="business-highlights-list">
                  {business.farmerBenefits.map((benefit, bIdx) => (
                    <li key={bIdx}>
                      <CheckCircle2 size={18} color={business.accentColor} style={{ minWidth: '18px', marginTop: '3px' }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleCtaClick}
                  className="btn btn-primary"
                  style={{ background: business.accentColor, borderColor: business.accentColor }}
                >
                  <span>{business.ctaButton}</span>
                  <ArrowRight size={18} />
                </button>
                <Link to="/contact" className="btn btn-secondary">
                  <PhoneCall size={18} />
                  <span>Talk to an Expert</span>
                </Link>
              </div>
            </div>

            {/* Right Media & Metrics Column */}
            <div className="business-hero-media-col">
              <div className="business-media-card">
                <div className="business-media-img-wrap">
                  <img
                    src={business.image}
                    alt={business.title}
                    className="business-media-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/company-plant.jpg';
                    }}
                  />
                  <div
                    className="business-media-tag"
                    style={{ backgroundColor: `${business.accentColor}ee` }}
                  >
                    Urja Operational Facility
                  </div>
                </div>

                {/* 4 Quick Stat Metric Cards */}
                <div className="business-stats-grid">
                  {business.stats.map((stat, sIdx) => (
                    <div className="business-stat-cell" key={sIdx}>
                      <div className="business-stat-val" style={{ color: business.accentColor }}>
                        {stat.value}
                      </div>
                      <div className="business-stat-lbl">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Poultry & Food Cycle (Specifically for Urja Foods) */}
      {resolvedId === 'urja-foods' && (
        <section className="section bg-subtle" id="urja-foods-cycle" style={{ padding: '80px 0' }}>
          <div className="container">
            <div className="section-header text-center" style={{ maxWidth: '820px', margin: '0 auto 50px' }}>
              <div className="badge badge-green">COMPLETE INTEGRATED CYCLE</div>
              <h2 style={{ color: '#0e2919', fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 'clamp(28px, 3.4vw, 42px)', margin: '0 0 16px' }}>
                From Feed to Fork: The Complete Urja Foods Cycle
              </h2>
              <p className="section-subtitle" style={{ color: '#56635a', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
                An interconnected 5-stage production and supply cycle ensuring total biosecurity, superior feed-conversion ratio, and pure farm-fresh poultry.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '20px',
              }}
            >
              {[
                {
                  step: '01',
                  title: 'Feed Milling & Nutrition',
                  desc: '800 TPD automated steam-pelleted feed formulated with bypass protein and essential amino acids.',
                  img: '/company.jpg',
                },
                {
                  step: '02',
                  title: 'Breeder Farming & Hatchery',
                  desc: 'Parent breeder flocks and robotic single-stage incubators delivering robust day-old chicks.',
                  img: '/company-plant.jpg',
                },
                {
                  step: '03',
                  title: 'EC Shed Brooding & Growing',
                  desc: 'European environment-controlled sheds with automated ventilation and strict biosecurity.',
                  img: '/images/biz-poultry.jpg',
                  fallback: '/company.jpg',
                },
                {
                  step: '04',
                  title: 'Contract Farming & Health',
                  desc: '900+ partnered farmers receiving veterinary audits, guaranteed buybacks, and telemetry.',
                  img: '/company-plant.jpg',
                },
                {
                  step: '05',
                  title: 'Processing & Cold Distribution',
                  desc: 'Hygienic processing, fresh cold-chain logistics, and retail distribution across Maharashtra.',
                  img: '/images/biz-chicken.jpg',
                  fallback: '/company-plant.jpg',
                },
              ].map((cycle, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #dce8d7',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 6px 20px rgba(23, 59, 36, 0.05)',
                  }}
                >
                  <div style={{ position: 'relative', height: '160px', background: '#0e2919' }}>
                    <img
                      src={cycle.img}
                      alt={cycle.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = cycle.fallback || '/company-plant.jpg';
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#0e2919',
                        color: '#a8c58f',
                        padding: '3px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 800,
                        border: '1px solid rgba(168, 197, 143, 0.3)',
                      }}
                    >
                      STAGE {cycle.step}
                    </div>
                  </div>
                  <div style={{ padding: '18px 16px' }}>
                    <h4 style={{ margin: '0 0 8px', fontSize: '16px', color: '#0e2919', fontWeight: 700 }}>
                      {cycle.title}
                    </h4>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#56635a' }}>
                      {cycle.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Core Capabilities & Technology Grid */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge badge-gold">Operational Capabilities</div>
            <h2>Advanced Technology & Quality Assurance</h2>
            <p className="section-subtitle">
              How our infrastructure and scientific methodologies set the benchmark in Maharashtra.
            </p>
          </div>

          <div className="business-features-grid">
            {business.features.map((feat, fIdx) => (
              <div className="business-feat-card" key={fIdx}>
                <div
                  className="business-feat-icon-wrap"
                  style={{ color: business.accentColor, background: `${business.accentColor}18` }}
                >
                  <ShieldCheck size={28} />
                </div>
                <h3 className="business-feat-title">{feat.title}</h3>
                <p className="business-feat-desc">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. End-to-End Operational Process Roadmap */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge badge-green">Standardized Workflow</div>
            <h2>How Our {business.shortTitle} Works</h2>
            <p className="section-subtitle">
              A transparent, 4-step execution model engineered for maximum efficiency and predictable outcomes.
            </p>
          </div>

          <div className="business-steps-grid">
            {business.processSteps.map((pStep, pIdx) => (
              <div className="business-step-card" key={pIdx}>
                <div className="business-step-num" style={{ color: business.accentColor }}>
                  {pStep.step}
                </div>
                <h4 className="business-step-title">{pStep.title}</h4>
                <p className="business-step-desc">{pStep.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Direct Inquiry Call to Action Banner */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)', color: '#ffffff' }}>
        <div className="container text-center">
          <span
            className="badge"
            style={{
              backgroundColor: `${business.accentColor}33`,
              color: '#a8c58f',
              border: `1px solid ${business.accentColor}66`,
              marginBottom: '1rem',
            }}
          >
            Partner With Urja Foods
          </span>
          <h2 style={{ color: '#ffffff', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, maxWidth: '800px', margin: '0.5rem auto 1rem' }}>
            {business.ctaTitle}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto 2.2rem', lineHeight: 1.6 }}>
            {business.ctaDesc}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleCtaClick}
              className="btn btn-primary"
              style={{ background: business.accentColor, borderColor: business.accentColor, padding: '0.9rem 2.2rem', fontSize: '1.05rem' }}
            >
              <span>{business.ctaButton}</span>
              <ArrowRight size={18} />
            </button>
            <Link to="/contact" className="btn btn-outline-white" style={{ padding: '0.9rem 2rem', fontSize: '1.05rem' }}>
              <PhoneCall size={18} />
              <span>Contact Regional Office</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Explore Other Businesses Carousel / Grid */}
      <section className="section bg-subtle">
        <div className="container">
          <div className="section-header text-center">
            <div className="badge badge-gold">Complete Value Chain</div>
            <h2>Explore Our Other Businesses & Services</h2>
            <p className="section-subtitle">
              Discover how Urja Foods connects animal nutrition, hatching, broiler farming, and soil health.
            </p>
          </div>

          <div className="other-businesses-grid">
            {otherBusinesses.map((other) => (
              <Link
                to={`/businesses/${other.id}`}
                key={other.id}
                className="other-biz-card"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <div
                  className="other-biz-icon"
                  style={{ color: other.accentColor, background: `${other.accentColor}18` }}
                >
                  {ICONS_MAP[other.id]}
                </div>
                <div className="other-biz-body">
                  <span
                    className="other-biz-tag"
                    style={{ color: other.tagColor, backgroundColor: other.tagBg }}
                  >
                    {other.badge}
                  </span>
                  <h4 className="other-biz-title">{other.shortTitle}</h4>
                  <p className="other-biz-desc">{other.tagline}</p>
                  <span className="other-biz-link" style={{ color: other.accentColor }}>
                    <span>Learn More</span>
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/businesses" className="btn btn-secondary">
              <ArrowLeft size={18} />
              <span>View All Businesses Overview</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
