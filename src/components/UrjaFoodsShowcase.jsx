import React from 'react';
import { Link } from 'react-router-dom';
import {
  Factory,
  Building2,
  Egg,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  MapPin,
  TrendingUp,
  Cpu,
  FlaskConical,
  Sprout,
  Droplets,
  Warehouse,
  Scale,
  Camera,
  Award,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../hooks/LanguageContext';

export default function UrjaFoodsShowcase() {
  const { t } = useLanguage();

  // 8 Specific Journey Stages + Destination
  const journeyStages = [
    {
      num: '01',
      tag: 'THE FOUNDATION',
      title: 'Feed Manufacturing',
      location: 'Nirgudsar',
      desc: 'High-quality feed manufacturing specifically formulated for optimized poultry production, gut health and optimal FCR.',
      img: 'https://images.unsplash.com/photo-1581093458791-9d42e3c7f4f5?auto=format&fit=crop&w=700&q=80',
      fallback: '/company-plant.jpg',
    },
    {
      num: '02',
      tag: 'BUILDING STRONG BIRDS',
      title: 'Brooding & Growing',
      subtitle: '(Breeder Birds)',
      location: 'Vadgaon Pir',
      desc: 'Specialized climate care and nurturing of parent breeder birds up to their optimal laying age with bio-security monitoring.',
      img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=700&q=80',
      fallback: '/images/biz-poultry.jpg',
    },
    {
      num: '03',
      tag: 'HATCHING POTENTIAL',
      title: 'Breeder Farms',
      location: 'Gadewadi, Supa, Baramjur, Surgon',
      desc: 'Maintained under strict European bio-security protocols, systematic flock health monitoring and quarantine zones.',
      img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=700&q=80',
      fallback: '/company.jpg',
    },
    {
      num: '04',
      tag: 'CARE FOR TOMORROW',
      title: 'Hatching Eggs',
      location: 'Gadewadi',
      desc: 'Precision egg collection, computerized laser grading, and sanitization maintaining ideal temperature & humidity.',
      img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=700&q=80',
      fallback: '/images/biz-poultry.jpg',
    },
    {
      num: '05',
      tag: 'HEALTHY BEGINNINGS',
      title: 'Hatcheries',
      location: 'Gadewadi',
      desc: 'Advanced single-stage incubation chambers and in-ovo early vaccination guaranteeing robust, vigorous day-old chicks.',
      img: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?auto=format&fit=crop&w=700&q=80',
      fallback: '/company-plant.jpg',
    },
    {
      num: '06',
      tag: 'READY FOR GROWTH',
      title: 'CBF Farm Preparation',
      location: 'Field CBF Team',
      desc: 'Systematic shed preparation, chemical fogging sanitization, and equipment coordination by our dedicated field team.',
      img: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=700&q=80',
      fallback: '/company.jpg',
    },
    {
      num: '07',
      tag: 'NURTURING GROWTH',
      title: 'Broiler Growing',
      location: 'Multiple Locations Across Maharashtra',
      desc: 'Precision broiler rearing across partner farms supported by continuous veterinary diagnostics and balanced feeding regimens.',
      img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=700&q=80',
      fallback: '/images/biz-poultry.jpg',
    },
    {
      num: '08',
      tag: 'CONNECTING MARKETS',
      title: 'Bird Lifting & Live Bird Supply',
      location: 'CBF Farms → Traders → Wholesale Markets',
      desc: 'Efficient scheduled bird lifting with computerized weighment connecting partner farms directly to regional markets and processors.',
      img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=700&q=80',
      fallback: '/company-plant.jpg',
    },
  ];

  // 4 Poultry Operations Stat Cards with Photos
  const poultryOperations = [
    {
      step: '01',
      tag: 'BREEDER INFRASTRUCTURE',
      stat: '1,80,000',
      title: 'Breeder Bird Infrastructure',
      desc: 'State-of-the-art infrastructure supporting high-yield breeder bird parent operations.',
      img: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=600&q=80',
      fallback: '/images/biz-poultry.jpg',
    },
    {
      step: '02',
      tag: 'HATCHING CAPACITY',
      stat: '6 Lakh',
      unit: '/ Week',
      title: 'Hatching Eggs Per Week',
      desc: 'Automated computerized incubation delivering uniform, healthy day-old chicks every single week.',
      img: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80',
      fallback: '/company.jpg',
    },
    {
      step: '03',
      tag: 'BROILER PLACEMENT',
      stat: '20 Lakh',
      unit: '/ Month',
      title: 'Broiler Birds Per Month',
      desc: 'Massive broiler placement throughput across our extensive contract farming network.',
      img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80',
      fallback: '/images/biz-chicken.jpg',
    },
    {
      step: '04',
      tag: 'OWN OPERATIONS',
      stat: '50',
      unit: 'Houses',
      title: 'Environment-Controlled Houses',
      desc: 'Fully company-owned climate-controlled EC sheds with automated feeding and tunnel ventilation.',
      img: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=600&q=80',
      fallback: '/company-plant.jpg',
    },
  ];

  return (
    <div className="urja-foods-showcase-wrapper">
      {/* 0. Section Quick Jump Anchors */}
      <nav className="uf-jump-nav" aria-label="Urja Foods Page Sections">
        <div className="container">
          <div className="uf-jump-links">
            <a href="#about-urja-foods" className="uf-jump-link">
              <span>About Urja Foods</span>
            </a>
            <a href="#poultry-journey" className="uf-jump-link">
              <span>Poultry Journey (8 Stages)</span>
            </a>
            <a href="#feed-mill-info" className="uf-jump-link">
              <span>Feed Mill Information</span>
            </a>
            <a href="#ec-processing" className="uf-jump-link">
              <span>EC Houses & Processing</span>
            </a>
            <a href="#scale-that-connects" className="uf-jump-link">
              <span>Scale That Connects</span>
            </a>
            <a href="#network-reach" className="uf-jump-link">
              <span>Network & Reach</span>
            </a>
          </div>
        </div>
      </nav>

      {/* 1. ABOUT URJA FOODS DEFINITION & OVERVIEW */}
      <section className="uf-overview-section" id="about-urja-foods">
        <div className="uf-overview-wrap">
          {/* Section Kicker & Main Heading */}
          <div className="uf-overview-top">
            <div className="uf-overview-kicker">
              <span></span>
              <span>ABOUT URJA FOODS</span>
            </div>

            <div className="uf-overview-heading">
              <h2>
                A Connected Poultry
                <strong>Business Ecosystem.</strong>
              </h2>

              <div className="uf-definition-highlight-box">
                <div className="uf-definition-quote-bar"></div>
                <p className="uf-definition-text">
                  &ldquo;Urja Foods is an integrated poultry business bringing together
                  breeding, hatcheries, feed manufacturing, brooding, growing farms
                  and live bird supply through a coordinated value chain.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Main Grid: Visual Left, Narrative & 4 Highlights Right */}
          <div className="uf-overview-main">
            {/* Visual Left */}
            <div className="uf-overview-visual">
              <div className="uf-overview-photo">
                <img
                  src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=1200&q=90"
                  alt="Urja Foods poultry operations"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/biz-poultry.jpg';
                  }}
                />
                <div className="uf-overview-photo-overlay"></div>
              </div>

              <div className="uf-photo-caption">
                <div className="uf-caption-icon">✦</div>
                <div>
                  <small>URJA FOODS</small>
                  <strong>Integrated Poultry Operations</strong>
                </div>
              </div>
            </div>

            {/* Content Right */}
            <div className="uf-overview-copy">
              <div className="uf-copy-title">
                <span className="uf-title-bar"></span>
                <div>
                  <span className="uf-mini-label">OUR APPROACH</span>
                  <h3>
                    From Breeding <em>to Bird Supply.</em>
                  </h3>
                </div>
              </div>

              <p className="uf-copy-intro">
                Our integrated model connects different stages of poultry production
                so that each operation contributes to the strength of the next. This
                approach supports total biosecurity, superior feed-conversion ratio,
                complete traceability, and uninterrupted commercial live bird supply.
              </p>

              {/* 4 Connected Highlights */}
              <div className="uf-overview-highlights">
                <div className="uf-highlight">
                  <div className="uf-highlight-icon">
                    <Egg size={22} />
                  </div>
                  <div>
                    <h4>Breeding & Hatcheries</h4>
                    <p>Building a dependable foundation for chick production and high-vigor poultry operations.</p>
                  </div>
                </div>

                <div className="uf-highlight">
                  <div className="uf-highlight-icon">
                    <Factory size={22} />
                  </div>
                  <div>
                    <h4>Feed Manufacturing</h4>
                    <p>Nutrition-focused automated feed production supporting rapid bird growth and gut health.</p>
                  </div>
                </div>

                <div className="uf-highlight">
                  <div className="uf-highlight-icon">
                    <Building2 size={22} />
                  </div>
                  <div>
                    <h4>Brooding & Growing Farms</h4>
                    <p>Managed environment-controlled farm operations focused on animal welfare and uniform development.</p>
                  </div>
                </div>

                <div className="uf-highlight">
                  <div className="uf-highlight-icon">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <h4>Live Bird Supply</h4>
                    <p>Coordinated logistics operations connecting partner farms directly with regional market requirements.</p>
                  </div>
                </div>
              </div>

              {/* Bottom Assurance Bar */}
              <div className="uf-overview-statement">
                <span></span>
                <p>
                  <strong>One integrated approach.</strong> Multiple capabilities working together across the poultry value chain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE URJA POULTRY JOURNEY (8 STAGES + DESTINATION) */}
      <section className="uf-journey-section" id="poultry-journey">
        <div className="ufjm-wrap">
          {/* Journey Header */}
          <div className="ufjm-top">
            <div className="ufjm-heading">
              <div className="ufjm-eyebrow">
                <span></span>
                THE URJA POULTRY JOURNEY
              </div>
              <h2>From Feed to Live Bird Supply</h2>
              <p>
                The integrated journey of URJA Poultry, structured for a seamless
                &lsquo;feed-to-market&rsquo; supply business based on complete operational integration.
              </p>
            </div>
            <div className="ufjm-top-message">
              Integrated operations.
              <strong>Stronger outcomes.</strong>
            </div>
          </div>

          {/* 8 Stages Grid + Destination */}
          <div className="ufjm-journey-grid">
            {journeyStages.map((stg, sIdx) => (
              <article className="ufjm-stage" key={sIdx}>
                <div className="ufjm-photo-wrap">
                  <div className="ufjm-photo">
                    <img
                      src={stg.img}
                      alt={stg.title}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = stg.fallback || '/company.jpg';
                      }}
                    />
                    <div className="ufjm-number">{stg.num}</div>
                  </div>
                </div>

                <div className="ufjm-stage-body">
                  <span className="ufjm-stage-tag">{stg.tag}</span>
                  <h3>
                    {stg.title}
                    {stg.subtitle && <small>{stg.subtitle}</small>}
                  </h3>
                  <div className="ufjm-location">
                    <span>●</span> {stg.location}
                  </div>
                  <p>{stg.desc}</p>
                </div>
              </article>
            ))}

            {/* Destination Final Card */}
            <article className="ufjm-destination">
              <div className="ufjm-destination-photo-wrap">
                <div className="ufjm-destination-photo">
                  <img
                    src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=700&q=80"
                    alt="Urja Live Bird Supply Destination"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/company-plant.jpg';
                    }}
                  />
                </div>
              </div>
              <div className="ufjm-destination-content">
                <span>TOWARDS A</span>
                <h3>Healthier Future</h3>
                <p>
                  The integrated live bird supply chain connects every step of poultry operations into one seamless ecosystem.
                </p>
                <div className="ufjm-destination-button">
                  <span>Stronger Together</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 3. RESTRUCTURED FEED MILL INFORMATION WITH NEW DATA */}
      <section className="uf-feed-section" id="feed-mill-info">
        <div className="uf-feed-wrap">
          {/* Top Intro */}
          <div className="uf-feed-top">
            <div className="uf-feed-brand-spacer"></div>

            <div className="uf-feed-title">
              <div className="uf-feed-eyebrow">
                <span></span>
                FEED MANUFACTURING
                <span></span>
              </div>
              <h2>
                Built for <em>Consistency.</em>
              </h2>
              <p>
                High-quality feed. Advanced technology. Controlled operations.
                <br />
                Powering healthier birds and a stronger tomorrow.
              </p>
            </div>

            <div className="uf-feed-side-note">
              <div></div>
              <span>
                THE FOUNDATION
                <br />
                OF A HEALTHIER
                <br />
                POULTRY ECOSYSTEM
              </span>
            </div>
          </div>

          {/* Central Visual Hub & Callout Cards */}
          <div className="uf-feed-main">
            {/* Background Facility */}
            <div className="uf-feed-bg-image">
              <img
                src="https://images.unsplash.com/photo-1581093458791-9d42e3c7f4f5?auto=format&fit=crop&w=1800&q=90"
                alt="Feed Mill Facility"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/company-plant.jpg';
                }}
              />
            </div>
            <div className="uf-feed-bg-overlay"></div>

            {/* Left Top Callout: Automated Operations */}
            <div className="uf-feed-callout uf-feed-callout-left-top">
              <div className="uf-feed-icon">
                <Cpu size={28} />
              </div>
              <div className="uf-feed-callout-content">
                <h3>
                  Automated
                  <br />
                  Operations
                </h3>
                <p>Fully automated PLC-controlled feed manufacturing process with precision micro-dosing.</p>
              </div>
            </div>

            {/* Left Bottom Callout: Quality Laboratory */}
            <div className="uf-feed-callout uf-feed-callout-left-bottom">
              <div className="uf-feed-icon">
                <FlaskConical size={28} />
              </div>
              <div className="uf-feed-callout-content">
                <h3>
                  Quality
                  <br />
                  Laboratory
                </h3>
                <p>In-house testing of all incoming raw grains and finished feeds for moisture, protein, and toxins.</p>
              </div>
            </div>

            {/* Center Dynamic Capacity Hub */}
            <div className="uf-feed-center">
              <div className="uf-feed-ring uf-feed-ring-one"></div>
              <div className="uf-feed-ring uf-feed-ring-two"></div>

              <span className="uf-feed-dot uf-feed-dot-one"></span>
              <span className="uf-feed-dot uf-feed-dot-two"></span>
              <span className="uf-feed-dot uf-feed-dot-three"></span>
              <span className="uf-feed-dot uf-feed-dot-four"></span>

              <div className="uf-feed-circle-image">
                <img
                  src="https://images.unsplash.com/photo-1581093458791-9d42e3c7f4f5?auto=format&fit=crop&w=1200&q=90"
                  alt="800 TPD Feed Mill at Nirgudsar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/company-plant.jpg';
                  }}
                />
                <div className="uf-feed-circle-overlay"></div>

                <div className="uf-feed-circle-content">
                  <span>FEED MANUFACTURING CAPACITY</span>
                  <div className="uf-feed-number">
                    800 <small>TPD</small>
                  </div>
                  <strong>AT NIRGUDSAR</strong>
                  <div className="uf-feed-small-line"></div>
                  <p>
                    CONSISTENT NUTRITION
                    <br />
                    FOR A STRONGER TOMORROW
                  </p>
                </div>
              </div>
            </div>

            {/* Right Top Callout: In-House Premix */}
            <div className="uf-feed-callout uf-feed-callout-right-top">
              <div className="uf-feed-icon">
                <Sprout size={28} />
              </div>
              <div className="uf-feed-callout-content">
                <h3>
                  In-House
                  <br />
                  Premix Manufacturing
                </h3>
                <p>Proprietary vitamin, trace mineral and amino acid premixes engineered for superior avian absorption.</p>
              </div>
            </div>

            {/* Right Bottom Callout: Controlled Utilities */}
            <div className="uf-feed-callout uf-feed-callout-right-bottom">
              <div className="uf-feed-icon">
                <Droplets size={28} />
              </div>
              <div className="uf-feed-callout-content">
                <h3>
                  Controlled
                  <br />
                  Utilities
                </h3>
                <p>Industrial RO water purification, automated high-pressure boilers, and dedicated power generators.</p>
              </div>
            </div>
          </div>

          {/* Facility At A Glance Bar */}
          <div className="uf-feed-glance">
            <div className="uf-feed-glance-title">
              <h3>
                OUR FACILITY
                <br />
                <span>AT A GLANCE</span>
              </h3>
            </div>

            <div className="uf-feed-glance-item">
              <div className="uf-feed-glance-icon">
                <Warehouse size={18} />
              </div>
              <div>
                <h4>RM & FG Godowns</h4>
                <p>Organised storage with FIFO management</p>
              </div>
            </div>

            <div className="uf-feed-glance-item">
              <div className="uf-feed-glance-icon">
                <Scale size={18} />
              </div>
              <div>
                <h4>Weighbridge Integration</h4>
                <p>Controlled movement and digital telemetry</p>
              </div>
            </div>

            <div className="uf-feed-glance-item">
              <div className="uf-feed-glance-icon">
                <Camera size={18} />
              </div>
              <div>
                <h4>Security & Surveillance</h4>
                <p>24x7 CCTV and strict bio-security SOPs</p>
              </div>
            </div>

            <div className="uf-feed-glance-item">
              <div className="uf-feed-glance-icon">
                <Award size={18} />
              </div>
              <div>
                <h4>Certifications & Compliance</h4>
                <p>FSSAI · BIS · NOP · Ecocert</p>
              </div>
            </div>

            <div className="uf-feed-glance-final">
              <span></span>
              <strong>
                QUALITY FEED
                <br />
                HEALTHIER BIRDS
                <br />
                BRIGHTER TOMORROW
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ENVIRONMENT CONTROLLED GROWING & PROCESSING */}
      <section className="uf-ec-processing" id="ec-processing">
        <div className="uf-ec-wrap">
          {/* Header */}
          <div className="uf-ec-head">
            <div className="uf-ec-head-left">
              <span className="uf-ec-eyebrow">CONTROLLED GROWING & PROCESSING</span>
              <h2>
                From Controlled
                <br />
                <span>Houses to Processing.</span>
              </h2>
            </div>
            <div className="uf-ec-head-right">
              <p>
                Urja Foods operates its own Environment-Controlled Houses, connecting
                controlled bird rearing with the next stage of chicken processing
                through Poushtik Chicken.
              </p>
              <div className="uf-ec-flow-label">
                <span></span>
                EC HOUSES <b>→</b> PROCESSING
              </div>
            </div>
          </div>

          {/* Main Grid: Visual Left, Features Right */}
          <div className="uf-ec-main">
            <div className="uf-ec-visual">
              <img
                src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=1200&q=85"
                alt="Environment Controlled Poultry House"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/biz-poultry.jpg';
                }}
              />
              <div className="uf-ec-visual-overlay"></div>
              <div className="uf-ec-visual-caption">
                <span>URJA FOODS</span>
                <strong>Environment-Controlled Houses</strong>
              </div>
            </div>

            <div className="uf-ec-content">
              <div className="uf-ec-content-top">
                <span className="uf-ec-mini">ENVIRONMENT-CONTROLLED HOUSES</span>
                <h3>
                  Controlled conditions. <em>Consistent operations.</em>
                </h3>
                <p>
                  A portion of birds are reared through Urja&apos;s own
                  Environment-Controlled House operations, supported by automated systems.
                </p>
              </div>

              <div className="uf-ec-features">
                <div className="uf-ec-feature">
                  <div className="uf-ec-feature-icon">◉</div>
                  <div>
                    <strong>Environment Controlled</strong>
                    <p>Automated climate, humidity, and tunnel air ventilation.</p>
                  </div>
                </div>

                <div className="uf-ec-feature">
                  <div className="uf-ec-feature-icon">↕</div>
                  <div>
                    <strong>Automated Feeding</strong>
                    <p>Computer-metered feeding lines minimize feed waste.</p>
                  </div>
                </div>

                <div className="uf-ec-feature">
                  <div className="uf-ec-feature-icon">◌</div>
                  <div>
                    <strong>Automated Drinking</strong>
                    <p>Enclosed nipple drinker lines ensure sanitized water.</p>
                  </div>
                </div>

                <div className="uf-ec-feature">
                  <div className="uf-ec-feature-icon">✓</div>
                  <div>
                    <strong>Connected Operations</strong>
                    <p>Flocks seamlessly transfer into our processing division.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seamless Transition to Poushtik Chicken */}
          <div className="uf-ec-transition">
            <div className="uf-ec-transition-left">
              <span className="uf-ec-transition-label">THE NEXT STAGE</span>
              <h3>From Our Houses to Your Table.</h3>
            </div>

            <div className="uf-ec-transition-line">
              <div className="uf-ec-flow-dot"></div>
              <div className="uf-ec-flow-line"></div>
              <div className="uf-ec-flow-arrow">→</div>
            </div>

            <div className="uf-ec-poushtik">
              <div className="uf-ec-poushtik-image">
                <img
                  src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=300&q=80"
                  alt="Chicken Processing"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/biz-chicken.jpg';
                  }}
                />
              </div>
              <div className="uf-ec-poushtik-content">
                <span>POUSHTIK CHICKEN</span>
                <h4>Chicken Processing</h4>
                <p>Birds move smoothly into our hygienic processing stage.</p>
                <Link to="/businesses/poushtik-chicken">
                  <span>EXPLORE POUSHTIK</span>
                  <b>→</b>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RESTRUCTURED SCALE THAT CONNECTS & ENLARGED NETWORK & REACH */}
      <section className="uf-glance-section" id="scale-that-connects">
        <div className="uf-glance-wrap">
          {/* Header */}
          <div className="uf-glance-head">
            <div className="uf-glance-title">
              <h2>
                Scale that
                <br />
                <span>Connects.</span>
              </h2>
            </div>
            <div className="uf-glance-intro">
              <p>
                An integrated poultry ecosystem built across manufacturing, breeding,
                hatcheries, broiler operations, processing and market supply.
              </p>
              <div className="uf-glance-rule"></div>
              <span>INFRASTRUCTURE · OPERATIONS · NETWORK · PEOPLE</span>
            </div>
          </div>

          {/* 2 Featured Anchor Numbers: 940 TPD Feed & 200 TPD Soya */}
          <div className="uf-glance-featured">
            <div className="uf-glance-big">
              <div className="uf-glance-big-top-icon">
                <Factory size={26} color="#d4b36a" />
              </div>
              <div className="uf-glance-big-label">TOTAL FEED MANUFACTURING</div>
              <div className="uf-glance-number">
                940 <small>TPD</small>
              </div>
              <p>Total feed manufacturing capacity across the Urja ecosystem.</p>
              <div className="uf-glance-big-line"></div>
              <span>FEED &nbsp;|&nbsp; POULTRY &nbsp;|&nbsp; NUTRITION</span>
            </div>

            <div className="uf-glance-big uf-glance-soya">
              <div className="uf-glance-big-top-icon">
                <Sprout size={26} color="#d4b36a" />
              </div>
              <div className="uf-glance-big-label">SOYA PROCESSING</div>
              <div className="uf-glance-number">
                200 <small>TPD</small>
              </div>
              <p>Soya processing capacity supporting the wider integrated ecosystem.</p>
              <div className="uf-glance-big-line"></div>
              <span>SOYA &nbsp;|&nbsp; PROCESSING &nbsp;|&nbsp; FOOD</span>
            </div>
          </div>

          {/* Poultry Operations Header */}
          <div className="uf-glance-section-label">
            <span>POULTRY OPERATIONS</span>
            <div></div>
          </div>

          {/* 4 Poultry Operations Stat Cards with Photos */}
          <div className="uf-glance-operations">
            {poultryOperations.map((item, idx) => (
              <article className="uf-glance-stat" key={idx}>
                <div className="uf-glance-stat-img-wrap">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = item.fallback;
                    }}
                  />
                  <div className="uf-glance-stat-step-badge">{item.step}</div>
                </div>
                <div className="uf-glance-stat-body">
                  <div className="uf-glance-stat-top">
                    <span>{item.tag}</span>
                  </div>
                  <strong>
                    {item.stat}
                    {item.unit && <small> {item.unit}</small>}
                  </strong>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <div className="uf-glance-stat-line"></div>
                </div>
              </article>
            ))}
          </div>

          {/* NETWORK & REACH (Significantly Enlarged Size) */}
          <div className="uf-glance-network" id="network-reach">
            <div className="uf-glance-network-intro">
              <span>NETWORK &amp; REACH</span>
              <h3>
                A connected
                <br />
                operating network.
              </h3>
              <p>
                People, farms, branches and operating sites working together
                across the poultry ecosystem.
              </p>
            </div>

            <div className="uf-glance-network-stat">
              <div className="uf-glance-net-icon">
                <Users size={24} color="#d2af63" />
              </div>
              <strong>3,000+</strong>
              <span>
                CBF FARM
                <br />
                AGREEMENTS
              </span>
            </div>

            <div className="uf-glance-network-stat">
              <div className="uf-glance-net-icon">
                <MapPin size={24} color="#d2af63" />
              </div>
              <strong>10</strong>
              <span>
                BRANCHES
                <br />
                ACROSS MAHARASHTRA
              </span>
            </div>

            <div className="uf-glance-network-stat">
              <div className="uf-glance-net-icon">
                <Building2 size={24} color="#d2af63" />
              </div>
              <strong>24+</strong>
              <span>
                OPERATING
                <br />
                SITES
              </span>
            </div>

            <div className="uf-glance-network-stat">
              <div className="uf-glance-net-icon">
                <Users size={24} color="#d2af63" />
              </div>
              <strong>600+</strong>
              <span>
                PEOPLE
                <br />
                ACROSS OPERATIONS
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
