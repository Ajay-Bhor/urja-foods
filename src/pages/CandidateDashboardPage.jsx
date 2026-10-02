import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Eye,
  FileText,
  LogOut,
  MapPin,
  Printer,
  Sparkles,
  TrendingUp,
  User,
  ArrowRight,
} from 'lucide-react';

export default function CandidateDashboardPage() {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [applications, setApplications] = useState([]);
  const [selectedAppDossier, setSelectedAppDossier] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedUser = localStorage.getItem('urja_candidate_user');
    if (!storedUser) {
      navigate('/careers/login?redirect=/careers/dashboard');
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setCandidate(parsedUser);
    } catch {
      navigate('/careers/login');
      return;
    }

    // Load submitted applications
    const storedApps = localStorage.getItem('urja_submitted_applications');
    if (storedApps) {
      try {
        const parsed = JSON.parse(storedApps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setApplications(parsed);
          return;
        }
      } catch {
        // fallback
      }
    }

    // Default demonstration application if candidate hasn't submitted one yet
    const fallbackApp = {
      applicationId: 'UF-20268491',
      jobTitle: 'Senior Quality Assurance Officer - Agro Feeds',
      jobDept: 'Quality & Biosecurity',
      fullName: storedUser ? JSON.parse(storedUser).name : 'Ramesh Patil',
      email: storedUser ? JSON.parse(storedUser).email : 'candidate@example.com',
      phone: '+91 9876543210',
      location: 'Nirgudsar Complex, Pune',
      resume: 'Ramesh_Patil_Resume_2026.pdf',
      submittedAt: new Date().toLocaleDateString(),
      status: 'Application Submitted',
      stage: 1,
    };
    setApplications([fallbackApp]);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('urja_candidate_user');
    navigate('/careers/login');
  };

  if (!candidate) {
    return null;
  }

  return (
    <div className="candidate-dashboard-view">
      <div className="candidate-dashboard-container">
        {/* Top Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link
            to="/careers"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#173b24',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}
          >
            <span>← Back to Career Portal</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '0.35rem 0.85rem',
              color: '#64748b',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Hero Banner */}
        <div className="candidate-dashboard-hero">
          <div className="candidate-dashboard-welcome">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                }}
              >
                Candidate Portal
              </span>
            </div>
            <h2>Welcome back, {candidate.name}!</h2>
            <p>
              Track your active job applications, recruitment stages, and submitted credentials for Urja Foods.
            </p>
          </div>

          <Link
            to="/careers"
            style={{
              background: '#ffffff',
              color: '#173b24',
              padding: '0.75rem 1.4rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span>Browse Open Roles</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Stats Row */}
        <div className="candidate-stats-row">
          <div className="candidate-stat-card">
            <div className="candidate-stat-icon">
              <Briefcase size={22} />
            </div>
            <div className="candidate-stat-content">
              <span>Applications</span>
              <strong>{applications.length}</strong>
            </div>
          </div>

          <div className="candidate-stat-card">
            <div className="candidate-stat-icon" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
              <Clock size={22} />
            </div>
            <div className="candidate-stat-content">
              <span>Active Review</span>
              <strong>{applications.length}</strong>
            </div>
          </div>

          <div className="candidate-stat-card">
            <div className="candidate-stat-icon" style={{ background: '#fef3c7', color: '#b45309' }}>
              <TrendingUp size={22} />
            </div>
            <div className="candidate-stat-content">
              <span>Interviews Scheduled</span>
              <strong>0</strong>
            </div>
          </div>
        </div>

        {/* My Applications Section */}
        <div className="candidate-applications-section">
          <div className="candidate-section-title-row">
            <h3>
              <Briefcase size={20} color="#173b24" />
              <span>My Submitted Applications ({applications.length})</span>
            </h3>
          </div>

          {applications.map((app) => (
            <div className="candidate-application-card" key={app.applicationId}>
              <div className="candidate-card-top">
                <div className="candidate-card-job">
                  <h4>{app.jobTitle}</h4>
                  <span>
                    Application ID: <strong style={{ color: '#173b24', fontFamily: 'monospace' }}>{app.applicationId}</strong> • Submitted: {app.submittedAt}
                  </span>
                </div>
                <div className="candidate-status-badge submitted">
                  <CheckCircle2 size={14} />
                  <span>{app.status || 'Application Submitted'}</span>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="candidate-progress-tracker">
                <div className="candidate-progress-step completed">
                  <div className="candidate-progress-dot">✓</div>
                  <span>1. Application Received</span>
                </div>
                <div className="candidate-progress-step active">
                  <div className="candidate-progress-dot">2</div>
                  <span>2. HR Screening</span>
                </div>
                <div className="candidate-progress-step">
                  <div className="candidate-progress-dot">3</div>
                  <span>3. Interview Round</span>
                </div>
                <div className="candidate-progress-step">
                  <div className="candidate-progress-dot">4</div>
                  <span>4. Final Selection</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="candidate-card-actions">
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => setSelectedAppDossier(app)}
                >
                  <Eye size={14} />
                  <span>View Submitted Dossier</span>
                </button>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => window.print()}
                >
                  <Printer size={14} />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Candidate Profile Details Card */}
        <div className="candidate-applications-section">
          <div className="candidate-section-title-row">
            <h3>
              <User size={20} color="#173b24" />
              <span>My Candidate Profile</span>
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontSize: '0.92rem' }}>
            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Candidate Legal Name
              </span>
              <strong style={{ color: '#0f172a' }}>{candidate.name}</strong>
            </div>

            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Primary Email
              </span>
              <strong style={{ color: '#0f172a' }}>{candidate.email}</strong>
            </div>

            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                Authentication Type
              </span>
              <strong style={{ color: '#0f172a' }}>{candidate.authMethod || 'Verified Workday Account'}</strong>
            </div>

            <div>
              <span style={{ color: '#64748b', display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                ATS Account Status
              </span>
              <span style={{ color: '#15803d', fontWeight: 700 }}>Active External Applicant ✓</span>
            </div>
          </div>
        </div>

        {/* Modal: View Submitted Dossier */}
        {selectedAppDossier && (
          <div className="careers-modal-overlay" onClick={() => setSelectedAppDossier(null)}>
            <div
              className="careers-modal-box"
              style={{ maxWidth: '750px', maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="careers-modal-header">
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#173b24', fontWeight: 700, textTransform: 'uppercase' }}>
                    Tracking ID: {selectedAppDossier.applicationId}
                  </div>
                  <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.25rem', color: '#0f172a' }}>
                    {selectedAppDossier.jobTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  className="careers-modal-close"
                  onClick={() => setSelectedAppDossier(null)}
                >
                  ✕
                </button>
              </div>

              <div className="careers-modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                {/* 1. Applicant Summary */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                    1. Applicant Summary &amp; Personal Info
                  </h4>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#334155' }}>
                    <div><strong>Full Name:</strong> {selectedAppDossier.fullName}</div>
                    <div><strong>Email:</strong> {selectedAppDossier.email}</div>
                    <div><strong>Phone:</strong> {selectedAppDossier.phone}</div>
                    <div><strong>Location:</strong> {selectedAppDossier.location}</div>
                    {selectedAppDossier.details?.addressLine && (
                      <div><strong>Address:</strong> {selectedAppDossier.details.addressLine}, {selectedAppDossier.details.city}, {selectedAppDossier.details.state} {selectedAppDossier.details.postalCode}</div>
                    )}
                    <div><strong>Submitted At:</strong> {selectedAppDossier.submittedAt}</div>
                  </div>
                </div>

                {/* 2. Work Experience */}
                {selectedAppDossier.details?.workExperiences && selectedAppDossier.details.workExperiences.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                      2. Work Experience
                    </h4>
                    {selectedAppDossier.details.workExperiences.map((w, i) => (
                      <div key={i} style={{ fontSize: '0.88rem', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                        <strong>{w.title}</strong> at {w.company} ({w.startDate} - {w.currentlyWorking ? 'Present' : (w.endDate || 'Present')})
                        {w.location && <div style={{ color: '#64748b' }}>{w.location}</div>}
                        {w.description && <div style={{ color: '#475569', marginTop: '0.2rem' }}>{w.description}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Education */}
                {selectedAppDossier.details?.educationList && selectedAppDossier.details.educationList.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                      3. Education
                    </h4>
                    {selectedAppDossier.details.educationList.map((e, i) => (
                      <div key={i} style={{ fontSize: '0.88rem', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                        <strong>{e.degree}</strong> — {e.institution}
                        {e.fieldOfStudy && <div style={{ color: '#64748b' }}>Field of Study: {e.fieldOfStudy}</div>}
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Certifications */}
                {selectedAppDossier.details?.certifications && selectedAppDossier.details.certifications.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                      4. Certifications
                    </h4>
                    {selectedAppDossier.details.certifications.map((c, i) => (
                      <div key={i} style={{ fontSize: '0.88rem', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                        <strong>{c.name}</strong> {c.certificationNumber ? `(#${c.certificationNumber})` : ''}
                        <div style={{ color: '#64748b' }}>
                          {c.issuedDate ? `Issued: ${c.issuedDate}` : ''} {c.expirationDate ? `• Expires: ${c.expirationDate}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. Skills */}
                {selectedAppDossier.details?.skills && selectedAppDossier.details.skills.length > 0 && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                      5. Competencies &amp; Skills
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.4rem' }}>
                      {selectedAppDossier.details.skills.map((s, i) => (
                        <span key={i} className="career-skill-chip" style={{ fontSize: '0.82rem', padding: '0.2rem 0.6rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Websites */}
                {selectedAppDossier.details && (selectedAppDossier.details.linkedinUrl || selectedAppDossier.details.githubUrl || selectedAppDossier.details.portfolioUrl) && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                      6. Professional Links &amp; Websites
                    </h4>
                    <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155' }}>
                      {selectedAppDossier.details.linkedinUrl && <div><strong>LinkedIn:</strong> {selectedAppDossier.details.linkedinUrl}</div>}
                      {selectedAppDossier.details.githubUrl && <div><strong>GitHub:</strong> {selectedAppDossier.details.githubUrl}</div>}
                      {selectedAppDossier.details.portfolioUrl && <div><strong>Portfolio:</strong> {selectedAppDossier.details.portfolioUrl}</div>}
                    </div>
                  </div>
                )}

                {/* 7. Application Questions & Disclosures */}
                {selectedAppDossier.details && (
                  <div style={{ marginBottom: '1.25rem' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                      7. Application Questions &amp; Disclosures
                    </h4>
                    <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155' }}>
                      <div><strong>Work Authorization:</strong> {selectedAppDossier.details.workAuth || 'Yes'}</div>
                      <div><strong>Currently Working for Urja Foods:</strong> {selectedAppDossier.details.currentlyWorkingForUrja || 'No'}</div>
                      <div><strong>Previously Worked for Urja Foods:</strong> {selectedAppDossier.details.previouslyWorkedForUrja || 'No'}</div>
                      <div><strong>Willing to Relocate:</strong> {selectedAppDossier.details.willingToRelocate || 'Yes'}</div>
                      <div><strong>Gender Identification:</strong> {selectedAppDossier.details.gender || 'Prefer not to say'}</div>
                      <div><strong>Veteran Status:</strong> {selectedAppDossier.details.veteranStatus || 'Not a protected veteran'}</div>
                      <div><strong>Terms and Conditions:</strong> <span style={{ color: '#15803d', fontWeight: 600 }}>Agreed &amp; Accepted ✓</span></div>
                    </div>
                  </div>
                )}

                {/* 8. Attached Credentials & Resume */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                    8. Attached Credentials &amp; Resume
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem' }}>
                    <FileText size={18} color="#173b24" />
                    <strong>{selectedAppDossier.resume}</strong>
                  </div>
                </div>

                {/* 9. Current Status */}
                <div>
                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.35rem' }}>
                    9. Recruitment Timeline &amp; Next Steps
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5, margin: '0.4rem 0 0' }}>
                    Your application has been received by Urja Foods Talent Acquisition. Regional hiring teams
                    are reviewing qualifications. If your profile matches our requirements, you will receive an
                    email invitation for the interview round.
                  </p>
                </div>
              </div>

              <div className="careers-modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  className="careers-btn-secondary"
                  onClick={() => window.print()}
                >
                  <Printer size={15} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  <span>Print Dossier</span>
                </button>
                <button
                  type="button"
                  className="careers-btn-primary"
                  onClick={() => setSelectedAppDossier(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
