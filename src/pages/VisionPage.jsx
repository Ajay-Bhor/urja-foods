import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Utensils,
  Wheat,
  Bird,
  ArrowRight,
  ShieldCheck,
  Target,
  Compass,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function VisionPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stages = [
    {
      step: '01',
      title: 'Feed & Nutrition',
      desc: 'Scientific steam-pelleted animal feeds ensuring peak animal health, biosecurity, and high feed conversion efficiency.',
      icon: <Wheat size={26} color="#173b24" />,
    },
    {
      step: '02',
      title: 'Modern Farming',
      desc: 'European environment-controlled poultry sheds and bio-secure livestock management with veterinary telemetry.',
      icon: <Bird size={26} color="#173b24" />,
    },
    {
      step: '03',
      title: 'Clean Processing',
      desc: 'Hygienic processing, automated cold-chain logistics, and fresh uncompromised protein supply networks.',
      icon: <ShieldCheck size={26} color="#173b24" />,
    },
    {
      step: '04',
      title: 'Every Indian Kitchen',
      desc: 'Pure, safe, and nutritious food products reaching dining tables across Maharashtra and India every day.',
      icon: <Utensils size={26} color="#173b24" />,
    },
  ];

  return (
    <main className="vision-page-view" id="main-content">
      {/* 1. Page Header Banner */}
      <PageBanner
        badge="WHERE WE ARE GOING"
        title="Our Vision"
        subtitle="Creating an integrated agribusiness and nutrition ecosystem that touches the everyday lives of families across India."
        breadcrumb="Our Vision"
      />

      {/* 2. Central Vision Statement */}
      <section className="section bg-white" id="vision-statement">
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
              <Eye size={42} color="#a8c58f" />
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
                OUR NORTH STAR
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
                “To be a part of every Indian kitchen — directly or indirectly.”
              </h2>
              <p
                style={{
                  color: 'rgba(255, 255, 255, 0.84)',
                  fontSize: '16px',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Whether it is through the food we produce, the nutrition we provide, the animals we support, or the crops grown with our agricultural solutions, our vision is to create a connected ecosystem that touches everyday life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Connected Journey: Feed to Kitchen */}
      <section className="section bg-subtle" id="vision-ecosystem">
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto 48px' }}>
            <div className="badge badge-green">FEED TO KITCHEN INTEGRATION</div>
            <h2 style={{ color: '#0e2919' }}>One Vision. Every Stage Connected.</h2>
            <p className="section-subtitle">
              From feed to farm, farm to food, and food to the family table.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {stages.map((st, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  padding: '32px 26px',
                  borderRadius: '14px',
                  border: '1px solid #dce8d7',
                  boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#a8c58f',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {st.step}
                </div>
                <div style={{ marginBottom: '18px' }}>{st.icon}</div>
                <h3 style={{ fontSize: '18px', color: '#0e2919', margin: '0 0 10px', fontWeight: 700 }}>
                  {st.title}
                </h3>
                <p style={{ color: '#5b6b5e', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>
                  {st.desc}
                </p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/businesses" className="btn btn-primary" style={{ padding: '0.9rem 2.2rem' }}>
              <span>Explore Our Connected Businesses</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Cross-Navigation: Explore Mission & Values */}
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
                Explore Our Mission &amp; Values
              </h3>
              <p style={{ margin: 0, color: '#556858', fontSize: '15px' }}>
                Learn how we empower farmers and the core values that move our organisation forward.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/our-mission" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                <Target size={16} />
                <span>Our Mission</span>
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
