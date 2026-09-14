import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import UrjaTopBar from './components/urja/UrjaTopBar';
import UrjaNavbar from './components/urja/UrjaNavbar';
import UrjaPageHeader from './components/urja/UrjaPageHeader';
import UrjaHero from './components/urja/UrjaHero';
import UrjaHomeHighlights from './components/urja/UrjaHomeHighlights';
import UrjaAboutSection from './components/urja/UrjaAboutSection';
import UrjaFoundersDesk from './components/urja/UrjaFoundersDesk';
import UrjaFarmerTestimonials from './components/urja/UrjaFarmerTestimonials';
import UrjaFarmerCalculator from './components/urja/UrjaFarmerCalculator';
import UrjaFarmerFaq from './components/urja/UrjaFarmerFaq';
import UrjaServicesSection from './components/urja/UrjaServicesSection';
import UrjaProductsCatalog from './components/urja/UrjaProductsCatalog';
import UrjaBrandsSection from './components/urja/UrjaBrandsSection';
import UrjaEuropeanTech from './components/urja/UrjaEuropeanTech';
import UrjaContactSection from './components/urja/UrjaContactSection';
import UrjaCareersSection from './components/urja/UrjaCareersSection';
import UrjaHrPortal from './components/urja/UrjaHrPortal';
import UrjaAutomationTesting from './components/urja/UrjaAutomationTesting';
import UrjaFooter from './components/urja/UrjaFooter';
import UrjaDataLoader from './components/urja/UrjaDataLoader';

const VALID_PAGES = ['home', 'about', 'services', 'products', 'brands', 'technology', 'careers', 'contact', 'hr-portal', 'automation-testing'];

function UrjaAppContent() {
  const { t } = useLanguage();

  const getInitialPage = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_PAGES.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [selectedInquiryTopic, setSelectedInquiryTopic] = useState('Cattle Feed / Pashu Aahar');
  const [initialAppLoading, setInitialAppLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Synchronize with browser URL hash change (back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash)) {
        setIsNavigating(true);
        setCurrentPage(hash);
        window.scrollTo(0, 0);
        setTimeout(() => setIsNavigating(false), 400);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Prefetch product catalog & health on startup with smooth brand loading animation
  useEffect(() => {
    Promise.all([
      fetch('/api/health').catch(() => {}),
      fetch('/api/urja/products').catch(() => {})
    ]).finally(() => {
      // Gentle 750ms reveal to showcase the brand animation smoothly
      setTimeout(() => {
        setInitialAppLoading(false);
      }, 750);
    });
  }, []);

  const handleNavigate = (pageId, optionalTopic) => {
    if (optionalTopic) {
      setSelectedInquiryTopic(optionalTopic);
    }
    const targetPage = VALID_PAGES.includes(pageId) ? pageId : 'home';
    setIsNavigating(true);
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo(0, 0);
    setTimeout(() => {
      setIsNavigating(false);
    }, 450);
  };

  const handleInquiryTrigger = (topic) => {
    setSelectedInquiryTopic(topic);
    handleNavigate('contact');
  };

  // Full Brand Loading Screen on startup
  if (initialAppLoading) {
    return (
      <UrjaDataLoader
        type="page-splash"
        message="Initializing Urja Agro Engine & MySQL Database..."
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fbfbf9] text-slate-800 flex flex-col font-sans selection:bg-urja-500 selection:text-white relative">
      {/* Top Animated Navigation Loading Progress Beam */}
      {isNavigating && (
        <div className="fixed top-0 left-0 right-0 h-1 z-[9999] bg-gradient-to-r from-urja-500 via-harvest-400 to-emerald-400 animate-shimmer-beam shadow-md shadow-urja-500/40" />
      )}

      {/* Top Contact Bar with Language Switcher */}
      <UrjaTopBar />

      {/* Main Sticky Navbar with Multi-Page Navigation */}
      <UrjaNavbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Page View Container with zero-lag transition */}
      <main className="flex-1 w-full animate-page-instant" key={currentPage}>
        
        {/* ================= 1. HOME PAGE ================= */}
        {currentPage === 'home' && (
          <div>
            {/* Animated Company Image Background Slider ONLY on Home Page */}
            <UrjaHero onInquireClick={handleInquiryTrigger} onNavigate={handleNavigate} />
            
            
            {/* Human Founder's Desk & Vision */}
            <UrjaFoundersDesk />

            {/* Structured Page Highlights & Teasers */}
            <UrjaHomeHighlights onNavigate={handleNavigate} onInquireClick={handleInquiryTrigger} />

            {/* Real Farmer Testimonials */}
            <UrjaFarmerTestimonials />

            {/* Practical Farmer Feed & Profit Calculator */}
            <UrjaFarmerCalculator onNavigate={handleNavigate} onInquireClick={handleInquiryTrigger} />
          </div>
        )}

        {/* ================= 2. ABOUT US PAGE ================= */}
        {currentPage === 'about' && (
          <div>
            <UrjaPageHeader
              pageName={t.nav.about}
              title={t.about.title}
              subtitle={t.about.p1}
              badge={t.about.tag}
              onNavigate={handleNavigate}
            />
            {/* Founder's Desk & Letter */}
            <UrjaFoundersDesk />

            {/* Company Heritage & Pillars */}
            <UrjaAboutSection onNavigate={handleNavigate} />
            

            {/* Real Farmer Community Testimonials */}
            <UrjaFarmerTestimonials />
          </div>
        )}

        {/* ================= 3. OUR SERVICES PAGE ================= */}
        {currentPage === 'services' && (
          <div>
            <UrjaPageHeader
              pageName={t.nav.services}
              title={t.services.title}
              subtitle={t.services.subtitle}
              badge={t.services.tag}
              onNavigate={handleNavigate}
            />
            <UrjaServicesSection onInquireClick={handleInquiryTrigger} onNavigate={handleNavigate} />
            
            {/* Real Farmer Q&A */}
            <UrjaFarmerFaq onNavigate={handleNavigate} />
          </div>
        )}

        {/* ================= 4. PRODUCTS & FEEDS PAGE ================= */}
        {currentPage === 'products' && (
          <div>
            <UrjaPageHeader
              pageName={t.nav.products}
              title={t.products.title}
              subtitle={t.products.subtitle}
              badge={t.products.tag}
              onNavigate={handleNavigate}
            />
            <UrjaProductsCatalog onSelectProduct={handleInquiryTrigger} onNavigate={handleNavigate} />

            {/* Practical Dairy Feed & Revenue Calculator */}
            <UrjaFarmerCalculator onNavigate={handleNavigate} onInquireClick={handleInquiryTrigger} />
          </div>
        )}

        {/* ================= 5. OUR BRANDS PAGE ================= */}
        {currentPage === 'brands' && (
          <div>
            <UrjaPageHeader
              pageName={t.nav.brands}
              title={t.brands.title}
              subtitle={t.brands.subtitle}
              badge={t.brands.tag}
              onNavigate={handleNavigate}
            />
            <UrjaBrandsSection onNavigate={handleNavigate} />
            
            {/* Community Proof */}
            <UrjaFarmerTestimonials />
          </div>
        )}

        {/* ================= 6. EUROPEAN EC TECH PAGE ================= */}
        {currentPage === 'technology' && (
          <div>
            <UrjaPageHeader
              pageName={t.nav.tech}
              title={t.technology.title}
              subtitle={t.technology.subtitle}
              badge={t.technology.badge}
              onNavigate={handleNavigate}
            />
            <UrjaEuropeanTech onInquireClick={handleInquiryTrigger} onNavigate={handleNavigate} />

            {/* Technical & Contract Farming FAQ */}
            <UrjaFarmerFaq onNavigate={handleNavigate} />
          </div>
        )}

        {/* ================= 7. CONTACT US PAGE ================= */}
        {currentPage === 'contact' && (
          <div>
            <UrjaPageHeader
              pageName={t.nav.contact}
              title={t.contact.title}
              subtitle={t.contact.desc}
              badge={t.contact.tag}
              onNavigate={handleNavigate}
            />
            <UrjaContactSection initialInquiryType={selectedInquiryTopic} />

            {/* Frequently Asked Questions */}
            <UrjaFarmerFaq onNavigate={handleNavigate} />
          </div>
        )}

        {/* ================= 8. CAREERS PAGE ================= */}
        {currentPage === 'careers' && (
          <div>
            <UrjaCareersSection onNavigate={handleNavigate} />
          </div>
        )}

        {/* ================= 9. INTERNAL HR RECRUITMENT PORTAL ================= */}
        {currentPage === 'hr-portal' && (
          <div>
            <UrjaHrPortal onNavigate={handleNavigate} />
          </div>
        )}

        {/* ================= 10. AUTOMATION TESTING SUITE ================= */}
        {currentPage === 'automation-testing' && (
          <div>
            <UrjaAutomationTesting onNavigate={handleNavigate} />
          </div>
        )}

      </main>


      {/* Full Corporate Agro Footer */}
      <UrjaFooter onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <UrjaAppContent />
    </LanguageProvider>
  );
}
