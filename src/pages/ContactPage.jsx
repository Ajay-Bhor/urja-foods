import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, CheckCircle2 } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import InquiryForm from '../components/InquiryForm';

export default function ContactPage({ preFillInquiry }) {
  const contactCards = [
    {
      icon: <MapPin size={26} color="var(--primary)" />,
      title: 'Manufacturing Plant & HQ',
      lines: [
        'Urja Agro Foods Private Limited',
        'At Post Nirgudsar, Taluka Ambegaon,',
        'District Pune - 412406, Maharashtra, India.',
      ],
      action: {
        text: 'Open Google Maps Navigation',
        href: 'https://maps.google.com/?q=Nirgudsar,+Pune,+Maharashtra',
      },
    },
    {
      icon: <Phone size={26} color="#f58220" />,
      title: 'Direct Hotlines & Support',
      lines: [
        'Corporate Office: +91-7028939900',
        'Farmer Advisory: +91-7028939901',
        'Veterinary Desk: Available Mon-Sat',
      ],
      action: {
        text: 'Call +91-7028939900',
        href: 'tel:+917028939900',
      },
    },
    {
      icon: <Mail size={26} color="var(--primary)" />,
      title: 'Official Email Correspondence',
      lines: [
        'General Inquiries: info@urjafoods.net',
        'Dealership & Sales: sales@urjafoods.net',
        'Response Time: Within 24 business hours',
      ],
      action: {
        text: 'Send Official Email',
        href: 'mailto:info@urjafoods.net',
      },
    },
    {
      icon: <Clock size={26} color="#f58220" />,
      title: 'Operational Schedule',
      lines: [
        'Monday – Saturday: 8:30 AM – 7:00 PM',
        'Sunday: Plant Operations / Emergency Only',
        'Emergency Broiler Technical Support: 24/7',
      ],
      action: {
        text: 'Chat on WhatsApp',
        href: 'https://wa.me/917028939900?text=Hello%20Urja%20Foods%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
      },
    },
  ];

  return (
    <div className="contact-page-view">
      {/* 1. Header Banner */}
      <PageBanner
        badge="Direct Advisory & Support"
        title="Connect With Urja Foods"
        subtitle="Reach out to our headquarters and manufacturing facility in Nirgudsar, Pune. Whether you seek contract broiler farming, cattle feed dealership, bulk orders, or technical farm visits, our team is at your service."
        breadcrumb="Contact & Inquiry"
      />

      {/* 2. Direct Contact Cards */}
      <section className="section bg-subtle" id="contact-info">
        <div className="container">
          <div className="contact-cards-grid">
            {contactCards.map((card, idx) => (
              <div className="contact-info-card" key={idx}>
                <div className="contact-info-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <div className="contact-info-lines">
                  {card.lines.map((line, lIdx) => (
                    <p key={lIdx}>{line}</p>
                  ))}
                </div>
                {card.action && (
                  <a
                    href={card.action.href}
                    target={card.action.href.startsWith('http') ? '_blank' : undefined}
                    rel={card.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-card-link"
                  >
                    <span>{card.action.text}</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2.5. Part of Journey & Get in Touch Connection Banner */}
      <section className="section" style={{ background: '#0e2919', color: '#ffffff', padding: '48px 0' }} id="get-in-touch">
        <div className="container" style={{ textAlign: 'center', maxWidth: '820px' }}>
          <div className="badge badge-green" style={{ marginBottom: '12px', background: 'rgba(168,197,143,0.18)', color: '#a8c58f', borderColor: '#a8c58f' }}>
            BE A PART OF THE URJA JOURNEY
          </div>
          <h2 style={{ color: '#ffffff', fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 'clamp(28px, 3.2vw, 42px)', margin: '0 0 14px', letterSpacing: '-0.8px' }}>
            Get in Touch &amp; <span style={{ color: '#a8c58f' }}>Build With Us</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            Whether you are a farmer, retailer, bulk distributor, contract broiler partner, or prospective team member, your journey with Urja begins here. Submit your inquiry below and our regional specialists will connect with you.
          </p>
        </div>
      </section>

      {/* 3. Interactive Inquiry Form Section */}
      <InquiryForm preFillData={preFillInquiry} />

      {/* 4. Plant Location & Visiting Information */}
      <section className="section" id="directions">
        <div className="container">
          <div className="plant-directions-card">
            <div className="plant-directions-content">
              <div className="badge badge-green">Visit Our Facility</div>
              <h2>How to Reach Our Nirgudsar Complex</h2>
              <p>
                Our 150 TPD feed manufacturing plant and contract broiler monitoring division are situated in Nirgudsar, Ambegaon Taluka, conveniently accessible via the Pune-Nashik National Highway (NH 60).
              </p>
              <ul className="directions-list">
                <li>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span><strong>From Pune Airport / Station:</strong> ~65 km via Pune-Nashik Highway via Bhosari, Chakan, and Manchar.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span><strong>From Manchar Town:</strong> ~12 km eastward toward Nirgudsar with clear road signages.</span>
                </li>
                <li>
                  <CheckCircle2 size={18} color="var(--primary)" />
                  <span><strong>Guided Plant Tours:</strong> Prior appointment recommended for farmer delegations and prospective dealers.</span>
                </li>
              </ul>
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href="https://maps.google.com/?q=Nirgudsar,+Pune,+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <MapPin size={18} />
                  <span>Get Directions on Google Maps</span>
                </a>
                <a
                  href="tel:+917028939900"
                  className="btn btn-secondary"
                >
                  <Phone size={18} />
                  <span>Call Gate Reception</span>
                </a>
              </div>
            </div>

            <div className="plant-directions-visual">
              <img
                src="/company-plant.jpg"
                alt="Urja Foods Plant Location"
                style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
