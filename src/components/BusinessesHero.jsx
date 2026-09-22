import React from 'react';
import { Link } from 'react-router-dom';

export default function BusinessesHero() {
  return (
    <section className="ob-hero">
      {/* Background Image with Reveal Animation */}
      <div className="ob-hero-bg">
        <img
          src="/images/businesses-hero.jpg"
          alt="Agricultural business ecosystem"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=90';
          }}
        />
      </div>

      {/* Dark Forest Green Gradient Overlay */}
      <div className="ob-hero-overlay" aria-hidden="true"></div>

      {/* Hero Content Container */}
      <div className="ob-hero-container">
        <div className="ob-hero-content">
          {/* Breadcrumb Navigation */}
          <nav className="ob-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">›</span>
            <strong>Our Businesses</strong>
          </nav>

          {/* Eyebrow Label */}
          <div className="ob-eyebrow">
            <span aria-hidden="true"></span>
            <span>OUR BUSINESSES</span>
          </div>

          {/* Main Heading */}
          <h1>
            One Group.
            <br />
            <span>Many Strengths.</span>
            <br />
            <strong>One Shared Purpose.</strong>
          </h1>

          {/* Subtitle Description */}
          <p>
            Five integrated businesses working across agriculture,
            nutrition, food processing and sustainable solutions —
            creating value from farm to consumer.
          </p>

          {/* Anchor Call-to-Action */}
          <a href="#businesses" className="ob-hero-btn">
            <span>EXPLORE OUR BUSINESSES</span>
            <b aria-hidden="true">→</b>
          </a>
        </div>
      </div>
    </section>
  );
}
