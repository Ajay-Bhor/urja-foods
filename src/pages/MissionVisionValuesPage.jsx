import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Compass,
  ArrowRight,
  TrendingUp,
  Sprout,
  HeartHandshake,
  ShieldCheck,
  Wheat,
  Bird,
  Utensils,
  Lightbulb,
  Shield,
  Users2,
  Award,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function MissionVisionValuesPage() {
  const [activeTab, setActiveTab] = useState('mission');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const purposeCards = [
    {
      id: 'mission',
      kicker: 'WHAT DRIVES US',
      title: 'Our Mission',
      statement:
        '“To provide stable financial income to Indian farmers through continuous innovation, honesty and teamwork.”',
      desc: 'Discover our grassroots farmer empowerment initiatives, guaranteed buyback models, and scientific rations.',
      link: '/our-mission',
      btnText: 'Explore Our Mission',
      icon: <Target size={28} color="#173b24" />,
      accentBg: '#eaf5eb',
      accentBorder: '#cce5ce',
    },
    {
      id: 'vision',
      kicker: 'WHERE WE ARE GOING',
      title: 'Our Vision',
      statement:
        '“To be a part of every Indian kitchen — directly or indirectly.”',
      desc: 'Explore our feed-to-fork integrated ecosystem that connects animal nutrition, bio-secure farms, and household dining tables.',
      link: '/our-vision',
      btnText: 'Explore Our Vision',
      icon: <Eye size={28} color="#173b24" />,
      accentBg: '#e8f4fa',
      accentBorder: '#c8e2f2',
    },
    {
      id: 'values',
      kicker: 'WHAT GUIDES US',
      title: 'Values That Move Us',
      statement:
        '“Innovation, Integrity, We Before Me, Be Real, and Find a Way.”',
      desc: 'The five foundational principles that define our work culture, farmer partnerships, and long-term business decisions.',
      link: '/values',
      btnText: 'Explore Values That Move Us',
      icon: <Compass size={28} color="#173b24" />,
      accentBg: '#fef7e8',
      accentBorder: '#f8e6be',
    },
  ];

  return (
    <main className="mvv-page-view" id="main-content">
      {/* 1. Page Header Banner */}
      <PageBanner
        badge="OUR FOUNDATIONAL PILLARS"
        title="Mission, Vision & Values"
        subtitle="Explore the core foundations that define why Urja Foods exists, where we are heading, and how we operate every day on separate dedicated pages."
        breadcrumb="Mission, Vision & Values"
      />

      {/* 2. Main Three Gateway Cards Section */}
      <section className="section bg-white" id="three-pillars-gateway">
        <div className="container">
          <div
            className="section-header text-center"
            style={{ maxWidth: '820px', margin: '0 auto 52px' }}
          >
            <h2 style={{ color: '#0e2919', fontSize: 'clamp(32px, 3.6vw, 44px)', fontWeight: 800, margin: '0 0 16px' }}>
              Mission, Vision &amp; Values
            </h2>
            <p
              className="section-subtitle"
              style={{
                fontSize: '16.5px',
                lineHeight: 1.65,
                color: '#526657',
                margin: 0,
              }}
            >
              Explore the core foundations that define why Urja Foods exists, where we are heading, and how we operate every day on separate dedicated pages.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '28px',
            }}
          >
            {purposeCards.map((item) => (
              <div
                key={item.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dce8d7',
                  borderRadius: '16px',
                  padding: '36px 30px 32px',
                  boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                }}
                className="mvv-gateway-card"
              >
                <div>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '14px',
                      background: item.accentBg,
                      border: `1px solid ${item.accentBorder}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {item.icon}
                  </div>

                  <span
                    style={{
                      display: 'block',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#255a36',
                      marginBottom: '8px',
                    }}
                  >
                    {item.kicker}
                  </span>

                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#0e2919',
                      margin: '0 0 14px',
                      fontFamily: 'var(--font-serif, Georgia, serif)',
                    }}
                  >
                    {item.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '15px',
                      fontWeight: 600,
                      lineHeight: 1.55,
                      color: '#173b24',
                      margin: '0 0 12px',
                    }}
                  >
                    {item.statement}
                  </p>

                  <p
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.6,
                      color: '#5b6b5e',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>

                <div style={{ marginTop: '28px' }}>
                  <Link
                    to={item.link}
                    className="btn btn-primary"
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      padding: '0.85rem 1.4rem',
                      fontSize: '13.5px',
                      borderRadius: '8px',
                      backgroundColor: '#9ebb85',
                      color: '#0e2919',
                      fontWeight: 700,
                      border: 'none',
                    }}
                  >
                    <span>{item.btnText}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive In-Depth Overview Tabs */}
      <section className="section bg-subtle" id="interactive-overview">
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: '720px', margin: '0 auto 40px' }}>
            <div className="badge badge-green">IN-DEPTH OVERVIEW</div>
            <h2 style={{ color: '#0e2919' }}>Explore Each Pillar in Detail</h2>
            <p className="section-subtitle">
              Select a pillar below to preview its core framework, or visit its dedicated page for the full story.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '36px',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="button"
              onClick={() => setActiveTab('mission')}
              style={{
                padding: '12px 26px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: 700,
                border: '1.5px solid',
                borderColor: activeTab === 'mission' ? '#173b24' : '#d2e2d0',
                background: activeTab === 'mission' ? '#173b24' : '#ffffff',
                color: activeTab === 'mission' ? '#ffffff' : '#173b24',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              Our Mission
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vision')}
              style={{
                padding: '12px 26px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: 700,
                border: '1.5px solid',
                borderColor: activeTab === 'vision' ? '#173b24' : '#d2e2d0',
                background: activeTab === 'vision' ? '#173b24' : '#ffffff',
                color: activeTab === 'vision' ? '#ffffff' : '#173b24',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              Our Vision
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('values')}
              style={{
                padding: '12px 26px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: 700,
                border: '1.5px solid',
                borderColor: activeTab === 'values' ? '#173b24' : '#d2e2d0',
                background: activeTab === 'values' ? '#173b24' : '#ffffff',
                color: activeTab === 'values' ? '#ffffff' : '#173b24',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              Values That Move Us
            </button>
          </div>

          {/* Tab 1: Mission View */}
          {activeTab === 'mission' && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #dce8d7',
                padding: '44px 38px',
                boxShadow: '0 10px 30px rgba(23, 59, 36, 0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#255a36', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    PILLAR 01 • OUR MISSION
                  </span>
                  <h3 style={{ fontSize: '26px', color: '#0e2919', margin: '6px 0 0', fontWeight: 800 }}>
                    Empowering Indian Farmers with Predictable Income
                  </h3>
                </div>
                <Link to="/our-mission" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', fontSize: '13.5px' }}>
                  <span>Visit Full Mission Page</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <blockquote
                style={{
                  margin: '0 0 32px',
                  padding: '20px 24px',
                  background: '#f4faf3',
                  borderLeft: '4px solid #235432',
                  borderRadius: '0 10px 10px 0',
                  fontSize: '18px',
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  color: '#143b22',
                  lineHeight: 1.55,
                }}
              >
                “To provide stable financial income to Indian farmers through continuous innovation, honesty and teamwork.”
              </blockquote>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <TrendingUp size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>Farmer Financial Stability</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>Transparent direct buybacks and guaranteed pricing.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Sprout size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>Scientific Innovation</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>High bypass-protein formulations and automated brooding.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <HeartHandshake size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>Grassroots Partnership</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>Co-builders of India's agricultural resilience.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <ShieldCheck size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>Biosecurity Standards</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>European-grade hygiene across hatcheries and mills.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Vision View */}
          {activeTab === 'vision' && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #dce8d7',
                padding: '44px 38px',
                boxShadow: '0 10px 30px rgba(23, 59, 36, 0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#255a36', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    PILLAR 02 • OUR VISION
                  </span>
                  <h3 style={{ fontSize: '26px', color: '#0e2919', margin: '6px 0 0', fontWeight: 800 }}>
                    Part of Every Indian Kitchen — Directly or Indirectly
                  </h3>
                </div>
                <Link to="/our-vision" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', fontSize: '13.5px' }}>
                  <span>Visit Full Vision Page</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <blockquote
                style={{
                  margin: '0 0 32px',
                  padding: '20px 24px',
                  background: '#f4faf3',
                  borderLeft: '4px solid #235432',
                  borderRadius: '0 10px 10px 0',
                  fontSize: '18px',
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  color: '#143b22',
                  lineHeight: 1.55,
                }}
              >
                “To be a part of every Indian kitchen — directly or indirectly.”
              </blockquote>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Wheat size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>01. Feed &amp; Nutrition</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>Scientific cattle and poultry nutrition formulated for optimal animal health.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Bird size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>02. Modern Farming</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>European EC sheds, robotic hatcheries, and bio-secure operations.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <ShieldCheck size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>03. Clean Processing</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>Hygienic processing, soya processing, and automated cold-chain logistics.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Utensils size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>04. The Dining Table</h4>
                  <p style={{ margin: 0, fontSize: '13.5px', color: '#556858', lineHeight: 1.5 }}>Wholesome, safe food reaching millions of Indian households.</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Values View */}
          {activeTab === 'values' && (
            <div
              style={{
                background: '#ffffff',
                borderRadius: '18px',
                border: '1px solid #dce8d7',
                padding: '44px 38px',
                boxShadow: '0 10px 30px rgba(23, 59, 36, 0.05)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#255a36', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    PILLAR 03 • VALUES THAT MOVE US
                  </span>
                  <h3 style={{ fontSize: '26px', color: '#0e2919', margin: '6px 0 0', fontWeight: 800 }}>
                    Five Founding Values Shaping Every Action
                  </h3>
                </div>
                <Link to="/values" className="btn btn-primary" style={{ padding: '0.75rem 1.6rem', fontSize: '13.5px' }}>
                  <span>Visit Full Values Page</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

              <blockquote
                style={{
                  margin: '0 0 32px',
                  padding: '20px 24px',
                  background: '#f4faf3',
                  borderLeft: '4px solid #235432',
                  borderRadius: '0 10px 10px 0',
                  fontSize: '18px',
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  color: '#143b22',
                  lineHeight: 1.55,
                }}
              >
                “Innovation, Integrity, We Before Me, Be Real, and Find a Way.”
              </blockquote>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px' }}>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Lightbulb size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>01. Innovation</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#556858', lineHeight: 1.5 }}>Better ways every day.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Shield size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>02. Integrity</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#556858', lineHeight: 1.5 }}>Honest and accountable.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Users2 size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>03. We Before Me</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#556858', lineHeight: 1.5 }}>Collective over individual.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Compass size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>04. Be Real</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#556858', lineHeight: 1.5 }}>Grounded and authentic.</p>
                </div>
                <div style={{ padding: '20px', background: '#fcfdfa', border: '1px solid #e5eee3', borderRadius: '10px' }}>
                  <Award size={24} color="#173b24" style={{ marginBottom: '10px' }} />
                  <h4 style={{ margin: '0 0 6px', fontSize: '16px', color: '#0e2919' }}>05. Find a Way</h4>
                  <p style={{ margin: 0, fontSize: '13px', color: '#556858', lineHeight: 1.5 }}>Courage to solve and adapt.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Bottom Contact & Partnership Callout */}
      <section className="section bg-white" style={{ padding: '70px 0 85px' }}>
        <div className="container">
          <div
            style={{
              background: 'linear-gradient(135deg, #0e2919 0%, #173b24 100%)',
              borderRadius: '20px',
              padding: '52px 48px',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '30px',
              boxShadow: '0 20px 48px rgba(14, 41, 25, 0.16)',
            }}
          >
            <div style={{ maxWidth: '640px' }}>
              <span style={{ color: '#a8c58f', fontSize: '11px', fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
                BUILDING THE FUTURE TOGETHER
              </span>
              <h2 style={{ color: '#ffffff', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 800, margin: '10px 0 12px' }}>
                Be a Part of the Urja Journey
              </h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
                Whether as a farmer partner, commercial dealer, institution, or team member, join hands with Urja Foods to build a healthier tomorrow.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                className="btn btn-primary"
                style={{
                  padding: '0.95rem 2.2rem',
                  fontSize: '14px',
                  background: '#a8c58f',
                  color: '#0e2919',
                  fontWeight: 700,
                }}
              >
                <span>Partner With Us</span>
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="btn"
                style={{
                  padding: '0.95rem 2.2rem',
                  fontSize: '14px',
                  background: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <span>About Urja Foods</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
