import React, { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import '../styles/horizontal-timeline.css';

// 8 Official Corporate Food Milestones
const TIMELINE_MILESTONES = [
  {
    year: '2004',
    title: 'Foundation',
    desc: 'Urja Foods was established with a foundational vision for healthier tomorrows, focusing on sustainable agro-practices, grain processing, and empowering rural farming communities.',
    image: '/images/timeline/2004.jpg',
  },
  {
    year: '2005',
    title: 'First Facility',
    desc: 'Set up our first manufacturing unit to ensure quality and consistency. This facility marked the beginning of our journey towards delivering healthier food products.',
    image: '/images/timeline/2005.jpg',
  },
  {
    year: '2007',
    title: 'Growing Team',
    desc: 'Built a strong team of passionate individuals committed to our shared mission of nutritional excellence, farmer welfare, and sustainable growth.',
    image: '/images/timeline/2007.jpg',
  },
  {
    year: '2010',
    title: 'Market Expansion',
    desc: 'Expanded to new regions and distribution networks, reaching more customers and agricultural partners with dependable, quality agro-nutrition products.',
    image: '/images/timeline/2010.jpg',
  },
  {
    year: '2014',
    title: 'Strategic Partnerships',
    desc: 'Collaborated with trusted industry partners and contract farming networks to enhance our capabilities and integrate the supply chain.',
    image: '/images/timeline/2014.jpg',
  },
  {
    year: '2020',
    title: 'Sustainability Focus',
    desc: 'Led eco-friendly initiatives including 1.2 MW captive solar power across operations, closed-loop water management, and an ambitious tree plantation pledge.',
    image: '/images/timeline/2020.jpg',
  },
  {
    year: '2024',
    title: 'Recognition',
    desc: 'Received industry recognition and prestigious bio-security certifications for uncompromising standards in feed manufacturing, hygiene, and product safety.',
    image: '/images/timeline/2024.jpg',
  },
  {
    year: '2025',
    title: 'A Healthier Tomorrow',
    desc: 'Continuing our forward journey towards a healthier and stronger world through modern, sustainable farm-to-fork agribusiness and nutritional innovations.',
    image: '/images/timeline/2025.jpg',
  },
];

export default function HorizontalTimeline() {
  const trackRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Active milestone index and popup visibility state
  const [activeIdx, setActiveIdx] = useState(null);
  const [displayedItem, setDisplayedItem] = useState(TIMELINE_MILESTONES[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [cardPosition, setCardPosition] = useState({ left: '0px', caretLeft: '50%' });

  // 1. Mouse enters a milestone circle/year
  const handleNodeMouseEnter = (idx) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveIdx(idx);
    setDisplayedItem(TIMELINE_MILESTONES[idx]);
    setIsOpen(true);
  };

  // 2. Mouse leaves a milestone circle/year (grace period to allow moving to popup)
  const handleNodeMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveIdx(null);
    }, 240);
  };

  // 3. Mouse enters the popup itself
  const handlePopupMouseEnter = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(true);
  };

  // 4. Mouse leaves the popup itself
  const handlePopupMouseLeave = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveIdx(null);
    }, 240);
  };

  // 5. Explicit close with "✕" button
  const handleCloseClick = (e) => {
    e?.stopPropagation();
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsOpen(false);
    setActiveIdx(null);
  };

  // Dynamically calculate popup card and caret arrow alignment directly under the active circle
  useEffect(() => {
    if (activeIdx === null || !trackRef.current) return;

    const updateCardLayout = () => {
      const track = trackRef.current;
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const nodeElements = track.querySelectorAll('.ht-circle-node');
      const targetNode = nodeElements[activeIdx];

      if (!targetNode) return;

      const targetRect = targetNode.getBoundingClientRect();
      const circleCenterX = targetRect.left - trackRect.left + targetRect.width / 2;
      const popupWidth = Math.min(480, trackRect.width - 24);

      let idealLeft = circleCenterX - popupWidth / 3;
      if (idealLeft < 0) idealLeft = 0;
      if (idealLeft + popupWidth > trackRect.width) idealLeft = trackRect.width - popupWidth;

      const caretX = circleCenterX - idealLeft;

      setCardPosition({
        left: `${idealLeft}px`,
        caretLeft: `${Math.max(22, Math.min(popupWidth - 22, caretX))}px`,
      });
    };

    updateCardLayout();
    window.addEventListener('resize', updateCardLayout);
    return () => window.removeEventListener('resize', updateCardLayout);
  }, [activeIdx]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <section className="ht-exact-timeline-section" id="our-journey">
      <div className="ht-exact-container">

        {/* 1. Header with accent lines: — OUR JOURNEY — */}
        <div className="ht-exact-header">
          <div className="ht-exact-kicker-row">
            <span className="ht-exact-kicker-line"></span>
            <span className="ht-exact-kicker-text">OUR JOURNEY</span>
            <span className="ht-exact-kicker-line"></span>
          </div>

          <h2 className="ht-exact-heading">Milestones That Drive Us Forward</h2>
          <p className="ht-exact-subtitle">A journey of trust, quality and growth.</p>
        </div>

        {/* 2. Timeline Master Row: Clean, horizontal 8 Milestone Circles */}
        <div className="ht-exact-track-wrapper">
          <div className="ht-exact-circles-track" ref={trackRef}>
            
            {/* Continuous Dotted Dark-Green Line */}
            <div className="ht-exact-dotted-line" aria-hidden="true" />

            {TIMELINE_MILESTONES.map((item, idx) => {
              const isSelected = activeIdx === idx;
              const isLast = idx === TIMELINE_MILESTONES.length - 1;

              return (
                <div key={item.year} className="ht-exact-column">
                  
                  {/* Circular Milestone Image Node with hover triggers */}
                  <div
                    className={`ht-circle-node ${isSelected ? 'is-active' : ''}`}
                    onMouseEnter={() => handleNodeMouseEnter(idx)}
                    onMouseLeave={handleNodeMouseLeave}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNodeMouseEnter(idx);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${item.year}: ${item.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleNodeMouseEnter(idx);
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="ht-circle-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/company-plant.jpg';
                      }}
                    />

                    {/* Dark gradient overlay with bold white Year directly on bottom portion */}
                    <div className="ht-circle-year-overlay">
                      <span className="ht-circle-year-text">{item.year}</span>
                    </div>
                  </div>

                  {/* Circular Connector Ring with Inner Dot midway between circles */}
                  {!isLast && (
                    <div className="ht-exact-connector-point" aria-hidden="true">
                      <span className="ht-connector-ring">
                        <span className="ht-connector-inner-dot" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Connected Floating Popup Card with 200-300ms transition & Hover Bridge */}
        <div className="ht-exact-popup-anchor-area">
          <div
            className={`ht-exact-popup-card ${isOpen ? 'is-open' : 'is-closed'}`}
            style={{ left: cardPosition.left }}
            onMouseEnter={handlePopupMouseEnter}
            onMouseLeave={handlePopupMouseLeave}
            role="dialog"
            aria-hidden={!isOpen}
            aria-label={displayedItem ? `Milestone details for ${displayedItem.year}` : 'Milestone details'}
          >
            {/* Invisible hover bridge linking circle to popup card */}
            <div className="ht-hover-bridge" aria-hidden="true" />

            {/* Upward triangular caret pointing directly to the active circle above */}
            <div
              className="ht-exact-popup-caret"
              style={{ left: cardPosition.caretLeft }}
              aria-hidden="true"
            />

            {/* Close Button "✕" in Top Right */}
            <button
              type="button"
              className="ht-exact-close-btn"
              onClick={handleCloseClick}
              aria-label="Close milestone details"
              title="Close"
            >
              <X size={16} strokeWidth={2.2} />
            </button>

            {/* Inner Content Grid */}
            {displayedItem && (
              <div className="ht-exact-card-grid">
                
                {/* Left: Large Milestone Image */}
                <div className="ht-exact-card-img-wrap">
                  <img
                    src={displayedItem.image}
                    alt={`${displayedItem.year} ${displayedItem.title}`}
                    className="ht-exact-card-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/company-plant.jpg';
                    }}
                  />
                </div>

                {/* Right: Year pill, Title & Description */}
                <div className="ht-exact-card-content">
                  <span className="ht-exact-year-pill">{displayedItem.year}</span>
                  <h3 className="ht-exact-title">{displayedItem.title}</h3>
                  <p className="ht-exact-desc">{displayedItem.desc}</p>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* 4. Bottom Signature: — Good Food • Brighter Futures — */}
        <div className="ht-exact-footer-tagline">
          <span className="ht-footer-line"></span>
          <span className="ht-footer-text">Good Food &nbsp;•&nbsp; Brighter Futures</span>
          <span className="ht-footer-line"></span>
        </div>

      </div>
    </section>
  );
}
