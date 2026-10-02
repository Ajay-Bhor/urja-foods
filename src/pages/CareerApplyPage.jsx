import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  FileText,
  User,
  Briefcase,
  GraduationCap,
  Award,
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  UploadCloud,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Printer,
  History,
  Edit3,
} from 'lucide-react';
import { JOB_OPENINGS } from '../data/careersData';
import CountryPhoneInput from '../components/CountryPhoneInput';
import { COUNTRIES } from '../utils/countries.js';

export default function CareerApplyPage() {
  const { jobId, routeMode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Authentication & Selected Job
  const [candidate, setCandidate] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  // Stepper State: 'choose' | 1 | 2 | 3 | 4 | 5 | 'confirmation'
  const [currentStep, setCurrentStep] = useState('choose');
  const [applyMode, setApplyMode] = useState(''); // 'resume' | 'manual' | 'last_app'
  const [isParsingResume, setIsParsingResume] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState(null);

  // ==========================================
  // FORM DATA STATES
  // ==========================================

  // Step 1: PERSONAL INFORMATION
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [countryIso, setCountryIso] = useState('IN');
  const [country, setCountry] = useState('India');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [postalCode, setPostalCode] = useState('');
  const [source, setSource] = useState('Urja Foods Company Website');

  // Step 2: MY EXPERIENCE
  // Document Upload
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Work Experience Entries
  const [workExperiences, setWorkExperiences] = useState([
    {
      id: 1,
      title: 'Technical Supervisor',
      company: 'Western Agro Broilers',
      location: 'Pune, Maharashtra',
      startDate: '2023-01',
      endDate: 'Present',
      currentlyWorking: true,
      description: 'Supervised 12 contract poultry grower farms and monitored flock FCR and biosecurity.',
    },
  ]);

  // Education Entries
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      institution: 'Mahatma Phule Krishi Vidyapeeth (MPKV)',
      degree: 'B.Sc Agriculture / Animal Husbandry',
      fieldOfStudy: 'Agriculture & Livestock Sciences',
      gradYear: '2022',
    },
  ]);

  // Certifications Entries
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: 'HACCP & Feed Biosecurity Protocol Level-2',
      certificationNumber: 'FSSAI-2023-QC-8849',
      issuedDate: '03/2023',
      expirationDate: '03/2026',
      specialties: 'Feed Biosecurity, Quality Assurance',
      attachment: null,
    },
  ]);

  // Step 3: APPLICATION QUESTIONS
  const [workAuth, setWorkAuth] = useState('Yes');
  const [drivingLicense, setDrivingLicense] = useState('Yes');
  const [noticePeriod, setNoticePeriod] = useState('15 Days');
  const [currentCtc, setCurrentCtc] = useState('₹3.5 Lakhs / year');
  const [expectedCtc, setExpectedCtc] = useState('₹4.5 Lakhs / year');
  const [willingToRelocate, setWillingToRelocate] = useState('Yes');
  const [hasAgriExp, setHasAgriExp] = useState('Yes');

  // Step 4: VOLUNTARY DISCLOSURES
  const [gender, setGender] = useState('Male');
  const [farmingFamily, setFarmingFamily] = useState('Yes, active commercial farming family');
  const [disabilityStatus, setDisabilityStatus] = useState('No');
  const [agreeDeclaration, setAgreeDeclaration] = useState(false);
  const [signatureName, setSignatureName] = useState('');

  // ==========================================
  // INITIALIZATION & SESSION CHECK
  // ==========================================
  useEffect(() => {
    window.scrollTo(0, 0);

    const storedUser = localStorage.getItem('urja_candidate_user');
    if (!storedUser) {
      navigate(`/careers/login?redirect=/careers/apply/${jobId || ''}`);
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      setCandidate(user);

      // Pre-fill name and email from candidate profile
      if (user.name) {
        const parts = user.name.trim().split(/\s+/);
        if (parts.length === 1) {
          setFirstName(parts[0]);
        } else if (parts.length === 2) {
          setFirstName(parts[0]);
          setLastName(parts[1]);
        } else if (parts.length >= 3) {
          setFirstName(parts[0]);
          setMiddleName(parts.slice(1, -1).join(' '));
          setLastName(parts[parts.length - 1]);
        }
        setSignatureName(user.name);
      }
      if (user.email) {
        setEmail(user.email);
      }
    } catch {
      navigate('/careers/login');
      return;
    }

    // Set selected job
    let resolvedJob = JOB_OPENINGS[0];
    if (jobId && jobId !== 'applyManually' && jobId !== 'autofillWithResume' && jobId !== 'useMyLastApplication') {
      const matched = JOB_OPENINGS.find((j) => j.id === jobId);
      if (matched) resolvedJob = matched;
    }
    setSelectedJob(resolvedJob);

    // Detect Workday route mode from URL pathname or routeMode param
    const activeRouteMode =
      routeMode ||
      (location.pathname.includes('applyManually') ? 'applyManually' : '') ||
      (location.pathname.includes('autofillWithResume') ? 'autofillWithResume' : '') ||
      (location.pathname.includes('useMyLastApplication') ? 'useMyLastApplication' : '');

    if (activeRouteMode === 'applyManually') {
      setApplyMode('manual');
      setCurrentStep(1);
    } else if (activeRouteMode === 'autofillWithResume') {
      setApplyMode('resume');
      setIsParsingResume(true);
      setTimeout(() => {
        setIsParsingResume(false);
        setResumeFile({ name: 'Ramesh_Patil_Resume_2026.pdf', size: 184320 });
        setCity('Pune');
        setPostalCode('411004');
        setPhone('9822114455');
        setCurrentStep(1);
      }, 700);
    } else if (activeRouteMode === 'useMyLastApplication') {
      setApplyMode('last_app');
      const saved = localStorage.getItem('urja_last_application');
      if (saved) {
        try {
          const prev = JSON.parse(saved);
          if (prev.firstName) setFirstName(prev.firstName);
          if (prev.middleName) setMiddleName(prev.middleName);
          if (prev.lastName) setLastName(prev.lastName);
          if (prev.email) setEmail(prev.email);
          if (prev.phone) setPhone(prev.phone);
          if (prev.countryCode) setCountryCode(prev.countryCode);
          if (prev.countryIso) setCountryIso(prev.countryIso);
          if (prev.country) setCountry(prev.country);
          if (prev.addressLine) setAddressLine(prev.addressLine);
          if (prev.city) setCity(prev.city);
          if (prev.state) setState(prev.state);
          if (prev.postalCode) setPostalCode(prev.postalCode);
        } catch {
          // ignore
        }
      }
      setCurrentStep(1);
    } else {
      // Default: Choose How to Apply selection screen
      setCurrentStep('choose');
    }
  }, [jobId, routeMode, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('urja_candidate_user');
    navigate('/careers/login');
  };

  // ==========================================
  // CHOOSE HOW TO APPLY HANDLERS
  // ==========================================
  const handleSelectMode = (chosenMode) => {
    const targetJobId = selectedJob ? selectedJob.id : (jobId && !jobId.startsWith('apply') ? jobId : 'URJA-JOB-01');
    setValidationError('');

    if (chosenMode === 'resume') {
      navigate(`/careers/apply/${targetJobId}/autofillWithResume`);
    } else if (chosenMode === 'manual') {
      // Official Workday Apply Manually route
      navigate(`/careers/apply/${targetJobId}/applyManually`);
    } else if (chosenMode === 'last_app') {
      navigate(`/careers/apply/${targetJobId}/useMyLastApplication`);
    }
  };

  // Resume File Selection & 5 MB Limit Validation
  const handleResumeFileSelect = (file) => {
    setValidationError('');
    if (!file) return;

    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileName = file.name.toLowerCase();
    const isAllowed = allowedExtensions.some((ext) => fileName.endsWith(ext));

    if (!isAllowed) {
      setValidationError('Invalid file format. Please upload a PDF, DOC, or DOCX document.');
      return;
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxSizeBytes) {
      setValidationError('File exceeds the maximum file size limit of 5 MB. Please upload a smaller file.');
      return;
    }

    setResumeFile(file);
  };

  // ==========================================
  // STEP VALIDATION & NAVIGATION
  // ==========================================
  const goToNextStep = (nextStep) => {
    setValidationError('');

    // Validate Step 1: Personal Information
    if (currentStep === 1) {
      if (!firstName.trim()) {
        setValidationError('Please enter your First Name.');
        return;
      }
      if (!lastName.trim()) {
        setValidationError('Please enter your Last Name.');
        return;
      }
      if (!email.trim() || !email.includes('@')) {
        setValidationError('Please enter a valid candidate email address.');
        return;
      }
      if (!phone.trim()) {
        setValidationError('Please provide your Phone Number.');
        return;
      }
      if (!addressLine.trim()) {
        setValidationError('Please enter your Address.');
        return;
      }
      if (!city.trim()) {
        setValidationError('Please enter your City.');
        return;
      }
      if (!state.trim()) {
        setValidationError('Please enter your State.');
        return;
      }
      if (!postalCode.trim()) {
        setValidationError('Please enter your Postal Code.');
        return;
      }
      if (!country.trim()) {
        setValidationError('Please select your Country.');
        return;
      }
    }

    // Validate Step 2: My Experience
    if (currentStep === 2) {
      if (!resumeFile) {
        setValidationError('Please upload your Resume / CV (PDF, DOC, DOCX up to 5 MB) before proceeding.');
        return;
      }
      if (workExperiences.length > 0) {
        for (let i = 0; i < workExperiences.length; i++) {
          const exp = workExperiences[i];
          if (!exp.title.trim()) {
            setValidationError(`Please enter the Job Title for Experience #${i + 1}.`);
            return;
          }
          if (!exp.company.trim()) {
            setValidationError(`Please enter the Company for Experience #${i + 1}.`);
            return;
          }
          if (!exp.startDate.trim()) {
            setValidationError(`Please enter the 'From' date for Experience #${i + 1}.`);
            return;
          }
        }
      }
      if (educationList.length === 0) {
        setValidationError('Please record at least one educational qualification (click "+ Add").');
        return;
      }
      for (let i = 0; i < educationList.length; i++) {
        const edu = educationList[i];
        if (!edu.institution.trim()) {
          setValidationError(`Please enter the School / University for Education #${i + 1}.`);
          return;
        }
        if (!edu.degree.trim()) {
          setValidationError(`Please enter the Degree for Education #${i + 1}.`);
          return;
        }
      }
    }

    // Validate Step 4
    if (currentStep === 4) {
      if (!agreeDeclaration) {
        setValidationError('You must certify and agree to the declaration statement to proceed.');
        return;
      }
      if (!signatureName.trim()) {
        setValidationError('Please enter your full name as your electronic signature.');
        return;
      }
    }

    setCurrentStep(nextStep);
    window.scrollTo(0, 0);
  };

  // Dynamic Add / Remove Work Experience
  const addWorkExperience = () => {
    setWorkExperiences((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: '',
      },
    ]);
  };

  const removeWorkExperience = (id) => {
    setWorkExperiences((prev) => prev.filter((item) => item.id !== id));
  };

  // Dynamic Add / Remove Education
  const addEducation = () => {
    setEducationList((prev) => [
      ...prev,
      {
        id: Date.now(),
        institution: '',
        degree: '',
        fieldOfStudy: '',
      },
    ]);
  };

  const removeEducation = (id) => {
    setEducationList((prev) => prev.filter((item) => item.id !== id));
  };

  // Dynamic Add / Remove Certifications
  const addCertification = () => {
    setCertifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: '',
        certificationNumber: '',
        issuedDate: '',
        expirationDate: '',
        specialties: '',
        attachment: null,
      },
    ]);
  };

  const removeCertification = (id) => {
    setCertifications((prev) => prev.filter((item) => item.id !== id));
  };

  // ==========================================
  // FINAL SUBMISSION HANDLER
  // ==========================================
  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setValidationError('');

    setTimeout(() => {
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
      const receipt = {
        applicationId,
        jobTitle: selectedJob ? selectedJob.title : 'General Position',
        jobDept: selectedJob ? selectedJob.dept : 'General Operations',
        fullName: fullName || 'Candidate',
        email: email.trim(),
        phone: `${countryCode} ${phone.trim()}`,
        location: `${city}, ${state}, ${country}`.trim(),
        resume: resumeFile ? resumeFile.name : (linkedinUrl || 'Submitted via ATS Profile'),
        submittedAt: new Date().toLocaleString(),
      };

      // Save for future "Use My Last Application"
      localStorage.setItem(
        'urja_last_application',
        JSON.stringify({
          firstName,
          middleName,
          lastName,
          email,
          phone,
          countryCode,
          countryIso,
          country,
          addressLine,
          city,
          state,
          postalCode,
        })
      );

      setSubmittedReceipt(receipt);
      setIsSubmitting(false);
      setCurrentStep('confirmation');
      window.scrollTo(0, 0);
    }, 850);
  };

  // ==========================================================================
  // RENDER: APPLICATION CONFIRMATION (Step 'confirmation')
  // ==========================================================================
  if (currentStep === 'confirmation' && submittedReceipt) {
    return (
      <div className="career-portal-view" style={{ padding: '2.5rem 1rem' }}>
        <div className="career-success-card">
          <div className="career-success-icon">
            <CheckCircle2 size={44} color="#173b24" />
          </div>

          <h2>Application Confirmation</h2>
          <p>
            Thank you, <strong>{submittedReceipt.fullName}</strong>. Your official candidate dossier
            for <strong>{submittedReceipt.jobTitle}</strong> has been successfully submitted and
            delivered to Urja Foods Talent Acquisition.
          </p>

          <div className="career-tracking-box">
            <span>Application Reference Tracking ID</span>
            <strong>{submittedReceipt.applicationId}</strong>
          </div>

          {/* Timeline: What Happens Next */}
          <div style={{ textAlign: 'left', margin: '1.5rem auto 2.5rem', maxWidth: '480px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#173b24', marginBottom: '1rem' }}>
              What Happens Next:
            </h4>
            <div className="career-timeline-stepper">
              <div className="career-timeline-item">
                <div className="career-timeline-dot">1</div>
                <div className="career-timeline-content">
                  <h5>Dossier Verification &amp; Auto-Triage</h5>
                  <p>Our ATS validates your qualifications against regional department criteria.</p>
                </div>
              </div>
              <div className="career-timeline-item">
                <div className="career-timeline-dot">2</div>
                <div className="career-timeline-content">
                  <h5>Hiring Manager &amp; HR Review</h5>
                  <p>Qualified candidates are contacted within 48 to 72 business hours.</p>
                </div>
              </div>
              <div className="career-timeline-item">
                <div className="career-timeline-dot">3</div>
                <div className="career-timeline-content">
                  <h5>Interview &amp; Plant Tour</h5>
                  <p>Technical dialogue and assessment at Nirgudsar Complex or regional center.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/careers" className="careers-btn-primary" style={{ padding: '0.85rem 1.8rem' }}>
              <span>View Other Career Opportunities</span>
            </Link>
            <button
              type="button"
              className="careers-btn-secondary"
              onClick={() => window.print()}
              style={{ padding: '0.85rem 1.8rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Printer size={16} />
              <span>Print Application Summary</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: CHOOSE HOW TO APPLY (Step 'choose')
  // ==========================================
  if (currentStep === 'choose') {
    return (
      <div className="career-portal-view" style={{ padding: '2rem 1rem' }}>
        <div className="career-apply-wrapper">
          <div style={{ marginBottom: '1rem' }}>
            <Link
              to="/careers"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: '#173b24',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              <ArrowLeft size={16} />
              <span>Back to Job Listings</span>
            </Link>
          </div>

          {/* Candidate Profile Bar */}
          {candidate && (
            <div className="career-candidate-topbar">
              <div className="career-candidate-info">
                <div className="career-candidate-avatar">
                  {candidate.name ? candidate.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="career-candidate-meta">
                  <h4>Signed in as {candidate.name}</h4>
                  <span>{candidate.email} • Verified Applicant</span>
                </div>
              </div>
              <button type="button" className="career-logout-btn" onClick={handleLogout}>
                Switch Account
              </button>
            </div>
          )}

          {/* Selected Job Header */}
          <div className="career-applying-job-card">
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8c58f' }}>
                Application For
              </span>
              <h3>{selectedJob ? selectedJob.title : 'General Position'}</h3>
              <span className="meta">
                {selectedJob ? `${selectedJob.dept} • ${selectedJob.location}` : 'Urja Foods Complex'}
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '2rem 0 1rem' }}>
            <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
              Choose How to Apply
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Select your preferred method to complete your application with Urja Foods &amp; Agro
            </p>
          </div>

          {isParsingResume && (
            <div
              style={{
                textAlign: 'center',
                background: '#eaf5eb',
                border: '1px solid #cce5ce',
                borderRadius: '16px',
                padding: '2rem',
                margin: '1.5rem 0',
              }}
            >
              <Sparkles size={36} color="#173b24" style={{ margin: '0 auto 0.75rem', animation: 'spin 2s linear infinite' }} />
              <h4 style={{ color: '#173b24', fontWeight: 800 }}>Autofilling from Resume...</h4>
              <p style={{ color: '#2d6a4f', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Extracting candidate contact, education, and work history.
              </p>
            </div>
          )}

          {/* 3 Choose How to Apply Cards (Official Workday Candidate Options) */}
          <div className="career-choose-how-grid">
            {/* 1. Autofill with Resume */}
            <div
              className={`career-choose-card ${applyMode === 'resume' ? 'selected' : ''}`}
              onClick={() => handleSelectMode('resume')}
            >
              <div>
                <div className="career-choose-icon-box">
                  <UploadCloud size={30} />
                </div>
                <h3>Autofill with Resume</h3>
                <p>
                  Upload your resume and allow the system to populate application information.
                </p>
              </div>
              <div>
                <span className="career-choose-badge">⚡ Autofill</span>
              </div>
            </div>

            {/* 2. Apply Manually */}
            <div
              className={`career-choose-card ${applyMode === 'manual' ? 'selected' : ''}`}
              onClick={() => handleSelectMode('manual')}
            >
              <div>
                <div className="career-choose-icon-box">
                  <Edit3 size={30} />
                </div>
                <h3>Apply Manually</h3>
                <p>
                  Enter all application information yourself.
                </p>
              </div>
              <div>
                <span className="career-choose-badge">Step-by-Step Form</span>
              </div>
            </div>

            {/* 3. Use My Last Application */}
            <div
              className={`career-choose-card ${applyMode === 'last_app' ? 'selected' : ''}`}
              onClick={() => handleSelectMode('last_app')}
            >
              <div>
                <div className="career-choose-icon-box">
                  <History size={30} />
                </div>
                <h3>Use My Last Application</h3>
                <p>
                  Reuse information from a previous application.
                </p>
              </div>
              <div>
                <span className="career-choose-badge">Saved Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: WORKDAY-STYLE 5-STEP APPLICATION WIZARD
  // ==========================================================================
  const stepTitles = [
    { num: 1, label: 'Personal Information' },
    { num: 2, label: 'My Experience' },
    { num: 3, label: 'Application Questions' },
    { num: 4, label: 'Voluntary Disclosures' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div className="career-portal-view" style={{ padding: '2rem 1rem' }}>
      <div className="career-apply-wrapper">
        {/* Top Back to Selection Link */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: '#173b24',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
            onClick={() => {
              if (currentStep === 1) setCurrentStep('choose');
              else if (typeof currentStep === 'number') setCurrentStep(currentStep - 1);
            }}
          >
            <ArrowLeft size={16} />
            <span>{currentStep === 1 ? 'Back to Choose Method' : 'Back to Previous Step'}</span>
          </button>
        </div>

        {/* Applying Vacancy Banner */}
        <div className="career-applying-job-card">
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a8c58f' }}>
              Applying For
            </span>
            <h3>{selectedJob ? selectedJob.title : 'General Position'}</h3>
            <span className="meta">
              {selectedJob ? `${selectedJob.dept} • ${selectedJob.location}` : 'Urja Foods Complex'}
            </span>
          </div>

          <div style={{ minWidth: '220px' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#cbd5e1', marginBottom: '0.25rem' }}>
              Change Position:
            </label>
            <select
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '8px',
                background: '#ffffff',
                color: '#0f172a',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
              value={selectedJob ? selectedJob.id : ''}
              onChange={(e) => {
                const found = JOB_OPENINGS.find((j) => j.id === e.target.value);
                if (found) setSelectedJob(found);
              }}
            >
              {JOB_OPENINGS.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="career-stepper-container">
          {stepTitles.map((st, i) => {
            const isCompleted = currentStep > st.num;
            const isActive = currentStep === st.num;
            return (
              <React.Fragment key={st.num}>
                <div
                  className={`career-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    // allow jumping back to completed steps
                    if (isCompleted) setCurrentStep(st.num);
                  }}
                >
                  <div className="career-step-circle">
                    {isCompleted ? '✓' : st.num}
                  </div>
                  <span>{st.label}</span>
                </div>
                {i < stepTitles.length - 1 && <div className="career-step-divider" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="career-login-error" style={{ marginBottom: '1.5rem' }}>
            <AlertCircle size={20} />
            <span>{validationError}</span>
          </div>
        )}

        {/* ==================================================================
            STEP 1: PERSONAL INFORMATION
            ================================================================== */}
        {currentStep === 1 && (
          <div className="career-form-card">
            <div className="career-section-title">
              <span className="step-number">1</span>
              <span>Personal Information</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem', marginTop: '-0.5rem' }}>
              Please enter your legal name and contact details as they appear on official identification documents.
            </p>

            {/* Names row: First Name, Middle Name, Last Name */}
            <div className="career-form-row career-form-row-3">
              <div className="career-form-group">
                <label>First Name <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. Ramesh"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="career-form-group">
                <label>Middle Name</label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. Dnyaneshwar (Optional)"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="career-form-group">
                <label>Last Name <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. Patil"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Contact row: Email & Phone Number with Country Code + Flag */}
            <div className="career-form-row">
              <div className="career-form-group">
                <label>Email <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="email"
                  className="career-input-field"
                  placeholder="ramesh.patil@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="career-form-group">
                <CountryPhoneInput
                  countryCode={countryCode}
                  countryIso={countryIso}
                  phoneNumber={phone}
                  onCountryChange={(selected) => {
                    setCountryCode(selected.dial);
                    setCountryIso(selected.iso);
                    setCountry(selected.name);
                  }}
                  onPhoneChange={(val) => setPhone(val)}
                  required={true}
                />
              </div>
            </div>

            {/* Address row */}
            <div className="career-form-group">
              <label>Address <span style={{ color: '#dc2626' }}>*</span></label>
              <input
                type="text"
                className="career-input-field"
                placeholder="Street address, building name, flat / house number, village or landmark"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                required
              />
            </div>

            {/* Location row: City, State, Postal Code, Country */}
            <div className="career-form-row career-form-row-4">
              <div className="career-form-group">
                <label>City <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. Pune"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="career-form-group">
                <label>State <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. Maharashtra"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>

              <div className="career-form-group">
                <label>Postal Code <span style={{ color: '#dc2626' }}>*</span></label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. 411004"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className="career-form-group">
                <label>Country <span style={{ color: '#dc2626' }}>*</span></label>
                <select
                  className="career-input-field"
                  value={country}
                  onChange={(e) => {
                    const selectedName = e.target.value;
                    setCountry(selectedName);
                    const matched = COUNTRIES.find((c) => c.name === selectedName);
                    if (matched) {
                      setCountryCode(matched.dial);
                      setCountryIso(matched.iso);
                    }
                  }}
                  required
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.name}>
                      {c.name} ({c.dial})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="career-form-group">
              <label>How Did You Hear About Urja Foods &amp; Agro?</label>
              <select
                className="career-input-field"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="Urja Foods Company Website">Urja Foods Company Website</option>
                <option value="Employee / Farmer Referral">Employee / Farmer Referral</option>
                <option value="LinkedIn Job Post">LinkedIn Job Post</option>
                <option value="Agricultural Newspaper / Krishi Exhibition">Agricultural Newspaper / Krishi Exhibition</option>
                <option value="Other Industry Channel">Other Industry Channel</option>
              </select>
            </div>

            <div className="career-wizard-footer">
              <button
                type="button"
                className="career-nav-btn btn-back"
                onClick={() => setCurrentStep('choose')}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <button
                type="button"
                className="career-nav-btn btn-next"
                onClick={() => goToNextStep(2)}
              >
                <span>Save &amp; Continue to My Experience</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            STEP 2: MY EXPERIENCE (Work, Education, Certifications, Resume)
            ================================================================== */}
        {currentStep === 2 && (
          <div>
            {/* 1. Resume Document */}
            <div className="career-form-card">
              <div className="career-section-title">
                <span className="step-number">2.1</span>
                <span>Resume / CV <span style={{ color: '#dc2626' }}>*</span></span>
              </div>

              <div
                className={`career-file-dropzone ${isDragOver ? 'drag-active' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    handleResumeFileSelect(e.dataTransfer.files[0]);
                  }
                }}
              >
                <input
                  type="file"
                  id="resume-file-input"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleResumeFileSelect(e.target.files[0]);
                    }
                  }}
                />
                <UploadCloud size={42} color="#173b24" style={{ margin: '0 auto 0.75rem' }} />
                <div style={{ marginBottom: '0.85rem' }}>
                  <button
                    type="button"
                    className="career-upload-btn-styled"
                    onClick={() => document.getElementById('resume-file-input')?.click()}
                  >
                    <UploadCloud size={16} />
                    <span>Upload Resume</span>
                  </button>
                </div>
                <p style={{ color: '#0f172a', fontWeight: 600, fontSize: '0.92rem', marginBottom: '0.25rem' }}>
                  PDF, DOC, DOCX
                </p>
                <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
                  Maximum file size: 5 MB
                </p>
              </div>

              {resumeFile && (
                <div className="career-uploaded-file-chip">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FileText size={22} color="#173b24" />
                    <div>
                      <span style={{ display: 'block', fontWeight: 700, color: '#173b24', fontSize: '0.92rem' }}>
                        {resumeFile.name}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Uploaded &amp; Verified
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#dc2626',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                    onClick={() => setResumeFile(null)}
                  >
                    Remove
                  </button>
                </div>
              )}

              <div style={{ marginTop: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#475569', marginBottom: '0.35rem' }}>
                  LinkedIn / Digital Portfolio URL (Optional)
                </label>
                <input
                  type="url"
                  className="career-input-field"
                  placeholder="https://linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>
            </div>

            {/* 2. Work Experience */}
            <div className="career-form-card">
              <div className="career-section-header-row">
                <div className="career-section-title" style={{ margin: 0 }}>
                  <span className="step-number">2.2</span>
                  <span>Work Experience</span>
                </div>
                <button
                  type="button"
                  className="career-add-btn-primary"
                  onClick={addWorkExperience}
                  title="Add work experience"
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              </div>

              {workExperiences.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1rem',
                    background: '#f8fafc',
                    borderRadius: '14px',
                    border: '1.5px dashed #cbd5e1',
                    marginBottom: '1rem',
                  }}
                >
                  <Briefcase size={36} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ color: '#334155', fontWeight: 700, marginBottom: '0.35rem' }}>
                    No Work Experience Added Yet
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                    Click "+ Add" to record your previous jobs, internships, or agricultural experience.
                  </p>
                  <button
                    type="button"
                    className="career-add-btn-primary"
                    onClick={addWorkExperience}
                  >
                    <Plus size={16} />
                    <span>+ Add</span>
                  </button>
                </div>
              ) : (
                workExperiences.map((exp, index) => (
                  <div className="career-repeatable-block" key={exp.id}>
                    <div className="career-repeatable-header">
                      <h4>Experience #{index + 1}</h4>
                      {workExperiences.length > 1 && (
                        <button
                          type="button"
                          className="career-remove-entry-btn"
                          onClick={() => removeWorkExperience(exp.id)}
                        >
                          <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    {/* Job Title & Company */}
                    <div className="career-form-row">
                      <div className="career-form-group">
                        <label>Job Title <span style={{ color: '#dc2626' }}>*</span></label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="e.g. Technical Supervisor / Feed Mill Operator"
                          value={exp.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setWorkExperiences((prev) =>
                              prev.map((item) => (item.id === exp.id ? { ...item, title: val } : item))
                            );
                          }}
                          required
                        />
                      </div>

                      <div className="career-form-group">
                        <label>Company <span style={{ color: '#dc2626' }}>*</span></label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="e.g. Western Agro Broilers / Urja Agro"
                          value={exp.company}
                          onChange={(e) => {
                            const val = e.target.value;
                            setWorkExperiences((prev) =>
                              prev.map((item) => (item.id === exp.id ? { ...item, company: val } : item))
                            );
                          }}
                          required
                        />
                      </div>
                    </div>

                    {/* Location */}
                    <div className="career-form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        className="career-input-field"
                        placeholder="e.g. Pune, Maharashtra / Sangamner"
                        value={exp.location}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWorkExperiences((prev) =>
                            prev.map((item) => (item.id === exp.id ? { ...item, location: val } : item))
                          );
                        }}
                      />
                    </div>

                    {/* Checkbox: I currently work here */}
                    <div className="career-form-group" style={{ margin: '0.75rem 0 1rem' }}>
                      <label className="career-checkbox-label">
                        <input
                          type="checkbox"
                          className="career-checkbox-input"
                          checked={Boolean(exp.currentlyWorking)}
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setWorkExperiences((prev) =>
                              prev.map((item) =>
                                item.id === exp.id
                                  ? {
                                      ...item,
                                      currentlyWorking: isChecked,
                                      endDate: isChecked ? 'Present' : (item.endDate === 'Present' ? '' : item.endDate),
                                    }
                                  : item
                              )
                            );
                          }}
                        />
                        <span>I currently work here</span>
                      </label>
                    </div>

                    {/* From & To */}
                    <div className="career-form-row">
                      <div className="career-form-group">
                        <label>From <span style={{ color: '#dc2626' }}>*</span></label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="MM/YYYY (e.g. 01/2023)"
                          value={exp.startDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            setWorkExperiences((prev) =>
                              prev.map((item) => (item.id === exp.id ? { ...item, startDate: val } : item))
                            );
                          }}
                          required
                        />
                      </div>

                      <div className="career-form-group">
                        <label>To</label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder={exp.currentlyWorking ? 'Present' : 'MM/YYYY (e.g. 12/2024)'}
                          value={exp.currentlyWorking ? 'Present' : exp.endDate}
                          disabled={Boolean(exp.currentlyWorking)}
                          style={exp.currentlyWorking ? { background: '#f8fafc', color: '#156b37', fontWeight: 600 } : {}}
                          onChange={(e) => {
                            const val = e.target.value;
                            setWorkExperiences((prev) =>
                              prev.map((item) => (item.id === exp.id ? { ...item, endDate: val } : item))
                            );
                          }}
                        />
                      </div>
                    </div>

                    {/* Role Description */}
                    <div className="career-form-group">
                      <label>Role Description</label>
                      <textarea
                        className="career-input-field"
                        rows={3}
                        placeholder="Describe your key responsibilities, farm network supervision, feed formulations, flock monitoring, or technical accomplishments..."
                        value={exp.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setWorkExperiences((prev) =>
                            prev.map((item) => (item.id === exp.id ? { ...item, description: val } : item))
                          );
                        }}
                      />
                    </div>
                  </div>
                ))
              )}

              {workExperiences.length > 0 && (
                <button
                  type="button"
                  className="career-add-more-btn"
                  onClick={addWorkExperience}
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              )}
            </div>

            {/* 3. Education */}
            <div className="career-form-card">
              <div className="career-section-header-row">
                <div className="career-section-title" style={{ margin: 0 }}>
                  <span className="step-number">2.3</span>
                  <span>Education</span>
                </div>
                <button
                  type="button"
                  className="career-add-btn-primary"
                  onClick={addEducation}
                  title="Add education qualification"
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              </div>

              {educationList.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1rem',
                    background: '#f8fafc',
                    borderRadius: '14px',
                    border: '1.5px dashed #cbd5e1',
                    marginBottom: '1rem',
                  }}
                >
                  <GraduationCap size={36} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ color: '#334155', fontWeight: 700, marginBottom: '0.35rem' }}>
                    No Education Added Yet
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                    Click "+ Add" to record your school, college, or university qualifications.
                  </p>
                  <button
                    type="button"
                    className="career-add-btn-primary"
                    onClick={addEducation}
                  >
                    <Plus size={16} />
                    <span>+ Add</span>
                  </button>
                </div>
              ) : (
                educationList.map((edu, index) => (
                  <div className="career-repeatable-block" key={edu.id}>
                    <div className="career-repeatable-header">
                      <h4>Education #{index + 1}</h4>
                      {educationList.length > 1 && (
                        <button
                          type="button"
                          className="career-remove-entry-btn"
                          onClick={() => removeEducation(edu.id)}
                        >
                          <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    {/* School / University */}
                    <div className="career-form-group">
                      <label>School / University <span style={{ color: '#dc2626' }}>*</span></label>
                      <input
                        type="text"
                        className="career-input-field"
                        placeholder="e.g. Mahatma Phule Krishi Vidyapeeth (MPKV) / Savitribai Phule Pune University"
                        value={edu.institution}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEducationList((prev) =>
                            prev.map((item) => (item.id === edu.id ? { ...item, institution: val } : item))
                          );
                        }}
                        required
                      />
                    </div>

                    <div className="career-form-row">
                      {/* Degree */}
                      <div className="career-form-group">
                        <label>Degree <span style={{ color: '#dc2626' }}>*</span></label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="e.g. B.Sc Agriculture / Diploma in Veterinary Science / Higher Secondary"
                          value={edu.degree}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEducationList((prev) =>
                              prev.map((item) => (item.id === edu.id ? { ...item, degree: val } : item))
                            );
                          }}
                          required
                        />
                      </div>

                      {/* Field of Study */}
                      <div className="career-form-group">
                        <label>Field of Study</label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="e.g. Agricultural Sciences, Animal Husbandry, Chemistry, Feed Tech"
                          value={edu.fieldOfStudy}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEducationList((prev) =>
                              prev.map((item) => (item.id === edu.id ? { ...item, fieldOfStudy: val } : item))
                            );
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              )}

              {educationList.length > 0 && (
                <button
                  type="button"
                  className="career-add-more-btn"
                  onClick={addEducation}
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              )}
            </div>

            {/* 4. Certifications */}
            <div className="career-form-card">
              <div className="career-section-header-row">
                <div className="career-section-title" style={{ margin: 0 }}>
                  <span className="step-number">2.4</span>
                  <span>Certifications</span>
                </div>
                <button
                  type="button"
                  className="career-add-btn-primary"
                  onClick={addCertification}
                  title="Add certification"
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              </div>

              {certifications.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '2.5rem 1rem',
                    background: '#f8fafc',
                    borderRadius: '14px',
                    border: '1.5px dashed #cbd5e1',
                    marginBottom: '1rem',
                  }}
                >
                  <Award size={36} color="#94a3b8" style={{ margin: '0 auto 0.75rem' }} />
                  <h4 style={{ color: '#334155', fontWeight: 700, marginBottom: '0.35rem' }}>
                    No Certifications Added Yet
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
                    Click "+ Add" to record professional licenses, quality certifications, or safety credentials.
                  </p>
                  <button
                    type="button"
                    className="career-add-btn-primary"
                    onClick={addCertification}
                  >
                    <Plus size={16} />
                    <span>+ Add</span>
                  </button>
                </div>
              ) : (
                certifications.map((cert, index) => (
                  <div className="career-repeatable-block" key={cert.id}>
                    <div className="career-repeatable-header">
                      <h4>Certification #{index + 1}</h4>
                      {certifications.length > 1 && (
                        <button
                          type="button"
                          className="career-remove-entry-btn"
                          onClick={() => removeCertification(cert.id)}
                        >
                          <Trash2 size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    {/* Certification Name */}
                    <div className="career-form-group">
                      <label>Certification <span style={{ color: '#dc2626' }}>*</span></label>
                      <input
                        type="text"
                        className="career-input-field"
                        placeholder="e.g. HACCP & Feed Biosecurity Protocol Level-2 / FSSAI Food Safety"
                        value={cert.name}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCertifications((prev) =>
                            prev.map((item) => (item.id === cert.id ? { ...item, name: val } : item))
                          );
                        }}
                        required
                      />
                    </div>

                    {/* Certification Number & Specialties */}
                    <div className="career-form-row">
                      <div className="career-form-group">
                        <label>Certification Number</label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="e.g. FSSAI-2023-QC-8849"
                          value={cert.certificationNumber || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertifications((prev) =>
                              prev.map((item) => (item.id === cert.id ? { ...item, certificationNumber: val } : item))
                            );
                          }}
                        />
                      </div>

                      <div className="career-form-group">
                        <label>Specialties</label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="e.g. Feed Biosecurity, HACCP, Poultry Nutrition"
                          value={cert.specialties || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertifications((prev) =>
                              prev.map((item) => (item.id === cert.id ? { ...item, specialties: val } : item))
                            );
                          }}
                        />
                      </div>
                    </div>

                    {/* Issued Date & Expiration Date */}
                    <div className="career-form-row">
                      <div className="career-form-group">
                        <label>Issued Date</label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="MM/YYYY (e.g. 03/2023)"
                          value={cert.issuedDate || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertifications((prev) =>
                              prev.map((item) => (item.id === cert.id ? { ...item, issuedDate: val } : item))
                            );
                          }}
                        />
                      </div>

                      <div className="career-form-group">
                        <label>Expiration Date</label>
                        <input
                          type="text"
                          className="career-input-field"
                          placeholder="MM/YYYY or Lifetime / No Expiration"
                          value={cert.expirationDate || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertifications((prev) =>
                              prev.map((item) => (item.id === cert.id ? { ...item, expirationDate: val } : item))
                            );
                          }}
                        />
                      </div>
                    </div>

                    {/* Attachments */}
                    <div className="career-form-group">
                      <label>Attachments</label>
                      {cert.attachment ? (
                        <div className="career-uploaded-file-chip" style={{ marginTop: '0.25rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={18} color="#173b24" />
                            <span style={{ fontSize: '0.88rem' }}>{cert.attachment.name}</span>
                          </div>
                          <button
                            type="button"
                            style={{
                              background: 'transparent',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer',
                              fontWeight: 600,
                              fontSize: '0.82rem',
                            }}
                            onClick={() => {
                              setCertifications((prev) =>
                                prev.map((item) =>
                                  item.id === cert.id ? { ...item, attachment: null } : item
                                )
                              );
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{
                            border: '1.5px dashed #cbd5e1',
                            borderRadius: '10px',
                            padding: '1rem',
                            textAlign: 'center',
                            background: '#ffffff',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'border-color 0.2s ease',
                          }}
                        >
                          <input
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              opacity: 0,
                              cursor: 'pointer',
                              width: '100%',
                              height: '100%',
                            }}
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                const file = e.target.files[0];
                                setCertifications((prev) =>
                                  prev.map((item) =>
                                    item.id === cert.id
                                      ? { ...item, attachment: { name: file.name, size: file.size } }
                                      : item
                                  )
                                );
                              }
                            }}
                          />
                          <UploadCloud size={24} color="#173b24" style={{ margin: '0 auto 0.25rem' }} />
                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#173b24' }}>
                            Upload Certificate Attachment
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            PDF, JPG, PNG or DOCX (Max 10MB)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}

              {certifications.length > 0 && (
                <button
                  type="button"
                  className="career-add-more-btn"
                  onClick={addCertification}
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              )}
            </div>

            <div className="career-wizard-footer">
              <button
                type="button"
                className="career-nav-btn btn-back"
                onClick={() => setCurrentStep(1)}
              >
                <ArrowLeft size={16} />
                <span>Back to My Information</span>
              </button>
              <button
                type="button"
                className="career-nav-btn btn-next"
                onClick={() => goToNextStep(3)}
              >
                <span>Save &amp; Continue to Application Questions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            STEP 3: APPLICATION QUESTIONS
            ================================================================== */}
        {currentStep === 3 && (
          <div className="career-form-card">
            <div className="career-section-title">
              <span className="step-number">3</span>
              <span>Application Questions</span>
            </div>

            <div className="career-form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                1. Are you legally authorized to work in India? *
              </label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="workAuth"
                    value="Yes"
                    checked={workAuth === 'Yes'}
                    onChange={(e) => setWorkAuth(e.target.value)}
                  />
                  <span>Yes</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="workAuth"
                    value="No"
                    checked={workAuth === 'No'}
                    onChange={(e) => setWorkAuth(e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="career-form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a' }}>
                2. Do you possess a valid driving license for regional travel in Maharashtra? *
              </label>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="drivingLicense"
                    value="Yes"
                    checked={drivingLicense === 'Yes'}
                    onChange={(e) => setDrivingLicense(e.target.value)}
                  />
                  <span>Yes, Two-Wheeler / Four-Wheeler</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="drivingLicense"
                    value="No"
                    checked={drivingLicense === 'No'}
                    onChange={(e) => setDrivingLicense(e.target.value)}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>

            <div className="career-form-row">
              <div className="career-form-group">
                <label>3. Notice period or earliest available joining date? *</label>
                <select
                  className="career-input-field"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
                >
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="30 Days">30 Days</option>
                  <option value="45 Days">45 Days</option>
                  <option value="60 Days">60 Days</option>
                </select>
              </div>

              <div className="career-form-group">
                <label>4. Willingness to travel regionally across Western Maharashtra?</label>
                <select
                  className="career-input-field"
                  value={willingToRelocate}
                  onChange={(e) => setWillingToRelocate(e.target.value)}
                >
                  <option value="Yes">Yes, willing to travel</option>
                  <option value="Open to discussion">Open to discussion</option>
                  <option value="Only Plant / Office based">Only Plant / Office based</option>
                </select>
              </div>
            </div>

            <div className="career-form-row">
              <div className="career-form-group">
                <label>5. Current Annual CTC (₹ Lakhs)</label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. ₹3.5 Lakhs"
                  value={currentCtc}
                  onChange={(e) => setCurrentCtc(e.target.value)}
                />
              </div>

              <div className="career-form-group">
                <label>6. Expected Annual CTC (₹ Lakhs)</label>
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="e.g. ₹4.5 Lakhs"
                  value={expectedCtc}
                  onChange={(e) => setExpectedCtc(e.target.value)}
                />
              </div>
            </div>

            <div className="career-wizard-footer">
              <button
                type="button"
                className="career-nav-btn btn-back"
                onClick={() => setCurrentStep(2)}
              >
                <ArrowLeft size={16} />
                <span>Back to My Experience</span>
              </button>
              <button
                type="button"
                className="career-nav-btn btn-next"
                onClick={() => goToNextStep(4)}
              >
                <span>Save &amp; Continue to Voluntary Disclosures</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            STEP 4: VOLUNTARY DISCLOSURES
            ================================================================== */}
        {currentStep === 4 && (
          <div className="career-form-card">
            <div className="career-section-title">
              <span className="step-number">4</span>
              <span>Voluntary Disclosures &amp; Declarations</span>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.25rem',
                marginBottom: '1.75rem',
                fontSize: '0.9rem',
                color: '#475569',
                lineHeight: 1.6,
              }}
            >
              <strong>Equal Opportunity Agribusiness Employer:</strong> Urja Foods &amp; Agro
              Industries Pvt. Ltd. is committed to fostering an inclusive, fair workplace for all
              agricultural professionals, veterinarians, technicians, and factory specialists regardless
              of race, religion, gender, or regional background.
            </div>

            <div className="career-form-row">
              <div className="career-form-group">
                <label>Gender Identity</label>
                <select
                  className="career-input-field"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="career-form-group">
                <label>Farming Family Background</label>
                <select
                  className="career-input-field"
                  value={farmingFamily}
                  onChange={(e) => setFarmingFamily(e.target.value)}
                >
                  <option value="Yes, active commercial farming family">Yes, active commercial farming family</option>
                  <option value="Yes, dairy or poultry rearing background">Yes, dairy or poultry rearing background</option>
                  <option value="No, agricultural interest only">No, agricultural interest only</option>
                  <option value="Prefer not to disclose">Prefer not to disclose</option>
                </select>
              </div>
            </div>

            {/* Mandatory Declaration Checkbox */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                background: '#fdfbf7',
                border: '1px solid #f6e0b5',
                borderRadius: '12px',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  style={{ marginTop: '0.25rem', width: '18px', height: '18px' }}
                  checked={agreeDeclaration}
                  onChange={(e) => setAgreeDeclaration(e.target.checked)}
                />
                <span style={{ fontSize: '0.9rem', color: '#1e293b', lineHeight: 1.5 }}>
                  <strong>Applicant Statement &amp; Consent:</strong> I certify that all information
                  contained in this job application is true, complete, and verifiable. I authorize Urja
                  Foods &amp; Agro to verify academic credentials, reference details, and previous employment
                  records in accordance with corporate hiring guidelines.
                </span>
              </label>
            </div>

            <div className="career-form-group" style={{ marginTop: '1.5rem' }}>
              <label>Applicant Electronic Signature (Enter Full Legal Name) *</label>
              <input
                type="text"
                className="career-input-field"
                placeholder="e.g. Ramesh Mohan Patil"
                value={signatureName}
                onChange={(e) => setSignatureName(e.target.value)}
                required
              />
            </div>

            <div className="career-wizard-footer">
              <button
                type="button"
                className="career-nav-btn btn-back"
                onClick={() => setCurrentStep(3)}
              >
                <ArrowLeft size={16} />
                <span>Back to Questions</span>
              </button>
              <button
                type="button"
                className="career-nav-btn btn-next"
                onClick={() => goToNextStep(5)}
              >
                <span>Save &amp; Continue to Review</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            STEP 5: REVIEW
            ================================================================== */}
        {currentStep === 5 && (
          <div className="career-form-card">
            <div className="career-section-title">
              <span className="step-number">5</span>
              <span>Review Your Application</span>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Please review your candidate dossier before final submission. Click "Edit" on any section
              if you need to make changes.
            </p>

            {/* 1. Review Personal Information */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>1. Personal Information</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => setCurrentStep(1)}
                >
                  Edit Information
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Full Legal Name:</span>
                <span className="val">{[firstName, middleName, lastName].filter(Boolean).join(' ')}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Email Address:</span>
                <span className="val">{email}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Phone Number:</span>
                <span className="val">{countryCode} {phone}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Address:</span>
                <span className="val">{addressLine}</span>
              </div>
              <div className="career-review-row">
                <span className="label">City, State &amp; Postal Code:</span>
                <span className="val">{city}, {state} - {postalCode}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Country:</span>
                <span className="val">{country}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Application Source:</span>
                <span className="val">{source}</span>
              </div>
            </div>

            {/* 2. Review My Experience */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>2. My Experience &amp; Documents</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  Edit Experience
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Resume / CV:</span>
                <span className="val">{resumeFile ? resumeFile.name : (linkedinUrl || 'Not Attached')}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Work Experiences:</span>
                <span className="val">
                  {workExperiences.map((w) => `${w.title} at ${w.company} (${w.startDate} - ${w.endDate})`).join('; ')}
                </span>
              </div>
              <div className="career-review-row">
                <span className="label">Education:</span>
                <span className="val">
                  {educationList.map((e) => `${e.degree} - ${e.institution}${e.fieldOfStudy ? ` (${e.fieldOfStudy})` : ''}`).join('; ')}
                </span>
              </div>
              <div className="career-review-row">
                <span className="label">Certifications:</span>
                <div style={{ flex: 1 }}>
                  {certifications.length === 0 ? (
                    <span className="val" style={{ color: '#94a3b8' }}>None Listed</span>
                  ) : (
                    certifications.map((c, idx) => (
                      <div key={c.id || idx} style={{ marginBottom: idx < certifications.length - 1 ? '0.75rem' : 0, paddingBottom: idx < certifications.length - 1 ? '0.75rem' : 0, borderBottom: idx < certifications.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>
                          {c.name || 'Untitled Certification'} {c.certificationNumber ? `(#${c.certificationNumber})` : ''}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          {c.issuedDate ? `Issued: ${c.issuedDate}` : ''}{c.expirationDate ? ` • Expires: ${c.expirationDate}` : ''}
                          {c.specialties ? ` • Specialties: ${c.specialties}` : ''}
                        </div>
                        {c.attachment && (
                          <div style={{ fontSize: '0.82rem', color: '#173b24', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <FileText size={14} />
                            <span>Attachment: {c.attachment.name}</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* 3. Review Application Questions */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>3. Application Questions</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => setCurrentStep(3)}
                >
                  Edit Answers
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Work Authorization:</span>
                <span className="val">{workAuth}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Driving License:</span>
                <span className="val">{drivingLicense}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Notice Period:</span>
                <span className="val">{noticePeriod}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Current / Expected CTC:</span>
                <span className="val">{currentCtc} / {expectedCtc}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Regional Travel:</span>
                <span className="val">{willingToRelocate}</span>
              </div>
            </div>

            {/* 4. Review Disclosures */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>4. Disclosures &amp; Consent</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => setCurrentStep(4)}
                >
                  Edit Disclosures
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Gender Identity:</span>
                <span className="val">{gender}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Farming Family:</span>
                <span className="val">{farmingFamily}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Electronic Signature:</span>
                <span className="val">{signatureName} (Consent Verified ✓)</span>
              </div>
            </div>

            {/* Submit Application Button */}
            <div className="career-wizard-footer" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <button
                type="button"
                className="career-nav-btn btn-back"
                onClick={() => setCurrentStep(4)}
              >
                <ArrowLeft size={16} />
                <span>Back to Disclosures</span>
              </button>
              <button
                type="button"
                className="career-submit-btn"
                style={{ maxWidth: '320px', padding: '1rem 1.5rem' }}
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>SUBMIT APPLICATION</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
