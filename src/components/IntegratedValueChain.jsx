import React from 'react';

export default function IntegratedValueChain() {
  const steps = [
    {
      title: 'Agriculture',
      desc: 'Building a stronger foundation through responsible and sustainable agriculture.',
      business: 'URJA ORGANIC',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 38V14" />
          <path d="M24 18C17 18 11 14 10 7c7 0 13 3 14 10" />
          <path d="M24 25c7 0 13-4 14-11-7 0-13 3-14 10" />
          <path d="M24 32c-6 0-11-3-12-9 6 0 11 2 12 8" />
        </svg>
      ),
    },
    {
      title: 'Nutrition',
      desc: 'Supporting healthier livestock and poultry through science-led nutrition solutions.',
      business: 'URJA PASHU AAHAR',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M12 31h24" />
          <path d="M15 31V18h18v13" />
          <path d="M19 18V12h10v6" />
          <path d="M19 24h10" />
          <path d="M22 28h4" />
        </svg>
      ),
    },
    {
      title: 'Farming',
      desc: 'Integrated poultry operations connecting breeding, hatcheries, feed and farming.',
      business: 'URJA FOODS',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M24 36c-8-4-13-10-13-17 0-5 4-8 8-8 3 0 5 2 5 5 0-3 2-5 5-5 4 0 8 3 8 8 0 7-5 13-13 17z" />
          <path d="M24 18v14" />
          <path d="M19 24h10" />
        </svg>
      ),
    },
    {
      title: 'Processing',
      desc: 'Turning carefully sourced inputs into safe, consistent and value-added products.',
      business: 'URJA SOYA · POUSHTIK',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <path d="M11 35h26" />
          <path d="M14 35V20h20v15" />
          <path d="M18 20v-7h12v7" />
          <path d="M19 26h3" />
          <path d="M26 26h3" />
          <path d="M19 31h3" />
          <path d="M26 31h3" />
        </svg>
      ),
    },
    {
      title: 'Food & Consumer',
      desc: 'Bringing trusted food products and solutions closer to customers and communities.',
      business: 'POUSHTIK · URJA SOYA',
      icon: (
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="20" r="7" />
          <path d="M12 36c1-7 6-11 12-11s11 4 12 11" />
          <path d="M17 37h14" />
        </svg>
      ),
    },
  ];

  const principles = [
    {
      title: 'Integrated',
      desc: 'Connected capabilities across the value chain',
    },
    {
      title: 'Responsible',
      desc: 'Focused on quality, people and sustainability',
    },
    {
      title: 'Reliable',
      desc: 'Consistency from source to final product',
    },
    {
      title: 'Future Ready',
      desc: 'Built for sustainable long-term growth',
    },
  ];

  return (
    <section className="og-value-chain">
      <div className="og-vc-container">
        {/* Section Intro Header */}
        <div className="og-vc-header">
          <div className="og-vc-eyebrow">OUR INTEGRATED ECOSYSTEM</div>

          <h2>
            Connected Businesses.
            <span>Collective Strength.</span>
          </h2>

          <p>
            Our businesses operate with a shared purpose — connecting
            agriculture, nutrition, farming, processing and food to
            create stronger value across the entire ecosystem.
          </p>
        </div>

        {/* 5-Step Value Chain Flow with Connectors */}
        <div className="og-vc-flow">
          {steps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div className="og-vc-step">
                <div className="og-vc-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="og-vc-business">{step.business}</div>
              </div>

              {idx < steps.length - 1 && (
                <div className="og-vc-connector" aria-hidden="true">
                  <span></span>
                  <b>→</b>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Value Integration Statement Callout */}
        <div className="og-vc-statement">
          <div className="og-vc-statement-left">
            <span>ONE INTEGRATED APPROACH</span>
            <h3>
              Every stage strengthens
              <em> the next.</em>
            </h3>
          </div>

          <div className="og-vc-statement-right">
            <p>
              From the soil to the farm, from nutrition to processing,
              and from products to people — our connected businesses
              enable greater control, consistency and value creation.
            </p>
          </div>
        </div>

        {/* 4 Key Pillars / Principles */}
        <div className="og-vc-principles">
          {principles.map((p, idx) => (
            <div className="og-vc-principle" key={idx}>
              <div className="og-vc-principle-icon" aria-hidden="true">
                ✓
              </div>
              <div>
                <strong>{p.title}</strong>
                <span>{p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
