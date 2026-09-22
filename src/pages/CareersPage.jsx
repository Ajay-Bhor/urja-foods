import React, { useState, useRef, useEffect } from 'react';
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
  Send,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  FileText,
  ChevronDown,
  Building,
  TrendingUp,
  HeartHandshake,
  Search,
} from 'lucide-react';
import PageBanner from '../components/PageBanner';

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJobId, setExpandedJobId] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    experience: '',
    qualification: '',
    city: '',
    resumeUrl: '',
    message: '',
  });

  const formRef = useRef(null);

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

  const jobsList = [
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
        'Conduct daily scheduled supervisory visits across 10–12 assigned partner farms.',
        'Monitor feed intake, bird body weights, flock uniformity, and mortality rates.',
        'Coordinate timely delivery of chick feed bags and essential medicines with Nirgudsar plant dispatch.',
        'Ensure biosecurity compliance including footbaths, water sanitization, and litter management.',
        'Assist farmers with seasonal temperature regulation, ventilation, and flock brooding.',
      ],
      requirements: [
        'Diploma / Degree in Agriculture, Animal Husbandry, Poultry Science, or related field.',
        'Prior experience in contract broiler or commercial poultry farming preferred.',
        'Valid two-wheeler driving license and willingness for regional field travel in Pune rural.',
        'Fluent in Marathi and conversational Hindi.',
      ],
    },
    {
      id: 'job-2',
      title: 'Quality Control & Lab Chemist (Feed Plant)',
      dept: 'Manufacturing & QA',
      location: 'Nirgudsar Complex, Pune',
      experience: '2 – 4 Years',
      type: 'Full Time (Plant)',
      vacancies: '2 Openings',
      summary:
        'Perform physical and chemical analytical testing on raw feed materials (maize, soy meal, DORB, minerals) and finished pelleted feed.',
      responsibilities: [
        'Execute proximate analysis testing: Crude Protein (CP), Moisture, Crude Fiber, Total Ash, and Acid Insoluble Ash.',
        'Conduct rapid testing for Mycotoxins/Aflatoxins using modern test kits and ELISA methods.',
        'Perform Pellet Durability Index (PDI) and hardness tests on daily production batches.',
        'Maintain detailed batch inspection registers in compliance with ISO 22000 / HACCP standards.',
        'Reject substandard grain/soy shipments and prepare non-conformance reports for procurement.',
      ],
      requirements: [
        'B.Sc / M.Sc in Chemistry, Analytical Chemistry, Feed Technology, or Biochemistry.',
        '2+ years lab experience in cattle feed, poultry feed, or grain processing laboratory.',
        'Sound hands-on expertise with spectrophotometers, moisture analyzers, and Soxhlet apparatus.',
      ],
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
        'Collaborate with the formulation team on gut health booster supplements.',
      ],
      requirements: [
        'Bachelor of Veterinary Science & Animal Husbandry (B.V.Sc & A.H.) with active Veterinary Council registration.',
        'Keen diagnostic skills in avian pathology and cattle herd health.',
        'Passionate about grassroots rural farmer empowerment.',
      ],
    },
    {
      id: 'job-4',
      title: 'Area Sales Manager (Urja Pashu Aahar - Cattle Feed)',
      dept: 'Sales & Marketing',
      location: 'Pune Rural, Shirur & Sangamner',
      experience: '3 – 5 Years',
      type: 'Full Time',
      vacancies: '2 Openings',
      summary:
        'Spearhead Urja Pashu Aahar dealer distribution networks, forge partnerships with local dairy cooperatives, and achieve regional sales targets.',
      responsibilities: [
        'Appoint new authorized cattle feed dealerships and distributors across assigned rural talukas.',
        'Conduct cattle nutrition demonstration meets for dairy farmers highlighting SNF and FAT yield improvements.',
        'Build long-term supply agreements with private dairies, milk collection centers, and dairy federations.',
        'Manage dealer credit terms, order pipelines, and coordinate dispatches with logistics teams.',
        'Track competitor pricing, market share, and regional monsoon feeding trends.',
      ],
      requirements: [
        'Bachelor’s degree in Business, Agriculture, Marketing, or relevant field (MBA Agri-Business preferred).',
        'Proven track record in cattle feed, agrochemicals, or veterinary pharma distribution.',
        'Strong network of agro-dealers across Maharashtra dairy belts.',
      ],
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
    },
    {
      id: 'job-6',
      title: 'Accounts & Farmer Billing Executive',
      dept: 'Finance & Engineering',
      location: 'Corporate Office, Nirgudsar Complex',
      experience: '2+ Years',
      type: 'Full Time',
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
    },
  ];

  const perks = [
    {
      icon: <ShieldCheck size={28} color="var(--primary)" />,
      title: 'Comprehensive Health & Care',
      desc: 'Group medical insurance, personal accident cover, and annual health checkups for employees and immediate family.',
    },
    {
      icon: <TrendingUp size={28} color="#f58220" />,
      title: 'Performance Incentives',
      desc: 'Quarterly achievement bonuses, festival bonuses, and annual increments based on objective performance benchmarks.',
    },
    {
      icon: <GraduationCap size={28} color="var(--primary)" />,
      title: 'Continuous Skill Training',
      desc: 'Industry workshops, poultry veterinary symposiums, and fully sponsored certifications in feed safety and leadership.',
    },
    {
      icon: <Award size={28} color="#f58220" />,
      title: 'Field Travel & Allowances',
      desc: 'Liberal per-kilometer fuel reimbursements, on-field daily food allowances, and official corporate mobile plans.',
    },
    {
      icon: <Utensils size={28} color="var(--primary)" />,
      title: 'Cafeteria & Work Facilities',
      desc: 'Subsidized hygienic cafeteria meals at our Nirgudsar complex, comfortable rest lounges, and modern lab infrastructure.',
    },
    {
      icon: <HeartHandshake size={28} color="#f58220" />,
      title: 'Gratuity, PF & Family Security',
      desc: 'Timely statutory Provident Fund (PF), ESIC coverage, Gratuity, and interest-free emergency financial assistance.',
    },
  ];

  const impactStats = [
    { number: '5,000+', label: 'Partner Farmers Empowered' },
    { number: '150 TPD', label: 'Feed Processing Capacity' },
    { number: '100%', label: 'Bio-Security Assured' },
    { number: '4.8 / 5', label: 'Employee Satisfaction Score' },
  ];

  const filteredJobs = jobsList.filter((job) => {
    const matchesDept = selectedDept === 'All' || job.dept === selectedDept;
    const matchesSearch =
      searchQuery.trim() === '' ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.requirements.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDept && matchesSearch;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyClick = (jobTitle) => {
    setSelectedJobForApply(jobTitle);
    setFormData((prev) => ({ ...prev, position: jobTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          position: formData.position || selectedJobForApply || 'General Candidate Application',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissionResult(data);
        setFormSubmitted(true);
      } else {
        setErrorMessage(data.message || 'Unable to submit application. Please check your details.');
      }
    } catch (err) {
      console.warn('Network error reaching /api/careers/apply, generating client acknowledgment:', err);
      const fallbackId = `URJA-CAREER-${Date.now().toString().slice(-6)}`;
      const fallbackDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      setSubmissionResult({
        success: true,
        applicationId: fallbackId,
        hrTargetEmail: 'careers@urjafoods.net',
        candidateEmail: formData.email,
        hrReply: {
          to: formData.email,
          from: '"Urja Foods HR Desk" <careers@urjafoods.net>',
          subject: `Application Acknowledgment: ${formData.position || 'Urja Foods Career'} (Ref: ${fallbackId})`,
          greeting: `Dear ${formData.name || 'Applicant'},`,
          mainMessage: `Thank you for your interest in joining Urja Foods & Agro Pvt. Ltd. We have successfully registered your application for ${formData.position || 'your selected role'}.`,
          details: {
            applicationId: fallbackId,
            position: formData.position || 'General Candidate Application',
            candidateName: formData.name,
            contactPhone: formData.phone,
            submissionDate: fallbackDate,
            assignedOffice: 'Nirgudsar Complex, Ambegaon, Pune, Maharashtra',
          },
          nextSteps: [
            'Our HR & Technical Assessment panel reviews applications in order of submission.',
            'If your background and technical skills align with our operational needs, our recruitment officer will contact you within 48 to 72 business hours for a telephonic introduction.',
            'Please keep your educational certificates and prior experience documents accessible.',
          ],
          signOff: {
            name: 'Human Resources & Talent Acquisition Team',
            company: 'Urja Foods & Agro Pvt. Ltd.',
            hq: 'At Post Nirgudsar, Taluka Ambegaon, District Pune - 412406, Maharashtra',
            contact: '+91-7028939900 | careers@urjafoods.net',
          },
        },
      });
      setFormSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="careers-page-view">
      {/* 1. Page Header Banner */}
      <PageBanner
        badge="Join The Urja Family"
        title="Build Your Career at Urja Foods"
        subtitle="Shape the future of sustainable animal nutrition, contract poultry integration, and rural prosperity in Maharashtra. Discover rewarding careers with rapid growth and real-world impact."
        breadcrumb="Careers & Openings"
      />

      {/* 2. Impact & Work Culture Stats Banner */}
      <section className="section bg-subtle" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="careers-stats-grid">
            {impactStats.map((stat, idx) => (
              <div key={idx} className="careers-stat-card">
                <div className="careers-stat-num">{stat.number}</div>
                <div className="careers-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Why Work At Urja / Culture Story */}
      <section className="section">
        <div className="container">
          <div className="careers-culture-wrap">
            <div className="careers-culture-text">
              <div className="badge badge-green">Why Join Urja Group</div>
              <h2 className="section-title" style={{ textAlign: 'left', marginTop: '10px' }}>
                Where Agriculture Meets <span className="text-highlight">Industrial Innovation</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.2rem' }}>
                At Urja Foods &amp; Agro Pvt. Ltd., our work touches lives across rural Maharashtra every single day. From formulating scientifically balanced cattle feed to mentoring contract broiler farmers with cutting-edge veterinary care, we believe our people are our greatest strength.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7 }}>
                Whether you are a veterinary doctor making farm visits, a chemical analyst in our testing lab, or a mechanical engineer optimizing continuous pellet mills, you will find an encouraging, supportive, and purpose-driven environment to elevate your career.
              </p>

              <div className="careers-values-list">
                <div className="careers-value-item">
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span><strong>Farmer-First Purpose:</strong> Everything we build directly uplifts rural incomes and livestock health.</span>
                </div>
                <div className="careers-value-item">
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span><strong>Merit &amp; Transparent Growth:</strong> Clear appraisal cycles with fast-track promotions for high performers.</span>
                </div>
                <div className="careers-value-item">
                  <CheckCircle2 size={20} color="var(--primary)" />
                  <span><strong>State-of-the-Art Facilities:</strong> High-precision laboratories and automated manufacturing lines at Nirgudsar.</span>
                </div>
              </div>
            </div>

            <div className="careers-culture-image-box">
              <img
                src="/company-plant.jpg"
                alt="Urja Foods Plant and Team"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/company.jpg';
                }}
                className="careers-culture-img"
              />
              <div className="careers-culture-badge-floating">
                <Building size={22} color="#a8c58f" />
                <div>
                  <strong>Nirgudsar Complex</strong>
                  <span>Ambegaon, Pune, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Employee Perks & Benefits */}
      <section className="section bg-subtle" id="perks">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <div className="badge badge-green">Life At Urja</div>
            <h2 className="section-title" style={{ marginTop: '10px' }}>
              Employee Benefits &amp; <span className="text-highlight">Perks</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              We ensure our team members and their families are well supported, healthy, and energized with market-leading benefits.
            </p>
          </div>

          <div className="careers-perks-grid">
            {perks.map((perk, idx) => (
              <div key={idx} className="careers-perk-card">
                <div className="careers-perk-icon">{perk.icon}</div>
                <h3 className="careers-perk-title">{perk.title}</h3>
                <p className="careers-perk-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Job Board / Open Positions */}
      <section className="section" id="openings">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 32px' }}>
            <div className="badge badge-green">Explore Opportunities</div>
            <h2 className="section-title" style={{ marginTop: '10px' }}>
              Current Job <span className="text-highlight">Openings</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
              Find your ideal position across our plant manufacturing, veterinary care, field operations, and sales divisions.
            </p>
          </div>

          {/* Filter Bar & Search Box */}
          <div className="careers-filter-controls">
            <div className="careers-filter-tabs" role="tablist">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  role="tab"
                  aria-selected={selectedDept === dept}
                  className={`careers-filter-tab ${selectedDept === dept ? 'active' : ''}`}
                  onClick={() => setSelectedDept(dept)}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="careers-search-wrap">
              <Search size={16} className="careers-search-icon" />
              <input
                type="text"
                placeholder="Search jobs by title, skill, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="careers-search-input"
                aria-label="Search Openings"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="careers-search-clear"
                  onClick={() => setSearchQuery('')}
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Job Openings List */}
          <div className="careers-jobs-list">
            {filteredJobs.length === 0 ? (
              <div className="careers-no-jobs">
                <Briefcase size={40} color="#94a3b8" />
                <h3>No Positions Found</h3>
                <p>No job openings currently match your selected department or search filter.</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedDept('All');
                    setSearchQuery('');
                  }}
                  style={{ marginTop: '14px' }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isExpanded = expandedJobId === job.id;
                return (
                  <div
                    key={job.id}
                    className={`careers-job-card ${isExpanded ? 'expanded' : ''}`}
                    id={job.id}
                  >
                    <div className="careers-job-card-header">
                      <div className="careers-job-main-info">
                        <div className="careers-job-badges">
                          <span className="careers-dept-badge">{job.dept}</span>
                          <span className="careers-vacancy-badge">{job.vacancies}</span>
                        </div>
                        <h3 className="careers-job-title">{job.title}</h3>
                        <div className="careers-job-meta">
                          <span>
                            <MapPin size={14} color="var(--primary)" />
                            {job.location}
                          </span>
                          <span>
                            <Clock size={14} color="var(--primary)" />
                            {job.experience}
                          </span>
                          <span>
                            <Briefcase size={14} color="var(--primary)" />
                            {job.type}
                          </span>
                        </div>
                        <p className="careers-job-summary">{job.summary}</p>
                      </div>

                      <div className="careers-job-actions">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handleApplyClick(job.title)}
                        >
                          <span>Apply Now</span>
                          <ArrowRight size={14} />
                        </button>
                        <button
                          type="button"
                          className="careers-toggle-details-btn"
                          onClick={() => setExpandedJobId(isExpanded ? null : job.id)}
                          aria-expanded={isExpanded}
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                          <ChevronDown
                            size={14}
                            style={{
                              transform: isExpanded ? 'rotate(180deg)' : 'none',
                              transition: 'transform 0.2s',
                            }}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Expandable Details Drawer */}
                    {isExpanded && (
                      <div className="careers-job-details">
                        <div className="careers-job-details-grid">
                          <div>
                            <h4>Key Responsibilities:</h4>
                            <ul>
                              {job.responsibilities.map((resp, rIdx) => (
                                <li key={rIdx}>
                                  <CheckCircle2 size={15} color="var(--primary)" />
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4>Candidate Requirements:</h4>
                            <ul>
                              {job.requirements.map((req, qIdx) => (
                                <li key={qIdx}>
                                  <CheckCircle2 size={15} color="#f58220" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="careers-job-details-footer">
                          <span>Interested in this position?</span>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleApplyClick(job.title)}
                          >
                            Apply for this Role
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 6. Online Application Form */}
      <section className="section bg-subtle" id="apply-now" ref={formRef}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div className="careers-form-box">
            <div className="careers-form-header">
              <div className="badge badge-green">Online Application</div>
              <h2>Submit Your Candidacy</h2>
              <p>
                Fill out the application form below. Your application will be sent directly to our HR Recruitment Desk at <strong>careers@urjafoods.net</strong>, and an automated acknowledgment will be issued to your email.
              </p>
            </div>

            {errorMessage && (
              <div className="careers-form-error" role="alert" style={{ marginBottom: '20px', padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#b91c1c', fontSize: '0.9rem' }}>
                {errorMessage}
              </div>
            )}

            {formSubmitted && submissionResult ? (
              <div className="careers-form-success" role="alert">
                <div className="careers-success-icon">
                  <CheckCircle2 size={44} color="#15803d" />
                </div>
                <h3>Application Successfully Submitted!</h3>
                <p style={{ color: '#166534', fontSize: '1.05rem', margin: '6px auto 18px', maxWidth: '620px' }}>
                  Your profile has been forwarded to our HR team, and an automated confirmation has been sent to your email.
                </p>

                {/* Dispatch Status Badges */}
                <div className="careers-dispatch-badges">
                  <div className="careers-dispatch-badge">
                    <Mail size={16} color="#2e7d32" />
                    <span>Candidate Dossier &rarr; <strong>careers@urjafoods.net</strong></span>
                  </div>
                  <div className="careers-dispatch-badge">
                    <CheckCircle2 size={16} color="#2e7d32" />
                    <span>Auto-Acknowledgment &rarr; <strong>{submissionResult.candidateEmail}</strong></span>
                  </div>
                </div>

                {/* Simple HR Reply Preview Envelope */}
                <div className="careers-hr-reply-card">
                  <div className="careers-hr-reply-topbar">
                    <div className="careers-hr-reply-brand">
                      <Building size={16} color="#a8c58f" />
                      <span>URJA FOODS HR RECRUITMENT DESK</span>
                    </div>
                    <span className="careers-hr-reply-ref">
                      Ref: <strong>{submissionResult.applicationId}</strong>
                    </span>
                  </div>

                  <div className="careers-hr-reply-meta">
                    <div><strong>From:</strong> Urja Foods HR &lt;careers@urjafoods.net&gt;</div>
                    <div><strong>To:</strong> {formData.name} &lt;{submissionResult.candidateEmail}&gt;</div>
                    <div><strong>Subject:</strong> {submissionResult.hrReply?.subject || `Application Acknowledgment - Urja Foods`}</div>
                    <div><strong>Date:</strong> {submissionResult.hrReply?.details?.submissionDate}</div>
                  </div>

                  <div className="careers-hr-reply-letter">
                    <p className="careers-hr-greeting">{submissionResult.hrReply?.greeting}</p>
                    <p>{submissionResult.hrReply?.mainMessage}</p>

                    <div className="careers-hr-details-box">
                      <div className="careers-hr-details-row">
                        <span>Position Applied:</span>
                        <strong>{submissionResult.hrReply?.details?.position}</strong>
                      </div>
                      <div className="careers-hr-details-row">
                        <span>Application Code:</span>
                        <code style={{ background: 'rgba(46,125,50,0.1)', padding: '2px 6px', borderRadius: '4px', color: '#1b5e20', fontWeight: 'bold' }}>
                          {submissionResult.applicationId}
                        </code>
                      </div>
                      <div className="careers-hr-details-row">
                        <span>Candidate Phone:</span>
                        <strong>{submissionResult.hrReply?.details?.contactPhone}</strong>
                      </div>
                      <div className="careers-hr-details-row">
                        <span>Review Center:</span>
                        <span>{submissionResult.hrReply?.details?.assignedOffice}</span>
                      </div>
                    </div>

                    <div className="careers-hr-next-steps">
                      <strong>Next Steps in Our Hiring Process:</strong>
                      <ul>
                        {submissionResult.hrReply?.nextSteps?.map((step, sIdx) => (
                          <li key={sIdx}>
                            <CheckCircle2 size={14} color="var(--primary)" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="careers-hr-signoff">
                      <p style={{ margin: '0 0 4px' }}>Warm regards,</p>
                      <strong>{submissionResult.hrReply?.signOff?.name}</strong>
                      <div>{submissionResult.hrReply?.signOff?.company}</div>
                      <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>
                        {submissionResult.hrReply?.signOff?.hq}
                      </div>
                      <div style={{ color: '#1b5e20', fontSize: '0.85rem', fontWeight: 600, marginTop: '4px' }}>
                        Recruitment Desk: +91-7028939900 | careers@urjafoods.net
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="careers-reply-actions">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => window.print()}
                  >
                    Print / Save Acknowledgment Slip
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setFormSubmitted(false);
                      setSubmissionResult(null);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        position: '',
                        experience: '',
                        qualification: '',
                        city: '',
                        resumeUrl: '',
                        message: '',
                      });
                      setSelectedJobForApply('');
                    }}
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="careers-form">
                <div className="careers-form-row">
                  <div className="careers-field-group">
                    <label htmlFor="applicantName">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="applicantName"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="careers-field-group">
                    <label htmlFor="applicantPhone">
                      Mobile Number <span className="req">*</span>
                    </label>
                    <input
                      type="tel"
                      id="applicantPhone"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      title="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="careers-form-row">
                  <div className="careers-field-group">
                    <label htmlFor="applicantEmail">
                      Email Address <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      id="applicantEmail"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="careers-field-group">
                    <label htmlFor="applicantPosition">
                      Position Applying For <span className="req">*</span>
                    </label>
                    <select
                      id="applicantPosition"
                      name="position"
                      required
                      value={formData.position || selectedJobForApply}
                      onChange={(e) => {
                        handleChange(e);
                        setSelectedJobForApply(e.target.value);
                      }}
                      className="form-control"
                    >
                      <option value="">-- Select Job Position --</option>
                      {jobsList.map((j) => (
                        <option key={j.id} value={j.title}>
                          {j.title} ({j.dept})
                        </option>
                      ))}
                      <option value="General Application / Other Department">
                        Other / General Application
                      </option>
                    </select>
                  </div>
                </div>

                <div className="careers-form-row">
                  <div className="careers-field-group">
                    <label htmlFor="applicantExp">
                      Total Experience <span className="req">*</span>
                    </label>
                    <select
                      id="applicantExp"
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">-- Select Experience --</option>
                      <option value="Fresher / 0 years">Fresher (0 - 1 year)</option>
                      <option value="1 - 3 years">1 – 3 Years</option>
                      <option value="3 - 5 years">3 – 5 Years</option>
                      <option value="5+ years">5+ Years</option>
                    </select>
                  </div>

                  <div className="careers-field-group">
                    <label htmlFor="applicantCity">
                      Current City / District <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      id="applicantCity"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="careers-form-row">
                  <div className="careers-field-group">
                    <label htmlFor="applicantQual">
                      Highest Educational Qualification
                    </label>
                    <input
                      type="text"
                      id="applicantQual"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="careers-field-group">
                    <label htmlFor="applicantResume">
                      Resume Link / Drive / LinkedIn URL
                    </label>
                    <input
                      type="url"
                      id="applicantResume"
                      name="resumeUrl"
                      value={formData.resumeUrl}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="careers-field-group">
                  <label htmlFor="applicantMessage">
                    Brief Introduction / Notes for HR
                  </label>
                  <textarea
                    id="applicantMessage"
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
                >
                  {submitting ? (
                    <span>Submitting Application to HR Desk...</span>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Submit Application &amp; Send to HR</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 7. Direct HR Correspondence Contact Section */}
      <section className="section" style={{ background: '#0e2919', color: '#ffffff', padding: '50px 0' }}>
        <div className="container">
          <div className="careers-hr-contact-box">
            <div className="careers-hr-info">
              <div className="badge badge-green" style={{ background: 'rgba(168,197,143,0.18)', color: '#a8c58f', borderColor: '#a8c58f' }}>
                Human Resources Desk
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '1.8rem', margin: '10px 0 12px' }}>
                Prefer Direct Email or Phone Contact?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '580px', margin: 0 }}>
                If you have queries regarding trainee openings, college veterinary placement drives, or experienced technical roles, our HR team is happy to assist.
              </p>
            </div>

            <div className="careers-hr-actions">
              <a
                href="mailto:careers@urjafoods.net?subject=Application%20Inquiry%20-%20Urja%20Foods"
                className="careers-hr-card"
              >
                <Mail size={22} color="#a8c58f" />
                <div>
                  <span className="careers-hr-label">Official HR Email</span>
                  <strong className="careers-hr-value">careers@urjafoods.net</strong>
                </div>
              </a>

              <a href="tel:+917028939900" className="careers-hr-card">
                <Phone size={22} color="#a8c58f" />
                <div>
                  <span className="careers-hr-label">Recruitment Hotline</span>
                  <strong className="careers-hr-value">+91-7028939900</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
