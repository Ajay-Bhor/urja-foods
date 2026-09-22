import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section className="urja-welcome-section" id="about">
      <div className="urja-welcome-container">
        {/* Left Visual Area with Authentic Live Site Imagery */}
        <div className="urja-welcome-visual">
          <div className="urja-image-main">
            <img
              src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/15957.jpg"
              alt="Urja Foods & Agro Pvt. Ltd."
              loading="lazy"
            />
            <div className="urja-image-overlay"></div>
          </div>

          {/* Floating Border Effect */}
          <div className="urja-image-border"></div>

          {/* Floating Tag Label */}
          <div className="urja-image-label">
            <div className="urja-label-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div>
              <small>INTEGRATED</small>
              <strong>AGRIBUSINESS</strong>
            </div>
          </div>

          {/* Bottom Feed to Food Label */}
          <div className="urja-image-bottom-text">
            <span>{t('welcomeFrom')}</span>
            <strong style={{ marginLeft: '4px', marginRight: '4px' }}>{t('welcomeFeed')}</strong>
            <i>→</i>
            <strong style={{ marginLeft: '4px' }}>{t('welcomeFood')}</strong>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="urja-welcome-content">
          <div className="urja-welcome-eyebrow">
            <span className="eyebrow-line"></span>
            <span>{t('welcomeAboutUs')}</span>
          </div>

          <h2 className="urja-welcome-title">
            Welcome to <span>Urja Foods &amp; Agro <small>Pvt. Ltd.</small></span>
          </h2>

          <div className="urja-title-line"></div>

          <p className="urja-welcome-intro">
            <strong>Urja Foods &amp; Agro Pvt. Ltd.</strong> {t('welcomeIntro')}
          </p>

          <div className="urja-welcome-text">
            <p>
              Our integrated poultry business brings together{' '}
              <strong>
                feed manufacturing, breeder farming, hatcheries, brooding and growing farms, contract broiler farming and live bird supply
              </strong>
              , allowing us to manage multiple stages of the value chain within one operating ecosystem.
            </p>

            <p>
              Alongside poultry, our businesses include{' '}
              <strong>Urja Pashu Aahar</strong>, our animal nutrition division, and{' '}
              <strong>soya processing</strong>. We are now extending this platform into consumer-facing businesses through{' '}
              <span>Poushtik Chicken, Urja Organic, and value-added soya products.</span>
            </p>

            <p>
              With a combination of{' '}
              <strong>integrated operations, modern infrastructure and technical expertise</strong>, Urja continues to build capabilities across agriculture, nutrition and food—creating a connected business from{' '}
              <span>feed and farm to protein and food products.</span>
            </p>
          </div>

          <div className="urja-welcome-footer">
            <Link to="/about" className="urja-welcome-button">
              <span>EXPLORE OUR STORY</span>
              <div className="button-arrow">→</div>
            </Link>

            <div className="urja-welcome-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
