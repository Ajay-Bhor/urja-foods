import React, { useState, useEffect, useRef } from 'react';

export default function StatsStrip() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    tpd: 0,
    ec: 0,
    farmers: 0,
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              years: Math.floor(easeProgress * 20),
              tpd: Math.floor(easeProgress * 150),
              ec: Math.floor(easeProgress * 100),
              farmers: Math.floor(easeProgress * 10000),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const stats = [
    {
      number: `${counts.years}+ Years`,
      label: 'Agri-Nutrition Heritage',
      subtext: 'Pioneered in 2005 by Mr. Pramod Anandrao Hinge',
    },
    {
      number: `${counts.tpd} TPD`,
      label: 'Computerized Pellet Capacity',
      subtext: 'High-precision automated manufacturing plant',
    },
    {
      number: `${counts.ec}%`,
      label: 'European EC Houses',
      subtext: 'Climate-controlled sheds & auto-vaccination',
    },
    {
      number: `${counts.farmers.toLocaleString()}+`,
      label: 'Farmers Empowered',
      subtext: 'West Maharashtra dairy & poultry growers',
    },
  ];

  return (
    <section className="stats-strip" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div className="stat-box animate-on-scroll" key={idx}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-subtext">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
