import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Shield,
  Users2,
  Compass,
  Award,
  ArrowRight,
  Target,
  Eye,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function ValuesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const valuesList = [
    {
      num: '01',
      title: 'Innovation',
      tagline: 'Better ways every day',
      desc: 'We continuously invest in superior automation, steam-pelleted formulations, and environment-controlled farming to push agricultural boundaries.',
      icon: <Lightbulb size={30} color="#173b24" />,
    },
    {
      num: '02',
      title: 'Integrity',
      tagline: 'Honest & accountable',
      desc: 'We uphold absolute transparency in transactions, farmer weighments, quality testing, and ethical biosecure practices at every facility.',
      icon: <Shield size={30} color="#173b24" />,
    },
    {
      num: '03',
      title: 'We Before Me',
      tagline: 'Collective over individual',
      desc: 'Our success is collective. When farmers, dealers, veterinarians, and factory workers succeed together, Urja grows sustainably.',
      icon: <Users2 size={30} color="#173b24" />,
    },
    {
      num: '04',
      title: 'Be Real',
      tagline: 'Grounded & authentic',
      desc: 'We stay humble, grounded in our rural roots, listening to ground realities and delivering solutions that actually work on the farm.',
      icon: <Compass size={30} color="#173b24" />,
    },
    {
      num: '05',
      title: 'Find a Way',
      tagline: 'Courage to solve & adapt',
      desc: 'Agribusiness presents natural, climate, and supply-chain challenges. We never stop at obstacles—we innovate, adapt, and build forward.',
      icon: <Award size={30} color="#173b24" />,
    },
  ];

  return (
    <main className="values-page-view" id="main-content">
      {/* 1. Page Header Banner */}
      <PageBanner
        badge="WHAT GUIDES US"
        title="Values That Move Us"
        subtitle="Our five founding values shape how we think, work, partner, and grow together across every stage of our ecosystem."
        breadcrumb="Values That Move Us"
      />

      {/* 2. Values Cards Showcase */}
      <section className="section bg-white" id="values-list">
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: '760px', margin: '0 auto 52px' }}>
            <div className="badge badge-green">OUR FIVE ANCHORS</div>
            <h2 style={{ color: '#0e2919' }}>Principles That Define Urja Foods</h2>
            <p className="section-subtitle">
              These are not just words on a wall; they are the living standards we hold ourselves accountable to every single day.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {valuesList.map((val) => (
              <div
                key={val.num}
                style={{
                  background: '#fbfdfa',
                  border: '1px solid #dce8d7',
                  borderRadius: '16px',
                  padding: '38px 32px',
                  boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                  position: 'relative',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    fontFamily: 'Georgia, serif',
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#a8c58f',
                  }}
                >
                  {val.num}
                </div>

                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: '#eaf5eb',
                    border: '1px solid #d2ebd6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {val.icon}
                </div>

                <span
                  style={{
                    display: 'block',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: '#386a45',
                    marginBottom: '6px',
                  }}
                >
                  {val.tagline}
                </span>

                <h3
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#0e2919',
                    margin: '0 0 14px',
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                  }}
                >
                  {val.title}
                </h3>

                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: 1.68,
                    color: '#526657',
                    margin: 0,
                  }}
                >
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Cross-Navigation: Explore Mission & Vision */}
      <section className="section bg-subtle" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #dce8d7',
              borderRadius: '16px',
              padding: '40px 36px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
              boxShadow: '0 8px 24px rgba(23, 59, 36, 0.04)',
            }}
          >
            <div>
              <span style={{ color: '#255a36', fontSize: '11px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                CONTINUE EXPLORING
              </span>
              <h3 style={{ margin: '6px 0 8px', color: '#143b22', fontSize: '24px', fontWeight: 700 }}>
                Explore Our Mission &amp; Vision
              </h3>
              <p style={{ margin: 0, color: '#556858', fontSize: '15px' }}>
                Discover our commitment to farmer livelihoods and our north star for Indian dining tables.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link to="/our-mission" className="btn btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
                <Target size={16} />
                <span>Our Mission</span>
                <ArrowRight size={15} />
              </Link>
              <Link to="/our-vision" className="btn" style={{ padding: '0.85rem 1.8rem', background: '#f5f9f5', color: '#143b22', border: '1px solid #bad9bd' }}>
                <Eye size={16} />
                <span>Our Vision</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
