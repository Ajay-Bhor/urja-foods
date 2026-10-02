import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';

export default function LeadershipSection() {
  const { t } = useLanguage();

  const leaders = [
    {
      name: 'Pramod Anandrao Hinge',
      role: 'Chairman & Managing Director',
      bio: 'Visionary entrepreneur with over two decades of pioneering leadership in Indian animal nutrition, feed formulation, and integrated rural agribusiness.',
      image: '/images/chairman.jpeg',
      fallback: 'https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/male.jpeg',
    },
    {
      name: 'Ajay Bhor',
      role: 'Director & Executive Leadership',
      bio: 'Strategic leader driving corporate transformation, digital technology adoption, commercial operations, and sustainable farmer empowerment models.',
      image: '/images/ajay-bhor.png',
      fallback: '/images/chairman.jpeg',
    },
  ];

  const managementPillars = [
    {
      label: 'Veterinary Advisory',
      title: 'Dr. Flock Health Team',
      desc: 'Expert avian veterinarians providing 24/7 telemetry health monitoring and biosecurity audits across all farmer sheds.',
    },
    {
      label: 'Plant Operations',
      title: 'Automation & Quality Control',
      desc: 'Certified engineers and feed nutritionists overseeing computerized 800 TPD batching and FIFO raw material storage.',
    },
    {
      label: 'Commercial & Logistics',
      title: 'Farmer Network Management',
      desc: 'Field relationship coordinators managing guaranteed buybacks, timely bird lifting, and transparent daily settlement.',
    },
  ];

  return (
    <section className="section bg-white" id="our-management">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ maxWidth: '780px', margin: '0 auto 50px' }}>
          <div className="badge badge-green">{t('leadershipBadge') || 'OUR MANAGEMENT & LEADERSHIP'}</div>
          <h2 style={{ color: '#0e2919' }}>
            {t('leadershipTitle') || 'Guided by Experience. Driven by Purpose.'}
          </h2>
          <p className="section-subtitle">
            {t('leadershipSubtitle') ||
              'Meet the dedicated leadership team and operating directors shaping Urja Foods into one of western India’s most trusted agribusiness ecosystems.'}
          </p>
        </div>

        {/* Board & Key Directors Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '48px',
          }}
        >
          {leaders.map((leader, idx) => (
            <div
              key={idx}
              style={{
                background: '#f8fbf5',
                border: '1px solid #dce8d7',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div style={{ position: 'relative', height: '280px', background: '#0e2919' }}>
                <img
                  src={leader.image}
                  alt={leader.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = leader.fallback;
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(14, 41, 25, 0.9) 0%, transparent 60%)',
                  }}
                ></div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '20px',
                    right: '20px',
                    color: '#ffffff',
                  }}
                >
                  <h3 style={{ margin: '0 0 4px', fontSize: '22px', color: '#ffffff', fontWeight: 700 }}>
                    {leader.name}
                  </h3>
                  <span
                    style={{
                      color: '#a8c58f',
                      fontSize: '13px',
                      fontWeight: 700,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {leader.role}
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.65, color: '#4a574e' }}>
                  {leader.bio}
                </p>
                <div
                  style={{
                    marginTop: '18px',
                    paddingTop: '14px',
                    borderTop: '1px solid #e1ebde',
                    fontSize: '12px',
                    color: '#2a5a38',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  Urja Foods &amp; Agro Leadership
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Operational Management Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            background: '#ffffff',
            border: '1px solid #dce8d7',
            borderRadius: '16px',
            padding: '32px 28px',
          }}
        >
          {managementPillars.map((pillar, pIdx) => (
            <div key={pIdx} style={{ padding: '8px 12px' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: '#9c7b32',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {pillar.label}
              </span>
              <h4 style={{ margin: '0 0 8px', fontSize: '18px', color: '#0e2919', fontWeight: 700 }}>
                {pillar.title}
              </h4>
              <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.6, color: '#5b6b5e' }}>
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
