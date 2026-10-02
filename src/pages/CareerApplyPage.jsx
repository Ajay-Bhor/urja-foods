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
  const [showViewModal, setShowViewModal] = useState(false);

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
  // Document Upload & Websites
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [customWebsites, setCustomWebsites] = useState([]);
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

  // Skills Entries
  const [skills, setSkills] = useState([
    'Agricultural Operations',
    'Food Quality Assurance & HACCP',
    'Supply Chain & Distribution',
    'Inventory Management',
  ]);
  const [skillInput, setSkillInput] = useState('');

  // Step 3: APPLICATION QUESTIONS
  const [workAuth, setWorkAuth] = useState('Yes');
  const [currentlyWorkingForUrja, setCurrentlyWorkingForUrja] = useState('No');
  const [previouslyWorkedForUrja, setPreviouslyWorkedForUrja] = useState('No');
  const [willingToRelocate, setWillingToRelocate] = useState('Yes');

  // Step 4: VOLUNTARY DISCLOSURES
  const [gender, setGender] = useState('Prefer not to say');
  const [veteranStatus, setVeteranStatus] = useState('I am not a protected veteran');
  const [disabilityStatus, setDisabilityStatus] = useState('No, I do not have a disability');
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
          if (prev.linkedinUrl) setLinkedinUrl(prev.linkedinUrl);
          if (prev.githubUrl) setGithubUrl(prev.githubUrl);
          if (prev.portfolioUrl) setPortfolioUrl(prev.portfolioUrl);
          if (prev.customWebsites) setCustomWebsites(prev.customWebsites);
          if (prev.workAuth) setWorkAuth(prev.workAuth);
          if (prev.currentlyWorkingForUrja) setCurrentlyWorkingForUrja(prev.currentlyWorkingForUrja);
          if (prev.previouslyWorkedForUrja) setPreviouslyWorkedForUrja(prev.previouslyWorkedForUrja);
          if (prev.willingToRelocate) setWillingToRelocate(prev.willingToRelocate);
          if (prev.gender) setGender(prev.gender);
          if (prev.veteranStatus) setVeteranStatus(prev.veteranStatus);
          if (prev.disabilityStatus) setDisabilityStatus(prev.disabilityStatus);
          if (prev.agreeDeclaration) setAgreeDeclaration(prev.agreeDeclaration);
          if (prev.skills && Array.isArray(prev.skills)) setSkills(prev.skills);
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
        setValidationError('Please agree to the terms and conditions to proceed.');
        return;
      }
      if (!signatureName.trim()) {
        const full = [firstName, middleName, lastName].filter(Boolean).join(' ');
        setSignatureName(full || 'Applicant Signature');
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

  // Dynamic Add / Remove Websites
  const addWebsite = () => {
    setCustomWebsites((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: 'Other Website',
        url: '',
      },
    ]);
  };

  const removeWebsite = (id) => {
    setCustomWebsites((prev) => prev.filter((item) => item.id !== id));
  };

  // Dynamic Add / Remove Skills
  const addSkill = (name) => {
    const s = (name || skillInput).trim();
    if (s && !skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
      setSkillInput('');
    }
  };

  const removeSkill = (name) => {
    setSkills((prev) => prev.filter((s) => s !== name));
  };

  // ==========================================
  // FINAL SUBMISSION HANDLER
  // ==========================================
  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    setValidationError('');

    setTimeout(() => {
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
      const generatedAppId = `UF-${Math.floor(10000000 + Math.random() * 90000000)}`;
      const receipt = {
        applicationId: generatedAppId,
        jobTitle: selectedJob ? selectedJob.title : 'General Position',
        jobDept: selectedJob ? selectedJob.dept : 'General Operations',
        fullName: fullName || 'Candidate',
        email: email.trim(),
        phone: `${countryCode} ${phone.trim()}`,
        location: `${city}, ${state}, ${country}`.trim(),
        resume: resumeFile ? resumeFile.name : (linkedinUrl || 'Submitted via ATS Profile'),
        submittedAt: new Date().toLocaleDateString(),
        status: 'Application Submitted',
        stage: 1,
        details: {
          firstName,
          middleName,
          lastName,
          email,
          phone,
          countryCode,
          country,
          addressLine,
          city,
          state,
          postalCode,
          workExperiences,
          educationList,
          certifications,
          skills,
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          customWebsites,
          workAuth,
          currentlyWorkingForUrja,
          previouslyWorkedForUrja,
          willingToRelocate,
          gender,
          veteranStatus,
          disabilityStatus,
          agreeDeclaration,
        },
      };

      // Ensure candidate user profile exists in localStorage
      const existingUser = localStorage.getItem('urja_candidate_user');
      if (!existingUser) {
        localStorage.setItem(
          'urja_candidate_user',
          JSON.stringify({
            name: fullName || 'Candidate',
            email: email.trim() || 'candidate@urjafoods.com',
            authMethod: 'External Applicant',
            loggedInAt: new Date().toISOString(),
          })
        );
      }

      // Save to urja_submitted_applications array for Candidate Dashboard
      try {
        const storedApps = JSON.parse(localStorage.getItem('urja_submitted_applications') || '[]');
        const updatedApps = [receipt, ...storedApps.filter((a) => a.applicationId !== receipt.applicationId)];
        localStorage.setItem('urja_submitted_applications', JSON.stringify(updatedApps));
      } catch (e) {
        console.error('Failed to update urja_submitted_applications', e);
      }

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
          linkedinUrl,
          githubUrl,
          portfolioUrl,
          customWebsites,
          workAuth,
          currentlyWorkingForUrja,
          previouslyWorkedForUrja,
          willingToRelocate,
          gender,
          veteranStatus,
          disabilityStatus,
          agreeDeclaration,
          skills,
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
      <div className="career-portal-view" style={{ padding: '3.5rem 1rem' }}>
        <div className="career-success-card" style={{ maxWidth: '640px' }}>
          <div className="career-success-icon" style={{ marginBottom: '1.25rem' }}>
            <CheckCircle2 size={46} color="#173b24" />
          </div>

          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>
            ✓ Application Submitted
          </h2>

          <p style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 600, marginBottom: '0.4rem', lineHeight: 1.5 }}>
            Thank you for applying to Urja Foods.
          </p>

          <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.5 }}>
            Your application has been successfully submitted.
          </p>

          <div
            className="career-tracking-box"
            style={{
              background: '#f8fafc',
              border: '1px dashed #cbd5e1',
              borderRadius: '12px',
              padding: '1.1rem 2.25rem',
              marginBottom: '2.25rem',
              display: 'inline-block',
            }}
          >
            <span style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.35rem' }}>
              Application ID
            </span>
            <strong style={{ fontSize: '1.5rem', color: '#173b24', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              {submittedReceipt.applicationId}
            </strong>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="careers-btn-secondary"
              onClick={() => setShowViewModal(true)}
              style={{ padding: '0.85rem 1.65rem', fontSize: '0.95rem', fontWeight: 700 }}
            >
              View Application
            </button>
            <Link
              to="/careers/dashboard"
              className="careers-btn-primary"
              style={{
                padding: '0.85rem 1.65rem',
                fontSize: '0.95rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <span>Candidate Dashboard</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/careers"
              className="careers-btn-secondary"
              style={{ padding: '0.85rem 1.65rem', fontSize: '0.95rem', fontWeight: 700, textDecoration: 'none' }}
            >
              Back to Careers
            </Link>
          </div>
        </div>

        {/* View Application Dossier Modal */}
        {showViewModal && (
          <div className="careers-modal-overlay" onClick={() => setShowViewModal(false)}>
            <div
              className="careers-modal-box"
              style={{ maxWidth: '780px', maxHeight: '90vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="careers-modal-header">
                <div>
                  <div style={{ fontSize: '0.82rem', color: '#173b24', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Application ID: {submittedReceipt.applicationId}
                  </div>
                  <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.3rem', color: '#0f172a' }}>
                    {submittedReceipt.jobTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  className="careers-modal-close"
                  onClick={() => setShowViewModal(false)}
                >
                  ✕
                </button>
              </div>

              <div className="careers-modal-body" style={{ maxHeight: '65vh', overflowY: 'auto' }}>
                {/* 1. Personal Information */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Personal Information
                  </h4>
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#334155' }}>
                    <div><strong>Name:</strong> {[firstName, middleName, lastName].filter(Boolean).join(' ')}</div>
                    <div><strong>Email:</strong> {email}</div>
                    <div><strong>Phone:</strong> {countryCode} {phone}</div>
                    <div><strong>Address:</strong> {[addressLine, city, state, postalCode, country].filter(Boolean).join(', ')}</div>
                  </div>
                </div>

                {/* 2. Experience */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Experience
                  </h4>
                  {workExperiences.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>None Listed</p>
                  ) : (
                    workExperiences.map((w, idx) => (
                      <div key={idx} style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        <strong>{w.title}</strong> at {w.company} ({w.startDate} - {w.currentlyWorking ? 'Present' : (w.endDate || 'Present')})
                        {w.description && <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{w.description}</div>}
                      </div>
                    ))
                  )}
                </div>

                {/* 3. Education */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Education
                  </h4>
                  {educationList.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>None Listed</p>
                  ) : (
                    educationList.map((e, idx) => (
                      <div key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                        <strong>{e.degree}</strong> — {e.institution} {e.fieldOfStudy ? `(${e.fieldOfStudy})` : ''}
                      </div>
                    ))
                  )}
                </div>

                {/* 4. Certifications */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Certifications
                  </h4>
                  {certifications.length === 0 ? (
                    <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>None Listed</p>
                  ) : (
                    certifications.map((c, idx) => (
                      <div key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                        <strong>{c.name}</strong> {c.certificationNumber ? `(#${c.certificationNumber})` : ''}
                        <span style={{ color: '#64748b', fontSize: '0.82rem' }}>
                          {c.issuedDate ? ` • Issued: ${c.issuedDate}` : ''}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* 5. Skills */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Skills
                  </h4>
                  <div className="career-skills-container">
                    {skills.map((s) => (
                      <span key={s} className="career-skill-chip career-skill-chip-review">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 6. Resume */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Resume
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                    {resumeFile ? `${resumeFile.name} (${(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)` : 'Not Attached'}
                  </div>
                </div>

                {/* 7. Application Questions */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Application Questions
                  </h4>
                  <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155' }}>
                    <div>• Legally authorized to work in this country: <strong>{workAuth}</strong></div>
                    <div>• Currently working for Urja Foods: <strong>{currentlyWorkingForUrja}</strong></div>
                    <div>• Previously worked for Urja Foods: <strong>{previouslyWorkedForUrja}</strong></div>
                    <div>• Willing to relocate: <strong>{willingToRelocate}</strong></div>
                  </div>
                </div>

                {/* 8. Voluntary Disclosures */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#173b24', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem', marginBottom: '0.6rem' }}>
                    Voluntary Disclosures
                  </h4>
                  <div style={{ fontSize: '0.88rem', lineHeight: 1.6, color: '#334155' }}>
                    <div>• Gender: {gender}</div>
                    <div>• Veteran Status: {veteranStatus}</div>
                    <div>• Disability Status: {disabilityStatus}</div>
                    <div>• Terms &amp; Conditions: <strong>{agreeDeclaration ? 'Agreed & Accepted ✓' : 'Pending'}</strong></div>
                  </div>
                </div>
              </div>

              <div className="careers-modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  type="button"
                  className="careers-btn-secondary"
                  onClick={() => window.print()}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <Printer size={15} />
                  <span>Print Dossier</span>
                </button>
                <button
                  type="button"
                  className="careers-btn-primary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
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

            {/* Skills */}
            <div className="career-form-card">
              <div className="career-section-header-row">
                <div className="career-section-title" style={{ margin: 0 }}>
                  <span className="step-number">2.5</span>
                  <span>Skills</span>
                </div>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.88rem', margin: '0.4rem 0 1rem' }}>
                Add technical skills, agribusiness competencies, and certifications relevant to your experience.
              </p>
              <div className="career-skills-container">
                {skills.map((skill) => (
                  <span key={skill} className="career-skill-chip">
                    <span>{skill}</span>
                    <button
                      type="button"
                      className="career-skill-remove-btn"
                      onClick={() => removeSkill(skill)}
                      title={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="career-skill-add-row">
                <input
                  type="text"
                  className="career-input-field"
                  placeholder="Enter a skill (e.g. Agronomy, Cold Storage, HACCP)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  style={{ maxWidth: '360px' }}
                />
                <button
                  type="button"
                  className="career-add-btn-primary"
                  onClick={() => addSkill()}
                >
                  <Plus size={16} />
                  <span>+ Add</span>
                </button>
              </div>
            </div>

            {/* 6. Websites */}
            <div className="career-form-card">
              <div className="career-section-header-row">
                <div className="career-section-title" style={{ margin: 0 }}>
                  <span className="step-number">2.5</span>
                  <span>Websites</span>
                </div>
                <button
                  type="button"
                  className="career-add-btn-primary"
                  onClick={addWebsite}
                  title="Add website"
                >
                  <Plus size={16} />
                  <span>+ Add Website</span>
                </button>
              </div>

              {/* LinkedIn */}
              <div className="career-form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  className="career-input-field"
                  placeholder="https://www.linkedin.com/in/your-profile"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                />
              </div>

              {/* GitHub */}
              <div className="career-form-group">
                <label>GitHub</label>
                <input
                  type="url"
                  className="career-input-field"
                  placeholder="https://github.com/your-username"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                />
              </div>

              {/* Portfolio */}
              <div className="career-form-group">
                <label>Portfolio</label>
                <input
                  type="url"
                  className="career-input-field"
                  placeholder="https://yourportfolio.com or project link"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                />
              </div>

              {/* Additional Custom Websites */}
              {customWebsites.map((site, index) => (
                <div className="career-repeatable-block" key={site.id} style={{ marginTop: '1rem', padding: '1.25rem' }}>
                  <div className="career-repeatable-header" style={{ marginBottom: '0.75rem' }}>
                    <h4 style={{ fontSize: '0.92rem' }}>Additional Website #{index + 1}</h4>
                    <button
                      type="button"
                      className="career-remove-entry-btn"
                      onClick={() => removeWebsite(site.id)}
                    >
                      <Trash2 size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      <span>Remove</span>
                    </button>
                  </div>
                  <div className="career-form-row">
                    <div className="career-form-group">
                      <label>Website Name / Type</label>
                      <input
                        type="text"
                        className="career-input-field"
                        placeholder="e.g. Personal Blog, ResearchGate, Twitter / X"
                        value={site.label}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomWebsites((prev) =>
                            prev.map((item) => (item.id === site.id ? { ...item, label: val } : item))
                          );
                        }}
                      />
                    </div>
                    <div className="career-form-group">
                      <label>URL</label>
                      <input
                        type="url"
                        className="career-input-field"
                        placeholder="https://..."
                        value={site.url}
                        onChange={(e) => {
                          const val = e.target.value;
                          setCustomWebsites((prev) =>
                            prev.map((item) => (item.id === site.id ? { ...item, url: val } : item))
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  className="career-add-more-btn"
                  onClick={addWebsite}
                >
                  <Plus size={16} />
                  <span>+ Add Website</span>
                </button>
              </div>
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

            {/* Question 1: Are you legally authorized to work in this country? */}
            <div className="career-form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'block' }}>
                Are you legally authorized to work in this country? *
              </label>
              <select
                className="career-input-field"
                value={workAuth}
                onChange={(e) => setWorkAuth(e.target.value)}
                style={{ maxWidth: '380px' }}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Question 2: Are you currently working for Urja Foods? */}
            <div className="career-form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'block' }}>
                Are you currently working for Urja Foods? *
              </label>
              <div className="career-yesno-toggle-group" role="radiogroup" aria-label="Are you currently working for Urja Foods?">
                <button
                  type="button"
                  className={`career-yesno-btn ${currentlyWorkingForUrja === 'Yes' ? 'active' : ''}`}
                  onClick={() => setCurrentlyWorkingForUrja('Yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`career-yesno-btn ${currentlyWorkingForUrja === 'No' ? 'active' : ''}`}
                  onClick={() => setCurrentlyWorkingForUrja('No')}
                >
                  No
                </button>
              </div>
            </div>

            {/* Question 3: Have you previously worked for Urja Foods? */}
            <div className="career-form-group" style={{ marginBottom: '1.75rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'block' }}>
                Have you previously worked for Urja Foods? *
              </label>
              <div className="career-yesno-toggle-group" role="radiogroup" aria-label="Have you previously worked for Urja Foods?">
                <button
                  type="button"
                  className={`career-yesno-btn ${previouslyWorkedForUrja === 'Yes' ? 'active' : ''}`}
                  onClick={() => setPreviouslyWorkedForUrja('Yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`career-yesno-btn ${previouslyWorkedForUrja === 'No' ? 'active' : ''}`}
                  onClick={() => setPreviouslyWorkedForUrja('No')}
                >
                  No
                </button>
              </div>
            </div>

            {/* Question 4: Are you willing to relocate? */}
            <div className="career-form-group" style={{ marginBottom: '2rem' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem', display: 'block' }}>
                Are you willing to relocate? *
              </label>
              <div className="career-yesno-toggle-group" role="radiogroup" aria-label="Are you willing to relocate?">
                <button
                  type="button"
                  className={`career-yesno-btn ${willingToRelocate === 'Yes' ? 'active' : ''}`}
                  onClick={() => setWillingToRelocate('Yes')}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`career-yesno-btn ${willingToRelocate === 'No' ? 'active' : ''}`}
                  onClick={() => setWillingToRelocate('No')}
                >
                  No
                </button>
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
                <span>Save &amp; Continue</span>
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
              <span>Voluntary Disclosures</span>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Urja Foods is committed to equal opportunity employment. The completion of these voluntary self-identification
              questions helps evaluate our outreach and does not affect your candidacy.
            </p>

            {/* Questions Section */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.5rem',
                marginBottom: '1.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  color: '#0f172a',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid #f1f5f9',
                }}
              >
                <HelpCircle size={18} color="#173b24" />
                <span>Questions</span>
              </div>

              {/* Gender */}
              <div className="career-form-group" style={{ marginBottom: '1.25rem' }}>
                <label>Gender</label>
                <select
                  className="career-input-field"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-Binary / Other">Non-Binary / Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Veteran Status */}
              <div className="career-form-group" style={{ marginBottom: '1.25rem' }}>
                <label>Veteran Status</label>
                <select
                  className="career-input-field"
                  value={veteranStatus}
                  onChange={(e) => setVeteranStatus(e.target.value)}
                >
                  <option value="I am not a protected veteran">I am not a protected veteran</option>
                  <option value="I identify as one or more classifications of protected veteran">
                    I identify as one or more classifications of protected veteran
                  </option>
                  <option value="I decline to self-identify">I decline to self-identify</option>
                </select>
              </div>

              {/* Disability Status */}
              <div className="career-form-group">
                <label>Disability Status</label>
                <select
                  className="career-input-field"
                  value={disabilityStatus}
                  onChange={(e) => setDisabilityStatus(e.target.value)}
                >
                  <option value="No, I do not have a disability">No, I do not have a disability</option>
                  <option value="Yes, I have a disability (or have had one in the past)">
                    Yes, I have a disability (or have had one in the past)
                  </option>
                  <option value="Prefer not to disclose">Prefer not to disclose</option>
                </select>
              </div>
            </div>

            {/* Checkbox: I agree to the terms and conditions */}
            <div
              style={{
                marginTop: '1.5rem',
                padding: '1.25rem',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                marginBottom: '1.75rem',
              }}
            >
              <label
                className="career-checkbox-label"
                style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  className="career-checkbox-input"
                  style={{ marginTop: '0.2rem' }}
                  checked={agreeDeclaration}
                  onChange={(e) => setAgreeDeclaration(e.target.checked)}
                />
                <span style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: 600 }}>
                  I agree to the terms and conditions
                </span>
              </label>
              <p style={{ margin: '0.5rem 0 0 1.95rem', fontSize: '0.84rem', color: '#64748b', lineHeight: 1.5 }}>
                By checking this box, I certify that all information submitted is true, complete, and accurate, and I agree to Urja Foods candidate application terms and recruitment policies.
              </p>
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
                <span>Save &amp; Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ==================================================================
            STEP 5: REVIEW APPLICATION
            ================================================================== */}
        {currentStep === 5 && (
          <div className="career-form-card">
            <div className="career-section-title">
              <span className="step-number">5</span>
              <span>Review Application</span>
            </div>

            <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Please review your candidate dossier before final submission. Click "Edit" on any section
              if you need to make changes.
            </p>

            {/* 1. Personal Information */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Personal Information</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(1);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Full Legal Name:</span>
                <span className="val">{[firstName, middleName, lastName].filter(Boolean).join(' ') || 'Not Provided'}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Email:</span>
                <span className="val">{email || 'Not Provided'}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Phone Number:</span>
                <span className="val">{countryCode} {phone || 'Not Provided'}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Address:</span>
                <span className="val">{addressLine || 'Not Provided'}</span>
              </div>
              <div className="career-review-row">
                <span className="label">City, State &amp; Postal:</span>
                <span className="val">{[city, state, postalCode].filter(Boolean).join(', ') || 'Not Provided'}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Country:</span>
                <span className="val">{country || 'Not Provided'}</span>
              </div>
            </div>

            {/* 2. Experience */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Experience</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              {workExperiences.length === 0 ? (
                <span className="val" style={{ color: '#94a3b8' }}>None Listed</span>
              ) : (
                workExperiences.map((w, idx) => (
                  <div
                    key={w.id || idx}
                    style={{
                      marginBottom: idx < workExperiences.length - 1 ? '0.75rem' : 0,
                      paddingBottom: idx < workExperiences.length - 1 ? '0.75rem' : 0,
                      borderBottom: idx < workExperiences.length - 1 ? '1px dashed #e2e8f0' : 'none',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      {w.title || 'Untitled Role'} at {w.company || 'Company'}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                      {w.location ? `${w.location} • ` : ''}{w.startDate} - {w.currentlyWorking ? 'Present' : (w.endDate || 'Present')}
                    </div>
                    {w.description && (
                      <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.25rem' }}>
                        {w.description}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* 3. Education */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Education</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              {educationList.length === 0 ? (
                <span className="val" style={{ color: '#94a3b8' }}>None Listed</span>
              ) : (
                educationList.map((e, idx) => (
                  <div
                    key={e.id || idx}
                    style={{
                      marginBottom: idx < educationList.length - 1 ? '0.75rem' : 0,
                      paddingBottom: idx < educationList.length - 1 ? '0.75rem' : 0,
                      borderBottom: idx < educationList.length - 1 ? '1px dashed #e2e8f0' : 'none',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>
                      {e.degree || 'Degree'} — {e.institution || 'School / University'}
                    </div>
                    {e.fieldOfStudy && (
                      <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Field of Study: {e.fieldOfStudy}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* 4. Certifications */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Certifications</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              {certifications.length === 0 ? (
                <span className="val" style={{ color: '#94a3b8' }}>None Listed</span>
              ) : (
                certifications.map((c, idx) => (
                  <div
                    key={c.id || idx}
                    style={{
                      marginBottom: idx < certifications.length - 1 ? '0.75rem' : 0,
                      paddingBottom: idx < certifications.length - 1 ? '0.75rem' : 0,
                      borderBottom: idx < certifications.length - 1 ? '1px dashed #e2e8f0' : 'none',
                    }}
                  >
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

            {/* 5. Skills */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Skills</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              {skills.length === 0 ? (
                <span className="val" style={{ color: '#94a3b8' }}>None Listed</span>
              ) : (
                <div className="career-skills-container">
                  {skills.map((s) => (
                    <span key={s} className="career-skill-chip career-skill-chip-review">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 6. Resume */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Resume</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              {resumeFile ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <FileText size={20} color="#173b24" />
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{resumeFile.name}</span>
                  <span style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    ({(resumeFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
              ) : (
                <span className="val" style={{ color: '#94a3b8' }}>No file uploaded</span>
              )}
            </div>

            {/* 7. Application Questions */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Application Questions</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(3);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Are you legally authorized to work in this country?:</span>
                <span className="val">{workAuth}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Are you currently working for Urja Foods?:</span>
                <span className="val">{currentlyWorkingForUrja}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Have you previously worked for Urja Foods?:</span>
                <span className="val">{previouslyWorkedForUrja}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Are you willing to relocate?:</span>
                <span className="val">{willingToRelocate}</span>
              </div>
            </div>

            {/* 8. Voluntary Disclosures */}
            <div className="career-review-section">
              <div className="career-review-header">
                <h4>Voluntary Disclosures</h4>
                <button
                  type="button"
                  className="career-edit-jump-btn"
                  onClick={() => {
                    setCurrentStep(4);
                    window.scrollTo(0, 0);
                  }}
                >
                  <Edit3 size={13} />
                  <span>Edit</span>
                </button>
              </div>
              <div className="career-review-row">
                <span className="label">Gender:</span>
                <span className="val">{gender}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Veteran Status:</span>
                <span className="val">{veteranStatus}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Disability Status:</span>
                <span className="val">{disabilityStatus}</span>
              </div>
              <div className="career-review-row">
                <span className="label">Terms and Conditions:</span>
                <span className="val" style={{ color: agreeDeclaration ? '#15803d' : '#b91c1c', fontWeight: 600 }}>
                  {agreeDeclaration ? 'Agreed & Accepted ✓' : 'Not agreed'}
                </span>
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
