import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutHero() {
  return (
    <section className="about-hero-compact" id="about-hero">
      {/* Decorative Circles */}
      <div className="ahc-circle ahc-circle-1" aria-hidden="true"></div>
      <div className="ahc-circle ahc-circle-2" aria-hidden="true"></div>

      <div className="ahc-container">
        {/* Breadcrumb Navigation */}
        <nav className="ahc-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">HOME</Link>
          <span aria-hidden="true">›</span>
          <strong>ABOUT US</strong>
        </nav>

        {/* Left Content */}
        <div className="ahc-content">
          <div className="ahc-label">
            <span className="ahc-label-line"></span>
            <span>ABOUT URJA</span>
          </div>

          <h1 className="ahc-title">
            <span>Building with Purpose.</span>
            <span>
              Growing with <em>Responsibility.</em>
            </span>
          </h1>

          <p className="ahc-description">
            From animal nutrition to an integrated agriculture, nutrition and food ecosystem.
          </p>

          <a href="#our-journey" className="ahc-btn">
            <span>OUR JOURNEY</span>
            <span className="ahc-btn-arrow" aria-hidden="true">↓</span>
          </a>
        </div>

        {/* Right Hero Image Showcase */}
        <div className="ahc-image-wrapper">
          <div className="ahc-image-frame" aria-hidden="true"></div>

          <div className="ahc-image">
            <img
              src="/images/about-hero.jpg"
              alt="Urja Foods and Agro integrated agribusiness"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/3.jpg';
              }}
            />
          </div>

          <div className="ahc-image-tag">
            <span className="ahc-tag-line"></span>
            <div>
              <small>URJA FOODS &amp; AGRO</small>
              <strong>INTEGRATED AGRIBUSINESS</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll & Category Indicators */}
      <div className="ahc-bottom">
        <div className="ahc-scroll">
          <span>SCROLL TO EXPLORE</span>
          <div className="ahc-scroll-line" aria-hidden="true">
            <i></i>
          </div>
        </div>

        <div className="ahc-category">
          AGRICULTURE &nbsp; • &nbsp; NUTRITION &nbsp; • &nbsp; FOOD
        </div>
      </div>
    </section>
  );
}
