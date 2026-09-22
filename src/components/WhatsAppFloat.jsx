import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, ArrowUp } from 'lucide-react';

export default function WhatsAppFloat() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/917028939900?text=${encodeURIComponent(
    'Namaskar Urja Foods team, I would like to inquire about your feeds and contract broiler farming.'
  )}`;

  return (
    <div className="floating-actions" id="floating-widget">
      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="float-circle-btn float-whatsapp"
        title="Chat on WhatsApp (+91-7028939900)"
        id="float-whatsapp-btn"
      >
        <MessageCircle size={26} />
      </a>

      {/* Direct Call Button */}
      <a
        href="tel:+917028939900"
        className="float-circle-btn float-call"
        title="Call Helpline (+91-7028939900)"
        id="float-call-btn"
      >
        <Phone size={22} />
      </a>

      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="float-circle-btn back-to-top"
          title="Back to top"
          id="back-to-top-btn"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </div>
  );
}
