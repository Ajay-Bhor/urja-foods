import React from 'react';
import { Factory, Bird, ShieldCheck, Truck, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/LanguageContext';

export default function OperationsSection() {
  const { t } = useLanguage();

  const operationsStages = [
    {
      step: '01',
      title: 'Breeder Operations & Bio-Security',
      subtitle: 'Genetics & Clean Incubation',
      desc: 'High-vigor parent breeder flocks maintained in biosecure, European-style climate sheds ensuring optimal disease resistance and chick health.',
      image: '/company-plant.jpg',
      stat: 'European EC Standards',
      statLabel: 'Flock Environment',
      icon: <Bird size={22} color="#173b24" />,
    },
    {
      step: '02',
      title: 'Automated Feed Pelleting Mills',
      subtitle: '800 TPD Scientific Milling',
      desc: 'Dual production lines operating computerized steam conditioning, pelleting, and online NIR laboratory quality testing for both poultry and cattle rations.',
      image: '/company.jpg',
      stat: '800 TPD Scalability',
      statLabel: 'Milling Capacity',
      icon: <Factory size={22} color="#173b24" />,
    },
    {
      step: '03',
      title: 'Commercial Robotic Hatcheries',
      subtitle: 'Single-Stage Climate Control',
      desc: 'Single-stage automated incubators ensuring superior chick vigor, uniform feathering, and round-the-clock biosecurity monitoring before dispatch.',
      image: '/company-plant.jpg',
      stat: 'Single-Stage Precision',
      statLabel: 'Incubation Tech',
      icon: <ShieldCheck size={22} color="#173b24" />,
    },
    {
      step: '04',
      title: 'Contract Broiler Farming Network',
      subtitle: 'Grassroots Farmer Partnership',
      desc: 'Direct collaboration with 900+ farmer partners provided with chicks, feed, veterinary telemedicine, and 100% transparent buyback security.',
      image: '/images/biz-poultry.jpg',
      fallbackImage: '/company.jpg',
      stat: '900+ Farm Families',
      statLabel: 'Direct Partners',
      icon: <Users size={22} color="#173b24" />,
    },
    {
      step: '05',
      title: 'Cold-Chain Processing & Distribution',
      subtitle: 'Fresh Farm-to-Fork Reach',
      desc: 'Hygienic processing lines and rapid logistics delivering fresh, antibiotic-residue-free chicken and animal nutrition products to wholesale and retail consumers.',
      image: '/images/biz-chicken.jpg',
      fallbackImage: '/company-plant.jpg',
      stat: '24/7 Logistics Fleet',
      statLabel: 'Fresh Supply Chain',
      icon: <Truck size={22} color="#173b24" />,
    },
  ];

  return (
    <section className="urja-operations-section" id="operations" style={{ padding: '80px 0', background: '#ffffff' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ maxWidth: '780px', margin: '0 auto 50px', textAlign: 'center' }}>
          <div className="badge badge-green" style={{ marginBottom: '14px' }}>
            OPERATIONS &amp; BUSINESS MODEL
          </div>
          <h2 style={{ color: '#0e2919', fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: 'clamp(32px, 3.6vw, 46px)', margin: '0 0 16px' }}>
            An Integrated Agribusiness <em>Operating Model</em>
          </h2>
          <p className="section-subtitle" style={{ color: '#56635a', fontSize: '16px', lineHeight: 1.7, margin: 0 }}>
            From raw ingredient sourcing and computerized feed formulation to parent breeding, partner broiler farms, and hygienic distribution, Urja controls every critical link.
          </p>
        </div>

        {/* 5-Stage Operations Cycle Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {operationsStages.map((op) => (
            <div
              key={op.step}
              style={{
                background: '#fbfdfa',
                border: '1px solid #dce8d7',
                borderRadius: '14px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 8px 24px rgba(23, 59, 36, 0.05)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Media Container */}
              <div style={{ position: 'relative', width: '100%', height: '200px', overflow: 'hidden', background: '#0e2919' }}>
                <img
                  src={op.image}
                  alt={op.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = op.fallbackImage || '/company-plant.jpg';
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(14, 41, 25, 0.75) 100%)' }}></div>
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#0e2919',
                    color: '#a8c58f',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '1.2px',
                    border: '1px solid rgba(168, 197, 143, 0.3)',
                  }}
                >
                  STAGE {op.step}
                </div>
              </div>

              {/* Body Content */}
              <div style={{ padding: '24px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ padding: '6px', background: 'rgba(168, 197, 143, 0.2)', borderRadius: '6px', display: 'flex' }}>
                    {op.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', color: '#557947', textTransform: 'uppercase' }}>
                    {op.subtitle}
                  </span>
                </div>

                <h3 style={{ fontSize: '19px', color: '#0e2919', margin: '0 0 10px', fontWeight: 700 }}>
                  {op.title}
                </h3>

                <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#56635a', margin: '0 0 20px', flex: 1 }}>
                  {op.desc}
                </p>

                {/* Metric Footer */}
                <div
                  style={{
                    padding: '10px 14px',
                    background: '#ffffff',
                    border: '1px solid #e1ecdd',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: '11.5px', color: '#667568', fontWeight: 500 }}>{op.statLabel}</span>
                  <strong style={{ fontSize: '12.5px', color: '#173b24', fontWeight: 700 }}>{op.stat}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business Model Flowchart Strip */}
        <div
          style={{
            marginTop: '50px',
            padding: '28px 36px',
            background: 'linear-gradient(135deg, #f7faf5 0%, #ffffff 50%, #eff7ec 100%)',
            borderRadius: '14px',
            border: '1.5px solid #d4e4ce',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div>
            <span style={{ fontSize: '10.5px', fontWeight: 800, letterSpacing: '2px', color: '#557947', textTransform: 'uppercase' }}>
              CONTINUOUS VALUE CHAIN
            </span>
            <h4 style={{ margin: '4px 0 0', color: '#0e2919', fontSize: '20px', fontWeight: 700 }}>
              Want to partner with our operations or learn more?
            </h4>
          </div>

          <Link to="/contact" className="btn btn-primary" style={{ padding: '0.75rem 1.8rem' }}>
            <span>Connect With Operations Team</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
