import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  Clock,
  Users,
  Search,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  HeartPulse,
  GraduationCap,
  Coffee,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import { JOB_OPENINGS, CAREER_BENEFITS } from '../data/careersData';

const BENEFIT_ICONS = {
  ShieldCheck: <ShieldCheck size={26} />,
  TrendingUp: <TrendingUp size={26} />,
  HeartPulse: <HeartPulse size={26} />,
  GraduationCap: <GraduationCap size={26} />,
  Coffee: <Coffee size={26} />,
  Users: <Users size={26} />,
};

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeJobModal, setActiveJobModal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Compute unique departments
  const departments = useMemo(() => {
    const set = new Set(JOB_OPENINGS.map((j) => j.dept));
    return ['All', ...Array.from(set)];
  }, []);

  // Filter jobs based on department and search query
  const filteredJobs = useMemo(() => {
    return JOB_OPENINGS.filter((job) => {
      const matchDept = selectedDept === 'All' || job.dept === selectedDept;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.dept.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q);
      return matchDept && matchSearch;
    });
  }, [selectedDept, searchQuery]);

  const handleApplyClick = (jobId) => {
    // Check if candidate is logged in; if not, go to login with return path
    const candidate = localStorage.getItem('urja_candidate_user');
    if (candidate) {
      navigate(`/careers/apply/${jobId}`);
    } else {
      navigate(`/careers/login?redirect=/careers/apply/${jobId}`);
    }
  };

  return (
    <div className="careers-page-view">
      {/* 1. Hero Section */}
      <section className="careers-hero-section">
        <div className="careers-hero-pattern" />
        <div className="careers-hero-content">
          <div className="careers-hero-badge">
            <Sparkles size={14} />
            <span>Join Urja Foods &amp; Agro</span>
          </div>
          <h1 className="careers-hero-title">
            Build Your Career in <span>Agri-Nutrition</span> &amp; Modern Farming
          </h1>
          <p className="careers-hero-desc">
            Empowering 900+ farm families with cutting-edge 150 TPD feed milling technology,
            bio-secure broiler integration, and high-impact rural development.
          </p>

          {/* Quick Search */}
          <div className="careers-search-bar">
            <Search size={20} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by job title, department, or location (e.g. Pune, Supervisor, Chemist)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button">
              <span>Find Roles</span>
            </button>
          </div>

          {/* Candidate Dashboard Direct Link */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.25rem' }}>
            <Link
              to="/careers/dashboard"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.45rem 1.15rem',
                borderRadius: '30px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.2s ease',
              }}
            >
              <Users size={15} />
              <span>Applied already? Candidate Dashboard &amp; Status Tracker</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Employee Perks & Culture */}
      <section className="careers-benefits-section">
        <div className="careers-section-header">
          <h2>Why Build Your Career at Urja Foods?</h2>
          <p>
            We provide a high-trust work culture, continuous technical mentorship, and competitive
            benefits designed for personal and professional growth.
          </p>
        </div>

        <div className="careers-benefits-grid">
          {CAREER_BENEFITS.map((b, idx) => (
            <div className="careers-benefit-card" key={idx}>
              <div className="careers-benefit-icon-wrapper">
                {BENEFIT_ICONS[b.icon] || <ShieldCheck size={26} />}
              </div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Open Positions Showcase */}
      <section className="careers-roles-section" id="open-positions">
        <div className="careers-section-header">
          <h2>Current Career Opportunities</h2>
          <p>
            Explore open vacancies across our manufacturing complex, field supervisory networks,
            veterinary care teams, and regional offices.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="careers-filter-tabs">
          {departments.map((dept) => {
            const count =
              dept === 'All'
                ? JOB_OPENINGS.length
                : JOB_OPENINGS.filter((j) => j.dept === dept).length;
            return (
              <button
                key={dept}
                type="button"
                className={`careers-tab-btn ${selectedDept === dept ? 'active' : ''}`}
                onClick={() => setSelectedDept(dept)}
              >
                <span>{dept}</span>
                <span className="careers-tab-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#fff', borderRadius: '16px' }}>
            <Briefcase size={40} color="#94a3b8" style={{ margin: '0 auto 1rem' }} />
            <h3>No matching openings found</h3>
            <p style={{ color: '#64748b', marginTop: '0.5rem' }}>
              Try adjusting your search terms or selecting "All" departments.
            </p>
          </div>
        ) : (
          <div className="careers-jobs-grid">
            {filteredJobs.map((job) => (
              <div className="careers-job-card" key={job.id}>
                <div>
                  <span className="careers-job-dept-badge">{job.dept}</span>
                  <h3>{job.title}</h3>
                  <p className="summary">{job.summary}</p>
                </div>

                <div>
                  <div className="careers-job-meta">
                    <div className="careers-meta-item">
                      <MapPin size={16} />
                      <span>{job.location}</span>
                    </div>
                    <div className="careers-meta-item">
                      <Clock size={16} />
                      <span>{job.experience} experience • {job.type}</span>
                    </div>
                    <div className="careers-meta-item">
                      <Users size={16} />
                      <span>{job.vacancies}</span>
                    </div>
                  </div>

                  <div className="careers-job-actions">
                    <button
                      type="button"
                      className="careers-btn-secondary"
                      onClick={() => setActiveJobModal(job)}
                    >
                      View Details
                    </button>
                    <button
                      type="button"
                      className="careers-btn-primary"
                      onClick={() => handleApplyClick(job.id)}
                    >
                      <span>Apply Now</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Job Details Modal */}
      {activeJobModal && (
        <div className="careers-modal-overlay" onClick={() => setActiveJobModal(null)}>
          <div className="careers-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="careers-modal-header">
              <button
                type="button"
                className="careers-modal-close"
                onClick={() => setActiveJobModal(null)}
              >
                <X size={20} />
              </button>
              <span className="careers-job-dept-badge">{activeJobModal.dept}</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: '0.5rem' }}>
                {activeJobModal.title}
              </h2>
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.75rem', fontSize: '0.9rem', color: '#64748b' }}>
                <span>📍 {activeJobModal.location}</span>
                <span>⏱️ {activeJobModal.experience}</span>
                <span>💼 {activeJobModal.type}</span>
                <span>💰 {activeJobModal.salary}</span>
              </div>
            </div>

            <div className="careers-modal-body">
              <h4>Role Overview</h4>
              <p style={{ color: '#475569', lineHeight: 1.6 }}>{activeJobModal.summary}</p>

              <h4>Key Responsibilities</h4>
              <ul>
                {activeJobModal.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <h4>Qualifications &amp; Requirements</h4>
              <ul>
                {activeJobModal.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="careers-modal-footer">
              <button
                type="button"
                className="careers-btn-secondary"
                onClick={() => setActiveJobModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="careers-btn-primary"
                onClick={() => {
                  const id = activeJobModal.id;
                  setActiveJobModal(null);
                  handleApplyClick(id);
                }}
              >
                <span>Apply for this Position</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
