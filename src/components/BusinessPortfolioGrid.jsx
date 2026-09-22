import React from 'react';
import { Link } from 'react-router-dom';

export default function BusinessPortfolioGrid() {
  const businesses = [
    {
      id: 'urja-foods',
      path: '/businesses/urja-foods',
      customClass: 'og-business-foods',
      category: 'URJA FOODS',
      tag: 'POULTRY',
      title: 'Integrated Poultry Business',
      desc: 'An integrated poultry ecosystem connecting feed manufacturing, breeding, hatcheries, farming and live bird supply.',
      image: '/images/biz-poultry.jpg',
      remoteFallback:
        'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=85',
      capabilities: [
        'Feed Manufacturing',
        'Breeding & Farming',
        'Hatcheries',
        'Quality & Biosecurity',
      ],
      linkText: 'EXPLORE URJA FOODS',
    },
    {
      id: 'urja-pashu-aahar',
      path: '/businesses/urja-pashu-aahar',
      customClass: 'og-business-pashu',
      category: 'URJA PASHU AAHAR',
      tag: 'NUTRITION',
      title: 'Animal Nutrition Division',
      desc: 'Science-led nutrition solutions designed to support healthier livestock, improved productivity and better outcomes for farmers.',
      image: '/images/biz-nutrition.jpg',
      remoteFallback:
        'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=1200&q=85',
      capabilities: [
        'Product Portfolio',
        'Feeding Programs',
        'Technical Support',
        'Dealer Network',
      ],
      linkText: 'EXPLORE PASHU AAHAR',
    },
    {
      id: 'poushtik-chicken',
      path: '/businesses/poushtik-chicken',
      customClass: 'og-business-poushtik',
      category: 'POUSHTIK CHICKEN',
      tag: 'FOOD',
      title: 'Processed Chicken Division',
      desc: 'Delivering safe, hygienic and high-quality chicken products for modern kitchens and growing food businesses.',
      image: '/images/biz-chicken.jpg',
      remoteFallback:
        'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=1200&q=85',
      capabilities: [
        'Farm to Fork',
        'Product Range',
        'Food Safety',
        'Retail & HORECA',
      ],
      linkText: 'EXPLORE POUSHTIK',
    },
    {
      id: 'urja-organic',
      path: '/businesses/urja-organic',
      customClass: 'og-business-organic',
      category: 'URJA ORGANIC',
      tag: 'AGRICULTURE',
      title: 'Sustainable Agriculture Division',
      desc: 'Nature-based agricultural solutions focused on healthier soil, responsible farming and sustainable crop productivity.',
      image: '/images/biz-organic.jpg',
      remoteFallback:
        'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=85',
      capabilities: [
        'Organic Fertilizers',
        'Bio Fertilizers',
        'Soil Nutrition',
        'Sustainable Agriculture',
      ],
      linkText: 'EXPLORE URJA ORGANIC',
    },
    {
      id: 'urja-soya',
      path: '/businesses/urja-soya',
      customClass: 'og-business-soya',
      category: 'URJA SOYA',
      tag: 'FOOD PRODUCTS',
      title: 'Soya Processing & Food Products',
      desc: 'Transforming carefully processed soybeans into versatile food products and plant protein ingredients for diverse applications.',
      image: '/images/biz-soya.jpg',
      remoteFallback:
        'https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=1200&q=85',
      capabilities: [
        'Soya Processing',
        'Soya Oil & Atta',
        'Soya Chunks',
        'Plant Protein',
      ],
      linkText: 'EXPLORE URJA SOYA',
    },
  ];

  return (
    <section className="og-businesses" id="businesses">
      <div className="og-businesses-container">
        {/* Section Intro Header */}
        <div className="og-businesses-head">
          <div className="og-businesses-label">
            OUR BUSINESS PORTFOLIO
          </div>

          <div className="og-businesses-heading">
            <h2>
              Five Businesses.
              <span>One Connected Vision.</span>
            </h2>

            <p>
              Each business brings focused expertise to a different
              part of the agricultural and food value chain. Together,
              they create an integrated ecosystem built for quality,
              sustainability and long-term value.
            </p>
          </div>
        </div>

        {/* 5-Card Portfolio Grid */}
        <div className="og-business-grid">
          {businesses.map((biz) => (
            <Link
              to={biz.path}
              key={biz.id}
              className={`og-business-card ${biz.customClass}`}
            >
              {/* Image Visual Side */}
              <div className="og-business-image">
                <img
                  src={biz.image}
                  alt={biz.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = biz.remoteFallback;
                  }}
                />
                <div className="og-business-image-overlay" aria-hidden="true"></div>
                <div className="og-business-arrow" aria-hidden="true">
                  ↗
                </div>
              </div>

              {/* Content Side */}
              <div className="og-business-content">
                <div className="og-business-top">
                  <span className="og-business-category">{biz.category}</span>
                  <span className="og-business-tag">{biz.tag}</span>
                </div>

                <h3>{biz.title}</h3>
                <p>{biz.desc}</p>

                <div className="og-business-capabilities">
                  {biz.capabilities.map((cap, idx) => (
                    <span key={idx}>{cap}</span>
                  ))}
                </div>

                <div className="og-business-link">
                  <span>{biz.linkText}</span>
                  <b aria-hidden="true">→</b>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Ecosystem Message */}
        <div className="og-business-bottom">
          <div className="og-business-bottom-line" aria-hidden="true"></div>
          <p>
            From <strong>agriculture</strong> to <strong>nutrition</strong>,
            from <strong>processing</strong> to the <strong>consumer</strong> —
            our businesses work together to create lasting value.
          </p>
          <div className="og-business-bottom-line" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  );
}
