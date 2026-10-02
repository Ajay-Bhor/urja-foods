import React from 'react';
import {
  Factory,
  Bird,
  Home,
  Egg,
  ShieldCheck,
  FlaskConical,
  Wheat,
  Truck,
  Activity,
} from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function InfrastructureSection() {
  const { t } = useLanguage();

  const facilities = [
    {
      num: '01',
      title: 'Automated Feed Mills',
      metric: '800 TPD',
      metricLabel: 'Batching Capacity',
      desc: 'Advanced European PLC-controlled steam-pelleting feed manufacturing facilities at Nirgudsar, ensuring exact nutrient dispersion, gelatinization, and zero dust.',
      icon: <Factory size={26} />,
      accentBg: '#eaf4eb',
      accentColor: '#17432d',
    },
    {
      num: '02',
      title: 'Breeder Parent Farms',
      metric: '1,80,000',
      metricLabel: 'Breeder Flock Capacity',
      desc: 'Dedicated parent stock rearing and breeding facilities maintained under strict biosecurity, shower-in shower-out protocols, and disease-free zoning.',
      icon: <Bird size={26} />,
      accentBg: '#fef7e8',
      accentColor: '#9b772e',
    },
    {
      num: '03',
      title: 'Brooding & Growing Units',
      metric: 'Vadgaon Pir',
      metricLabel: 'Central Facility',
      desc: 'Specialized climate-controlled brooding facilities designed to nurture young chicks with automated radiant heating, micro-ventilation, and precision feeding.',
      icon: <Activity size={26} />,
      accentBg: '#eef6fc',
      accentColor: '#205b8a',
    },
    {
      num: '04',
      title: 'Automated Hatcheries',
      metric: '6 Lakh/Wk',
      metricLabel: 'Hatching Eggs Weekly',
      desc: 'Single-stage robotic incubation and hatchery complexes at Gadewadi with automated candling, in-ovo vaccination, and hygienic chick separation.',
      icon: <Egg size={26} />,
      accentBg: '#f6f2ec',
      accentColor: '#6a5135',
    },
    {
      num: '05',
      title: 'Environment-Controlled (EC) Houses',
      metric: '50+ Sheds',
      metricLabel: 'Controlled Poultry Sheds',
      desc: 'Negative-pressure tunnel ventilation houses with evaporative cooling pads, automated pan-feeding lines, and closed nipple drinking circuits.',
      icon: <Home size={26} />,
      accentBg: '#edf8f2',
      accentColor: '#1c633a',
    },
    {
      num: '06',
      title: 'In-House Premix Plant',
      metric: '100% In-House',
      metricLabel: 'Quality Control',
      desc: 'Dedicated micro-ingredient blending facility formulating specialized vitamin-mineral premixes, bypass fats, and phytogenic feed additives.',
      icon: <ShieldCheck size={26} />,
      accentBg: '#f8f1fb',
      accentColor: '#67307a',
    },
    {
      num: '07',
      title: 'Soya Processing Plant',
      metric: '200 TPD',
      metricLabel: 'Processing Scale',
      desc: 'High-temperature solvent extraction and processing facility transforming non-GMO soybeans into high-protein de-oiled cake (DOC) and refined soya oil.',
      icon: <Wheat size={26} />,
      accentBg: '#fbf8eb',
      accentColor: '#8a6c1e',
    },
    {
      num: '08',
      title: 'Quality Control Laboratories',
      metric: 'NABL Aligned',
      metricLabel: 'Testing Protocol',
      desc: 'State-of-the-art wet chemistry and NIR (Near-Infrared Spectroscopy) laboratories screening all incoming raw grains, proximate analysis, and aflatoxins.',
      icon: <FlaskConical size={26} />,
      accentBg: '#e8f7f8',
      accentColor: '#18646b',
    },
    {
      num: '09',
      title: 'Warehousing & Logistics Fleets',
      metric: 'FIFO Managed',
      metricLabel: 'Traceable Logistics',
      desc: 'Organized bulk godowns with pallet racking, computerized weighbridges, and dedicated live-bird lifting and temperature-regulated distribution fleets.',
      icon: <Truck size={26} />,
      accentBg: '#f2f4ee',
      accentColor: '#364835',
    },
  ];

  return (
    <section className="section bg-subtle" id="infrastructure">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center" style={{ maxWidth: '820px', margin: '0 auto 50px' }}>
          <div className="badge badge-green">STATE-OF-THE-ART INFRASTRUCTURE</div>
          <h2 style={{ color: '#0e2919' }}>
            Built for Quality. Designed for Scale.
          </h2>
          <p className="section-subtitle">
            Our modern infrastructure connects feed manufacturing, parent breeding, robotic incubation, climate-controlled farming, and cold-chain logistics across Maharashtra.
          </p>
        </div>

        {/* 9 Infrastructure Facilities Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {facilities.map((fac) => (
            <div
              key={fac.num}
              style={{
                background: '#ffffff',
                border: '1px solid #dce8d7',
                borderRadius: '16px',
                padding: '30px 26px',
                boxShadow: '0 6px 20px rgba(23, 59, 36, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              }}
            >
              <div>
                {/* Top Row: Icon + Number + Metric Pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '12px',
                      background: fac.accentBg,
                      color: fac.accentColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {fac.icon}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        background: '#f1f5ee',
                        color: '#1b4b2c',
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {fac.metric}
                    </span>
                    <small style={{ display: 'block', fontSize: '10px', color: '#7a877c', marginTop: '2px' }}>
                      {fac.metricLabel}
                    </small>
                  </div>
                </div>

                <span
                  style={{
                    display: 'block',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '1.5px',
                    color: fac.accentColor,
                    marginBottom: '6px',
                  }}
                >
                  FACILITY {fac.num}
                </span>

                <h3
                  style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#0e2919',
                    margin: '0 0 12px',
                    fontFamily: 'var(--font-serif, Georgia, serif)',
                  }}
                >
                  {fac.title}
                </h3>

                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: '#4e5b51',
                    margin: 0,
                  }}
                >
                  {fac.desc}
                </p>
              </div>

              <div
                style={{
                  marginTop: '22px',
                  paddingTop: '14px',
                  borderTop: '1px solid #edf2ea',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: '#2a5a38',
                  fontWeight: 700,
                }}
              >
                <span>OPERATIONAL EXCELLENCE</span>
                <span>✓ Verified SOP</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
