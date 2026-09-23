import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Compass, ArrowRight } from 'lucide-react';
import AboutHero from '../components/AboutHero';
import HorizontalTimeline from '../components/HorizontalTimeline';
import ChairmanMessage from '../components/ChairmanMessage';
import OperationsSection from '../components/OperationsSection';
import CertificationsSection from '../components/CertificationsSection';

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const purposePages = [
    {
      kicker: 'WHAT DRIVES US',
      title: 'Our Mission',
      statement: '“To provide stable financial income to Indian farmers through continuous innovation, honesty and teamwork.”',
      desc: 'Discover our grassroots farmer empowerment initiatives, guaranteed buyback models, and scientific rations.',
      link: '/our-mission',
      btnText: 'Explore Our Mission',
      icon: <Target size={30} color="#173b24" />,
      accentBg: '#eaf5eb',
      accentBorder: '#cce5ce',
    },
    {
      kicker: 'WHERE WE ARE GOING',
      title: 'Our Vision',
      statement: '“To be a part of every Indian kitchen — directly or indirectly.”',
      desc: 'Explore our feed-to-fork integrated ecosystem that connects animal nutrition, bio-secure farms, and household dining tables.',
      link: '/our-vision',
      btnText: 'Explore Our Vision',
      icon: <Eye size={30} color="#173b24" />,
      accentBg: '#e8f4fa',
      accentBorder: '#c8e2f2',
    },
    {
      kicker: 'WHAT GUIDES US',
      title: 'Values That Move Us',
      statement: '“Innovation, Integrity, We Before Me, Be Real, and Find a Way.”',
      desc: 'The five foundational principles that define our work culture, farmer partnerships, and long-term business decisions.',
      link: '/values',
      btnText: 'Explore Values That Move Us',
      icon: <Compass size={30} color="#173b24" />,
      accentBg: '#fef7e8',
      accentBorder: '#f8e6be',
    },
  ];

  return (
    <main className="about-page-view" id="main-content">
      {/* 1. Hero Compact Showcase */}
      <AboutHero />

      {/* 2. Interactive Historical Milestone Journey */}
      <HorizontalTimeline />

      {/* 3. Chairman's Message & Leadership */}
      <ChairmanMessage />

      {/* 4. Operations & Business Model Section */}
      <OperationsSection />

      {/* 5. Purpose Portal: Mission, Vision & Values on Separate Pages */}
      <section className="section bg-subtle" id="mission-vision-values">
        <div className="container">
          <div className="section-header text-center" style={{ maxWidth: '780px', margin: '0 auto 52px' }}>
            <div className="badge badge-green">OUR PURPOSE &amp; PHILOSOPHY</div>
            <h2 style={{ color: '#0e2919' }}>Mission, Vision &amp; Values</h2>
            <p className="section-subtitle">
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
            {purposePages.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #dce8d7',
                  borderRadius: '16px',
                  padding: '38px 30px 32px',
                  boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      width: '58px',
                      height: '58px',
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

      {/* 6. Certifications & Accreditations */}
      <CertificationsSection />
    </main>
  );
}
