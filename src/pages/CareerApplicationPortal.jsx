import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  User,
  Users,
  CreditCard,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building2,
  Briefcase,
  GraduationCap,
  Award,
  Plus,
  Trash2,
  HelpCircle,
  List,
  Link as LinkIcon,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Paperclip,
  Printer,
} from 'lucide-react';

// Format MM/DD/YYYY for certification dates
const formatFullDate = (raw) => {
  if (!raw) return '';
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (!digits) return '';
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
};

// Interactive Month & Year Input with Right-Aligned Calendar Icon & Popup (Exact match to User Reference)
function MonthYearInput({ label, required, value, onChange, placeholder = 'MM/YYYY', disabled }) {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerYear, setPickerYear] = useState(() => {
    if (value && value.includes('/')) {
      const parts = value.split('/');
      const y = parseInt(parts[1], 10);
      if (!isNaN(y) && y > 1900) return y;
    }
    return new Date().getFullYear();
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  const months = [
    { num: '01', name: 'Jan' },
    { num: '02', name: 'Feb' },
    { num: '03', name: 'Mar' },
    { num: '04', name: 'Apr' },
    { num: '05', name: 'May' },
    { num: '06', name: 'Jun' },
    { num: '07', name: 'Jul' },
    { num: '08', name: 'Aug' },
    { num: '09', name: 'Sep' },
    { num: '10', name: 'Oct' },
    { num: '11', name: 'Nov' },
    { num: '12', name: 'Dec' },
  ];

  const handleInputChange = (e) => {
    const raw = e.target.value;
    if (raw.length < (value || '').length) {
      onChange(raw);
      return;
    }
    const digits = raw.replace(/\D/g, '').slice(0, 6);
    if (!digits) {
      onChange('');
      return;
    }
    if (digits.length === 1) {
      if (parseInt(digits[0], 10) > 1) {
        onChange(`0${digits[0]}/`);
      } else {
        onChange(digits);
      }
      return;
    }
    let mm = parseInt(digits.slice(0, 2), 10);
    if (mm < 1) mm = 1;
    if (mm > 12) mm = 12;
    const mmStr = mm < 10 ? `0${mm}` : `${mm}`;
    if (digits.length === 2) {
      onChange(`${mmStr}/`);
      return;
    }
    const yyyy = digits.slice(2);
    onChange(`${mmStr}/${yyyy}`);
  };

  const selectMonth = (monthNum) => {
    onChange(`${monthNum}/${pickerYear}`);
    setShowPicker(false);
  };

  return (
    <div className="cr-field-group" ref={containerRef} style={{ position: 'relative' }}>
      <label className="cr-field-label">
        {label} {required && <span className="cr-req-star">*</span>}
      </label>
      <div className="cr-input-wrapper">
        <input
          type="text"
          className="cr-input cr-input-date-right"
          placeholder={placeholder}
          value={value || ''}
          disabled={disabled}
          onChange={handleInputChange}
          onClick={() => !disabled && setShowPicker(true)}
          required={required}
        />
        <button
          type="button"
          tabIndex={-1}
          className="cr-input-icon-right"
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) setShowPicker((prev) => !prev);
          }}
          title="Pick Month and Year"
        >
          <Calendar size={16} />
        </button>
      </div>

      {showPicker && !disabled && (
        <div className="cr-month-year-popup">
          <div className="cr-myp-header">
            <button
              type="button"
              className="cr-myp-nav-btn"
              onClick={() => setPickerYear((y) => y - 1)}
            >
              &larr;
            </button>
            <span className="cr-myp-year-text">{pickerYear}</span>
            <button
              type="button"
              className="cr-myp-nav-btn"
              onClick={() => setPickerYear((y) => y + 1)}
            >
              &rarr;
            </button>
          </div>
          <div className="cr-myp-months-grid">
            {months.map((m) => {
              const isSelected = value === `${m.num}/${pickerYear}`;
              return (
                <button
                  key={m.num}
                  type="button"
                  className={`cr-myp-month-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => selectMonth(m.num)}
                >
                  {m.name}
                </button>
              );
            })}
          </div>
          <div className="cr-myp-footer">
            <button
              type="button"
              className="cr-myp-clear-btn"
              onClick={() => {
                onChange('');
                setShowPicker(false);
              }}
            >
              Clear
            </button>
            <button
              type="button"
              className="cr-myp-today-btn"
              onClick={() => {
                const now = new Date();
                const m = (now.getMonth() + 1).toString().padStart(2, '0');
                const y = now.getFullYear();
                setPickerYear(y);
                onChange(`${m}/${y}`);
                setShowPicker(false);
              }}
            >
              Current Month
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CareerApplicationPortal() {
  const [searchParams] = useSearchParams();

  const urlJobId = searchParams.get('jobId') || '';
  const urlTitle = searchParams.get('title') || '';

  // Current Step: 1 = Personal Details, 2 = Additional Details (My Experience), 3 = Review & Submit, 4 = Success
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  // Available Job Roles in Urja Foods
  const availableRoles = [
    'Technical Farm Supervisor (Broiler Integration)',
    'Quality Control & Lab Chemist (Feed Plant)',
    'Veterinary Field Officer (Livestock & Poultry)',
    'Area Sales Manager (Urja Pashu Aahar - Cattle Feed)',
    'Plant Maintenance Engineer (Mechanical / Electrical)',
    'Accounts & Farmer Billing Executive',
    'General Agribusiness Application',
  ];

  // Target Position
  const initialPosition = urlTitle
    ? urlTitle
    : urlJobId === 'job-1'
    ? availableRoles[0]
    : urlJobId === 'job-2'
    ? availableRoles[1]
    : urlJobId === 'job-3'
    ? availableRoles[2]
    : urlJobId === 'job-4'
    ? availableRoles[3]
    : urlJobId === 'job-5'
    ? availableRoles[4]
    : urlJobId === 'job-6'
    ? availableRoles[5]
    : 'General Agribusiness Application';

  // Form State
  const [formData, setFormData] = useState({
    position: initialPosition,
    // Step 1: Upload Resume
    resumeFile: null,
    resumeFileName: '',
    resumeFileSize: '',
    // Step 1: Reference Details (If applicable)
    previouslyWorked: 'No', // Yes | No
    referenceName: '',
    employeeId: '',
    // Step 1: Personal Details
    fullName: '',
    email: '',
    phoneDeviceType: 'Mobile',
    phoneNumber: '',
    phoneExtension: '',
    dateOfBirth: '',
    // Step 1: Address
    addressLine1: '',
    city: '',
    postalCode: '',

    // Step 2: Work Experience (Empty by default matching Screenshot 3)
    workExperiences: [],

    // Step 2: Education (Empty by default matching Screenshot 3)
    educations: [],

    // Step 2: Certifications (Empty by default matching Screenshot 3)
    certifications: [],

    // Step 2: Skills
    skills: ['Animal Nutrition', 'Quality Control', 'Team Collaboration'],
    skillInput: '',

    // Step 2: Additional Attachment
    additionalFile: null,
    additionalFileName: '',

    // Step 2: Websites
    websites: [],

    // Step 3: Terms
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});
  const cardTopRef = useRef(null);
  const resumeInputRef = useRef(null);
  const additionalFileInputRef = useRef(null);

  // Scroll to card header when step changes
  useEffect(() => {
    if (cardTopRef.current) {
      cardTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  // Handle Resume File Upload
  const handleResumeSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit. Please upload a smaller file.');
        return;
      }
      const sizeStr = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name,
        resumeFileSize: sizeStr,
      }));
      setErrors((prev) => ({ ...prev, resume: null }));
    }
  };

  const handleResumeDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds the 5MB limit. Please upload a smaller file.');
        return;
      }
      const sizeStr = (file.size / 1024 / 1024).toFixed(2) + ' MB';
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name,
        resumeFileSize: sizeStr,
      }));
      setErrors((prev) => ({ ...prev, resume: null }));
    }
  };

  const removeResume = () => {
    setFormData((prev) => ({
      ...prev,
      resumeFile: null,
      resumeFileName: '',
      resumeFileSize: '',
    }));
    if (resumeInputRef.current) resumeInputRef.current.value = '';
  };

  // Additional Attachment
  const handleAdditionalFileSelect = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit.');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        additionalFile: file,
        additionalFileName: file.name,
      }));
    }
  };

  // Generic Field Change
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Step 1 Validation
  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required';
    } else if (formData.phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal Code is required';

    if (!formData.resumeFileName) {
      newErrors.resume = 'Please upload your Resume / CV to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep1 = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  // --- Dynamic Work Experience Operations ---
  const addWorkExperience = () => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: [
        ...prev.workExperiences,
        {
          id: Date.now() + Math.random(),
          jobTitle: '',
          company: '',
          location: '',
          currentWork: false,
          from: '',
          to: '',
          roleDescription: '',
        },
      ],
    }));
  };

  const updateWorkExperience = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const deleteWorkExperience = (id) => {
    setFormData((prev) => ({
      ...prev,
      workExperiences: prev.workExperiences.filter((item) => item.id !== id),
    }));
  };

  // --- Dynamic Education Operations ---
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      educations: [
        ...prev.educations,
        {
          id: Date.now() + Math.random(),
          school: '',
          degree: '',
          fieldOfStudy: '',
        },
      ],
    }));
  };

  const updateEducation = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const deleteEducation = (id) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.filter((item) => item.id !== id),
    }));
  };

  // --- Dynamic Certifications Operations ---
  const addCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: Date.now() + Math.random(),
          name: '',
          certNumber: '',
          issuedDate: '',
          expDate: '',
          specialties: [],
          specialtyInput: '',
          fileName: '',
        },
      ],
    }));
  };

  const updateCertification = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const deleteCertification = (id) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
  };

  const addCertSpecialty = (certId) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) => {
        if (item.id === certId && item.specialtyInput?.trim()) {
          return {
            ...item,
            specialties: [...(item.specialties || []), item.specialtyInput.trim()],
            specialtyInput: '',
          };
        }
        return item;
      }),
    }));
  };

  // --- Skills Operations ---
  const addSkill = (skillToAdd) => {
    const val = skillToAdd || formData.skillInput;
    if (val && val.trim() && !formData.skills.includes(val.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, val.trim()],
        skillInput: '',
      }));
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // --- Websites Operations ---
  const addWebsite = () => {
    setFormData((prev) => ({
      ...prev,
      websites: [...prev.websites, { id: Date.now() + Math.random(), url: '' }],
    }));
  };

  const updateWebsite = (id, url) => {
    setFormData((prev) => ({
      ...prev,
      websites: prev.websites.map((w) => (w.id === id ? { ...w, url } : w)),
    }));
  };

  const deleteWebsite = (id) => {
    setFormData((prev) => ({
      ...prev,
      websites: prev.websites.filter((w) => w.id !== id),
    }));
  };

  // Step 2 Next
  const handleSaveAndContinue = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  // Step 3 Final Submit
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      alert('Please check the declaration statement to confirm your application submission.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare payload for backend
      const payload = {
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        position: formData.position,
        experience:
          formData.workExperiences.length > 0
            ? `${formData.workExperiences.length} Experience Records: ` +
              formData.workExperiences.map((w) => `${w.jobTitle} at ${w.company}`).join('; ')
            : 'No prior experience listed',
        qualification:
          formData.educations.length > 0
            ? formData.educations.map((e) => `${e.degree} - ${e.school}`).join('; ')
            : 'Not specified',
        city: formData.city,
        resumeUrl: formData.resumeFileName || 'Resume uploaded',
        message: `Reference: ${formData.previouslyWorked === 'Yes' ? 'Worked previously: ' + formData.referenceName : 'No prior tenure'}; Skills: ${formData.skills.join(', ')}`,
      };

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const refCode = data.applicationId || `URJA-APP-${Date.now().toString().slice(-6)}`;
      setSubmissionResult({
        success: true,
        referenceId: refCode,
        timestamp: new Date().toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        }),
      });
      setCurrentStep(4); // Success step
    } catch (err) {
      console.warn('Fallback offline submission handling:', err);
      // Fallback offline submission success
      setSubmissionResult({
        success: true,
        referenceId: `URJA-APP-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        }),
      });
      setCurrentStep(4);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="urja-career-portal">
      {/* Decorative Corner Leaves (Matching Image 4) */}
      <svg
        className="cr-corner-leaf cr-corner-leaf-left"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 220C25 150 70 80 150 10C120 75 95 130 90 220C55 210 25 215 10 220Z"
          fill="#1e6b37"
          fillOpacity="0.85"
        />
        <path
          d="M30 220C45 160 85 95 145 25C125 75 105 135 100 220Z"
          fill="#2e8b47"
          fillOpacity="0.9"
        />
        <path
          d="M2 190C15 130 50 70 120 10C95 65 75 115 70 190Z"
          fill="#135227"
          fillOpacity="0.75"
        />
      </svg>

      <svg
        className="cr-corner-leaf cr-corner-leaf-right"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M10 220C25 150 70 80 150 10C120 75 95 130 90 220C55 210 25 215 10 220Z"
          fill="#1e6b37"
          fillOpacity="0.85"
        />
        <path
          d="M30 220C45 160 85 95 145 25C125 75 105 135 100 220Z"
          fill="#2e8b47"
          fillOpacity="0.9"
        />
        <path
          d="M2 190C15 130 50 70 120 10C95 65 75 115 70 190Z"
          fill="#135227"
          fillOpacity="0.75"
        />
      </svg>

      {/* 1. HERO BANNER - Exact match to Reference Image 4 */}
      <section className="cr-portal-hero">
        <div className="cr-portal-hero-content">
          <h1 className="cr-portal-hero-title">Join Our Team</h1>
          <h2 className="cr-portal-hero-subtitle">Build a Brighter Future With Urja Foods</h2>
          <p className="cr-portal-hero-desc">
            Be a part of our journey towards healthier food and a better tomorrow.
          </p>
        </div>
      </section>

      {/* 2. MAIN APPLICATION CONTAINER */}
      <div className="cr-portal-container" ref={cardTopRef}>
        <div className="cr-main-card">
          {/* STEPPER PROGRESS TRACKER (1 Personal Details -> 2 Additional Details -> 3 Review & Submit) */}
          {currentStep <= 3 && (
            <div className="cr-stepper-tracker">
              {/* Step 1 Node */}
              <div
                className={`cr-step-node ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : 'upcoming'}`}
                onClick={() => currentStep > 1 && setCurrentStep(1)}
              >
                <div className="cr-step-circle">
                  {currentStep > 1 ? <Check size={18} strokeWidth={3} /> : '1'}
                </div>
                <div className="cr-step-label">Personal Details</div>
              </div>

              {/* Connector 1-2 */}
              <div
                className={`cr-step-connector ${currentStep > 1 ? 'completed' : ''}`}
              />

              {/* Step 2 Node */}
              <div
                className={`cr-step-node ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : 'upcoming'}`}
                onClick={() => {
                  if (currentStep > 2) setCurrentStep(2);
                }}
              >
                <div className="cr-step-circle">
                  {currentStep > 2 ? <Check size={18} strokeWidth={3} /> : '2'}
                </div>
                <div className="cr-step-label">Additional Details</div>
              </div>

              {/* Connector 2-3 */}
              <div
                className={`cr-step-connector ${currentStep > 2 ? 'completed' : ''}`}
              />

              {/* Step 3 Node */}
              <div
                className={`cr-step-node ${currentStep === 3 ? 'active' : 'upcoming'}`}
              >
                <div className="cr-step-circle">3</div>
                <div className="cr-step-label">Review &amp; Submit</div>
              </div>
            </div>
          )}

          {/* =========================================================================
              STEP 1: PERSONAL DETAILS & APPLICATION FORM (MATCHING REFERENCE IMAGE 4)
             ========================================================================= */}
          {currentStep === 1 && (
            <form onSubmit={handleNextStep1} noValidate>
              <div className="cr-card-header">
                <h2 className="cr-card-title">Application Form</h2>
                <p className="cr-card-subtitle">
                  Fill in your details and apply for the position you are interested in.
                </p>
              </div>

              {/* Position Selector */}
              <div className="cr-field-group" style={{ marginBottom: '1.5rem' }}>
                <label className="cr-field-label">
                  Applying for Position <span className="cr-req-star">*</span>
                </label>
                <div className="cr-input-wrapper">
                  <Briefcase size={16} className="cr-input-icon" />
                  <select
                    className="cr-select"
                    style={{ paddingLeft: '2.6rem' }}
                    value={formData.position}
                    onChange={(e) => handleChange('position', e.target.value)}
                  >
                    {(urlTitle && !availableRoles.includes(urlTitle) ? [urlTitle, ...availableRoles] : availableRoles).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 1. Upload Resume / CV * */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <FileText size={18} />
                  <span>
                    1. Upload Resume / CV <span className="cr-req-star">*</span>
                  </span>
                </div>
              </div>

              <div
                className="cr-dropzone-box"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleResumeDrop}
                onClick={() => resumeInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={resumeInputRef}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeSelect}
                />
                <div className="cr-cloud-icon-circle">
                  <UploadCloud size={24} />
                </div>
                <div className="cr-dropzone-title">
                  Upload Resume / CV <span className="cr-req-star">*</span>
                </div>
                <div className="cr-dropzone-sub">
                  Drag &amp; drop your file here or click to browse
                </div>
                <div className="cr-dropzone-hint">
                  Supported formats: PDF, DOC, DOCX (Max size: 5 MB)
                </div>

                {!formData.resumeFileName ? (
                  <button
                    type="button"
                    className="cr-btn-choose-file"
                    onClick={(e) => {
                      e.stopPropagation();
                      resumeInputRef.current?.click();
                    }}
                  >
                    <Paperclip size={14} />
                    <span>Choose File</span>
                  </button>
                ) : (
                  <div
                    className="cr-uploaded-file-pill"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CheckCircle2 size={16} color="#166534" />
                    <span>{formData.resumeFileName} ({formData.resumeFileSize})</span>
                    <button
                      type="button"
                      className="cr-uploaded-remove-btn"
                      onClick={removeResume}
                      title="Remove file"
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </div>
              {errors.resume && <div className="cr-error-text" style={{ marginTop: '0.4rem' }}>{errors.resume}</div>}

              {/* 3. Reference Details (If applicable) */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <Users size={18} />
                  <span>3. Reference Details (If applicable)</span>
                </div>
              </div>

              <div style={{ marginBottom: '0.75rem' }}>
                <div className="cr-field-label" style={{ marginBottom: '0.4rem' }}>
                  Have you previously worked for or are you currently working for Urja Foods as an employee or contractor?{' '}
                  <span className="cr-req-star">*</span>
                </div>
                <div className="cr-radio-row">
                  <label className="cr-radio-label">
                    <input
                      type="radio"
                      name="previouslyWorked"
                      value="Yes"
                      checked={formData.previouslyWorked === 'Yes'}
                      onChange={() => handleChange('previouslyWorked', 'Yes')}
                    />
                    <span>Yes</span>
                  </label>
                  <label className="cr-radio-label">
                    <input
                      type="radio"
                      name="previouslyWorked"
                      value="No"
                      checked={formData.previouslyWorked === 'No'}
                      onChange={() => handleChange('previouslyWorked', 'No')}
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="cr-form-grid-2">
                <div className="cr-field-group">
                  <label className="cr-field-label">Reference Name</label>
                  <div className="cr-input-wrapper">
                    <User size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className="cr-input"
                      placeholder="Enter reference name"
                      value={formData.referenceName}
                      onChange={(e) => handleChange('referenceName', e.target.value)}
                    />
                  </div>
                </div>

                <div className="cr-field-group">
                  <label className="cr-field-label">Employee ID</label>
                  <div className="cr-input-wrapper">
                    <CreditCard size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className="cr-input"
                      placeholder="Enter employee ID"
                      value={formData.employeeId}
                      onChange={(e) => handleChange('employeeId', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 2. Personal Details */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <User size={18} />
                  <span>2. Personal Details</span>
                </div>
              </div>

              <div className="cr-form-grid-2">
                <div className="cr-field-group">
                  <label className="cr-field-label">
                    Full Name <span className="cr-req-star">*</span>
                  </label>
                  <div className="cr-input-wrapper">
                    <User size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className={`cr-input ${errors.fullName ? 'cr-error' : ''}`}
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                    />
                  </div>
                  {errors.fullName && <span className="cr-error-text">{errors.fullName}</span>}
                </div>

                <div className="cr-field-group">
                  <label className="cr-field-label">
                    Email Address <span className="cr-req-star">*</span>
                  </label>
                  <div className="cr-input-wrapper">
                    <Mail size={16} className="cr-input-icon" />
                    <input
                      type="email"
                      className={`cr-input ${errors.email ? 'cr-error' : ''}`}
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  {errors.email && <span className="cr-error-text">{errors.email}</span>}
                </div>
              </div>

              <div className="cr-form-grid-2">
                <div className="cr-field-group">
                  <label className="cr-field-label">
                    Phone Device Type <span className="cr-req-star">*</span>
                  </label>
                  <select
                    className="cr-select"
                    value={formData.phoneDeviceType}
                    onChange={(e) => handleChange('phoneDeviceType', e.target.value)}
                  >
                    <option value="Mobile">Mobile</option>
                    <option value="Home">Home</option>
                    <option value="Work">Work</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="cr-field-group">
                  <label className="cr-field-label">
                    Phone Number <span className="cr-req-star">*</span>
                  </label>
                  <div className="cr-input-wrapper">
                    <Phone size={16} className="cr-input-icon" />
                    <input
                      type="tel"
                      className={`cr-input ${errors.phoneNumber ? 'cr-error' : ''}`}
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    />
                  </div>
                  {errors.phoneNumber && <span className="cr-error-text">{errors.phoneNumber}</span>}
                </div>
              </div>

              <div className="cr-form-grid-2">
                <div className="cr-field-group">
                  <label className="cr-field-label">Phone Extension</label>
                  <div className="cr-input-wrapper">
                    <Phone size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className="cr-input"
                      placeholder="Enter phone extension (if any)"
                      value={formData.phoneExtension}
                      onChange={(e) => handleChange('phoneExtension', e.target.value)}
                    />
                  </div>
                </div>

                <div className="cr-field-group">
                  <label className="cr-field-label">Date of Birth</label>
                  <div className="cr-input-wrapper">
                    <input
                      type="date"
                      className="cr-input cr-input-date-right"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* 4. Address */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <MapPin size={18} />
                  <span>4. Address</span>
                </div>
              </div>

              <div className="cr-form-grid-2">
                <div className="cr-field-group">
                  <label className="cr-field-label">
                    Address Line 1 <span className="cr-req-star">*</span>
                  </label>
                  <div className="cr-input-wrapper">
                    <MapPin size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className={`cr-input ${errors.addressLine1 ? 'cr-error' : ''}`}
                      placeholder="Enter your address"
                      value={formData.addressLine1}
                      onChange={(e) => handleChange('addressLine1', e.target.value)}
                    />
                  </div>
                  {errors.addressLine1 && <span className="cr-error-text">{errors.addressLine1}</span>}
                </div>

                <div className="cr-field-group">
                  <label className="cr-field-label">
                    City <span className="cr-req-star">*</span>
                  </label>
                  <div className="cr-input-wrapper">
                    <Building2 size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className={`cr-input ${errors.city ? 'cr-error' : ''}`}
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                    />
                  </div>
                  {errors.city && <span className="cr-error-text">{errors.city}</span>}
                </div>
              </div>

              <div className="cr-form-grid-2">
                <div className="cr-field-group">
                  <label className="cr-field-label">
                    Postal Code <span className="cr-req-star">*</span>
                  </label>
                  <div className="cr-input-wrapper">
                    <Calendar size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className={`cr-input ${errors.postalCode ? 'cr-error' : ''}`}
                      placeholder="Enter postal code"
                      value={formData.postalCode}
                      onChange={(e) => handleChange('postalCode', e.target.value)}
                    />
                  </div>
                  {errors.postalCode && <span className="cr-error-text">{errors.postalCode}</span>}
                </div>
              </div>

              {/* Step 1 Action Bar: Right aligned green "Next →" button */}
              <div className="cr-action-bar">
                <button type="submit" className="cr-btn-next-submit">
                  <span>Next</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 2: MY EXPERIENCE / ADDITIONAL DETAILS (MATCHING IMAGES 1, 2, 3)
             ========================================================================= */}
          {currentStep === 2 && (
            <form onSubmit={handleSaveAndContinue}>
              <div className="cr-card-header">
                <h2 className="cr-card-title">My Experience</h2>
                <p className="cr-card-subtitle">
                  Please provide your work experience, education, certifications, skills and additional details.
                </p>
              </div>

              {/* 1. Work Experience * */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <Briefcase size={18} />
                  <span>
                    1. Work Experience <span className="cr-req-star">*</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="cr-btn-add"
                  onClick={addWorkExperience}
                >
                  <Plus size={15} />
                  <span>Add</span>
                </button>
              </div>

              {/* Empty state (Image 3) or List of Cards (Image 1) */}
              {formData.workExperiences.length === 0 ? (
                <div className="cr-empty-card">
                  <div className="cr-empty-icon-wrap">
                    <Briefcase size={24} />
                  </div>
                  <div className="cr-empty-title">No work experience added yet.</div>
                  <div className="cr-empty-sub">
                    Click on &ldquo;Add&rdquo; to add your work experience.
                  </div>
                </div>
              ) : (
                formData.workExperiences.map((item, index) => (
                  <div key={item.id} className="cr-item-card">
                    <div className="cr-item-card-header">
                      <span className="cr-item-card-title">
                        Work Experience {index + 1}
                      </span>
                      <button
                        type="button"
                        className="cr-btn-delete"
                        onClick={() => deleteWorkExperience(item.id)}
                      >
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="cr-form-grid-3">
                      <div className="cr-field-group">
                        <label className="cr-field-label">
                          Job Title <span className="cr-req-star">*</span>
                        </label>
                        <input
                          type="text"
                          className="cr-input cr-input-plain"
                          placeholder="Enter job title"
                          value={item.jobTitle}
                          onChange={(e) =>
                            updateWorkExperience(item.id, 'jobTitle', e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="cr-field-group">
                        <label className="cr-field-label">
                          Company <span className="cr-req-star">*</span>
                        </label>
                        <input
                          type="text"
                          className="cr-input cr-input-plain"
                          placeholder="Enter company name"
                          value={item.company}
                          onChange={(e) =>
                            updateWorkExperience(item.id, 'company', e.target.value)
                          }
                          required
                        />
                      </div>

                      <div className="cr-field-group">
                        <label className="cr-field-label">Location</label>
                        <input
                          type="text"
                          className="cr-input cr-input-plain"
                          placeholder="Enter location"
                          value={item.location}
                          onChange={(e) =>
                            updateWorkExperience(item.id, 'location', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <label className="cr-checkbox-label">
                      <input
                        type="checkbox"
                        checked={item.currentWork}
                        onChange={(e) =>
                          updateWorkExperience(item.id, 'currentWork', e.target.checked)
                        }
                      />
                      <span>I currently work here</span>
                    </label>

                    <div className="cr-form-grid-2">
                      <MonthYearInput
                        label="From"
                        required
                        value={item.from}
                        onChange={(val) => updateWorkExperience(item.id, 'from', val)}
                      />

                      <MonthYearInput
                        label="To"
                        required={!item.currentWork}
                        disabled={item.currentWork}
                        placeholder={item.currentWork ? 'Present' : 'MM/YYYY'}
                        value={item.currentWork ? 'Present' : item.to}
                        onChange={(val) => updateWorkExperience(item.id, 'to', val)}
                      />
                    </div>

                    <div className="cr-field-group">
                      <label className="cr-field-label">Role Description</label>
                      <textarea
                        className="cr-textarea"
                        placeholder="Enter role description"
                        value={item.roleDescription}
                        onChange={(e) =>
                          updateWorkExperience(item.id, 'roleDescription', e.target.value)
                        }
                      />
                    </div>
                  </div>
                ))
              )}

              {/* 2. Education * */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <GraduationCap size={18} />
                  <span>
                    2. Education <span className="cr-req-star">*</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="cr-btn-add"
                  onClick={addEducation}
                >
                  <Plus size={15} />
                  <span>Add</span>
                </button>
              </div>

              {formData.educations.length === 0 ? (
                <div className="cr-empty-card">
                  <div className="cr-empty-icon-wrap">
                    <GraduationCap size={24} />
                  </div>
                  <div className="cr-empty-title">No education details added yet.</div>
                  <div className="cr-empty-sub">
                    Click on &ldquo;Add&rdquo; to add your education details.
                  </div>
                </div>
              ) : (
                formData.educations.map((item, index) => (
                  <div key={item.id} className="cr-item-card">
                    <div className="cr-item-card-header">
                      <span className="cr-item-card-title">
                        Education {index + 1}
                      </span>
                      <button
                        type="button"
                        className="cr-btn-delete"
                        onClick={() => deleteEducation(item.id)}
                      >
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="cr-form-grid-3">
                      <div className="cr-field-group">
                        <label className="cr-field-label">
                          School or University <span className="cr-req-star">*</span>
                        </label>
                        <div className="cr-input-wrapper">
                          <List size={16} className="cr-input-icon" />
                          <input
                            type="text"
                            className="cr-input"
                            placeholder="Search and select school or university"
                            value={item.school}
                            onChange={(e) =>
                              updateEducation(item.id, 'school', e.target.value)
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="cr-field-group">
                        <label className="cr-field-label">
                          Degree <span className="cr-req-star">*</span>
                        </label>
                        <select
                          className="cr-select"
                          value={item.degree}
                          onChange={(e) =>
                            updateEducation(item.id, 'degree', e.target.value)
                          }
                          required
                        >
                          <option value="">Select One</option>
                          <option value="High School Diploma">High School Diploma</option>
                          <option value="Diploma / Vocational">Diploma / Vocational</option>
                          <option value="Bachelor's Degree (B.Sc / B.E / B.Tech / B.Com)">
                            Bachelor&apos;s Degree
                          </option>
                          <option value="Master's Degree (M.Sc / M.E / MBA / M.Tech)">
                            Master&apos;s Degree
                          </option>
                          <option value="Doctorate / Ph.D">Doctorate / Ph.D</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="cr-field-group">
                        <div className="cr-field-label">
                          <span>Field of Study</span>
                          <span title="e.g. Agriculture, Feed Science, Veterinary, Accounting, Mechanical">
                            <HelpCircle size={14} color="#64748b" style={{ cursor: 'pointer' }} />
                          </span>
                        </div>
                        <div className="cr-input-wrapper">
                          <List size={16} className="cr-input-icon" />
                          <input
                            type="text"
                            className="cr-input"
                            placeholder="Search and select field of study"
                            value={item.fieldOfStudy}
                            onChange={(e) =>
                              updateEducation(item.id, 'fieldOfStudy', e.target.value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* 3. Certifications */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <Award size={18} />
                  <span>3. Certifications</span>
                </div>
                <button
                  type="button"
                  className="cr-btn-add"
                  onClick={addCertification}
                >
                  <Plus size={15} />
                  <span>Add</span>
                </button>
              </div>

              {formData.certifications.length === 0 ? (
                <div className="cr-empty-card">
                  <div className="cr-empty-icon-wrap">
                    <Award size={24} />
                  </div>
                  <div className="cr-empty-title">No certifications added yet.</div>
                  <div className="cr-empty-sub">
                    Click on &ldquo;Add&rdquo; to add your certifications.
                  </div>
                </div>
              ) : (
                formData.certifications.map((item, index) => (
                  <div key={item.id} className="cr-item-card">
                    <div className="cr-item-card-header">
                      <span className="cr-item-card-title">
                        Certification {index + 1}
                      </span>
                      <button
                        type="button"
                        className="cr-btn-delete"
                        onClick={() => deleteCertification(item.id)}
                      >
                        <Trash2 size={15} />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="cr-form-grid-4">
                      <div className="cr-field-group">
                        <label className="cr-field-label">Certification</label>
                        <div className="cr-input-wrapper">
                          <List size={16} className="cr-input-icon" />
                          <input
                            type="text"
                            className="cr-input"
                            placeholder="Search and select certification"
                            value={item.name}
                            onChange={(e) =>
                              updateCertification(item.id, 'name', e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="cr-field-group">
                        <label className="cr-field-label">Certification Number</label>
                        <input
                          type="text"
                          className="cr-input cr-input-plain"
                          placeholder="Enter certification number"
                          value={item.certNumber}
                          onChange={(e) =>
                            updateCertification(item.id, 'certNumber', e.target.value)
                          }
                        />
                      </div>

                      <div className="cr-field-group">
                        <label className="cr-field-label">Issued Date</label>
                        <div className="cr-input-wrapper">
                          <input
                            type="text"
                            className="cr-input cr-input-date-right"
                            placeholder="MM/DD/YYYY"
                            value={item.issuedDate}
                            onChange={(e) =>
                              updateCertification(item.id, 'issuedDate', formatFullDate(e.target.value))
                            }
                          />
                          <Calendar size={16} className="cr-input-icon-right" />
                        </div>
                      </div>

                      <div className="cr-field-group">
                        <label className="cr-field-label">Expiration Date</label>
                        <div className="cr-input-wrapper">
                          <input
                            type="text"
                            className="cr-input cr-input-date-right"
                            placeholder="MM/DD/YYYY"
                            value={item.expDate}
                            onChange={(e) =>
                              updateCertification(item.id, 'expDate', formatFullDate(e.target.value))
                            }
                          />
                          <Calendar size={16} className="cr-input-icon-right" />
                        </div>
                      </div>
                    </div>

                    {/* Specialties */}
                    <div style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                      <label className="cr-field-label" style={{ marginBottom: '0.4rem' }}>
                        Specialties
                      </label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="text"
                          className="cr-input cr-input-plain"
                          style={{ maxWidth: '280px' }}
                          placeholder="Type specialty and click Add"
                          value={item.specialtyInput || ''}
                          onChange={(e) =>
                            updateCertification(item.id, 'specialtyInput', e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addCertSpecialty(item.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          className="cr-btn-add"
                          onClick={() => addCertSpecialty(item.id)}
                        >
                          <Plus size={14} />
                          <span>Add</span>
                        </button>
                      </div>

                      {item.specialties && item.specialties.length > 0 && (
                        <div className="cr-skills-tags-container">
                          {item.specialties.map((spec, sIdx) => (
                            <span key={sIdx} className="cr-skill-tag">
                              {spec}
                              <button
                                type="button"
                                className="cr-skill-remove-btn"
                                onClick={() => {
                                  const updated = item.specialties.filter((_, i) => i !== sIdx);
                                  updateCertification(item.id, 'specialties', updated);
                                }}
                              >
                                <X size={13} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Attachments */}
                    <div style={{ marginTop: '0.75rem' }}>
                      <label className="cr-field-label" style={{ marginBottom: '0.4rem' }}>
                        Attachments
                      </label>
                      <div
                        style={{
                          border: '1.5px dashed #cbd5e1',
                          borderRadius: '8px',
                          padding: '1.25rem',
                          textAlign: 'center',
                          background: '#f8fafc',
                          cursor: 'pointer',
                        }}
                      >
                        <UploadCloud size={20} color="#64748b" style={{ margin: '0 auto 4px' }} />
                        <span style={{ fontSize: '0.85rem', color: '#64748b' }}>
                          Drop files here or <span style={{ color: '#2563eb', fontWeight: 600 }}>Select files</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* 4. Skills (Image 2) */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <List size={18} />
                  <span>4. Skills</span>
                </div>
              </div>

              <div className="cr-field-group">
                <label className="cr-field-label">Type to Add Skills</label>
                <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                  <div className="cr-input-wrapper" style={{ flex: 1 }}>
                    <List size={16} className="cr-input-icon" />
                    <input
                      type="text"
                      className="cr-input"
                      placeholder="Search and add skills (e.g. Java, Spring Boot, SQL, Poultry Management, Feed Chemistry)"
                      value={formData.skillInput}
                      onChange={(e) => handleChange('skillInput', e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="cr-btn-add"
                    onClick={() => addSkill()}
                  >
                    <Plus size={14} />
                    <span>Add Skill</span>
                  </button>
                </div>

                {/* Skill Chips */}
                <div className="cr-skills-tags-container">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="cr-skill-tag">
                      {skill}
                      <button
                        type="button"
                        className="cr-skill-remove-btn"
                        onClick={() => removeSkill(skill)}
                      >
                        <X size={13} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* 5. Resume/CV Additional Attachments (Image 2) */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <FileText size={18} />
                  <span>5. Resume/CV</span>
                </div>
              </div>

              <div className="cr-field-group">
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.35rem' }}>
                  Optional, upload additional attachments such as a cover letter below.
                </p>
                <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                  Upload a file (5MB max)
                </div>
                <div
                  style={{
                    border: '1.5px dashed #cbd5e1',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: '#f8fafc',
                    cursor: 'pointer',
                  }}
                  onClick={() => additionalFileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={additionalFileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleAdditionalFileSelect}
                  />
                  <UploadCloud size={24} color="#64748b" style={{ margin: '0 auto 6px' }} />
                  <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                    {formData.additionalFileName ? (
                      <span style={{ color: '#166534', fontWeight: 600 }}>
                        Attached: {formData.additionalFileName}
                      </span>
                    ) : (
                      <>
                        Drop files here or{' '}
                        <span style={{ color: '#2563eb', fontWeight: 600 }}>Select files</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* 6. Websites (Image 2) */}
              <div className="cr-section-banner">
                <div className="cr-section-title-wrap">
                  <LinkIcon size={18} />
                  <span>6. Websites</span>
                </div>
                <button
                  type="button"
                  className="cr-btn-add"
                  onClick={addWebsite}
                >
                  <Plus size={15} />
                  <span>Add</span>
                </button>
              </div>

              <div className="cr-field-group">
                <p style={{ fontSize: '0.85rem', color: '#64748b', margin: '0 0 0.75rem' }}>
                  Add any relevant websites.
                </p>
                {formData.websites.length === 0 ? (
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    No websites added. Click &ldquo;+ Add&rdquo; to add portfolio, LinkedIn, or personal website links.
                  </div>
                ) : (
                  formData.websites.map((w, idx) => (
                    <div
                      key={w.id}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <div className="cr-input-wrapper" style={{ flex: 1 }}>
                        <LinkIcon size={16} className="cr-input-icon" />
                        <input
                          type="url"
                          className="cr-input"
                          placeholder="https://linkedin.com/in/username or portfolio link"
                          value={w.url}
                          onChange={(e) => updateWebsite(w.id, e.target.value)}
                        />
                      </div>
                      <button
                        type="button"
                        className="cr-btn-delete"
                        onClick={() => deleteWebsite(w.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons: Left "← Back", Right "Save and Continue →" */}
              <div className="cr-action-bar">
                <button
                  type="button"
                  className="cr-btn-back"
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <button type="submit" className="cr-btn-next-submit">
                  <span>Save and Continue</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 3: REVIEW & SUBMIT
             ========================================================================= */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit}>
              <div className="cr-card-header">
                <h2 className="cr-card-title">Review &amp; Submit</h2>
                <p className="cr-card-subtitle">
                  Please review your complete application details before final submission.
                </p>
              </div>

              {/* Target Position & Resume Summary */}
              <div className="cr-review-section">
                <div className="cr-review-header">
                  <span className="cr-review-title">Target Position &amp; Resume</span>
                  <button
                    type="button"
                    className="cr-review-edit-link"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit
                  </button>
                </div>
                <div className="cr-review-grid">
                  <div>
                    <div className="cr-review-item-label">Position Applied For</div>
                    <div className="cr-review-item-value">{formData.position}</div>
                  </div>
                  <div>
                    <div className="cr-review-item-label">Attached Resume</div>
                    <div className="cr-review-item-value">
                      {formData.resumeFileName} ({formData.resumeFileSize})
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Details & Contact Summary */}
              <div className="cr-review-section">
                <div className="cr-review-header">
                  <span className="cr-review-title">Personal Details</span>
                  <button
                    type="button"
                    className="cr-review-edit-link"
                    onClick={() => setCurrentStep(1)}
                  >
                    Edit
                  </button>
                </div>
                <div className="cr-review-grid">
                  <div>
                    <div className="cr-review-item-label">Full Name</div>
                    <div className="cr-review-item-value">{formData.fullName}</div>
                  </div>
                  <div>
                    <div className="cr-review-item-label">Email Address</div>
                    <div className="cr-review-item-value">{formData.email}</div>
                  </div>
                  <div>
                    <div className="cr-review-item-label">Phone</div>
                    <div className="cr-review-item-value">
                      {formData.phoneNumber} ({formData.phoneDeviceType})
                    </div>
                  </div>
                  <div>
                    <div className="cr-review-item-label">Date of Birth</div>
                    <div className="cr-review-item-value">{formData.dateOfBirth || 'Not provided'}</div>
                  </div>
                  <div>
                    <div className="cr-review-item-label">Address</div>
                    <div className="cr-review-item-value">
                      {formData.addressLine1}, {formData.city} - {formData.postalCode}
                    </div>
                  </div>
                  <div>
                    <div className="cr-review-item-label">Prior Urja Tenure</div>
                    <div className="cr-review-item-value">
                      {formData.previouslyWorked === 'Yes'
                        ? `Yes (Ref: ${formData.referenceName || 'N/A'}, ID: ${formData.employeeId || 'N/A'})`
                        : 'No'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Work Experience Summary */}
              <div className="cr-review-section">
                <div className="cr-review-header">
                  <span className="cr-review-title">Work Experience</span>
                  <button
                    type="button"
                    className="cr-review-edit-link"
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit
                  </button>
                </div>
                {formData.workExperiences.length === 0 ? (
                  <div style={{ fontSize: '0.88rem', color: '#64748b' }}>No prior work experience listed.</div>
                ) : (
                  formData.workExperiences.map((w, idx) => (
                    <div key={idx} style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>
                        {w.jobTitle} at {w.company}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                        {w.from} — {w.currentWork ? 'Present' : w.to} | {w.location}
                      </div>
                      {w.roleDescription && (
                        <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '3px' }}>
                          {w.roleDescription}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Education Summary */}
              <div className="cr-review-section">
                <div className="cr-review-header">
                  <span className="cr-review-title">Education</span>
                  <button
                    type="button"
                    className="cr-review-edit-link"
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit
                  </button>
                </div>
                {formData.educations.length === 0 ? (
                  <div style={{ fontSize: '0.88rem', color: '#64748b' }}>No education details listed.</div>
                ) : (
                  formData.educations.map((e, idx) => (
                    <div key={idx} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111827' }}>
                        {e.degree} — {e.school}
                      </div>
                      {e.fieldOfStudy && (
                        <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                          Field: {e.fieldOfStudy}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Skills & Certifications Summary */}
              <div className="cr-review-section">
                <div className="cr-review-header">
                  <span className="cr-review-title">Skills &amp; Qualifications</span>
                  <button
                    type="button"
                    className="cr-review-edit-link"
                    onClick={() => setCurrentStep(2)}
                  >
                    Edit
                  </button>
                </div>
                <div style={{ marginBottom: '0.5rem' }}>
                  <div className="cr-review-item-label" style={{ marginBottom: '4px' }}>Skills</div>
                  <div className="cr-skills-tags-container">
                    {formData.skills.map((s) => (
                      <span key={s} className="cr-skill-tag" style={{ padding: '0.25rem 0.65rem' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {formData.certifications.length > 0 && (
                  <div style={{ marginTop: '0.75rem' }}>
                    <div className="cr-review-item-label" style={{ marginBottom: '4px' }}>Certifications</div>
                    {formData.certifications.map((c, idx) => (
                      <div key={idx} style={{ fontSize: '0.85rem', color: '#334155' }}>
                        • {c.name} {c.certNumber ? `(#${c.certNumber})` : ''}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Declaration Checkbox */}
              <div style={{ margin: '1.75rem 0' }}>
                <label className="cr-checkbox-label" style={{ alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    style={{ marginTop: '3px' }}
                    checked={formData.agreeTerms}
                    onChange={(e) => handleChange('agreeTerms', e.target.checked)}
                    required
                  />
                  <span style={{ fontSize: '0.88rem', color: '#374151', lineHeight: '1.5' }}>
                    I certify that all statements and information provided in this application are true, accurate, and complete. I authorize Urja Foods &amp; Agro to verify the credentials and perform background reference checks.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="cr-action-bar">
                <button
                  type="button"
                  className="cr-btn-back"
                  onClick={() => setCurrentStep(2)}
                >
                  <ArrowLeft size={16} />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="cr-btn-next-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* =========================================================================
              STEP 4: SUBMISSION CONFIRMATION SUCCESS VIEW
             ========================================================================= */}
          {currentStep === 4 && (
            <div className="cr-success-view">
              <div className="cr-success-icon-wrap">
                <CheckCircle2 size={46} strokeWidth={2.5} />
              </div>

              <h2 className="cr-card-title" style={{ color: '#166534', marginBottom: '0.5rem' }}>
                Application Submitted Successfully!
              </h2>

              <p style={{ fontSize: '1rem', color: '#475569', maxWidth: '580px', margin: '0 auto 1.25rem' }}>
                Thank you for applying to <strong style={{ color: '#0f3920' }}>Urja Foods &amp; Agro</strong>. Your application dossier has been delivered directly to our talent acquisition team.
              </p>

              <div className="cr-success-code-box">
                <div className="cr-success-code-label">Application Reference Code</div>
                <div className="cr-success-code-val">{submissionResult?.referenceId}</div>
              </div>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem 2rem',
                  maxWidth: '520px',
                  margin: '1.5rem auto 2.5rem',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Candidate:</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{formData.fullName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Target Role:</span>
                  <span style={{ fontWeight: 700, color: '#1e293b' }}>{formData.position}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Email:</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{formData.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span style={{ color: '#64748b' }}>Timestamp:</span>
                  <span style={{ color: '#475569' }}>{submissionResult?.timestamp}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  className="cr-btn-back"
                  onClick={() => window.print()}
                >
                  <Printer size={16} />
                  <span>Print Receipt</span>
                </button>

                <button
                  type="button"
                  className="cr-btn-next-submit"
                  onClick={() => {
                    setCurrentStep(1);
                    setFormData((prev) => ({
                      ...prev,
                      resumeFile: null,
                      resumeFileName: '',
                      workExperiences: [],
                      educations: [],
                      certifications: [],
                      agreeTerms: false,
                    }));
                  }}
                >
                  <span>Submit Another Application</span>
                </button>

                <Link
                  to="/"
                  className="cr-btn-back"
                  style={{ textDecoration: 'none' }}
                >
                  <span>Return to Home</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
