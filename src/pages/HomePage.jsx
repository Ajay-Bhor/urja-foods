import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import BusinessSectors from '../components/BusinessSectors';
import ManufacturingExcellence from '../components/ManufacturingExcellence';
import WhyChooseUrja from '../components/WhyChooseUrja';
import SustainabilitySection from '../components/SustainabilitySection';
import Testimonials from '../components/Testimonials';
import HorizontalTimeline from '../components/HorizontalTimeline';
import { useLanguage } from '../hooks/LanguageContext';

export default function HomePage({ onSelectProduct, onQuickInquire }) {
  const { t } = useLanguage();

  return (
    <div className="home-page-view">
      {/* 1. Official Video Hero */}
      <Hero />

      {/* 2. Welcome / About Section */}
      <AboutSection />

      {/* 3. Interactive 5 Business Verticals Showcase */}
      <BusinessSectors />

      {/* 4. Manufacturing Excellence (800 TPD & Automation) */}
      <ManufacturingExcellence />

      {/* 5. Our Journey Horizontal Milestones Timeline */}
      <HorizontalTimeline />

      {/* 6. Partnership Callout: "Be a part of the Urja journey" */}
      <section className="urja-contact-cta" style={{ background: '#0e2919' }}>
        <div className="urja-contact-cta-inner">
          <div className="urja-contact-cta-content">
            <span className="urja-contact-cta-label">{t('journeyCalloutLabel')}</span>
            <h2>
              {t('journeyCalloutTitle1')}<br />
              <span>{t('journeyCalloutTitle2')}</span>
            </h2>
            <p>
              {t('journeyCalloutDesc')}
            </p>
          </div>

          <div className="urja-contact-cta-action">
            <Link to="/contact#get-in-touch" className="urja-contact-cta-button">
              <span>{t('journeyCalloutBtn')}</span>
              <i>→</i>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Why Choose Urja Philosophy Section */}
      <WhyChooseUrja />

      {/* 7. Sustainability & CSR with 100,000 Trees Commitment */}
      <SustainabilitySection />

      {/* 8. Partner Testimonials */}
      <Testimonials />



      {/* 10. Final Contact CTA Banner */}
      <section className="urja-contact-cta" id="contact-cta">
        <div className="urja-contact-cta-inner">
          <div className="urja-contact-cta-content">
            <span className="urja-contact-cta-label">{t('ctaLabel')}</span>
            <h2>
              {t('ctaTitle1')}<br />
              <span>{t('ctaTitle2')}</span>
            </h2>
            <p>
              {t('ctaDesc')}
            </p>
          </div>

          <div className="urja-contact-cta-action">
            <Link to="/contact" className="urja-contact-cta-button">
              <span>{t('ctaBtn')}</span>
              <i>↗</i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
