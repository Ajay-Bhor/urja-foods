import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle2,
  Users,
  Award,
  ShieldCheck,
  GraduationCap,
  Utensils,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  ChevronDown,
  Building,
  TrendingUp,
  HeartHandshake,
  Search,
  Share2,
  Check,
  Compass,
  Home,
  ArrowLeft,
  ChevronRight,
  FileCheck,
} from 'lucide-react';
import { isTokenValid } from '../utils/auth.js';

export default function CareersPage() {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const jobsSectionRef = useRef(null);

  const parseList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
      if (val.includes('\n')) {
        return val.split('\n').map((s) => s.trim().replace(/^[-*•]\s*/, '')).filter(Boolean);
      }
      return val.split(/(?<=[.!?])\s+/).map((s) => s.trim().replace(/^[-*•]\s*/, '')).filter(Boolean);
    }
    return [];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = [
    'All',
    'Poultry Operations',
    'Manufacturing & QA',
    'Animal Health & Veterinary',
    'Sales & Marketing',
    'Finance & Engineering',
  ];

  const initialJobsList = [
    {
      id: 'job-1',
      title: 'Technical Farm Supervisor (Broiler Integration)',
      dept: 'Poultry Operations',
      location: 'Ambegaon / Junnar / Khed, Pune',
      experience: '1 – 3 Years',
      type: 'Full Time (Field)',
      vacancies: '3 Openings',
      summary:
        'Oversee contract broiler farmer cohorts, monitor day-to-day flock feed conversion ratio (FCR), bird weights, and ensure strict biosecurity protocols.',
      responsibilities: [
        'Conduct daily scheduled supervisory visits across 10–12 assigned partner farms in Pune rural.',
        'Monitor feed intake, bird body weights, flock uniformity, and mortality rates daily.',
        'Coordinate timely delivery of chick feed bags and essential medicines with Nirgudsar plant dispatch.',
        'Ensure biosecurity compliance including footbaths, water sanitization, and litter management.',
        'Assist partner farmers with seasonal brooding, ventilation control, and heatwave mitigation.',
      ],
      requirements: [
        'Diploma / Degree in Agriculture, Animal Husbandry, Poultry Science, or related field.',
        'Prior experience in contract broiler or commercial poultry farming preferred.',
        'Valid two-wheeler driving license and willingness for regional field travel in Pune rural.',
        'Fluent in Marathi and conversational Hindi with strong farmer interpersonal skills.',
      ],
      perks: ['Per-km Bike Fuel Reimbursement', 'Mobile & Internet Allowance', 'Flock Batch FCR Bonus'],
    },
    {
      id: 'job-2',
      title: 'Quality Control & Lab Chemist (Feed Plant)',
      dept: 'Manufacturing & QA',
      location: 'Nirgudsar Complex, Pune',
      experience: '2 – 4 Years',
      type: 'Full Time (Plant / Lab)',
      vacancies: '2 Openings',
      summary:
        'Perform physical and chemical analytical testing on raw feed materials (maize, soy meal, DORB, minerals) and finished pelleted cattle and poultry feed.',
      responsibilities: [
        'Execute proximate analysis testing: Crude Protein (CP), Moisture, Crude Fiber, Total Ash, and Acid Insoluble Ash.',
        'Conduct rapid testing for Mycotoxins/Aflatoxins using modern test kits and ELISA methods.',
        'Perform Pellet Durability Index (PDI) and hardness tests on daily production batches.',
        'Maintain detailed batch inspection registers in compliance with ISO 22000 / HACCP standards.',
        'Reject substandard grain/soy shipments and prepare non-conformance reports for procurement.',
      ],
      requirements: [
        'B.Sc / M.Sc in Chemistry, Analytical Chemistry, Feed Technology, or Biochemistry.',
        '2+ years laboratory experience in cattle feed, poultry feed, or grain processing laboratory.',
        'Sound hands-on expertise with spectrophotometers, moisture analyzers, and Soxhlet apparatus.',
        'Meticulous adherence to safety data sheets and calibration protocols.',
      ],
      perks: ['Modern Air-Conditioned Wet Lab', 'Subsidized Cafeteria Meals', 'Annual Performance Bonus'],
    },
    {
      id: 'job-3',
      title: 'Veterinary Field Officer (Livestock & Poultry)',
      dept: 'Animal Health & Veterinary',
      location: 'Western Maharashtra (Pune / Ahmednagar)',
      experience: '0 – 3 Years (Freshers Welcome)',
      type: 'Full Time (On-Field)',
      vacancies: '2 Openings',
      summary:
        'Deliver expert veterinary medical care, disease prevention protocols, post-mortem inspections, and clinical advisory to contracted broiler and dairy farmers.',
      responsibilities: [
        'Design and supervise vaccination schedules for Day 1 to Day 35 broiler batches.',
        'Perform clinical necropsy / post-mortem examinations on mortality cases to rapidly diagnose gut health or respiratory issues.',
        'Advise farmers on biosecurity disinfection, gut acidification, and optimal electrolyte administration during summer heatwaves.',
        'Organize farmer medical camps and educational seminars on dairy cattle lactation nutrition.',
        'Collaborate with the feed formulation team on gut health booster supplements and organic additives.',
      ],
      requirements: [
        'Bachelor of Veterinary Science & Animal Husbandry (B.V.Sc & A.H.) with active Veterinary Council registration.',
        'Keen diagnostic skills in avian pathology and cattle herd health.',
        'Passionate about grassroots rural farmer empowerment and preventive veterinary medicine.',
      ],
      perks: ['Official Field Travel Reimbursement', 'Sponsored Veterinary Symposiums', 'Emergency Mediclaim'],
    },
    {
      id: 'job-4',
      title: 'Area Sales Manager (Urja Pashu Aahar - Cattle Feed)',
      dept: 'Sales & Marketing',
      location: 'Pune Rural, Shirur & Sangamner',
      experience: '3 – 5 Years',
      type: 'Full Time (Regional)',
      vacancies: '2 Openings',
      summary:
        'Spearhead Urja Pashu Aahar dealer distribution networks, forge partnerships with local dairy cooperatives, and achieve regional sales targets.',
      responsibilities: [
        'Appoint new authorized cattle feed dealerships and distributors across assigned rural talukas.',
        'Conduct cattle nutrition demonstration meets for dairy farmers highlighting SNF and FAT yield improvements.',
        'Build long-term supply agreements with private dairies, milk collection centers, and dairy federations.',
        'Manage dealer credit terms, order pipelines, and coordinate dispatches with Nirgudsar plant logistics.',
        'Track competitor pricing, market share, and regional monsoon feeding trends.',
      ],
      requirements: [
        'Bachelor’s degree in Business, Agriculture, Marketing, or relevant field (MBA Agri-Business preferred).',
        'Proven track record in cattle feed, agrochemicals, or veterinary pharma distribution.',
        'Strong network of agro-dealers across Maharashtra dairy belts.',
        'Goal-driven mindset with persuasive relationship-building ability.',
      ],
      perks: ['Competitive Quarterly Sales Incentive', 'Corporate Travel & Phone Support', 'Executive Fast-Track'],
    },
    {
      id: 'job-5',
      title: 'Plant Maintenance Engineer (Mechanical / Electrical)',
      dept: 'Finance & Engineering',
      location: 'Nirgudsar Plant, Pune',
      experience: '3+ Years',
      type: 'Full Time (Plant)',
      vacancies: '1 Opening',
      summary:
        'Ensure uninterrupted operations of our 150 TPD feed milling machinery, pellet mills, bucket elevators, automated batching systems, and industrial steam boilers.',
      responsibilities: [
        'Execute preventive, predictive, and breakdown maintenance across pellet presses, conditioners, hammer mills, and batch mixers.',
        'Oversee boiler feed water treatment, steam distribution lines, and compressed air pneumatic lines.',
        'Monitor PLC/SCADA automated batching panels and electrical control panels.',
        'Maintain critical spare parts inventory to minimize plant downtime.',
        'Enforce industrial occupational safety and lockout-tagout (LOTO) protocols.',
      ],
      requirements: [
        'Diploma or B.E. / B.Tech in Mechanical or Electrical Engineering.',
        '3+ years experience in automated continuous feed plants, flour mills, or bulk material handling plants.',
        'Hands-on expertise with pellet dies, rollers, bearings, gearboxes, and industrial motors.',
      ],
      perks: ['Plant Safety Allowances', 'Subsidized Company Quarters / Travel', 'Health & Gratuity Scheme'],
    },
    {
      id: 'job-6',
      title: 'Accounts & Farmer Billing Executive',
      dept: 'Finance & Engineering',
      location: 'Corporate Office, Nirgudsar Complex',
      experience: '2+ Years',
      type: 'Full Time (Office)',
      vacancies: '1 Opening',
      summary:
        'Manage contract broiler farmer rearing batch reconciliations, dealer billing, GST invoicing, and vendor ledger management.',
      responsibilities: [
        'Compute batch-wise farmer growing charges based on FCR benchmark formulas and bird lifting weights.',
        'Generate GST-compliant tax invoices for cattle feed dealerships and institutional buyers.',
        'Process daily raw material inward payment vouchers and vendor account reconciliations.',
        'Handle bank reconciliation statements and support quarterly internal audit documentation.',
      ],
      requirements: [
        'B.Com / M.Com / Inter CA with strong command over Tally Prime / ERP software.',
        'High analytical accuracy with Microsoft Excel (VLOOKUP, Pivot Tables).',
        'Previous experience in agro-processing, livestock, or FMCG manufacturing sector is an advantage.',
      ],
      perks: ['Provident Fund & Gratuity', 'Annual Performance Appraisals', 'Nirgudsar Office Infrastructure'],
    },
  ];

  const [jobsList, setJobsList] = useState(initialJobsList);

  // Sync with /api/jobs if backend is reachable
  useEffect(() => {
    fetch('/api/jobs')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.jobs && data.jobs.length > 0) {
          setJobsList(data.jobs);
        }
      })
      .catch((err) => {
        console.warn('Using built-in job catalog (offline mode):', err);
      });
  }, []);

  // Filter jobs by department and search query
  const filteredJobs = jobsList.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.dept === selectedDept;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      job.title.toLowerCase().includes(q) ||
      job.dept.toLowerCase().includes(q) ||
      job.location.toLowerCase().includes(q) ||
      (job.requirements && job.requirements.some((r) => r.toLowerCase().includes(q))) ||
      (job.summary && job.summary.toLowerCase().includes(q));
    return matchesDept && matchesSearch;
  });

  // Keep selectedJob in sync with filtered list
  useEffect(() => {
    if (filteredJobs.length > 0) {
      if (!selectedJob || !filteredJobs.find((j) => j.id === selectedJob.id)) {
        setSelectedJob(filteredJobs[0]);
      }
    } else {
      setSelectedJob(null);
    }
  }, [selectedDept, searchQuery, jobsList]);

  // Culture & Plant Visual Stories
  const cultureStories = [
    {
      img: '/company-plant.jpg',
      tag: 'Manufacturing & Engineering',
      title: 'Industrial Milling & PLC-SCADA Automation',
      text: 'Work alongside mechanical and electrical engineers operating our 150 TPD continuous pellet mills, automated batching towers, and conditioned steam lines at Nirgudsar.',
      highlights: ['150 TPD Milling Capacity', 'PLC-SCADA Automation', 'ISO 22000 Standards'],
    },
    {
      img: '/images/biz-nutrition.jpg',
      tag: 'Science & Quality Assurance',
      title: 'Precision Feed Chemistry & Wet Labs',
      text: 'Our dedicated quality analysts perform proximate analysis (Crude Protein, Fiber, Ash, Moisture) and rapid ELISA mycotoxin screenings on raw grains and finished feed batches.',
      highlights: ['ELISA Aflatoxin Screening', 'PDI Durability Testing', 'Zero Compromise QA'],
    },
    {
      img: '/images/biz-poultry.jpg',
      tag: 'Veterinary & Field Operations',
      title: 'Grassroots Veterinary Care & Flock Health',
      text: 'Our veterinary officers and technical supervisors make scheduled farm visits across Pune and Ahmednagar, mentoring contract broiler farmers with tailored biosecurity and medication protocols.',
      highlights: ['Grassroots Farm Visits', 'Avian Pathology Support', 'Farmer Profit Benchmarks'],
    },
    {
      img: '/images/biz-landscape.jpg',
      tag: 'Sales & Rural Agro-Commerce',
      title: 'Expanding Dealer Networks & Dairy Prosperity',
      text: 'Collaborate with local dairy cooperatives, milk collection unions, and agro-dealers across Maharashtra to deliver scientifically formulated Urja Pashu Aahar.',
      highlights: ['500+ Dealer Points', 'Dairy Cooperative Tie-ups', 'Farmer Demo Meets'],
    },
  ];

  // Career Growth Milestones
  const growthMilestones = [
    {
      step: '01',
      phase: 'Month 1',
      title: 'Technical Immersion & Mentorship',
      desc: 'Structured 30-day orientation across our Nirgudsar plant, QA laboratories, and farm clusters paired with a senior mentor.',
    },
    {
      step: '02',
      phase: 'Months 2–6',
      title: 'Operational Autonomy & Ownership',
      desc: 'Lead your assigned taluka farm cohorts, analytical testing bench, or production shifts with clear objective KPIs.',
    },
    {
      step: '03',
      phase: 'Year 1–2',
      title: 'Specialized Upskilling & Growth',
      desc: 'Company-sponsored veterinary symposiums, feed safety certifications, and cross-functional project leadership.',
    },
    {
      step: '04',
      phase: 'Year 3+',
      title: 'Divisional & Regional Leadership',
      desc: 'Steer new business expansions across Maharashtra, mentor rising cohorts, and participate in strategic group milestones.',
    },
  ];

  // Employee Testimonials
  const employeeVoices = [
    {
      name: 'Dr. Amit Kulkarni',
      role: 'Senior Veterinary Field Officer',
      avatar: 'AK',
      quote:
        'At Urja Foods, you aren’t confined to a desk. You are directly in the poultry sheds diagnosing bird health and empowering contract farmers. Seeing a family farmer achieve a record FCR profit is deeply satisfying.',
    },
    {
      name: 'Snehal Patil',
      role: 'Senior QA Lab Chemist',
      avatar: 'SP',
      quote:
        'The analytical precision and equipment at our Nirgudsar lab match leading international standards. From daily NIR scans to mycotoxin assays, our team takes immense pride in releasing zero-defect feed.',
    },
    {
      name: 'Rahul Shinde',
      role: 'Area Sales Manager (Pashu Aahar)',
      avatar: 'RS',
      quote:
        'Urja Pashu Aahar carries genuine brand trust in Maharashtra’s dairy belts. Every interaction with dairy societies and agro-dealers is a long-term partnership built on livestock health and milk yield gains.',
    },
  ];

  // Employee Perks & Welfare
  const perks = [
    {
      icon: <ShieldCheck size={28} color="#173b24" />,
      title: 'Comprehensive Health & Care',
      desc: 'Group medical insurance, personal accident cover, and annual health checkups for employees and immediate family.',
    },
    {
      icon: <TrendingUp size={28} color="#d96b0b" />,
      title: 'Performance & Festival Bonuses',
      desc: 'Quarterly achievement incentives, festive bonuses, and structured annual increments based on objective performance benchmarks.',
    },
    {
      icon: <GraduationCap size={28} color="#173b24" />,
      title: 'Continuous Skill Training',
      desc: 'Sponsored poultry veterinary symposiums, cattle nutrition workshops, and leadership development programs.',
    },
    {
      icon: <Award size={28} color="#d96b0b" />,
      title: 'Field Travel & Allowances',
      desc: 'Generous per-kilometer fuel reimbursements, on-field daily meal allowances, and official corporate mobile connection.',
    },
    {
      icon: <Utensils size={28} color="#173b24" />,
      title: 'Plant Cafeteria & Rest Lounges',
      desc: 'Hygienic subsidized cafeteria meals at our Nirgudsar complex, comfortable rest lounges, and safe plant amenities.',
    },
    {
      icon: <HeartHandshake size={28} color="#d96b0b" />,
      title: 'PF, Gratuity & Family Support',
      desc: 'Statutory Provident Fund (PF), ESIC coverage, Gratuity, and interest-free emergency financial assistance fund.',
    },
  ];

  // Hiring FAQs
  const faqs = [
    {
      q: 'What is the typical hiring timeline at Urja Foods?',
      a: 'Our HR & Technical Assessment panel reviews applications within 48 to 72 business hours. Shortlisted candidates are invited for a telephonic introduction, followed by an on-site or technical interview and plant visit.',
    },
    {
      q: 'Are freshers eligible for veterinary and farm supervisor positions?',
      a: 'Yes! We actively welcome fresh B.V.Sc & A.H. graduates and Agriculture Diploma holders. Our 30-day technical immersion program ensures comprehensive on-the-job training with senior veterinary specialists.',
    },
    {
      q: 'Is accommodation provided for plant and field roles?',
      a: 'For plant-based technical roles at Nirgudsar, subsidized company quarters or regional travel allowances are provided. Field officers receive daily fuel and travel allowances.',
    },
    {
      q: 'How will I receive an acknowledgment after applying?',
      a: 'Instantly! Upon submitting your application through our careers portal, an official HR reference code (e.g., URJA-CAREER-XXXXXX) and acknowledgment dossier are issued and emailed to you.',
    },
  ];

  const handleShareJob = (job) => {
    const textToCopy = `${window.location.origin}/careers#${job.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setToastMessage(`Job link for "${job.title}" copied!`);
      setTimeout(() => setToastMessage(''), 3500);
    }
  };

  const handleApplyClick = (e, job) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!job) return;
    const applyPath = `/careers/apply?jobId=${encodeURIComponent(job.id)}&title=${encodeURIComponent(job.title)}`;
    if (isTokenValid()) {
      navigate(applyPath);
    } else {
      navigate(
        `/careers/login?redirect=${encodeURIComponent(applyPath)}&jobId=${encodeURIComponent(job.id)}&title=${encodeURIComponent(job.title)}&reason=apply`
      );
    }
  };

  return (
    <div className="careers-redesign">
      {/* 1. HERO SECTION WITH LIVE HIRING INDICATOR */}
      <section className="cr-hero">
        <div className="container">
          {/* Breadcrumb Navigation */}
          <div className="cr-hero-nav">
            <button
              type="button"
              onClick={() => (window.history.length > 1 ? navigate(-1) : navigate('/'))}
              className="cr-back-btn"
              aria-label="Go back"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <div className="cr-breadcrumbs">
              <Link to="/">
                <Home size={13} style={{ display: 'inline', marginRight: '4px' }} />
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="active">Careers &amp; Opportunities</span>
            </div>
          </div>

          <div className="cr-hero-content">
            <div className="cr-live-hiring-badge">
              <span className="cr-pulse-dot"></span>
              <span>Actively Hiring · 6 Open Positions Across Maharashtra</span>
            </div>

            <h1 className="cr-hero-title">
              Pioneer the Future of <span className="highlight">Animal Nutrition</span> &amp; <span className="accent-gold">Agri-Tech</span>
            </h1>

            <p className="cr-hero-subtitle">
              Join a purpose-led team empowering 5,000+ partner farmers across Maharashtra.
              From automated feed plants and analytical wet chemistry labs to field veterinary pathology and rural distribution, discover rewarding careers with tangible real-world impact.
            </p>

            <div className="cr-hero-actions">
              <button
                type="button"
                className="cr-btn-primary"
                onClick={() => jobsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore Open Positions</span>
                <ArrowRight size={16} />
              </button>
              <a href="#culture" className="cr-btn-glass">
                <Compass size={16} />
                <span>Life &amp; Culture at Urja</span>
              </a>
            </div>
          </div>

          {/* Hero Impact Stats Ribbon */}
          <div className="cr-stats-ribbon">
            <div className="cr-stat-pill">
              <div className="cr-stat-val">5,000+</div>
              <div className="cr-stat-lbl">Partner Farmers Mentored</div>
            </div>
            <div className="cr-stat-pill">
              <div className="cr-stat-val">150 TPD</div>
              <div className="cr-stat-lbl">Automated Feed Processing</div>
            </div>
            <div className="cr-stat-pill">
              <div className="cr-stat-val">100%</div>
              <div className="cr-stat-lbl">Biosecurity &amp; ISO 22000</div>
            </div>
            <div className="cr-stat-pill">
              <div className="cr-stat-val">98.4%</div>
              <div className="cr-stat-lbl">Employee Retention Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIFE AT URJA - VISUAL CULTURE GALLERY */}
      <section className="cr-culture-section" id="culture">
        <div className="container">
          <div className="cr-section-header">
            <div className="cr-badge">
              <Sparkles size={14} color="#173b24" />
              <span>Life At Urja Foods</span>
            </div>
            <h2 className="cr-section-title">
              Where Modern Agribusiness Meets <span className="accent">Grassroots Passion</span>
            </h2>
            <p className="cr-section-desc">
              Our work touches lives across rural Maharashtra every single day. Explore the dynamic environments where our engineers, veterinary officers, chemists, and farm supervisors thrive.
            </p>
          </div>

          <div className="cr-culture-grid">
            {cultureStories.map((story, idx) => (
              <div key={idx} className="cr-culture-card">
                <div className="cr-culture-img-wrap">
                  <img
                    src={story.img}
                    alt={story.title}
                    className="cr-culture-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/company-plant.jpg';
                    }}
                  />
                  <span className="cr-culture-tag">{story.tag}</span>
                </div>
                <div className="cr-culture-body">
                  <h3 className="cr-culture-title">{story.title}</h3>
                  <p className="cr-culture-text">{story.text}</p>
                  <div className="cr-culture-highlights">
                    {story.highlights.map((h, hIdx) => (
                      <span key={hIdx} className="cr-highlight-chip">
                        <CheckCircle2 size={12} />
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GROWTH MILESTONES (CAREER PROGRESSION JOURNEY) */}
      <section className="cr-growth-section">
        <div className="container">
          <div className="cr-section-header">
            <div className="cr-badge">
              <TrendingUp size={14} color="#173b24" />
              <span>Career Progression</span>
            </div>
            <h2 className="cr-section-title">
              Your Growth Journey at <span className="accent">Urja Foods</span>
            </h2>
            <p className="cr-section-desc">
              We invest deeply in our people. From day-one onboarding to regional leadership, here is how high performers elevate their professional trajectory with us.
            </p>
          </div>

          <div className="cr-milestones-track">
            {growthMilestones.map((m, idx) => (
              <div key={idx} className="cr-milestone-step">
                <div className="cr-step-num">{m.step}</div>
                <div className="cr-step-phase">{m.phase}</div>
                <h3 className="cr-step-title">{m.title}</h3>
                <p className="cr-step-desc">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. EMPLOYEE VOICES & TESTIMONIALS */}
      <section className="cr-voices-section">
        <div className="container">
          <div className="cr-section-header">
            <div className="cr-badge">
              <Users size={14} color="#173b24" />
              <span>Employee Perspectives</span>
            </div>
            <h2 className="cr-section-title">
              Hear Directly From <span className="accent">Our Team</span>
            </h2>
            <p className="cr-section-desc">
              Authentic stories from team members driving real agricultural change in our plants, labs, and field hubs.
            </p>
          </div>

          <div className="cr-voices-grid">
            {employeeVoices.map((voice, idx) => (
              <div key={idx} className="cr-voice-card">
                <p className="cr-voice-quote">{voice.quote}</p>
                <div className="cr-voice-author">
                  <div className="cr-voice-avatar">{voice.avatar}</div>
                  <div>
                    <div className="cr-voice-name">{voice.name}</div>
                    <div className="cr-voice-role">{voice.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SIDE-BY-SIDE INTERACTIVE JOB EXPLORATION BOARD */}
      <section className="cr-jobs-section" id="openings" ref={jobsSectionRef}>
        <div className="container">
          <div className="cr-section-header" style={{ marginBottom: '2.5rem' }}>
            <div className="cr-badge">
              <Briefcase size={14} color="#173b24" />
              <span>Job Opportunities</span>
            </div>
            <h2 className="cr-section-title">
              Current Openings &amp; <span className="accent">Positions</span>
            </h2>
            <p className="cr-section-desc">
              Explore opportunities across veterinary medicine, manufacturing QA, farm supervision, sales, and accounts. Select any role to view detailed specifications.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="cr-filter-bar">
            <div className="cr-filter-top-row">
              <div className="cr-search-box">
                <Search size={16} className="cr-search-icon" />
                <input
                  type="text"
                  placeholder="Search by job title, skill, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="cr-search-input"
                  aria-label="Search Openings"
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="cr-search-clear"
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="cr-filter-count-badge">
                <Briefcase size={15} color="#2e7d32" />
                <span>Showing {filteredJobs.length} Positions</span>
              </div>
            </div>

            <div className="cr-dept-pills" role="tablist">
              {departments.map((dept) => {
                const count =
                  dept === 'All'
                    ? jobsList.length
                    : jobsList.filter((j) => j.dept === dept).length;
                return (
                  <button
                    key={dept}
                    type="button"
                    role="tab"
                    aria-selected={selectedDept === dept}
                    className={`cr-dept-pill ${selectedDept === dept ? 'active' : ''}`}
                    onClick={() => setSelectedDept(dept)}
                  >
                    <span>{dept}</span>
                    <span className="cr-dept-pill-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Job Board */}
          {filteredJobs.length === 0 ? (
            <div className="cr-no-jobs-found">
              <Briefcase size={44} color="#94a3b8" />
              <h3>No Positions Match Your Filters</h3>
              <p>We could not find any active job postings matching your selected department or keywords.</p>
              <button
                type="button"
                className="cr-btn-primary"
                onClick={() => {
                  setSelectedDept('All');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="cr-side-by-side-wrap">
              {/* Left Column: Job Cards List */}
              <div className="cr-jobs-column">
                {filteredJobs.map((job) => {
                  const isSelected = selectedJob && selectedJob.id === job.id;
                  return (
                    <div
                      key={job.id}
                      id={job.id}
                      className={`cr-job-preview-card ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedJob(job)}
                    >
                      <div className="cr-job-preview-top">
                        <span className="cr-tag-dept">{job.dept}</span>
                        <span className="cr-tag-vacancy">{job.vacancies}</span>
                      </div>

                      <h3 className="cr-job-preview-title">{job.title}</h3>

                      <div className="cr-job-preview-meta">
                        <span>
                          <MapPin size={13} color="#2e7d32" />
                          {job.location}
                        </span>
                        <span>
                          <Clock size={13} color="#2e7d32" />
                          {job.experience}
                        </span>
                        <span>
                          <Briefcase size={13} color="#2e7d32" />
                          {job.type}
                        </span>
                      </div>

                      <p className="cr-job-preview-desc">{job.summary}</p>

                      <div className="cr-job-preview-footer">
                        <span className="cr-preview-view-link">
                          <span>{isSelected ? 'Currently Viewing' : 'Click to Inspect Details'}</span>
                          <ArrowRight size={13} />
                        </span>
                        <button
                          type="button"
                          className="cr-btn-primary"
                          style={{ padding: '0.45rem 1rem', fontSize: '0.82rem', border: 'none', cursor: 'pointer' }}
                          onClick={(e) => handleApplyClick(e, job)}
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Sticky Comprehensive Job Inspector */}
              {selectedJob && (
                <div className="cr-job-inspector-sticky">
                  <div className="cr-inspector-header">
                    <div className="cr-inspector-badges">
                      <span className="cr-inspector-dept-badge">{selectedJob.dept}</span>
                      <span className="cr-inspector-vac-badge">{selectedJob.vacancies}</span>
                    </div>

                    <h3 className="cr-inspector-title">{selectedJob.title}</h3>

                    <div className="cr-inspector-quick-chips">
                      <span>
                        <MapPin size={14} color="#a8c58f" />
                        {selectedJob.location}
                      </span>
                      <span>
                        <Clock size={14} color="#a8c58f" />
                        {selectedJob.experience}
                      </span>
                      <span>
                        <Briefcase size={14} color="#a8c58f" />
                        {selectedJob.type}
                      </span>
                    </div>
                  </div>

                  <div className="cr-inspector-body">
                    {/* Role Overview */}
                    <div className="cr-inspector-block">
                      <h4>
                        <Compass size={17} color="#173b24" />
                        <span>Role Purpose &amp; Overview</span>
                      </h4>
                      <p>{selectedJob.summary}</p>
                    </div>

                    {/* Key Responsibilities */}
                    <div className="cr-inspector-block">
                      <h4>
                        <CheckCircle2 size={17} color="#2e7d32" />
                        <span>Key Responsibilities</span>
                      </h4>
                      <ul className="cr-inspector-list">
                        {parseList(selectedJob.responsibilities).map((resp, rIdx) => (
                          <li key={rIdx}>
                            <Check size={15} color="#2e7d32" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Qualifications & Requirements */}
                    <div className="cr-inspector-block">
                      <h4>
                        <GraduationCap size={17} color="#d96b0b" />
                        <span>Candidate Requirements &amp; Qualifications</span>
                      </h4>
                      <ul className="cr-inspector-list">
                        {parseList(selectedJob.requirements).map((req, qIdx) => (
                          <li key={qIdx}>
                            <Check size={15} color="#d96b0b" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Role Specific Perks if any */}
                    {parseList(selectedJob.perks).length > 0 && (
                      <div className="cr-inspector-block">
                        <h4>
                          <Award size={17} color="#173b24" />
                          <span>Role Highlights &amp; Allowances</span>
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                          {parseList(selectedJob.perks).map((p, pIdx) => (
                            <span key={pIdx} className="cr-highlight-chip">
                              <Sparkles size={12} />
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="cr-inspector-footer">
                    <button
                      type="button"
                      className="cr-inspector-cta-btn"
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={(e) => handleApplyClick(e, selectedJob)}
                    >
                      <span>Apply for this Role</span>
                      <ArrowRight size={15} />
                    </button>

                    <button
                      type="button"
                      className="cr-inspector-share-btn"
                      onClick={() => handleShareJob(selectedJob)}
                      title="Copy Job Link"
                    >
                      <Share2 size={14} />
                      <span>Share Role</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. EMPLOYEE BENEFITS & PERKS GRID */}
      <section className="cr-perks-section" id="perks">
        <div className="container">
          <div className="cr-section-header">
            <div className="cr-badge">
              <Award size={14} color="#173b24" />
              <span>Holistic Care</span>
            </div>
            <h2 className="cr-section-title">
              Employee Benefits &amp; <span className="accent">Welfare</span>
            </h2>
            <p className="cr-section-desc">
              We ensure our people and their families are well supported with progressive compensation, medical safeguards, skill enhancement, and career stability.
            </p>
          </div>

          <div className="cr-perks-grid">
            {perks.map((perk, idx) => (
              <div key={idx} className="cr-perk-card">
                <div className="cr-perk-icon-wrap">{perk.icon}</div>
                <h3 className="cr-perk-title">{perk.title}</h3>
                <p className="cr-perk-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DIRECT HR HOTLINE & HIRING FAQ ACCORDION */}
      <section className="cr-support-section">
        <div className="container">
          <div className="cr-support-grid">
            {/* Left: Contact Info */}
            <div className="cr-support-info">
              <div
                className="cr-badge"
                style={{ background: 'rgba(168,197,143,0.18)', color: '#c9e2b3', borderColor: 'rgba(168,197,143,0.35)' }}
              >
                Human Resources Desk
              </div>
              <h2>Have Direct Questions About Working at Urja?</h2>
              <p>
                Whether you are a veterinary college placement officer, a prospective candidate with specialized feed mill experience, or an applicant tracking your status, reach our HR team directly.
              </p>

              <div className="cr-hotline-cards">
                <a href="mailto:careers@urjafoods.net" className="cr-hotline-card">
                  <div className="cr-hotline-icon">
                    <Mail size={22} />
                  </div>
                  <div>
                    <span className="cr-hotline-label">Official HR Email</span>
                    <span className="cr-hotline-val">careers@urjafoods.net</span>
                  </div>
                </a>

                <a href="tel:+917028939900" className="cr-hotline-card">
                  <div className="cr-hotline-icon">
                    <Phone size={22} />
                  </div>
                  <div>
                    <span className="cr-hotline-label">Recruitment Hotline</span>
                    <span className="cr-hotline-val">+91-7028939900</span>
                  </div>
                </a>

                <div className="cr-hotline-card" style={{ cursor: 'default' }}>
                  <div className="cr-hotline-icon">
                    <Building size={22} />
                  </div>
                  <div>
                    <span className="cr-hotline-label">Corporate &amp; Plant HQ</span>
                    <span className="cr-hotline-val" style={{ fontSize: '0.9rem' }}>
                      Nirgudsar Complex, Ambegaon, Pune, Maharashtra 410503
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: FAQ Accordion */}
            <div className="cr-faq-column">
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                Frequently Asked Questions
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                Common questions about our interviews, plant life, and eligibility criteria.
              </p>

              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className={`cr-faq-item ${isOpen ? 'open' : ''}`}>
                    <button
                      type="button"
                      className="cr-faq-question"
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={17}
                        style={{
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.25s ease',
                          color: '#a8c58f',
                        }}
                      />
                    </button>
                    {isOpen && <div className="cr-faq-answer">{faq.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="cr-toast">
          <Check size={16} color="#a8c58f" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
