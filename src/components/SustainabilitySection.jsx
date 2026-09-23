import React, { useState, useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// CONFIGURABLE SUSTAINABILITY TARGETS
// Easily adjust numbers or targets anytime!
// ---------------------------------------------------------------------------
const SUSTAINABILITY_TARGETS = {
  solar: 1.2,           // 1.2 MW
  trees: 25000,         // 25,000+ Trees Planted & Survived
  farmers: 3000,        // 3,000+ Farmers Connected
  employees: 600,       // 600+ Employees
  commitmentTrees: 100000, // 1,00,000 Trees by 2032
};

export default function SustainabilitySection() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    solar: 0,
    trees: 0,
    farmers: 0,
    employees: 0,
    commitmentTrees: 0,
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2200; // 2.2 seconds smooth count-up
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth easeOutCubic curve
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              solar: parseFloat((ease * SUSTAINABILITY_TARGETS.solar).toFixed(1)),
              trees: Math.floor(ease * SUSTAINABILITY_TARGETS.trees),
              farmers: Math.floor(ease * SUSTAINABILITY_TARGETS.farmers),
              employees: Math.floor(ease * SUSTAINABILITY_TARGETS.employees),
              commitmentTrees: Math.floor(ease * SUSTAINABILITY_TARGETS.commitmentTrees),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                solar: SUSTAINABILITY_TARGETS.solar,
                trees: SUSTAINABILITY_TARGETS.trees,
                farmers: SUSTAINABILITY_TARGETS.farmers,
                employees: SUSTAINABILITY_TARGETS.employees,
                commitmentTrees: SUSTAINABILITY_TARGETS.commitmentTrees,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    {
      id: 'solar',
      number: `${counts.solar.toFixed(1)} MW`,
      title: 'SOLAR POWER CAPACITY',
      desc: 'Investing in renewable energy across our operations.',
      icon: (
        <svg viewBox="0 0 44 44" width="32" height="32" fill="none" stroke="#173b24" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Sun with rays */}
          <circle cx="22" cy="11" r="3.5" fill="rgba(23, 59, 36, 0.12)" />
          <path d="M22 4v2.5M16.5 6.5l1.8 1.8M27.5 6.5l-1.8 1.8M14 11h2.5M30 11h-2.5" />
          {/* Angled solar panel grid */}
          <polygon points="10 18 34 18 30 31 6 31" fill="rgba(23, 59, 36, 0.06)" />
          <line x1="22" y1="18" x2="18" y2="31" />
          <line x1="8" y1="24.5" x2="32" y2="24.5" />
          {/* Stand */}
          <line x1="14" y1="31" x2="11" y2="38" />
          <line x1="26" y1="31" x2="29" y2="38" />
          <line x1="8" y1="38" x2="32" y2="38" />
        </svg>
      ),
    },
    {
      id: 'trees',
      number: `${counts.trees.toLocaleString('en-IN')}+`,
      title: 'TREES PLANTED & SURVIVED',
      desc: 'Building a greener future, one plantation at a time.',
      icon: (
        <svg viewBox="0 0 44 44" width="32" height="32" fill="none" stroke="#173b24" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Left Tree */}
          <path d="M12 36v-8" />
          <path d="M8 28c-2-2-1.5-6 1-7 1-3 5-3.5 7-1.5 1.5-.8 4 .5 4 3 1.5 1.5.8 4-.8 5-1.5.8-9.5.8-11.2.5z" fill="rgba(23, 59, 36, 0.05)" />
          {/* Center Tree (Main) */}
          <path d="M22 38v-11" />
          <path d="M16 27c-2-3-1-8 2.5-9 1-4 6-5 9-2 2-1 5 1 5 4.5 2 2.5 1 6-1.5 7-2.5 1-13 1-16-.5z" fill="rgba(23, 59, 36, 0.1)" />
          {/* Right Tree */}
          <path d="M32 36v-8" />
          <path d="M28 28c-1.5-2-.5-5 1-6 1-2.5 4.5-3 6-1 1-.5 3.5.5 3.5 2.5 1.5 1.5.8 3.5-.8 4.5-1.5.8-8 .8-9.7 0z" fill="rgba(23, 59, 36, 0.05)" />
          <line x1="6" y1="38" x2="38" y2="38" />
        </svg>
      ),
    },
    {
      id: 'farmers',
      number: `${counts.farmers.toLocaleString('en-IN')}+`,
      title: 'FARMERS CONNECTED',
      desc: 'Livelihoods supported through our agricultural ecosystem.',
      icon: (
        <svg viewBox="0 0 44 44" width="32" height="32" fill="none" stroke="#173b24" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Conical hat / farmer straw hat */}
          <path d="M11 20c3.5-1.5 8-2 11-2s7.5.5 11 2" />
          <path d="M16 19.5c1.5-3.5 3.5-6.5 6-6.5s4.5 3 6 6.5" />
          <path d="M8 21.5c4-1.2 9.5-2 14-2s10 .8 14 2c-1.5 1.2-3.5 2-6.5 2.2H14.5c-3-.2-5-1-6.5-2.2z" fill="rgba(23, 59, 36, 0.08)" />
          {/* Face */}
          <path d="M17.5 23.5v2.5c0 2.5 2 4.5 4.5 4.5s4.5-2 4.5-4.5v-2.5" />
          {/* Shirt / shoulders */}
          <path d="M13.5 38v-3.5c0-2.8 2.8-5 6-5h5c3.2 0 6 2.2 6 5v3.5" />
          {/* Sprout in hand */}
          <path d="M30 32c1.5-1.8 3.5-1.8 5-.8 0 1.8-1 3.2-2.5 3.2-1.5 0-2.5-.8-2.5-2.4z" fill="rgba(23, 59, 36, 0.15)" />
          <path d="M30 35c0-2.5 1.8-4.2 4-4.2" />
        </svg>
      ),
    },
    {
      id: 'employees',
      number: `${counts.employees.toLocaleString('en-IN')}+`,
      title: 'EMPLOYEES',
      desc: 'Supporting 600+ families through employment.',
      icon: (
        <svg viewBox="0 0 44 44" width="32" height="32" fill="none" stroke="#173b24" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {/* Center Leader / Employee */}
          <circle cx="22" cy="16" r="4.2" fill="rgba(23, 59, 36, 0.08)" />
          <path d="M14 34v-1.8c0-3.2 3.5-5.5 8-5.5s8 2.3 8 5.5v1.8" />
          {/* Left Team Member */}
          <circle cx="12" cy="18" r="3.2" />
          <path d="M6 34v-1.2c0-2.5 2.5-4.2 5.5-4.5" />
          {/* Right Team Member */}
          <circle cx="32" cy="18" r="3.2" />
          <path d="M38 34v-1.2c0-2.5-2.5-4.2-5.5-4.5" />
        </svg>
      ),
    },
  ];

  return (
    <section className="urja-sustainability-section" id="sustainability" ref={sectionRef}>
      <div className="urja-sustainability-container">
        
        {/* Top Header Block: Headline on Left, Narrative & Script on Right */}
        <div className="urja-sus-topbar">
          <div className="urja-sus-title-col">
            <span className="urja-sus-badge">SUSTAINABILITY &amp; CSR</span>
            <h2 className="urja-sus-headline">
              Growing Responsibly.<br />
              Supporting Tomorrow.
            </h2>
            <p className="urja-sus-tagline">
              FOR A HEALTHIER PLANET. STRONGER COMMUNITIES.
            </p>
          </div>

          <div className="urja-sus-narrative-col">
            <p className="urja-sus-statement">
              Our responsibility goes beyond our business. We are committed to creating a positive and lasting impact across the environment, farming communities and the people who make Urja stronger.
            </p>
            <div className="urja-sus-script-box">
              <span className="urja-sus-script-text">A greener tomorrow, together.</span>
              <svg width="180" height="20" viewBox="0 0 180 20" fill="none" stroke="#467853" strokeWidth="2.2" strokeLinecap="round" className="urja-sus-swoosh" aria-hidden="true">
                <path d="M5 8 C45 15, 115 15, 165 6 C172 4.5, 175 8, 168 12 C154 17, 122 16, 95 15" />
              </svg>
            </div>
          </div>
        </div>

        {/* Center Frosted Glass 4-Column Stat Showcase */}
        <div className="urja-sus-glass-card">
          {stats.map((item, idx) => (
            <div className={`urja-sus-metric-col ${idx !== stats.length - 1 ? 'has-divider' : ''}`} key={item.id}>
              <div className="urja-sus-icon-ring">
                {item.icon}
              </div>
              <div className="urja-sus-metric-num">{item.number}</div>
              <div className="urja-sus-metric-title">{item.title}</div>
              <p className="urja-sus-metric-desc">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Dark Forest Green Commitment Banner */}
        <div className="urja-sus-commitment-bar">
          <div className="urja-sus-commitment-left">
            <div className="urja-sus-leaf-icon" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="#8be09d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M26 6C18 6 8 12 7 21c-1 8 7 8 13 4 8-5 9-15 6-19z" fill="rgba(139, 224, 157, 0.2)" />
                <path d="M7 21c5-5 11-9 19-15" />
              </svg>
            </div>
            <div className="urja-sus-commitment-meta">
              <span className="urja-sus-commitment-sub">OUR COMMITMENT</span>
              <h3 className="urja-sus-commitment-heading">
                {counts.commitmentTrees.toLocaleString('en-IN')} Trees by 2032
              </h3>
            </div>
          </div>

          <div className="urja-sus-commitment-divider" aria-hidden="true"></div>

          <p className="urja-sus-commitment-narrative">
            From renewable energy to tree plantation and farmer development, we continue to build sustainability into the way we grow.
          </p>
        </div>

        {/* Bottom Sub-brand Footer Ribbon */}
        <div className="urja-sus-footer-ribbon">
          <span className="urja-sus-company-tag">URJA FOODS &amp; AGRO PVT LTD</span>
          <div className="urja-sus-pillars">
            <span>PEOPLE</span>
            <span className="pillar-sep">·</span>
            <span>PLANET</span>
            <span className="pillar-sep">·</span>
            <span>PROGRESS</span>
          </div>
        </div>

      </div>
    </section>
  );
}
