import React from 'react';

export default function ManufacturingExcellence() {
  const points = [
    {
      num: '01',
      strong: '800 TPD & 140 TPD',
      desc: 'Automated & Conventional Feed Manufacturing',
      spanFull: true,
    },
    {
      num: '02',
      strong: 'PLC CONTROLLED',
      desc: 'Automated Production',
    },
    {
      num: '03',
      strong: 'EC HOUSES',
      desc: 'Automated Feeding & Drinking',
    },
    {
      num: '04',
      strong: 'IN-HOUSE',
      desc: 'Premix & Soya Processing',
    },
    {
      num: '05',
      strong: 'PRECISION',
      desc: 'Batching & Micro-Dosing',
    },
  ];

  return (
    <section className="urja-mfg-compact" id="manufacturing-excellence">
      <div className="urja-mfg-container">
        {/* Top Header */}
        <div className="urja-mfg-top">
          <div className="urja-mfg-title">
            <span className="urja-mfg-label">MANUFACTURING EXCELLENCE</span>
            <h2>
              Where Technology<br />
              <em>Meets Integration</em>
            </h2>
          </div>

          <div className="urja-mfg-intro">
            <p>
              Advanced technology, automation and integrated manufacturing capabilities built for precision, consistency and scale.
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
