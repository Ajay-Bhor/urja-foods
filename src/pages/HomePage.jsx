import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import BusinessSectors from '../components/BusinessSectors';
import IntegratedValueChain from '../components/IntegratedValueChain';
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

      {/* 3. Interactive 5 Business Verticals Showcase (Fully Clickable) */}
      <BusinessSectors />

      {/* 4. Moved Agribusiness Ecosystem to Home Page */}
      <div id="ecosystem">
        <IntegratedValueChain />
      </div>

      {/* 5. Manufacturing Excellence (800 TPD & Automation) */}
      <div id="manufacturing">
        <ManufacturingExcellence />
      </div>

      {/* 6. Our Journey Horizontal Milestones Timeline */}
      <div id="our-journey">
        <HorizontalTimeline />
      </div>

      {/* 7. Why Choose Urja Philosophy Section */}
      <WhyChooseUrja />

      {/* 8. Sustainability & CSR with 100,000 Trees Commitment */}
      <SustainabilitySection />

      {/* 9. Partner Testimonials */}
      <div id="testimonials">
        <Testimonials />
      </div>

      {/* 10. Combined "Let's Build Together" + "Get in Touch" Section */}
      <section className="urja-contact-cta" id="contact-cta" style={{ background: '#0e2919' }}>
        <div className="urja-contact-cta-inner">
          <div className="urja-contact-cta-content">
            <span className="urja-contact-cta-label">{t('journeyCalloutLabel') || "LET'S BUILD TOGETHER"}</span>
            <h2>
              {t('journeyCalloutTitle1') || 'Be a part of'} {t('journeyCalloutTitle2') || 'the Urja journey.'}<br />
              <span>{t('ctaTitle2') || 'Get in Touch with Us Today.'}</span>
            </h2>
            <p>
              {t('journeyCalloutDesc') || 'Whether you are a farmer, dealer, business partner, supplier or customer, connect with us and explore transformative opportunities across our agribusiness ecosystem.'}
            </p>
          </div>

          <div className="urja-contact-cta-action" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/contact#get-in-touch" className="urja-contact-cta-button">
              <span>{t('journeyCalloutBtn') || 'GET IN TOUCH'}</span>
              <i>→</i>
            </Link>
            <Link to="/businesses" className="urja-contact-cta-button" style={{ background: 'transparent', border: '1px solid rgba(168, 197, 143, 0.4)', color: '#ffffff' }}>
              <span>{t('bizExplore') || 'EXPLORE OUR BUSINESSES'}</span>
              <i>↗</i>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
