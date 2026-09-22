import React from 'react';
import { Link } from 'react-router-dom';

export default function SharedStrength() {
  const cards = [
    {
      title: 'Integrated',
      desc: 'Connected capabilities across agriculture, nutrition, farming, processing and food create stronger control throughout the value chain.',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="16" cy="16" r="6" />
          <circle cx="32" cy="16" r="6" />
          <circle cx="16" cy="32" r="6" />
          <circle cx="32" cy="32" r="6" />
          <path d="M22 16h4" />
          <path d="M16 22v4" />
          <path d="M32 22v4" />
          <path d="M22 32h4" />
        </svg>
      ),
    },
    {
      title: 'Quality',
      desc: 'From sourcing to production, disciplined processes and quality-focused systems help us deliver dependable products and outcomes.',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 7l15 6v10c0 9-6 15-15 19C15 38 9 32 9 23V13l15-6z" />
          <path d="M17 24l5 5 10-11" />
        </svg>
      ),
    },
    {
      title: 'Sustainability',
      desc: 'We seek to grow responsibly by supporting healthier ecosystems, efficient operations and practices designed for the long term.',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 38V19" />
          <path d="M24 25C17 25 12 21 11 14c7 0 13 3 13 10" />
          <path d="M24 30c7 0 12-4 13-11-7 0-12 3-13 10" />
          <path d="M24 19C20 13 20 9 24 6c4 4 4 9 0 13z" />
        </svg>
      ),
    },
    {
      title: 'Innovation',
      desc: 'We continuously improve products, processes and capabilities to respond to changing markets and future opportunities.',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M18 30h12" />
          <path d="M19 34h10" />
          <path d="M20 38h8" />
          <path d="M17 26c-3-2-5-5-5-9 0-7 5-12 12-12s12 5 12 12c0 4-2 7-5 9-2 2-3 3-3 4H20c0-1-1-3-3-4z" />
          <path d="M24 10v8" />
          <path d="M20 14h8" />
        </svg>
      ),
    },
    {
      title: 'People & Partnerships',
      desc: 'Strong relationships with farmers, employees, partners and customers remain central to sustainable and responsible growth.',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="15" r="6" />
          <path d="M13 37c1-8 5-13 11-13s10 5 11 13" />
          <path d="M11 29c-4 1-6 4-7 8" />
          <path d="M37 29c4 1 6 4 7 8" />
        </svg>
      ),
    },
  ];

  return (
    <section className="og-strength-section">
      <div className="og-strength-container">
        {/* Top Header Group */}
        <div className="og-strength-top">
          <div className="og-strength-heading">
            <span className="og-strength-eyebrow">WHAT CONNECTS US</span>
            <h2>
              Built on Shared Values.
              <span>Driven by Collective Strength.</span>
            </h2>
          </div>

          <div className="og-strength-intro">
            <p>
              Across every business, our approach remains rooted in
              responsible growth, consistent quality and a commitment
              to creating meaningful value for farmers, partners,
              customers and communities.
            </p>
          </div>
        </div>

        {/* 5 Connected Strength Cards */}
        <div className="og-strength-grid">
          {cards.map((c, idx) => (
            <article className="og-strength-card" key={idx}>
              <div className="og-strength-icon">{c.icon}</div>

              <div className="og-strength-card-content">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>

              <span className="og-strength-card-arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>

        {/* Bottom Feature Landscape Block */}
        <div className="og-strength-feature">
          <div className="og-strength-feature-image">
            <img
              src="/images/biz-landscape.jpg"
              alt="Sustainable agricultural landscape"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1500&q=85';
              }}
            />
            <div className="og-strength-feature-overlay" aria-hidden="true"></div>
          </div>

          <div className="og-strength-feature-content">
            <span>ONE COMMON PURPOSE</span>

            <h3>
              Creating Value That
              <em>Moves Forward.</em>
            </h3>

            <p>
              Our businesses may serve different markets, but they
              share one common direction — building a stronger,
              more responsible and future-ready agricultural and
              food ecosystem.
            </p>

            <Link to="/contact" className="og-strength-btn">
              <span>LET'S CONNECT</span>
              <b aria-hidden="true">→</b>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
