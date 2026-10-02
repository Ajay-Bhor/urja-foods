import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="urja-footer" id="footer">
      <div className="urja-footer-top">
        {/* Brand Column */}
        <div className="urja-footer-brand">
          <Link to="/" aria-label="Urja Foods Home">
            <img
              src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/urja-foods-white.png"
              alt="Urja Group"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </Link>

          <p>
            {t('footerTagline') || 'Building an integrated platform across agriculture, nutrition and food.'}
          </p>

          <div style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.6 }}>
            <div>CIN: U01409PN2019PTC186419</div>
            <div>
              {t('footerHeadquarters') || 'Headquarters'}:{' '}
              <a
                href="https://maps.app.goo.gl/HCsm2Bz2evDqz1JK9"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'rgba(255, 255, 255, 0.85)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                title="View on Google Maps"
              >
                HP HOUSE, 35/1A, Jarkarwadi Phata, Nirgudsar, Manchar, Maharashtra 410503
              </a>
            </div>
          </div>
        </div>

        {/* Company Column */}
        <div className="urja-footer-col">
          <h4>{t('footerCompanyTitle') || 'COMPANY'}</h4>
          <Link to="/about">{t('navAbout')}</Link>
          <Link to="/mission-vision-values">{t('navMissionVisionValues')}</Link>
          <Link to="/our-mission">{t('navOurMission')}</Link>
          <Link to="/our-vision">{t('navOurVision')}</Link>
          <Link to="/values">{t('navCoreValues')}</Link>
          <Link to="/businesses">{t('navBusinesses')}</Link>
          <Link to="/products">{t('footerProductRange') || 'Product Range'}</Link>
          <Link to="/testimonials">{t('footerTestimonials') || 'Testimonials'}</Link>
          <Link to="/careers">{t('footerCareers') || 'Careers & Openings'}</Link>
          <Link to="/contact">{t('navContact')}</Link>
        </div>

        {/* Businesses Column */}
        <div className="urja-footer-col">
          <h4>{t('footerBizTitle') || 'OUR BUSINESSES'}</h4>
          <Link to="/businesses/urja-foods">Urja Foods</Link>
          <Link to="/businesses/urja-pashu-aahar">Urja Pashu Aahar</Link>
          <Link to="/businesses/poushtik-chicken">Poushtik Chicken</Link>
          <Link to="/businesses/urja-organic">Urja Organic</Link>
          <Link to="/businesses/urja-soya">Urja Soya</Link>
        </div>

        {/* Quick Links Column */}
        <div className="urja-footer-col">
          <h4>{t('footerQuickLinksTitle') || 'QUICK LINKS'}</h4>
          <a href="#sustainability">{t('navSustainability')}</a>
          <Link to="/careers">{t('footerJoinTeam') || 'Join Our Team'}</Link>
          <Link to="/products">{t('footerFeedFormulations') || 'Feed Formulations'}</Link>
          <Link to="/contact">{t('footerInquiryDesk') || 'Inquiry Desk'}</Link>
          <a href="tel:+917028939900">+91-7028939900</a>
          <a href="mailto:info@urjafoods.net">info@urjafoods.net</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="urja-footer-bottom">
        <p>
          © {currentYear} Urja Foods &amp; Agro Pvt. Ltd. {t('footerRightsReserved') || 'All Rights Reserved.'}
          <span style={{ margin: '0 8px', opacity: 0.4 }}>•</span>
          <Link
            to="/admin/translations"
            style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
            title="Manage native website translations in database"
          >
            🌐 Multilingual CMS
          </Link>
        </p>

        <div className="urja-footer-social">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            in
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            f
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            ig
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            ▶
          </a>
          <a
            href="https://wa.me/917028939900"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            wa
          </a>
        </div>
      </div>
    </footer>
  );
}
