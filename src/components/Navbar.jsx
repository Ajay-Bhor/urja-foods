import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, setLanguage, supportedLanguages } = useLanguage();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const businessesList = [
    { title: 'Urja Foods', path: '/businesses/urja-foods' },
    { title: 'Urja Pashu Aahar', path: '/businesses/urja-pashu-aahar' },
    { title: 'Poushtik Chicken', path: '/businesses/poushtik-chicken' },
    { title: 'Urja Organic', path: '/businesses/urja-organic' },
    { title: 'Urja Soya', path: '/businesses/urja-soya' },
  ];

  return (
    <>
      <header className="urja-header">
        <div className="urja-header-inner">
          {/* Official Urja Logo */}
          <Link to="/" className="urja-logo" aria-label="Urja Foods Home">
            <img
              src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/urja-foods.png"
              alt="Urja Foods & Agro Pvt. Ltd."
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="urja-desktop-nav" aria-label="Main Navigation">
            <ul className="urja-menu">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `urja-nav-link ${isActive ? 'active' : ''}`}
                >
                  {t('navHome')}
                </NavLink>
              </li>

              {/* About Us - Clean direct link */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `urja-nav-link ${isActive ? 'active' : ''}`}
                >
                  {t('navAbout')}
                </NavLink>
              </li>

              {/* Mission, Vision & Values - Standalone Top-Level Direct Link */}
              <li>
                <NavLink
                  to="/mission-vision-values"
                  className={({ isActive }) => `urja-nav-link ${isActive ? 'active' : ''}`}
                >
                  {t('navMissionVisionValues') || 'Mission, Vision & Values'}
                </NavLink>
              </li>

              {/* Our Businesses Dropdown */}
              <li className="urja-dropdown" ref={dropdownRef}>
                <NavLink
                  to="/businesses"
                  className={({ isActive }) => `urja-nav-link urja-nav-has-dropdown ${isActive ? 'active' : ''}`}
                >
                  <span>{t('navBusinesses')}</span>
                  <ChevronDown size={13} className="urja-chevron-icon" strokeWidth={2.3} />
                </NavLink>

                <div className="urja-submenu-card">
                  <ul className="urja-submenu">
                    {businessesList.map((item, idx) => (
                      <li key={idx}>
                        <Link to={item.path}>
                          <span>{item.title}</span>
                          <span className="urja-submenu-arrow">→</span>
                        </Link>
                      </li>
                    ))}
                    <li className="urja-submenu-footer">
                      <Link to="/businesses">
                        <span>View All 5 Businesses</span>
                        <ArrowRight size={13} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) => `urja-nav-link ${isActive ? 'active' : ''}`}
                >
                  {t('navProducts')}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/careers"
                  className={({ isActive }) => `urja-nav-link ${isActive ? 'active' : ''}`}
                >
                  {t('navCareers') || 'Careers'}
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `urja-nav-link ${isActive ? 'active' : ''}`}
                >
                  {t('navContact')}
                </NavLink>
              </li>

              {/* Redesigned Premium Pill CTA Button */}
              <li className="urja-enquire">
                <Link to="/contact" className="urja-enquire-btn">
                  <span>Enquire Now</span>
                  <ArrowRight size={14} className="urja-enquire-arrow" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="urja-mobile-menu-btn"
            id="urjaMobileMenuBtn"
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      <div
        className={`urja-sidebar-overlay ${mobileMenuOpen ? 'active' : ''}`}
        id="urjaSidebarOverlay"
        onClick={() => setMobileMenuOpen(false)}
      ></div>

      {/* Mobile Drawer Sidebar */}
      <aside
        className={`urja-mobile-sidebar ${mobileMenuOpen ? 'active' : ''}`}
        id="urjaMobileSidebar"
        aria-hidden={!mobileMenuOpen}
      >
        {/* Sidebar Header */}
        <div className="urja-sidebar-header">
          <Link to="/" className="urja-sidebar-logo">
            <img
              src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/urja-foods.png"
              alt="Urja Group"
            />
          </Link>
          <button
            type="button"
            className="urja-sidebar-close"
            id="urjaSidebarClose"
            aria-label="Close menu"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="urja-mobile-nav" aria-label="Mobile Navigation">
          {/* Mobile Language Switcher */}
          <div style={{ padding: '0 24px 16px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{t('language')}:</span>
            {supportedLanguages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                className={`topbar-lang-btn ${language === lang.code ? 'active' : ''}`}
                onClick={() => setLanguage(lang.code)}
                style={{ fontSize: '12px', padding: '4px 10px' }}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <ul>
            <li>
              <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
                {t('navHome')}
              </NavLink>
            </li>

            {/* Mobile About Us */}
            <li>
              <NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>
                {t('navAbout')}
              </NavLink>
            </li>

            {/* Mobile Mission, Vision & Values - Direct Link */}
            <li>
              <NavLink to="/mission-vision-values" onClick={() => setMobileMenuOpen(false)}>
                {t('navMissionVisionValues') || 'Mission, Vision & Values'}
              </NavLink>
            </li>

            {/* Mobile Businesses Dropdown Accordion */}
            <li className={`urja-mobile-dropdown ${mobileDropdownOpen ? 'open' : ''}`}>
              <div className="urja-mobile-parent">
                <Link to="/businesses" onClick={() => setMobileMenuOpen(false)}>
                  {t('navBusinesses')}
                </Link>
                <button
                  type="button"
                  className="urja-mobile-dropdown-btn"
                  aria-label="Toggle Businesses Dropdown"
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileDropdownOpen(!mobileDropdownOpen);
                  }}
                >
                  <ChevronDown size={16} strokeWidth={2.2} />
                </button>
              </div>

              <ul className="urja-mobile-submenu">
                {businessesList.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
                <li style={{ paddingTop: '8px' }}>
                  <Link
                    to="/businesses"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ color: '#173b24', fontWeight: 700 }}
                  >
                    View All 5 Businesses →
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/products" onClick={() => setMobileMenuOpen(false)}>
                {t('navProducts')}
              </NavLink>
            </li>

            <li>
              <NavLink to="/careers" onClick={() => setMobileMenuOpen(false)}>
                {t('navCareers') || 'Careers'}
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>
                {t('navContact')}
              </NavLink>
            </li>

            <li className="urja-mobile-enquire">
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <span>Enquire Now</span>
                <ArrowRight size={15} />
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
