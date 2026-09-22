import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
            Building an integrated platform across agriculture, nutrition and food.
          </p>

          <div style={{ marginTop: '1.2rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.6 }}>
            <div>CIN: U01409PN2019PTC186419</div>
            <div>Headquartered in Nirgudsar, Ambegaon, Pune, Maharashtra</div>
          </div>
        </div>

        {/* Company Column */}
        <div className="urja-footer-col">
          <h4>COMPANY</h4>
          <Link to="/about">About Us</Link>
          <Link to="/mission-vision-values">Mission, Vision &amp; Values</Link>
          <Link to="/our-mission">Our Mission</Link>
          <Link to="/our-vision">Our Vision</Link>
          <Link to="/values">Values That Move Us</Link>
          <Link to="/businesses">Our Businesses</Link>
          <Link to="/products">Product Range</Link>
          <Link to="/testimonials">Testimonials</Link>
          <Link to="/careers">Careers &amp; Openings</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Businesses Column */}
        <div className="urja-footer-col">
          <h4>OUR BUSINESSES</h4>
          <Link to="/businesses/urja-foods">Urja Foods</Link>
          <Link to="/businesses/urja-pashu-aahar">Urja Pashu Aahar</Link>
          <Link to="/businesses/poushtik-chicken">Poushtik Chicken</Link>
          <Link to="/businesses/urja-organic">Urja Organic</Link>
          <Link to="/businesses/urja-soya">Urja Soya</Link>
        </div>

        {/* Quick Links Column */}
        <div className="urja-footer-col">
          <h4>QUICK LINKS</h4>
          <a href="#sustainability">Sustainability &amp; CSR</a>
          <Link to="/careers">Join Our Team</Link>
          <Link to="/products">Feed Formulations</Link>
          <Link to="/contact">Inquiry Desk</Link>
          <a href="tel:+917028939900">+91-7028939900</a>
          <a href="mailto:info@urjafoods.net">info@urjafoods.net</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="urja-footer-bottom">
        <p>
          © {currentYear} Urja Foods &amp; Agro Pvt. Ltd. All Rights Reserved.
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
