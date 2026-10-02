import React from 'react';
import { useLanguage } from '../hooks/LanguageContext';

export default function ManufacturingExcellence() {
  const { t } = useLanguage();
  const points = [
    {
      num: '01',
      strong: '800 TPD & 140 TPD',
      desc: t('mfgPoint1Desc') || 'Automated & Conventional Feed Manufacturing',
      spanFull: true,
    },
    {
      num: '02',
      strong: t('mfgPoint2Title') || 'PLC CONTROLLED',
      desc: t('mfgPoint2Desc') || 'Automated Production',
    },
    {
      num: '03',
      strong: t('mfgPoint3Title') || 'EC HOUSES',
      desc: t('mfgPoint3Desc') || 'Automated Feeding & Drinking',
    },
    {
      num: '04',
      strong: t('mfgPoint4Title') || 'IN-HOUSE',
      desc: t('mfgPoint4Desc') || 'Premix & Soya Processing',
    },
    {
      num: '05',
      strong: t('mfgPoint5Title') || 'PRECISION',
      desc: t('mfgPoint5Desc') || 'Batching & Micro-Dosing',
    },
  ];

  return (
    <section className="urja-mfg-compact" id="manufacturing-excellence">
      <div className="urja-mfg-container">
        {/* Top Header */}
        <div className="urja-mfg-top">
          <div className="urja-mfg-title">
            <span className="urja-mfg-label">{t('mfgLabel') || 'MANUFACTURING EXCELLENCE'}</span>
            <h2>
              {t('mfgTitle1') || 'Where Technology'}<br />
              <em>{t('mfgTitle2') || 'Meets Integration'}</em>
            </h2>
          </div>

          <div className="urja-mfg-intro">
            <p>
              {t('mfgIntro') || 'Advanced technology, automation and integrated manufacturing capabilities built for precision, consistency and scale.'}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="urja-mfg-content">
          {/* Facility Imagery */}
          <div className="urja-mfg-image">
            <img
              src="https://urjafoods.sttourstravels.co.in/wp-content/uploads/2026/09/19120.jpg"
              alt="Urja Foods Manufacturing Plant"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/company-plant.jpg';
              }}
            />
            <div className="urja-mfg-image-overlay"></div>

            <div className="urja-mfg-image-text">
              <span>URJA FOODS &amp; AGRO</span>
              <strong>
                Precision.<br />
                Automation.<br />
                Integration.
              </strong>
            </div>
          </div>

          {/* Technology Highlights */}
          <div className="urja-mfg-points">
            {points.map((p, idx) => (
              <div
                className={`urja-mfg-point ${p.spanFull ? 'span-full' : ''}`}
                key={idx}
              >
                <span className="urja-mfg-number">{p.num}</span>
                <div>
                  <strong>{p.strong}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
