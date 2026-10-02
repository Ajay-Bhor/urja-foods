import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function BusinessesHero() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section className="ob-hero">
      {/* Background Image with Reveal Animation */}
      <div className="ob-hero-bg">
        <img
          src="/images/businesses-hero.jpg"
          alt="Agricultural business ecosystem"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=90';
          }}
        />
      </div>

      {/* Dark Forest Green Gradient Overlay */}
      <div className="ob-hero-overlay" aria-hidden="true"></div>

      {/* Hero Content Container */}
      <div className="ob-hero-container">
        <div className="ob-hero-content">
          {/* Navigation Bar with Back Button & Breadcrumbs */}
          <div className="ob-nav-row" style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
              className="page-back-btn"
              aria-label="Go back to previous page"
              id="businesses-hero-back-btn"
            >
              <ArrowLeft size={15} />
              <span>{t('back') || 'Back'}</span>
            </button>

            <nav className="ob-breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: 0 }}>
              <Link to="/">{t('navHome') || 'Home'}</Link>
              <span aria-hidden="true">›</span>
              <strong>{t('navBusinesses') || 'Our Businesses'}</strong>
            </nav>
          </div>

          {/* Eyebrow Label */}
          <div className="ob-eyebrow">
            <span aria-hidden="true"></span>
            <span>{t('bizOverline') || 'OUR BUSINESSES'}</span>
          </div>

          {/* Main Heading */}
          <h1>
            <strong>{t('bizHeroTitle1') || 'Integrated Agribusiness'}</strong>
            <br />
            <span>{t('bizHeroTitle2') || 'At Scale.'}</span>
          </h1>

          {/* Subtitle Description */}
          <p>
            {t('bizHeroSubtitle') || 'Five interconnected companies powering animal nutrition, poultry integration, clean protein, organic farm inputs and sustainable agro-processing.'}
          </p>

          {/* Anchor Call-to-Action */}
          <a href="#businesses" className="ob-hero-btn">
            <span>{t('bizExplore') || 'EXPLORE OUR BUSINESSES'}</span>
            <b aria-hidden="true">→</b>
          </a>
        </div>
      </div>
    </section>
  );
}
