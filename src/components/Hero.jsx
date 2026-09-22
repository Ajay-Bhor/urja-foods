import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="urja-video-hero" id="home">
      {/* Background HTML5 Video */}
      <video
        className="urja-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/15957.jpg"
      >
        <source
          src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/web-1.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Forest Green Multi-stop Overlay */}
      <div className="urja-video-overlay"></div>

      {/* Hero Central Content */}
      <div className="urja-hero-content">
        <span className="urja-hero-label">{t('heroOverline')}</span>

        <h1>
          {t('heroTitle1')}<br />
          <span>{t('heroTitle2')}</span>
        </h1>

        <p>
          {t('heroSubtitle')}
        </p>

        <div className="urja-hero-buttons">
          <Link to="/about" className="btn btn-primary" id="hero-btn-about">
            <span>{t('heroBtnDiscover')}</span>
            <span style={{ fontSize: '18px', lineHeight: 1 }}>→</span>
          </Link>

          <Link to="/businesses" className="btn btn-outline-white" id="hero-btn-businesses">
            <span>{t('heroBtnBusinesses')}</span>
          </Link>
        </div>
      </div>

      {/* Bottom Bar Exploration Indicator */}
      <div className="urja-hero-bottom">
        <div className="urja-hero-scroll">
          <span className="scroll-line"></span>
          <span>{t('heroScroll')}</span>
        </div>

        <div className="urja-hero-location">
          AGRICULTURE &nbsp;•&nbsp; NUTRITION &nbsp;•&nbsp; FOOD
        </div>
      </div>
    </section>
  );
}
