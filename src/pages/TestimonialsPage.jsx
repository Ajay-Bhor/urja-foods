import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Quote, ArrowRight } from 'lucide-react';
import PageBanner from '../components/PageBanner';
import Testimonials from '../components/Testimonials';

export default function TestimonialsPage() {
  const impactMetrics = [
    {
      value: '+0.8%',
      label: 'Avg Milk Butterfat Increase',
      desc: 'Recorded by dairy farmers switching to Urja Malai Plus 8000 & 10000 high-fat pelleted feed.',
    },
    {
      value: '< 1.0%',
      label: 'EC Shed Mortality Rate',
      desc: 'Flock mortality maintained under 1% in European EC sheds versus 7-10% in traditional sheds.',
    },
    {
      value: '1.48',
      label: 'Avg Broiler FCR',
      desc: 'Industry-leading feed conversion ratio achieved with Urja automated steam-conditioned starter and finisher.',
    },
    {
      value: '100%',
      label: 'Timely Buyback Settlements',
      desc: 'Guaranteed fortnightly payouts deposited directly into partner farmers’ bank accounts with zero delays.',
    },
  ];

  const caseStudies = [
    {
      farmerName: 'Dnyaneshwar Shinde',
      village: 'Shirur, Pune District',
      enterprise: 'Dairy Producer (24 HF & Jersey Crossbreds)',
      timeframe: 'Associated Since 2017',
      quote:
        'Earlier, our butterfat test hovered around 3.5% - 3.6%, and the local dairy cooperative deducted penalties. Within 20 days of switching to Urja Malai Plus 8000, our average fat test jumped to 4.3% - 4.5%. That single switch increased our family milk check by over ₹18,000 every single month.',
      metrics: [
        { label: 'Fat Gain', val: '+0.8% FAT' },
        { label: 'Yield Gain', val: '+1.8 L / cow / day' },
        { label: 'Net Monthly Benefit', val: '+₹18,500' },
      ],
    },
    {
      farmerName: 'Santosh Jadhav',
      village: 'Manchar, Ambegaon Taluka',
      enterprise: 'Contract Broiler Grower (12,000 European EC House)',
      timeframe: 'Associated Since 2018',
      quote:
        'In open sheds, April and May were a nightmare with heat strokes and heavy bird casualties. After constructing our European EC House under Urja Foods guidance, internal temperatures never exceeded 24°C even at 43°C outside. We achieved 1.48 FCR, our mortality was 0.8%, and Urja settled our buyback within 5 days of harvesting.',
      metrics: [
        { label: 'FCR Recorded', val: '1.48 FCR' },
        { label: 'Mortality', val: '0.82%' },
        { label: 'Batches / Year', val: '6.5 Batches' },
      ],
    },
    {
      farmerName: 'Balasaheb Thorat',
      village: 'Nirgudsar, Pune District',
      enterprise: 'Livestock Feeds Dealer & Dairy Grower',
      timeframe: 'Associated Since 2008 (16+ Years)',
      quote:
        'I have known Mr. Pramod Hinge since the very inception of Urja Foods. Over 16 years, what impresses me most is the honesty and consistency of the feed bags. There are zero fines or dust, cattle relish the pellets, and my 200+ dairy farmer customers never complain. It is the most trusted brand in our taluka.',
      metrics: [
        { label: 'Client Farmers', val: '220+ Farmers' },
        { label: 'Retention Rate', val: '99%' },
        { label: 'Monthly Bags', val: '1,400 Bags' },
      ],
    },
  ];

  return (
    <div className="testimonials-page-view">
      {/* 1. Header Banner */}
      <PageBanner
        badge="Farmer Stories & Verifiable Results"
        title="Real Voices From the Field"
        subtitle="Discover how 10,000+ dairy milk producers and contract broiler growers across Maharashtra achieve higher profitability, healthier herds, and guaranteed buybacks with Urja Foods."
        breadcrumb="Farmer Testimonials"
      />

      {/* 2. Verifiable Impact Numbers */}
      <section className="section-padding bg-dark-slate" style={{ padding: '3.5rem 0' }}>
        <div className="container">
          <div className="metrics-impact-grid">
            {impactMetrics.map((m, idx) => (
              <div className="impact-metric-card" key={idx}>
                <div className="impact-metric-val">{m.value}</div>
                <div className="impact-metric-label">{m.label}</div>
                <p className="impact-metric-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Deep Case Studies */}
      <section className="section" id="case-studies">
        <div className="container">
          <div className="section-header">
            <div className="badge badge-green">Field Verifications</div>
            <h2>In-Depth Farmer Case Studies</h2>
            <p className="section-subtitle">
              Authentic field data and feedback from our partner farmers across Pune and Western Maharashtra.
            </p>
          </div>

          <div className="case-studies-stack">
            {caseStudies.map((cs, idx) => (
              <div className="case-study-card" key={idx}>
                <div className="case-study-header">
                  <div className="case-study-avatar">
                    <Quote size={24} color="var(--primary)" />
                  </div>
                  <div>
                    <h3>{cs.farmerName}</h3>
                    <div className="case-study-meta">
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <MapPin size={13} color="var(--primary)" />
                        {cs.village}
                      </span>
                      <span>•</span>
                      <span>{cs.enterprise}</span>
                      <span>•</span>
                      <span className="case-study-badge">{cs.timeframe}</span>
                    </div>
                  </div>
                </div>

                <blockquote className="case-study-quote">
                  "{cs.quote}"
                </blockquote>

                <div className="case-study-metrics-row">
                  {cs.metrics.map((met, mIdx) => (
                    <div className="case-study-metric-chip" key={mIdx}>
                      <span className="chip-label">{met.label}</span>
                      <span className="chip-val">{met.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Compact Testimonials Grid */}
      <Testimonials />

      {/* 5. Join Our Network CTA */}
      <section className="section section-dark bg-dark-mesh">
        <div className="container text-center">
          <div className="badge badge-dark-pill">Be Part of the Growth</div>
          <h2 style={{ color: '#ffffff', maxWidth: '720px', margin: '1rem auto' }}>
            Ready to Experience the Urja Advantage on Your Farm?
          </h2>
          <p style={{ color: '#cbd5e1', maxWidth: '620px', margin: '0 auto 2.5rem', fontSize: '1.05rem' }}>
            Get personalized feed recommendations, on-site veterinary advisory, or contract broiler registration today.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2.2rem' }}>
              <span>Register Your Farm</span>
              <ArrowRight size={18} />
            </Link>
            <a href="tel:+917028939900" className="btn btn-outline-white" style={{ padding: '1rem 2.2rem' }}>
              <span>Call Helpline: +91-7028939900</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
