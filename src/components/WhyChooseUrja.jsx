import React from 'react';
import { ShieldCheck, Users, Factory, Leaf } from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function WhyChooseUrja() {
  const { t } = useLanguage();

  const pillars = [
    {
      num: '01',
      icon: <Factory size={26} />,
      title: t('whyPillar1Title') || 'Complete Value Chain Integration',
      desc:
        t('whyPillar1Desc') ||
        'From high-precision 800 TPD feed milling to parent breeding, automated incubation, and poultry processing — managing every touchpoint ensures total quality control.',
      metric: '800 TPD',
      metricLabel: 'Automated Feed Milling',
      color: '#1b4b2c',
      bg: '#eef6ed',
    },
    {
      num: '02',
      icon: <Users size={26} />,
      title: t('whyPillar2Title') || 'Grassroots Farmer Empowerment',
      desc:
        t('whyPillar2Desc') ||
        'More than 3,000+ partnered farmers trust our guaranteed buyback model, dedicated avian veterinary support, and timely digital commercial settlements.',
      metric: '3,000+',
      metricLabel: 'Contract Farm Agreements',
      color: '#9b772e',
      bg: '#fdf8ec',
    },
    {
      num: '03',
      icon: <ShieldCheck size={26} />,
      title: t('whyPillar3Title') || 'Rigorous Quality & Biosecurity',
      desc:
        t('whyPillar3Desc') ||
        'Operating under stringent FSSAI, BIS, NOP, and Ecocert standards with negative-pressure European EC houses for superior feed conversion and health.',
      metric: '100%',
      metricLabel: 'Certified Compliance',
      color: '#1e5f74',
      bg: '#ebf5f8',
    },
    {
      num: '04',
      icon: <Leaf size={26} />,
      title: t('whyPillar4Title') || 'Sustainable Future Commitment',
      desc:
        t('whyPillar4Desc') ||
        'Committed to environmental stewardship with 1.2 MW captive solar power, closed-loop water treatment, and our ambitious 100,000 tree plantation mission.',
      metric: '100,000',
      metricLabel: 'Tree Plantation Mission',
      color: '#2a6a3b',
      bg: '#edf7ee',
    },
  ];

  return (
    <section className="section bg-white" id="why-choose-urja">
      <div className="container">
        {/* Header */}
        <div className="section-header text-center" style={{ maxWidth: '820px', margin: '0 auto 50px' }}>
          <div className="badge badge-green">{t('whyOverline') || 'WHY CHOOSE URJA'}</div>
          <h2 style={{ color: '#0e2919' }}>
            {t('whyTitle1') || 'The Foundations of Our'} {t('whyTitle2') || 'Agribusiness Excellence'}
          </h2>
          <p className="section-subtitle">
            {t('whyIntro') ||
              'For over two decades, Urja Foods has earned the trust of farmers, dealers, and consumers through honest practices, continuous innovation, and reliable execution.'}
          </p>
        </div>

        {/* 4 Restructured Value Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.num}
              style={{
                background: '#ffffff',
                border: '1px solid #dce8d7',
                borderRadius: '16px',
                padding: '32px 26px',
                boxShadow: '0 6px 20px rgba(23, 59, 36, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: p.bg,
                      color: p.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {p.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#a0ac9e',
                      letterSpacing: '1px',
                    }}
                  >
                    PILLAR {p.num}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#0e2919',
                    margin: '0 0 12px',
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                  }}
                >
                  {p.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: '#556357',
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid #edf3ea',
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                }}
              >
                <strong style={{ fontSize: '24px', color: p.color, fontFamily: 'var(--font-serif, Georgia, serif)' }}>
                  {p.metric}
                </strong>
                <span style={{ fontSize: '11px', color: '#7a877c', fontWeight: 600 }}>
                  {p.metricLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Executive Philosophy Quote Bar */}
        <div
          style={{
            background: '#0e2919',
            borderRadius: '16px',
            padding: '28px 36px',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div style={{ maxWidth: '780px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '2px',
                color: '#a8c58f',
                marginBottom: '6px',
                textTransform: 'uppercase',
              }}
            >
              {t('whyQuoteBadge') || 'CORE PHILOSOPHY'}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: '16px',
                lineHeight: 1.6,
                fontFamily: 'var(--font-serif, Georgia, serif)',
                fontStyle: 'italic',
                color: 'rgba(255, 255, 255, 0.92)',
              }}
            >
              “{t('whyQuote1') || 'To provide stable financial income to Indian farmers through continuous innovation, honesty and teamwork.'}”
            </p>
          </div>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '8px 18px',
                background: 'rgba(168, 197, 143, 0.15)',
                border: '1px solid rgba(168, 197, 143, 0.35)',
                borderRadius: '30px',
                color: '#a8c58f',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1px',
              }}
            >
              TRUSTED SINCE 2004
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
