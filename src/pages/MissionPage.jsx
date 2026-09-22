import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  TrendingUp,
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
  Sprout,
  Eye,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function MissionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const missionPillars = [
    {
      icon: <TrendingUp size={28} color="#173b24" />,
      title: 'Farmer Financial Stability',
      desc: 'Ensuring predictable, fair pricing and consistent year-round income for over 900+ partnered farm families through transparent direct buybacks.',
    },
    {
      icon: <Sprout size={28} color="#173b24" />,
      title: 'Scientific Agribusiness Innovation',
      desc: 'Deploying advanced steam-pelleting feed manufacturing, high bypass-protein formulations, and automated poultry brooding technologies.',
    },
    {
      icon: <HeartHandshake size={28} color="#173b24" />,
      title: 'Long-Term Grassroots Partnerships',
      desc: 'Treating farmers not as mere customers, but as co-builders of India’s agricultural resilience with veterinary care, farm audits, and technical assistance.',
    },
    {
      icon: <ShieldCheck size={28} color="#173b24" />,
      title: 'Uncompromised Purity & Biosecurity',
      desc: 'Maintaining strict European-standard biosecurity across our hatcheries, feed mills, and breeder facilities from the very first day.',
    },
  ];

  const missionMetrics = [
    { num: '900+', label: 'Contract Farming Families' },
    { num: '20%+', label: 'Average Household Income Lift' },
    { num: '100%', label: 'Transparent Direct Weighments' },
    { num: '24/7', label: 'Field Veterinary Telemetry' },
  ];

  return (
    <main className="mission-page-view" id="main-content">
      {/* 1. Page Header Banner */}
      <PageBanner
        badge="WHAT DRIVES US"
        title="Our Mission"
        subtitle="Empowering Indian farmers and building a resilient, transparent agricultural value chain through continuous innovation, honesty, and teamwork."
        breadcrumb="Our Mission"
      />

      {/* 2. Central Mission Statement Showcase */}
      <section className="section bg-white" id="mission-statement">
        <div className="container">
          <div
            style={{
              maxWidth: '1040px',
              margin: '0 auto',
              padding: '52px 44px',
              background: 'linear-gradient(135deg, #0e2919 0%, #173b24 100%)',
              borderRadius: '18px',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(14, 41, 25, 0.16)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '84px',
                height: '84px',
                borderRadius: '50%',
                background: 'rgba(168, 197, 143, 0.2)',
                border: '2px solid #a8c58f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Target size={42} color="#a8c58f" />
            </div>

            <div>
              <span
                style={{
                  color: '#a8c58f',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '2.5px',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '10px',
                }}
              >
                CORE MISSION STATEMENT
              </span>
              <h2
                style={{
                  color: '#ffffff',
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  fontSize: 'clamp(24px, 2.8vw, 36px)',
                  lineHeight: 1.3,
                  fontWeight: 500,
                  margin: '0 0 16px',
                }}
              >
                “To provide stable financial income to Indian farmers through continuous innovation, honesty and teamwork.”
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.84)',
                  fontSize: '16px',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We work tirelessly to create dependable opportunities for rural families through stronger products, scientific practices, and enduring partnerships that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Pillars in Action */}
      <section className="section bg-subtle" id="mission-pillars">
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto 48px' }}>
            <div className="badge badge-green">OUR COMMITMENT IN ACTION</div>
            <h2 style={{ color: '#0e2919' }}>How We Deliver on Our Mission</h2>
            <p className="section-subtitle">
              Turning our core mission into measurable ground reality every single day.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {missionPillars.map((p, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  padding: '34px 28px',
                  borderRadius: '14px',
                  border: '1px solid #dce8d7',
                  boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div style={{ marginBottom: '18px' }}>{p.icon}</div>
                <h3 style={{ fontSize: '18px', color: '#0e2919', margin: '0 0 10px', fontWeight: 700 }}>
                  {p.title}
                </h3>
                <p style={{ color: '#5b6b5e', fontSize: '14.5px', lineHeight: 1.65, margin: 0 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Impact Stats Strip */}
          <div
            style={{
              marginTop: '50px',
              padding: '32px 28px',
              background: '#ffffff',
              borderRadius: '14px',
              border: '1px solid #dce8d7',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              textAlign: 'center',
            }}
          >
            {missionMetrics.map((m, idx) => (
              <div key={idx} style={{ padding: '8px' }}>
                <div style={{ fontSize: '32px', fontWeight: 800, color: '#173b24', marginBottom: '6px' }}>
                  {m.num}
                </div>
                <div style={{ fontSize: '13px', color: '#556858', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Cross-Navigation: Explore Vision & Values */}
      <section className="section bg-white" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div
            style={{
              background: '#f6fbf5',
              border: '1px solid #d8ebd6',
              borderRadius: '16px',
              padding: '40px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div>
              <span style={{ color: '#255a36', fontSize: '11px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                CONTINUE EXPLORING
              </span>
              <h3 style={{ margin: '6px 0 8px', color: '#143b22', fontSize: '24px', fontWeight: 700 }}>
                Explore Our Vision &amp; Values
              </h3>
              <p style={{ margin: 0, color: '#556858', fontSize: '15px' }}>
                Discover our destination for every Indian kitchen and the five values that guide us.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/our-vision" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                <Eye size={16} />
                <span>Our Vision</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/values" className="btn" style={{ padding: '0.85rem 1.8rem', background: '#ffffff', color: '#143b22', border: '1px solid #bad9bd' }}>
                <Compass size={16} />
                <span>Values That Move Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
