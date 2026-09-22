import React from 'react';

export default function CoreValues() {
  const values = [
    {
      num: '01',
      cls: 'ucv-one',
      title: 'Innovation',
      desc: 'We continuously look for better ways to improve our products, processes and the way we work.',
    },
    {
      num: '02',
      cls: 'ucv-two',
      title: 'Integrity',
      desc: 'We believe in being honest, transparent and accountable in everything we do.',
    },
    {
      num: '03',
      cls: 'ucv-three',
      title: 'We Before Me',
      desc: 'We value teamwork over individual achievement and believe that stronger results come from working together.',
    },
    {
      num: '04',
      cls: 'ucv-four',
      title: 'Be Real',
      desc: 'We stay genuine, grounded and true to who we are.',
    },
    {
      num: '05',
      cls: 'ucv-five',
      title: 'Find a Way',
      desc: "We don't stop at problems. We look for solutions, adapt and keep moving forward.",
    },
  ];

  return (
    <section className="urja-core-values" id="core-values">
      <div className="ucv-wrap">
        {/* Left Intro Column */}
        <div className="ucv-intro">
          <span className="ucv-label">WHAT GUIDES US</span>

          <h2>
            Values That
            <em>Move Us.</em>
          </h2>

          <div className="ucv-line" aria-hidden="true"></div>

          <p>
            Our values shape the way we think, work and grow.
            They keep us grounded while helping us move forward.
          </p>

          <div className="ucv-count">
            <strong>05</strong>
            <span>
              CORE<br />VALUES
            </span>
          </div>
        </div>

        {/* Right Dynamic Orbit System */}
        <div className="ucv-system">
          {/* Outer rotating dashed ring */}
          <div className="ucv-ring" aria-hidden="true"></div>

          {/* Central Values Orb */}
          <div className="ucv-center">
            <div className="ucv-center-inner">
              <span>URJA</span>
              <small>VALUES</small>
            </div>
          </div>

          {/* 5 Value Orbit Nodes */}
          {values.map((v) => (
            <article className={`ucv-item ${v.cls}`} key={v.num}>
              <div className="ucv-dot">{v.num}</div>
              <div className="ucv-content">
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
