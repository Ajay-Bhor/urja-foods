import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESSES_DATA } from '../data/businessesData';
import { useLanguage } from '../hooks/LanguageContext';

const DEFAULT_BUSINESS = {
  id: 'default',
  category: 'OUR BUSINESS ECOSYSTEM',
  title: 'Urja Foods & Agro',
  tagline:
    'Building an integrated agribusiness ecosystem across agriculture, nutrition, food processing and sustainable farming.',
  image: '/company-plant.jpg',
  fallbackImage: '/images/businesses-hero.jpg',
  link: '/businesses',
  buttonText: 'EXPLORE ALL BUSINESSES',
};

const FALLBACK_IMAGES = {
  'urja-foods': '/images/biz-poultry.jpg',
  'urja-pashu-aahar': '/images/biz-nutrition.jpg',
  'poushtik-chicken': '/images/biz-chicken.jpg',
  'urja-organic': '/images/biz-organic.jpg',
  'urja-soya': '/images/biz-soya.jpg',
};

export default function BusinessSectors() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const activeBusiness =
    hoveredIndex !== null ? BUSINESSES_DATA[hoveredIndex] : DEFAULT_BUSINESS;

  return (
    <section className="urja-businesses" id="businesses">
      <div className="urja-businesses-inner">
        {/* Section Header */}
        <div className="urja-business-top">
          <div className="urja-business-heading">
            <span className="urja-business-overline">{t('bizOverline')}</span>
            <h2>
              {t('bizTitle1')}<br />
              <span>{t('bizTitle2')}</span>
            </h2>
          </div>

          <p className="urja-business-description">
            {t('bizDesc')}
          </p>
        </div>

        {/* Interactive Showcase: Displays default image when cursor is not moving/hovering */}
        <div
          className="urja-business-showcase"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Left Feature Panel - Fully Clickable */}
          <Link
            to={activeBusiness.id === 'default' ? '/businesses' : (activeBusiness.link || `/businesses/${activeBusiness.id}`)}
            className="urja-business-feature"
            aria-label={`Explore ${activeBusiness.title}`}
          >
            <div className="urja-feature-image">
              <img
                key={activeBusiness.id}
                src={activeBusiness.image}
                alt={activeBusiness.title}
                loading="lazy"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    FALLBACK_IMAGES[activeBusiness.id] ||
                    activeBusiness.fallbackImage ||
                    '/company-plant.jpg';
                }}
              />
            </div>

            <div className="urja-feature-overlay"></div>

            <div
              className="urja-feature-content"
              key={`content-${activeBusiness.id}`}
            >
              <div className="urja-feature-category">
                {t(activeBusiness.id + '_category') || activeBusiness.category}
              </div>

              <h3>{t(activeBusiness.id + '_title') || activeBusiness.title}</h3>

              <p>{t(activeBusiness.id + '_tagline') || activeBusiness.tagline}</p>

              <div className="urja-feature-button">
                <span>{activeBusiness.buttonText || 'EXPLORE VERTICAL'}</span>
                <i>→</i>
              </div>
            </div>
          </Link>

          {/* Right Business Selection List */}
          <div
            className="urja-business-list"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {BUSINESSES_DATA.map((item, index) => {
              const isActive = index === hoveredIndex;
              return (
                <Link
                  key={item.id}
                  to={`/businesses/${item.id}`}
                  className={`urja-business-item ${isActive ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onFocus={() => setHoveredIndex(index)}
                  aria-pressed={isActive}
                >
                  <span className="business-item-number">{item.number}</span>

                  <div className="business-item-main">
                    <h3>{t(item.id + '_title') || item.title}</h3>
                    <span className="business-item-category">
                      {t(item.id + '_category') || item.category}
                    </span>

                    <div className="business-item-products">
                      {item.products.map((p, pIdx) => (
                        <span key={pIdx}>{p}</span>
                      ))}
                    </div>
                  </div>

                  <span className="business-item-arrow">→</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA to All Businesses */}
        <div className="urja-business-cta">
          <Link to="/businesses">
            <span>{t('bizExplore') || 'VIEW ALL BUSINESSES'}</span>
            <b>→</b>
          </Link>
        </div>
      </div>
    </section>
  );
}
