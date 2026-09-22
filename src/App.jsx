import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import ScrollToTop from './components/ScrollToTop';
import PageProgressBar from './components/PageProgressBar';
import CompanyPreloader from './components/CompanyPreloader';

// Dedicated Page Views
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import BusinessesPage from './pages/BusinessesPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import ProductsPage from './pages/ProductsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import ContactPage from './pages/ContactPage';
import MissionPage from './pages/MissionPage';
import VisionPage from './pages/VisionPage';
import ValuesPage from './pages/ValuesPage';
import MissionVisionValuesPage from './pages/MissionVisionValuesPage';
import CareersPage from './pages/CareersPage';

import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [preFillInquiry, setPreFillInquiry] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize IntersectionObserver scroll reveal on route change
  useScrollReveal(location.pathname);

  // When user clicks "Inquire Rate" on product card or modal
  const handleQuickInquire = (productName) => {
    setPreFillInquiry({
      interest: productName,
      message: `I am interested in getting current bulk dealership / retail pricing for ${productName}.`,
    });
    setSelectedProduct(null);
    navigate('/contact');
  };

  return (
    <div className="app-layout">
      {/* First-Time Company Logo Preloader Splash Screen */}
      <CompanyPreloader />

      {/* Top Progress Bar on Every Page Load */}
      <PageProgressBar />

      {/* Scroll restoration to (0,0) on route change */}
      <ScrollToTop />

      {/* Top Header Contact Bar */}
      <Topbar />

      {/* Main Glassmorphic Sticky Navbar with Multi-Page Routing */}
      <Navbar />

      {/* Main Multi-Page Route Outlet with Smooth Page Load Transition */}
      <main key={location.pathname} className="page-transition-container">
        <Routes location={location}>
          <Route
            path="/"
            element={
              <HomePage
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onQuickInquire={handleQuickInquire}
              />
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/mission-vision-values" element={<MissionVisionValuesPage />} />
          <Route path="/mission-vision" element={<MissionVisionValuesPage />} />
          <Route path="/purpose" element={<MissionVisionValuesPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/our-mission" element={<MissionPage />} />
          <Route path="/vision" element={<VisionPage />} />
          <Route path="/our-vision" element={<VisionPage />} />
          <Route path="/values" element={<ValuesPage />} />
          <Route path="/core-values" element={<ValuesPage />} />
          <Route path="/values-that-move-us" element={<ValuesPage />} />
          <Route path="/businesses" element={<BusinessesPage />} />
          <Route path="/our-businesses" element={<BusinessesPage />} />
          <Route
            path="/businesses/:id"
            element={<BusinessDetailPage onQuickInquire={handleQuickInquire} />}
          />
          <Route
            path="/business/:id"
            element={<BusinessDetailPage onQuickInquire={handleQuickInquire} />}
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onQuickInquire={handleQuickInquire}
              />
            }
          />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route
            path="/contact"
            element={<ContactPage preFillInquiry={preFillInquiry} />}
          />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/career" element={<CareersPage />} />
          {/* Wildcard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Comprehensive Multi-Page Footer */}
      <Footer />

      {/* Global Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onInquire={handleQuickInquire}
      />
    </div>
  );
}
