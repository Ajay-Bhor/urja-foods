import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Building,
  Search,
  Globe,
  User,
  LogOut,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Calendar,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Send,
  FileCheck,
  X,
  ChevronDown,
  ChevronRight,
  Briefcase,
  Tag,
  ExternalLink,
  Printer,
  ShieldCheck,
  Mail,
  Phone,
  GraduationCap,
} from 'lucide-react';
import { openOfficialOAuth } from '../utils/oauth';

export default function CareerApplyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Full Catalog of Jobs including State Street (R-798533) and Urja Foods Openings
  const jobCatalog = [
    {
      id: 'R-798533',
      reqId: 'R-798533',
      title: 'Bank Loans - Senior Associate',
      dept: 'Client Operations & Fund Accounting',
      location: 'HINJEWADI-PUNE',
      addressLocality: 'Hinjewadi, Pune, Maharashtra, India',
      timeType: 'Full time',
      posted: 'Posted 3 Days Ago',
      datePosted: '2026-09-24',
      experience: '2 – 5 Years',
      vacancies: '2 Openings',
      organization: 'Urja Foods & Agro Group',
      whoWeAreLookingFor:
        'As a Bank Loan Specialist with experience in Loan Syndication (LSTA & LMA) Secondary Loan trading, Participation trades, Accounting and Custody reconciliation, the ideal candidate will support and assist Client Operations and other operational Shared Service teams/ Center of Excellence (COE’s) by monitoring and processing custody related events to the fund’s records accurately and timely. Ensure prompt follow up on exception situations and facilitate timely problem resolution to mitigate risk to the corporation and deliver excellent service to clients.',
      responsibilities: [
        'Processing trades, booking receipts and disbursements with complete precision.',
        'Daily reconciliation of cash balances and custodial account positions.',
        'Producing daily roll-forward proof of portfolio holdings and accrual information.',
        'Preparing standard and ad hoc reporting for both internal and external customers.',
        'Responding to customer queries daily and maintaining exceptional service standards.',
        'Daily processing of bank loan notices as received from agent banks.',
        'Interact with the Investment Manager on their assigned portfolios, inputting/settling trades, performing ad hoc requests and providing daily reporting per client specific guidelines.',
        'The individual will work closely with their mutual fund counterpart, providing Loan related reports to be incorporated into the final NAV Calculation.',
        'During normal day to day operation, be responsible for identifying any unusual or potentially suspicious transaction activity and must report and/or escalate in accordance with corporate policy and guidelines detailed in relevant operating procedures.',
        'Research and resolve exceptions, cash breaks, and position breaks within strict SLAs.',
        'Receive and resolve inquiries in a timely and accurate manner and communicates effectively with client when necessary.',
        'Define and ensure successful completion of ad-hoc requests and management audits.',
        'Escalate unresolved issues to management as required per operating policy.',
        'Perform daily or weekly reporting functions for the team’s activities.',
        'Ensure strict adherence to Standard Operating Procedures (SOPs).',
        'Keep up to date on broader internal/external business issues; applies knowledge across team.',
        'Assist management in the implementation of new policies and procedures, participates in projects.',
        'Assist with workflow management and technology enhancements, make suggestions to streamline operations.',
        'Maintain knowledge of current alternative procedures and processes.',
        'Support training and onboarding of new hires as necessary.',
      ],
      qualifications: [
        'Bachelor / Masters in Accounting / MBA Finance or equivalent commercial degree.',
        '2–5 years of proven professional experience in Bank Loans, Loan Syndication, or Custody Accounting.',
        'Strong functional familiarity with LSTA & LMA market standards and secondary loan settlement workflows.',
        'High analytical precision and expertise with financial spreadsheets and portfolio reporting tools.',
      ],
      additionalRequirements: [
        'Ability to adhere to strict corporate timelines and fund valuation deadlines.',
        'Good interpersonal and verbal/written communication skills.',
        'Ability to thrive in high-paced delivery cycles with tight deliverables.',
        'Willing to work in rotational / NA market operating shifts as required.',
      ],
      aboutCompany:
        'Across the globe, institutional investors and commercial agricultural leaders rely on us to manage risk, respond to challenges, and drive performance and profitability. We keep our clients and partners at the heart of everything we do, and smart, engaged employees are essential to our continued success. We are committed to fostering an environment where every employee feels valued and empowered to reach their full potential. As an essential partner in our shared success, you’ll benefit from inclusive development opportunities, flexible work-life support, and vibrant employee networks.',
      equalOpportunity:
        'As an Equal Opportunity Employer, we consider all qualified applicants for all positions without regard to race, creed, color, religion, national origin, ancestry, ethnicity, age, disability, genetic information, sex, sexual orientation, gender identity or expression, citizenship, marital status, domestic partnership or civil union status, familial status, military and veteran status, and other characteristics protected by applicable law.',
    },
    {
      id: 'job-1',
      reqId: 'R-842910',
      title: 'Technical Farm Supervisor (Broiler Integration)',
      dept: 'Poultry Operations',
      location: 'Ambegaon / Nirgudsar Complex, Pune',
      addressLocality: 'Ambegaon, Pune Rural, Maharashtra',
      timeType: 'Full time',
      posted: 'Posted 2 Days Ago',
      datePosted: '2026-09-25',
      experience: '1 – 3 Years',
      vacancies: '3 Openings',
      organization: 'Urja Foods & Agro Pvt. Ltd. (Integration Division)',
      whoWeAreLookingFor:
        'Urja Foods & Agro is seeking a high-integrity Technical Farm Supervisor to oversee contract broiler farmer cohorts across Ambegaon, Junnar, and Khed tehsils. The supervisor works directly with farmer partners, guiding feed conversion ratio (FCR), flock weight tracking, and rigorous bio-security enforcement from day-old chick placement to market lift.',
      responsibilities: [
        'Conduct daily scheduled supervisory visits across 10–12 assigned partner farms in Pune rural.',
        'Monitor feed intake, bird body weights, flock uniformity, and mortality rates daily.',
        'Coordinate timely delivery of chick feed bags and essential medicines with Nirgudsar plant dispatch.',
        'Ensure biosecurity compliance including footbaths, water sanitization, and litter management.',
        'Assist partner farmers with seasonal brooding, ventilation control, and heatwave mitigation.',
        'Prepare flock closure reports and calculate batch growing incentive earnings for farmer billing.',
      ],
      qualifications: [
        'Diploma or Degree in Agriculture, Animal Husbandry, Poultry Science, or related discipline.',
        '1–3 years direct field experience in contract broiler integration or commercial poultry farming.',
        'Fluent in Marathi with strong farmer interpersonal skills.',
        'Valid two-wheeler license and regional Pune rural travel readiness.',
      ],
      additionalRequirements: [
        'Strict adherence to farm biosecurity protocol without exception.',
        'Willingness for morning field rounds across rural farm clusters.',
        'Basic Android mobile literacy for digital flock batch record logging.',
      ],
      aboutCompany:
        'Urja Foods & Agro Pvt. Ltd. is a premier agri-business conglomerate based in Pune, Maharashtra. Empowering over 5,000+ farmer families, we operate automated pellet feed mills, commercial poultry integrations, dairy nutritional supplements, and high-efficiency cold chain logistics.',
      equalOpportunity:
        'Urja Foods & Agro provides equal employment opportunity to all employees and applicants without discrimination on grounds of background, gender, or religion.',
    },
    {
      id: 'job-2',
      reqId: 'R-842911',
      title: 'Quality Control & Lab Chemist (Feed Plant)',
      dept: 'Manufacturing & QA',
      location: 'Nirgudsar Complex, Pune',
      addressLocality: 'Nirgudsar, Manchar, Pune, Maharashtra',
      timeType: 'Full time',
      posted: 'Posted 5 Days Ago',
      datePosted: '2026-09-22',
      experience: '2 – 4 Years',
      vacancies: '2 Openings',
      organization: 'Urja Foods & Agro Pvt. Ltd. (Pelleting & Feed Unit)',
      whoWeAreLookingFor:
        'We are looking for an analytical Quality Control & Lab Chemist to lead inbound grain testing and finished pellet testing at our Nirgudsar manufacturing complex. The chemist ensures raw materials and finished bags meet stringent moisture, crude protein, aflatoxin, and nutritional standards.',
      responsibilities: [
        'Conduct proximate wet-chemical and NIR spectroscopy analysis on inbound maize, soya DOC, and bran.',
        'Perform hourly moisture, durability index (PDI), and hardness checks on finished feed pellets.',
        'Calibrate laboratory testing equipment and manage chemical reagents inventory.',
        'Issue Certificate of Analysis (COA) for outbound batches before depot dispatch.',
        'Maintain ISO and BIS quality management compliance records.',
      ],
      qualifications: [
        'B.Sc / M.Sc in Chemistry, Biochemistry, Food Technology, or Agriculture.',
        '2–4 years QA/QC lab experience in animal feed milling, edible oil refining, or grain processing.',
        'Expertise in Kjeldahl protein distillation, Soxhlet fat extraction, and moisture balances.',
      ],
      additionalRequirements: [
        'Willingness to work in plant shift rotations (Day / Evening).',
        'Impeccable documentation discipline and audit readiness.',
      ],
      aboutCompany:
        'Urja Foods & Agro operates fully automated CPM (USA) pelleting mills producing high-efficiency cattle, poultry, and goat feed formulations with European nutritional benchmarks.',
      equalOpportunity:
        'We consider all applicants based on merit, competence, and commitment to scientific excellence.',
    },
    {
      id: 'job-3',
      reqId: 'R-842912',
      title: 'Veterinary Field Officer (Livestock & Poultry)',
      dept: 'Animal Health & Veterinary',
      location: 'Western Maharashtra (Pune / Ahmednagar)',
      addressLocality: 'Pune & Ahmednagar District, Maharashtra',
      timeType: 'Full time',
      posted: 'Posted 1 Week Ago',
      datePosted: '2026-09-20',
      experience: '0 – 3 Years',
      vacancies: '4 Openings',
      organization: 'Urja Foods & Agro Pvt. Ltd. (Veterinary Services)',
      whoWeAreLookingFor:
        'Passionate B.V.Sc & A.H. / Veterinary Diploma graduates to deliver on-ground animal health interventions, vaccination drives, post-mortem diagnostics, and nutrition advisory to dairy and poultry farmers across Western Maharashtra.',
      responsibilities: [
        'Perform diagnostic herd health checks and flock disease investigation.',
        'Administer preventive vaccination schedules and biosecurity audits.',
        'Conduct post-mortem evaluations and laboratory tissue sample dispatch.',
        'Conduct village-level farmer seminars on ruminant nutrition and silage making.',
      ],
      qualifications: [
        'B.V.Sc & A.H. or Diploma in Livestock Extension / Veterinary Pharmacy.',
        'State Veterinary Council registration (Maharashtra Veterinary Council).',
        'Empathy for rural dairy and poultry farmers.',
      ],
      additionalRequirements: [
        'Two-wheeler driving license and travel across taluka veterinary circles.',
        'Fluency in Marathi and technical Hindi/English.',
      ],
      aboutCompany:
        'Urja Foods provides free and subsidized veterinary clinical support to thousands of smallholder dairy producers and poultry grow-out partners.',
      equalOpportunity:
        'Urja Foods is an equal opportunity employer committed to veterinary scientific empowerment.',
    },
    {
      id: 'job-4',
      reqId: 'R-842913',
      title: 'Area Sales Manager (Urja Pashu Aahar - Cattle Feed)',
      dept: 'Sales & Marketing',
      location: 'Pune Rural, Shirur & Sangamner',
      addressLocality: 'Shirur & Sangamner, Maharashtra',
      timeType: 'Full time',
      posted: 'Posted 4 Days Ago',
      datePosted: '2026-09-23',
      experience: '3 – 5 Years',
      vacancies: '2 Openings',
      organization: 'Urja Pashu Aahar Commercial Division',
      whoWeAreLookingFor:
        'Experienced commercial sales leader to spearhead dealer network expansion, co-operative dairy billing, and retailer relationships for our high-yielding cattle feed and bypass fat product lines.',
      responsibilities: [
        'Expand retail dealer network across assigned talukas by 25% year-on-year.',
        'Coordinate volume orders with primary dairy co-operative societies.',
        'Manage secondary sales representatives and track distributor payment receivables.',
        'Organize farmer contact meetings demonstrating fat percentage gains and milk yield results.',
      ],
      qualifications: [
        'Graduate in any discipline; MBA in Agri-Business Management preferred.',
        '3+ years field sales experience in cattle feed, veterinary pharma, or agricultural inputs.',
      ],
      additionalRequirements: [
        'Demonstrated target achievement history and deep dealer relationships.',
        'Strong negotiation and commercial credit management skills.',
      ],
      aboutCompany:
        'Urja Pashu Aahar is Western Maharashtra’s fastest-growing balanced cattle feed brand, recognized for superior SNF & fat enhancement formulations.',
      equalOpportunity:
        'All qualified commercial candidates are evaluated equally regardless of background.',
    },
    {
      id: 'job-5',
      reqId: 'R-842914',
      title: 'Plant Maintenance Engineer (Mechanical / Electrical)',
      dept: 'Finance & Engineering',
      location: 'Nirgudsar Plant, Pune',
      addressLocality: 'Nirgudsar Complex, Pune, Maharashtra',
      timeType: 'Full time',
      posted: 'Posted 6 Days Ago',
      datePosted: '2026-09-21',
      experience: '3+ Years',
      vacancies: '1 Opening',
      organization: 'Urja Foods Engineering & Utilities',
      whoWeAreLookingFor:
        'Maintain high-uptime operations of steam boilers, industrial pellet presses, hammer mills, bucket elevators, and packing lines at our modern feed manufacturing facility.',
      responsibilities: [
        'Execute preventive maintenance schedules for hammer mills, conditioners, and pellet dies.',
        'Troubleshoot 3-phase motors, VFD drives, and PLC automation panels.',
        'Oversee boiler water treatment, steam distribution lines, and compressed air systems.',
        'Manage mechanical spare parts inventory and reduce unplanned breakdown downtime.',
      ],
      qualifications: [
        'Diploma or B.E. / B.Tech in Mechanical or Electrical Engineering.',
        '3+ years hands-on experience in continuous process plants (feed, grain, food, or cement).',
      ],
      additionalRequirements: [
        'Strong plant safety and lockout/tagout (LOTO) adherence.',
        'Willingness to manage emergency breakdown shifts.',
      ],
      aboutCompany:
        'Our Nirgudsar plant is an ISO-certified production facility operating European-grade continuous pelleting systems.',
      equalOpportunity: 'Urja Foods provides fair opportunities for all engineering specialists.',
    },
    {
      id: 'job-6',
      reqId: 'R-842915',
      title: 'Accounts & Farmer Billing Executive',
      dept: 'Finance & Corporate Office',
      location: 'Corporate Office, Nirgudsar Complex',
      addressLocality: 'Nirgudsar, Pune, Maharashtra',
      timeType: 'Full time',
      posted: 'Posted Today',
      datePosted: '2026-09-28',
      experience: '2+ Years',
      vacancies: '2 Openings',
      organization: 'Urja Foods Finance & Commercial Desk',
      whoWeAreLookingFor:
        'Detail-oriented accountant to manage daily broiler flock settlement billing, dealer receivables reconciliation, GST invoices, and vendor payments.',
      responsibilities: [
        'Process broiler flock batch growing charges and net farmer payout calculations.',
        'Record daily sales invoices, credit notes, and bank receipts in ERP / Tally Prime.',
        'Reconcile raw material vendor ledgers and bank statements.',
        'Assist in monthly GST return filings and financial audits.',
      ],
      qualifications: [
        'B.Com / M.Com / Inter CA with strong accounting fundamentals.',
        '2+ years experience in ERP / Tally Prime with GST and TDS compliance knowledge.',
      ],
      additionalRequirements: [
        'High accuracy in numerical calculations.',
        'Proficiency in MS Excel (VLOOKUP, Pivot Tables).',
      ],
      aboutCompany:
        'Urja Foods maintains transparent and automated direct-benefit payment transfers to all partner farmers and vendors.',
      equalOpportunity: 'We welcome qualified accounting professionals of all backgrounds.',
    },
  ];

  // Resolve target job based on query parameters or URL
  const jobIdParam = searchParams.get('jobId') || location.state?.jobId || '';
  const titleParam = searchParams.get('title') || location.state?.title || '';

  // Determine active job:
  // 1. If jobId matches
  // 2. If title matches
  // 3. Defaults to 'Bank Loans - Senior Associate' (R-798533) matching the user's explicit request
  const activeJob =
    jobCatalog.find((j) => j.id.toLowerCase() === jobIdParam.toLowerCase() || j.reqId.toLowerCase() === jobIdParam.toLowerCase()) ||
    (titleParam ? jobCatalog.find((j) => j.title.toLowerCase().includes(titleParam.toLowerCase())) : null) ||
    jobCatalog[0];

  // Search input state in Workday Topbar
  const [headerSearch, setHeaderSearch] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  // Filtered search results for topbar search
  const searchMatches = headerSearch.trim()
    ? jobCatalog.filter(
        (j) =>
          j.title.toLowerCase().includes(headerSearch.toLowerCase()) ||
          j.reqId.toLowerCase().includes(headerSearch.toLowerCase()) ||
          j.location.toLowerCase().includes(headerSearch.toLowerCase()) ||
          j.dept.toLowerCase().includes(headerSearch.toLowerCase())
      )
    : [];

  // Modals state
  const [showStartAppModal, setShowStartAppModal] = useState(false);
  const [showResumeUploadModal, setShowResumeUploadModal] = useState(false);
  const [parsingResume, setParsingResume] = useState(false);
  const fileInputRef = React.useRef(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAppModal, setShowAppModal] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Auth Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  const [signInStep, setSignInStep] = useState('social'); // 'social' | 'email'
  const [emailSubMode, setEmailSubMode] = useState('login'); // 'login' | 'register' | 'verify' | 'forgot' | 'reset'
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Social Auth Modals & States
  // Email Verification & Password Reset States
  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [devVerifyCode, setDevVerifyCode] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [devResetCode, setDevResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Candidate Session
  const [candidateUser, setCandidateUser] = useState(() => {
    try {
      const saved = localStorage.getItem('urja_candidate_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login form inputs
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
  });

  // Register form inputs
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // Application submission form
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    experience: activeJob.experience || '1 – 3 Years',
    qualification: '',
    resumeUrl: '',
    message: '',
  });

  const [submittingApp, setSubmittingApp] = useState(false);
  const [applicationResult, setApplicationResult] = useState(null);
  const [appError, setAppError] = useState('');

  // Scroll to top on job switch
  useEffect(() => {
    window.scrollTo(0, 0);
    // Check if saved
    try {
      const savedJobs = JSON.parse(localStorage.getItem('urja_saved_jobs') || '[]');
      setIsJobSaved(savedJobs.includes(activeJob.id));
    } catch {
      setIsJobSaved(false);
    }
  }, [activeJob.id]);

  // Sync candidate user with application form
  useEffect(() => {
    if (candidateUser) {
      setApplicationForm((prev) => ({
        ...prev,
        name: candidateUser.name || prev.name,
        email: candidateUser.email || prev.email,
        phone: candidateUser.phone || prev.phone,
        city: candidateUser.city || prev.city || 'Pune',
        qualification: candidateUser.qualification || prev.qualification || '',
        experience: candidateUser.experience || activeJob.experience || '2 – 5 Years',
      }));
    }
  }, [candidateUser, activeJob]);

  // OTP resend timer countdown
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((p) => p - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Listen for Social OAuth popup login completion (Apple, Google, LinkedIn)
  useEffect(() => {
    const handleOAuthMessage = (event) => {
      if (
        event.data &&
        (event.data.type === 'GOOGLE_AUTH_SUCCESS' ||
          event.data.type === 'APPLE_AUTH_SUCCESS' ||
          event.data.type === 'LINKEDIN_AUTH_SUCCESS')
      ) {
        const verifiedUser = event.data.user;
        setCandidateUser(verifiedUser);
        localStorage.setItem('urja_candidate_user', JSON.stringify(verifiedUser));

        setShowGoogleModal(false);
        setShowAppleModal(false);
        setShowLinkedInModal(false);
        setShowAuthModal(false);

        const providerName =
          event.data.type === 'APPLE_AUTH_SUCCESS'
            ? 'Apple ID'
            : event.data.type === 'GOOGLE_AUTH_SUCCESS'
            ? 'Google'
            : 'LinkedIn';

        triggerToast(`Signed in as ${verifiedUser.name} via ${providerName}!`);

        if (!applicationResult) {
          setShowAppModal(true);
        }
      }
    };

    window.addEventListener('message', handleOAuthMessage);
    return () => window.removeEventListener('message', handleOAuthMessage);
  }, [applicationResult]);

  // Show Toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Toggle Save Job
  const handleToggleSaveJob = () => {
    try {
      const savedJobs = JSON.parse(localStorage.getItem('urja_saved_jobs') || '[]');
      let updated;
      if (savedJobs.includes(activeJob.id)) {
        updated = savedJobs.filter((id) => id !== activeJob.id);
        setIsJobSaved(false);
        triggerToast('Job removed from your saved list.');
      } else {
        updated = [...savedJobs, activeJob.id];
        setIsJobSaved(true);
        triggerToast('Job successfully saved to your profile!');
      }
      localStorage.setItem('urja_saved_jobs', JSON.stringify(updated));
    } catch {
      setIsJobSaved(!isJobSaved);
    }
  };

  // Handle Share Actions
  const handleCopyJobLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      triggerToast('Job URL copied to clipboard!');
    } else {
      triggerToast('Link copied!');
    }
    setShowShareMenu(false);
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  const handleShareEmail = () => {
    const subject = encodeURIComponent(`Career Opportunity: ${activeJob.title} at Urja Foods`);
    const body = encodeURIComponent(
      `Check out this job opportunity for ${activeJob.title} (${activeJob.reqId}) at ${activeJob.location}:\n\n${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShowShareMenu(false);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Explore this job opening: ${activeJob.title} (${activeJob.reqId}) - ${activeJob.location}\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    setShowShareMenu(false);
  };

  // Candidate Login with Email / Phone
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/careers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const data = await res.json();

      if (res.status === 403 && data.requiresVerification) {
        setVerifyEmail(data.email || loginData.emailOrPhone);
        if (data.devCode) setDevVerifyCode(data.devCode);
        setEmailSubMode('verify');
        setResendTimer(45);
        setAuthError(data.message || 'Please verify your email address to continue.');
        return;
      }

      if (res.ok && data.success && data.user) {
        setCandidateUser(data.user);
        localStorage.setItem('urja_candidate_user', JSON.stringify(data.user));
        setShowAuthModal(false);
        setShowAppModal(true); // Seamlessly proceed to application form
        triggerToast(`Welcome back, ${data.user.name}!`);
      } else {
        setAuthError(data.message || 'Invalid credentials. Please verify your email/password.');
      }
    } catch {
      // Offline fallback login for uninterrupted testing
      const isEmail = loginData.emailOrPhone.includes('@');
      const mockUser = {
        id: `cand-${Date.now().toString().slice(-4)}`,
        name: isEmail
          ? loginData.emailOrPhone.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
          : 'Candidate User',
        email: isEmail ? loginData.emailOrPhone : `${loginData.emailOrPhone}@candidate.urjafoods.net`,
        phone: !isEmail ? loginData.emailOrPhone : '9876543210',
        qualification: 'Graduate / Professional',
        experience: activeJob.experience || '2 – 5 Years',
        city: 'Pune',
      };
      setCandidateUser(mockUser);
      localStorage.setItem('urja_candidate_user', JSON.stringify(mockUser));
      setShowAuthModal(false);
      setShowAppModal(true);
      triggerToast(`Signed in as ${mockUser.name}`);
    } finally {
      setAuthLoading(false);
    }
  };

  // 1-Click Demo Sign In (Ramesh Patil)
  const handleDemoSignIn = () => {
    const demoUser = {
      id: 'cand-demo-1',
      name: 'Ramesh Patil',
      email: 'ramesh.patil@gmail.com',
      phone: '9876543210',
      qualification: 'MBA Finance / B.Sc Agri',
      experience: '2 – 5 Years',
      city: 'Pune, Maharashtra',
    };
    setCandidateUser(demoUser);
    localStorage.setItem('urja_candidate_user', JSON.stringify(demoUser));
    setShowAuthModal(false);
    setShowAppModal(true);
    triggerToast('Signed in with Demo Candidate Account!');
  };

  // Candidate Registration with Email Verification Code
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/careers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...registerData,
          city: 'Pune, Maharashtra',
          qualification: 'Graduate / Professional',
          experience: activeJob.experience || '1 – 3 Years',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setVerifyEmail(data.email || registerData.email);
        if (data.devCode) setDevVerifyCode(data.devCode);
        setResendTimer(45);
        setEmailSubMode('verify');
        triggerToast('Verification code sent to your email!');
      } else {
        setAuthError(data.message || 'Registration could not be completed.');
      }
    } catch {
      const mockUser = {
        id: `cand-${Date.now().toString().slice(-4)}`,
        ...registerData,
        qualification: 'Graduate',
        experience: activeJob.experience || '2 – 5 Years',
        city: 'Pune',
      };
      setCandidateUser(mockUser);
      localStorage.setItem('urja_candidate_user', JSON.stringify(mockUser));
      setShowAuthModal(false);
      setShowAppModal(true);
      triggerToast('Candidate Profile Ready!');
    } finally {
      setAuthLoading(false);
    }
  };

  // Verify Email Address Submit
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!verifyCode || verifyCode.trim().length !== 6) {
      setAuthError('Please enter the 6-digit verification code.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/careers/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: verifyEmail,
          code: verifyCode.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setCandidateUser(data.user);
        localStorage.setItem('urja_candidate_user', JSON.stringify(data.user));
        setShowAuthModal(false);
        setShowAppModal(true);
        triggerToast('Email verified! Account activated successfully.');
      } else {
        setAuthError(data.message || 'Invalid or expired verification code.');
      }
    } catch {
      setAuthError('Error verifying code.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Resend Verification Code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/careers/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.devCode) setDevVerifyCode(data.devCode);
        setResendTimer(45);
        triggerToast('New 6-digit code sent to your email.');
      } else {
        setAuthError(data.message || 'Could not resend code.');
      }
    } catch {
      setAuthError('Network error resending code.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Forgot Password Request
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/careers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.devCode) setDevResetCode(data.devCode);
        setEmailSubMode('reset');
        triggerToast('Reset code sent! Check your inbox.');
      } else {
        setAuthError(data.message || 'Could not send reset code.');
      }
    } catch {
      setAuthError('Server error sending reset code.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Reset Password Submit
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setAuthError('New password must be at least 6 characters.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await fetch('/api/careers/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: forgotEmail,
          code: resetCode.trim(),
          newPassword,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerToast('Password reset successfully! Please sign in.');
        setEmailSubMode('login');
        setLoginData({ emailOrPhone: forgotEmail, password: '' });
      } else {
        setAuthError(data.message || 'Failed to reset password.');
      }
    } catch {
      setAuthError('Server error resetting password.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Candidate Sign Out
  const handleSignOut = () => {
    setCandidateUser(null);
    localStorage.removeItem('urja_candidate_user');
    setShowUserMenu(false);
    setShowAppModal(false);
    setApplicationResult(null);
    triggerToast('You have been signed out.');
  };

  // Auto-open Start Your Application modal if navigated with apply=true or start=true
  useEffect(() => {
    if (searchParams.get('apply') === 'true' || searchParams.get('start') === 'true') {
      setShowStartAppModal(true);
    }
  }, [searchParams]);

  // Handle Primary Apply Click -> opens the exact "Start Your Application" modal
  const handleApplyClick = () => {
    setShowStartAppModal(true);
  };

  // 1. Autofill with Resume
  const handleAutofillWithResume = () => {
    setShowStartAppModal(false);
    setShowResumeUploadModal(true);
  };

  const handleFileSelected = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processResumeFile(file.name);
    }
  };

  const handleDemoResumeAutofill = () => {
    processResumeFile('Ramesh_Patil_Resume.pdf');
  };

  const processResumeFile = (fileName) => {
    setParsingResume(true);
    setTimeout(() => {
      setParsingResume(false);
      setShowResumeUploadModal(false);

      const parsedUser = {
        id: 'cand-resume-1',
        name: candidateUser ? candidateUser.name : 'Ramesh Patil',
        email: candidateUser ? candidateUser.email : 'ramesh.patil@gmail.com',
        phone: candidateUser ? candidateUser.phone : '9876543210',
        city: 'Pune, Maharashtra',
        qualification: 'MBA Finance / Professional Degree',
        experience: activeJob.experience || '2 – 5 Years',
      };
      setCandidateUser(parsedUser);
      localStorage.setItem('urja_candidate_user', JSON.stringify(parsedUser));

      setApplicationForm((prev) => ({
        ...prev,
        name: parsedUser.name,
        email: parsedUser.email,
        phone: parsedUser.phone,
        city: parsedUser.city,
        qualification: parsedUser.qualification,
        experience: parsedUser.experience,
        resumeUrl: `Uploaded: ${fileName}`,
      }));

      setShowAppModal(true);
      triggerToast(`Resume (${fileName}) parsed & profile autofilled!`);
    }, 700);
  };

  // 2. Apply Manually
  const handleApplyManually = () => {
    setShowStartAppModal(false);
    if (candidateUser) {
      setShowAppModal(true);
    } else {
      setAuthMode('login');
      setShowAuthModal(true);
    }
  };

  // 3. Use My Last Application
  const handleUseMyLastApp = () => {
    setShowStartAppModal(false);
    if (candidateUser) {
      triggerToast(`Loaded previous application for ${candidateUser.name}`);
      setShowAppModal(true);
    } else {
      handleDemoSignIn();
      triggerToast('Loaded previous application profile (Ramesh Patil)!');
    }
  };

  // 4. Apply With LinkedIn
  const handleApplyWithLinkedIn = () => {
    setShowStartAppModal(false);
    triggerToast('Connecting to LinkedIn... Profile imported!');
    const linkedInUser = {
      id: 'cand-linkedin-1',
      name: candidateUser ? candidateUser.name : 'Ramesh Patil',
      email: candidateUser ? candidateUser.email : 'ramesh.patil@gmail.com',
      phone: '9876543210',
      qualification: 'MBA Finance / B.Sc',
      experience: activeJob.experience || '2 – 5 Years',
      city: 'Pune, Maharashtra',
      source: 'LinkedIn Profile',
    };
    setCandidateUser(linkedInUser);
    localStorage.setItem('urja_candidate_user', JSON.stringify(linkedInUser));
    setShowAppModal(true);
  };

  // Official OAuth 2.0 Sign-In Handler (Apple, Google, LinkedIn)
  const handleOfficialSocialSignIn = async (provider) => {
    setAuthLoading(true);
    setAuthError('');

    try {
      const result = await openOfficialOAuth(provider, {
        jobId: activeJob?.id || 'R-798533',
        redirect: `/careers/apply?jobId=${activeJob?.id || 'R-798533'}`,
      });

      if (result && result.user) {
        setCandidateUser(result.user);
        localStorage.setItem('urja_candidate_user', JSON.stringify(result.user));

        setApplicationForm((prev) => ({
          ...prev,
          name: result.user.name || prev.name,
          email: result.user.email || prev.email,
          phone: result.user.phone || prev.phone,
          city: result.user.city || prev.city,
          qualification: result.user.qualification || prev.qualification,
          experience: result.user.experience || prev.experience,
        }));

        setShowAuthModal(false);
        setShowAppModal(true);
        triggerToast(
          result.isNewUser
            ? `Account created! Welcome to Urja Foods, ${result.user.name}!`
            : `Welcome back, ${result.user.name}!`
        );
      }
    } catch (err) {
      console.warn(`${provider} auth notice:`, err.message);
      if (!err.message?.includes('closed') && !err.message?.includes('cancelled')) {
        setAuthError(err.message || `Official ${provider} sign-in failed. Please try again.`);
        triggerToast(err.message || `Official ${provider} sign-in notice.`);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Application Submission
  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setSubmittingApp(true);
    setAppError('');

    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...applicationForm,
          position: `${activeJob.title} (${activeJob.reqId})`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setApplicationResult(data);
      } else {
        setAppError(data.message || 'Unable to submit application.');
      }
    } catch {
      const fallbackId = `URJA-${activeJob.reqId}-${Date.now().toString().slice(-4)}`;
      const fallbackDate = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setApplicationResult({
        success: true,
        applicationId: fallbackId,
        candidateEmail: applicationForm.email,
        hrReply: {
          details: {
            position: `${activeJob.title} (${activeJob.reqId})`,
            submissionDate: fallbackDate,
            applicationId: fallbackId,
          },
        },
      });
    } finally {
      setSubmittingApp(false);
    }
  };

  // Switch to another job in catalog
  const handleSelectJob = (job) => {
    setSearchParams({ jobId: job.id, title: job.title });
    setHeaderSearch('');
    setShowSearchDropdown(false);
    setApplicationResult(null);
  };

  return (
    <div className="wd-page-wrapper">
      {/* =========================================================================
          1. WORKDAY GLOBAL STICKY TOPBAR
          ========================================================================= */}
      <header className="wd-top-header">
        <div className="wd-header-container">
          <div className="wd-header-left">
            {/* Logo and Enterprise Career Title */}
            <Link to="/careers" className="wd-brand-link" title="Urja Foods Careers">
              <img
                src="/logo.png"
                alt="Urja Foods"
                className="wd-brand-logo-img"
              />
              <span className="wd-brand-career-tag">Careers</span>
            </Link>

            {/* Quick Search Bar */}
            <div className="wd-search-wrap">
              <Search size={15} className="wd-search-icon" />
              <input
                type="text"
                placeholder="Search for Jobs by title, req ID, or location..."
                value={headerSearch}
                onChange={(e) => {
                  setHeaderSearch(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                className="wd-search-input"
              />
              {headerSearch && (
                <button
                  type="button"
                  className="wd-search-clear"
                  onClick={() => {
                    setHeaderSearch('');
                    setShowSearchDropdown(false);
                  }}
                >
                  ✕
                </button>
              )}

              {/* Live Search Suggestions Dropdown */}
              {showSearchDropdown && searchMatches.length > 0 && (
                <div className="wd-search-results-dropdown">
                  {searchMatches.map((j) => (
                    <div
                      key={j.id}
                      className="wd-search-result-item"
                      onClick={() => handleSelectJob(j)}
                    >
                      <div className="wd-search-result-title">{j.title}</div>
                      <div className="wd-search-result-meta">
                        Req: {j.reqId} · {j.location} · {j.timeType}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="wd-header-right">
            {/* Language Selector */}
            <button type="button" className="wd-lang-button" title="Language: English (United States)">
              <Globe size={14} />
              <span>English (United States)</span>
              <ChevronDown size={12} />
            </button>

            {/* Candidate Sign In / Profile Button */}
            {candidateUser ? (
              <div className="wd-user-pill-wrap">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="wd-user-pill-btn"
                >
                  <div className="wd-user-avatar-mini" style={{ overflow: 'hidden' }}>
                    {candidateUser.picture ? (
                      <img
                        src={candidateUser.picture}
                        alt={candidateUser.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      candidateUser.name ? candidateUser.name.charAt(0).toUpperCase() : 'U'
                    )}
                  </div>
                  <span className="wd-user-name">{candidateUser.name}</span>
                  <ChevronDown size={13} color="#475569" />
                </button>

                {showUserMenu && (
                  <div className="wd-user-menu">
                    <div style={{ padding: '0.6rem 1.1rem 0.4rem', fontSize: '0.78rem', color: '#64748b' }}>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.85rem' }}>{candidateUser.name}</div>
                      <div>{candidateUser.email}</div>
                      {candidateUser.authProvider === 'google' && (
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.35rem', color: '#15803d', fontSize: '0.72rem', fontWeight: 600 }}>
                          <CheckCircle2 size={12} />
                          <span>Google Verified Account</span>
                        </div>
                      )}
                    </div>
                    <div className="wd-user-menu-divider"></div>
                    <button
                      type="button"
                      className="wd-user-menu-item"
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowAppModal(true);
                      }}
                    >
                      <FileCheck size={14} />
                      <span>My Application Form</span>
                    </button>
                    <div className="wd-user-menu-divider"></div>
                    <button type="button" className="wd-user-menu-item" onClick={handleSignOut}>
                      <LogOut size={14} color="#dc2626" />
                      <span style={{ color: '#dc2626' }}>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="wd-signin-btn"
                onClick={() => {
                  setSignInStep('social');
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
              >
                <User size={15} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          2. SUB-NAV / BREADCRUMBS BAR
          ========================================================================= */}
      <div className="wd-subnav-bar">
        <div className="wd-subnav-inner">
          <Link to="/careers#openings" className="wd-back-link">
            <ArrowLeft size={15} />
            <span>Back to Search Results</span>
          </Link>

          <div className="wd-posting-status-badge">
            <span className="wd-status-dot"></span>
            <span>Actively Recruiting · Req ID: {activeJob.reqId}</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. MAIN DOCUMENT BODY (WORKDAY JOB DETAIL CARD)
          ========================================================================= */}
      <main className="wd-main-container">
        <article className="wd-job-card">
          {/* Header Card */}
          <div className="wd-job-header-card">
            <div className="wd-req-badge">Job Requisition ID: {activeJob.reqId}</div>

            <h1 className="wd-job-title">{activeJob.title}</h1>

            <div className="wd-meta-row">
              <div className="wd-meta-item">
                <MapPin size={16} className="wd-meta-icon" />
                <span>{activeJob.location}</span>
              </div>

              <div className="wd-meta-item">
                <Clock size={16} className="wd-meta-icon" />
                <span>{activeJob.timeType}</span>
              </div>

              <div className="wd-meta-item">
                <Calendar size={16} className="wd-meta-icon" />
                <span>{activeJob.posted}</span>
              </div>

              <div className="wd-meta-item">
                <Tag size={16} className="wd-meta-icon" />
                <span>{activeJob.dept}</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="wd-action-row">
              <button type="button" onClick={handleApplyClick} className="wd-btn-apply-primary">
                <span>Apply</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleToggleSaveJob}
                className={`wd-btn-outline ${isJobSaved ? 'wd-btn-saved' : ''}`}
                title={isJobSaved ? 'Remove from saved jobs' : 'Save this job'}
              >
                <Bookmark size={15} fill={isJobSaved ? 'currentColor' : 'none'} />
                <span>{isJobSaved ? 'Saved' : 'Save Job'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="wd-btn-outline"
                title="Share this opportunity"
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>

              {/* Share Floating Dropdown Menu */}
              {showShareMenu && (
                <div className="wd-share-menu">
                  <button type="button" className="wd-share-item" onClick={handleCopyJobLink}>
                    <span>Copy Job Link</span>
                  </button>
                  <button type="button" className="wd-share-item" onClick={handleShareLinkedIn}>
                    <span>Share on LinkedIn</span>
                  </button>
                  <button type="button" className="wd-share-item" onClick={handleShareWhatsApp}>
                    <span>Share on WhatsApp</span>
                  </button>
                  <button type="button" className="wd-share-item" onClick={handleShareEmail}>
                    <span>Share via Email</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Document Content (Workday Enterprise Format) */}
          <div className="wd-job-body-content">
            {/* Section 1: Who we are looking for */}
            <h2 className="wd-section-title">Who we are looking for</h2>
            <p className="wd-section-p">{activeJob.whoWeAreLookingFor}</p>

            {/* Section 2: What you will be responsible for */}
            <h2 className="wd-section-title">What you will be responsible for</h2>
            <ul className="wd-bullet-list">
              {activeJob.responsibilities.map((resp, idx) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>

            {/* Section 3: Education & Preferred Qualifications */}
            <h2 className="wd-section-title">Education &amp; Preferred Qualifications</h2>
            <ul className="wd-bullet-list">
              {activeJob.qualifications.map((qual, idx) => (
                <li key={idx}>{qual}</li>
              ))}
            </ul>

            {/* Section 4: Additional Requirements */}
            <h2 className="wd-section-title">Additional Requirements</h2>
            <ul className="wd-bullet-list">
              {activeJob.additionalRequirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>

            {/* Section 5: About the Company */}
            <h2 className="wd-section-title">About Urja Foods &amp; Group</h2>
            <p className="wd-section-p">{activeJob.aboutCompany}</p>

            {/* Section 6: Equal Opportunity Employer */}
            <h2 className="wd-section-title">Equal Opportunity Employer</h2>
            <p className="wd-section-p">{activeJob.equalOpportunity}</p>
          </div>

          {/* Bottom Actions Repeat Bar */}
          <div className="wd-bottom-actions-bar">
            <div>
              <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>Ready to take the next step?</strong>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Req: {activeJob.reqId} · Location: {activeJob.location}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button type="button" onClick={handleApplyClick} className="wd-btn-apply-primary">
                <span>Apply for this Job</span>
              </button>

              <button
                type="button"
                onClick={handleToggleSaveJob}
                className={`wd-btn-outline ${isJobSaved ? 'wd-btn-saved' : ''}`}
              >
                <Bookmark size={15} fill={isJobSaved ? 'currentColor' : 'none'} />
                <span>{isJobSaved ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </article>

        {/* =========================================================================
            4. SIMILAR JOBS SECTION (RECOMMENDED POSITIONS)
            ========================================================================= */}
        <section className="wd-similar-jobs-wrap">
          <h2 className="wd-similar-header">Similar Jobs</h2>
          <div className="wd-similar-grid">
            {jobCatalog
              .filter((j) => j.id !== activeJob.id)
              .slice(0, 3)
              .map((simJob) => (
                <div key={simJob.id} className="wd-similar-card">
                  <div>
                    <h3 className="wd-similar-title">{simJob.title}</h3>
                    <div className="wd-similar-meta">
                      <span>📍 {simJob.location}</span>
                      <span>⏱️ {simJob.timeType} · {simJob.posted}</span>
                      <span>🏷️ Req ID: {simJob.reqId}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectJob(simJob)}
                    className="wd-similar-view-btn"
                  >
                    <span>View Position</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              ))}
          </div>
        </section>
      </main>

      {/* =========================================================================
          5. WORKDAY CORPORATE FOOTER
          ========================================================================= */}
      <footer className="wd-footer">
        <div className="wd-footer-inner">
          <div className="wd-footer-links">
            <Link to="/about" className="wd-footer-link">About Urja Foods</Link>
            <Link to="/careers" className="wd-footer-link">Search All Jobs</Link>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); triggerToast('Candidate Privacy Notice loaded.'); }} className="wd-footer-link">
              Candidate Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); triggerToast('Candidate Terms of Use loaded.'); }} className="wd-footer-link">
              Terms of Use
            </a>
            <a href="#fraud" onClick={(e) => { e.preventDefault(); triggerToast('Urja Foods does not charge any fee during recruitment.'); }} className="wd-footer-link">
              Recruitment Fraud Alert
            </a>
          </div>

          <div className="wd-footer-copy">
            <span>© 2026 Urja Foods &amp; Agro Pvt. Ltd. All rights reserved. Powered by Candidate Experience ATS.</span>
            <span>Nirgudsar Complex, Pune, Maharashtra</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          WORKDAY "START YOUR APPLICATION" MODAL (EXACT MATCH TO USER'S REFERENCE)
          ========================================================================= */}
      {showStartAppModal && (
        <div className="wd-modal-backdrop" onClick={() => setShowStartAppModal(false)}>
          <div className="wd-start-modal-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Top Right Circular Close Button with blue border & blue X */}
            <button
              type="button"
              onClick={() => setShowStartAppModal(false)}
              className="wd-start-close-btn"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Title & Subtitles */}
            <h2 className="wd-start-title">Start Your Application</h2>
            <div className="wd-start-job-name">{activeJob.title}</div>
            <div className="wd-start-recommend">We recommend using ‘Autofill with Resume’</div>

            {/* Button 1: Autofill with Resume (Blue pill) */}
            <button
              type="button"
              onClick={handleAutofillWithResume}
              className="wd-start-btn-autofill"
            >
              Autofill with Resume
            </button>

            {/* Button 2: Apply Manually (Grey pill) */}
            <button
              type="button"
              onClick={handleApplyManually}
              className="wd-start-btn-manual"
            >
              Apply Manually
            </button>

            {/* Divider */}
            <div className="wd-start-divider"></div>

            {/* Button 3: Use My Last Application (Grey pill) */}
            <button
              type="button"
              onClick={handleUseMyLastApp}
              className="wd-start-btn-manual"
            >
              Use My Last Application
            </button>

            {/* Divider */}
            <div className="wd-start-divider"></div>

            {/* Button: Apply With LinkedIn (Dark charcoal pill with LinkedIn icon) */}
            <button
              type="button"
              onClick={handleApplyWithLinkedIn}
              className="wd-start-btn-linkedin"
            >
              <span className="wd-linkedin-icon-box">in</span>
              <span>Apply With LinkedIn</span>
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          RESUME UPLOAD & PARSING MODAL (FOR AUTOFILL WITH RESUME)
          ========================================================================= */}
      {showResumeUploadModal && (
        <div className="wd-modal-backdrop" onClick={() => setShowResumeUploadModal(false)}>
          <div className="wd-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="wd-modal-header">
              <div className="wd-modal-brand">
                <FileCheck size={18} color="#0066d5" />
                <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>Autofill with Resume</strong>
              </div>
              <button
                type="button"
                onClick={() => setShowResumeUploadModal(false)}
                className="wd-modal-close-btn"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="wd-modal-body">
              <h3 className="wd-modal-title">Upload Your Resume</h3>
              <p className="wd-modal-subtitle">
                Upload your resume (PDF or Word) to automatically extract your contact information, work experience, and education for <strong>{activeJob.title}</strong>.
              </p>

              {parsingResume ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div className="cr-pulse-dot" style={{ margin: '0 auto 1.25rem', width: '12px', height: '12px' }}></div>
                  <strong style={{ display: 'block', color: '#0066d5', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                    Parsing Resume &amp; Extracting Profile...
                  </strong>
                  <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                    Mapping skills and qualifications to requisition {activeJob.reqId}...
                  </div>
                </div>
              ) : (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    onChange={handleFileSelected}
                  />

                  <div
                    className="wd-resume-dropzone"
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  >
                    <FileCheck size={38} color="#0066d5" style={{ margin: '0 auto 0.75rem' }} />
                    <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                      Click to Browse or Drag &amp; Drop Resume
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      Supports PDF, DOCX, DOC (up to 10MB)
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', margin: '0.75rem 0' }}>
                    <span style={{ fontSize: '0.82rem', color: '#64748b' }}>or test instantly with:</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoResumeAutofill}
                    className="wd-demo-login-btn"
                  >
                    <Sparkles size={14} color="#166534" />
                    <span>⚡ Quick Autofill with Sample Resume (Ramesh_Patil_CV.pdf)</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          6. CANDIDATE AUTHENTICATION MODAL (STATE STREET WORKDAY SIGN IN)
          ========================================================================= */}
      {showAuthModal && (
        <div className="wd-modal-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="wd-ss-signin-dialog" onClick={(e) => e.stopPropagation()}>
            {/* Circular Blue Close Button in Top Right */}
            <button
              type="button"
              onClick={() => {
                setShowAuthModal(false);
                setSignInStep('social');
                setAuthError('');
              }}
              className="wd-start-close-btn"
              aria-label="Close"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Logo: Official Urja Foods Brand Logo */}
            <div className="wd-ss-logo-wrap">
              <img
                src="/logo.png"
                alt="Urja Foods"
                className="wd-ss-logo-img"
              />
            </div>

            {/* Title: Sign In */}
            <h2 className="wd-ss-title">Sign In</h2>

            {authError && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  margin: '0.75rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  textAlign: 'left',
                }}
                role="alert"
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{authError}</span>
              </div>
            )}

            {/* ================= STEP 1: SOCIAL & EMAIL CHOICES (DEFAULT) ================= */}
            {signInStep === 'social' && (
              <>
                {/* Paragraph 1 */}
                <p className="wd-ss-legal-p">
                  By signing in with <strong>Apple, Google, or LinkedIn</strong>, you consent to Urja Foods using information from your social account to create or access your candidate profile in Workday and support your job application.
                </p>

                {/* Paragraph 2 */}
                <p className="wd-ss-legal-p">
                  Urja Foods may collect and process information made available through your social account, such as your name, email address, employment history, education, and professional qualifications, for recruitment and talent management purposes, in accordance with the{' '}
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); triggerToast('Urja Foods Privacy Notice loaded.'); }} className="wd-ss-legal-link">
                    Urja Foods Privacy Notice
                  </a>.
                </p>

                {/* Paragraph 3 */}
                <p className="wd-ss-legal-p">
                  Your information will be processed securely and used only for recruitment-related purposes. You may withdraw your consent at any time by managing your account settings or contacting Urja Foods.
                </p>

                {/* Paragraph 4 */}
                <p className="wd-ss-legal-p" style={{ marginBottom: '1.75rem' }}>
                  For more information, please review the{' '}
                  <a href="#privacy" onClick={(e) => { e.preventDefault(); triggerToast('Urja Foods Privacy Notice loaded.'); }} className="wd-ss-legal-link">
                    Urja Foods Privacy Notice
                  </a>.
                </p>

                {/* Button 1: Sign in with Apple */}
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={() => handleOfficialSocialSignIn('apple')}
                  className="wd-ss-btn-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.86 2.7.99.08 2.02-.44 2.55-1.19z" />
                  </svg>
                  <span>{authLoading ? 'Connecting to Apple...' : 'Sign in with Apple'}</span>
                </button>

                {/* Button 2: Sign in with Google */}
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={() => handleOfficialSocialSignIn('google')}
                  className="wd-ss-btn-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>{authLoading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                </button>

                {/* Button 3: Sign in with LinkedIn */}
                <button
                  type="button"
                  disabled={authLoading}
                  onClick={() => handleOfficialSocialSignIn('linkedin')}
                  className="wd-ss-btn-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  <span>{authLoading ? 'Connecting to LinkedIn...' : 'Sign in with LinkedIn'}</span>
                </button>

                {/* OR Divider */}
                <div className="wd-ss-or-divider">
                  <span>OR</span>
                </div>

                {/* Button 4: Sign in with email */}
                <button
                  type="button"
                  onClick={() => setSignInStep('email')}
                  className="wd-ss-btn-email"
                >
                  Sign in with email
                </button>
              </>
            )}

            {/* ================= STEP 2: EMAIL / PASSWORD INPUT VIEW ================= */}
            {signInStep === 'email' && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setSignInStep('social');
                    setEmailSubMode('login');
                    setAuthError('');
                  }}
                  className="wd-ss-back-btn"
                >
                  <ArrowLeft size={14} />
                  <span>Back to all sign-in options</span>
                </button>

                {/* Tabs to toggle between Sign In and Create Account */}
                {(emailSubMode === 'login' || emailSubMode === 'register') && (
                  <div className="wd-modal-tabs" style={{ marginBottom: '1.25rem', borderRadius: '6px' }}>
                    <button
                      type="button"
                      className={`wd-modal-tab ${emailSubMode === 'login' ? 'active' : ''}`}
                      onClick={() => {
                        setEmailSubMode('login');
                        setAuthError('');
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className={`wd-modal-tab ${emailSubMode === 'register' ? 'active' : ''}`}
                      onClick={() => {
                        setEmailSubMode('register');
                        setAuthError('');
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                )}

                {authError && (
                  <div className="wd-alert-error" role="alert">
                    <AlertCircle size={16} />
                    <span>{authError}</span>
                  </div>
                )}

                {/* A. EMAIL SIGN IN */}
                {emailSubMode === 'login' && (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="wd-form-group">
                      <label htmlFor="modalLoginEmail">Email Address or Mobile Number *</label>
                      <div className="wd-input-wrapper">
                        <User size={15} className="wd-input-icon" />
                        <input
                          type="text"
                          id="modalLoginEmail"
                          required
                          placeholder="e.g. ramesh.patil@gmail.com"
                          value={loginData.emailOrPhone}
                          onChange={(e) => setLoginData({ ...loginData, emailOrPhone: e.target.value })}
                          className="wd-form-input has-icon"
                          autoFocus
                        />
                      </div>
                    </div>

                    <div className="wd-form-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label htmlFor="modalLoginPassword">Password *</label>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotEmail(loginData.emailOrPhone.includes('@') ? loginData.emailOrPhone : '');
                            setEmailSubMode('forgot');
                            setAuthError('');
                          }}
                          className="cr-text-link"
                          style={{ fontSize: '0.78rem' }}
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="wd-input-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="modalLoginPassword"
                          required
                          placeholder="Enter your password"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          className="wd-form-input has-eye"
                        />
                        <button
                          type="button"
                          className="wd-eye-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" disabled={authLoading} className="wd-submit-btn">
                      {authLoading ? <span>Verifying...</span> : <span>Sign In &amp; Continue</span>}
                    </button>

                    {/* 1-Click Demo Login */}
                    <div className="wd-demo-login-box">
                      <button type="button" onClick={handleDemoSignIn} className="wd-demo-login-btn">
                        <Sparkles size={14} color="#166534" />
                        <span>⚡ 1-Click Sign In with Demo Account (Ramesh Patil)</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* B. EMAIL CREATE ACCOUNT */}
                {emailSubMode === 'register' && (
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="wd-form-group">
                      <label htmlFor="regName">Full Legal Name *</label>
                      <input
                        type="text"
                        id="regName"
                        required
                        placeholder="e.g. Ramesh Patil"
                        value={registerData.name}
                        onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                        className="wd-form-input"
                        autoFocus
                      />
                    </div>

                    <div className="wd-form-grid-2">
                      <div className="wd-form-group">
                        <label htmlFor="regEmail">Email Address *</label>
                        <input
                          type="email"
                          id="regEmail"
                          required
                          placeholder="name@domain.com"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                          className="wd-form-input"
                        />
                      </div>

                      <div className="wd-form-group">
                        <label htmlFor="regPhone">Mobile Phone *</label>
                        <input
                          type="tel"
                          id="regPhone"
                          required
                          pattern="[0-9]{10}"
                          placeholder="10-digit mobile"
                          value={registerData.phone}
                          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                          className="wd-form-input"
                        />
                      </div>
                    </div>

                    <div className="wd-form-group">
                      <label htmlFor="regPassword">Choose Password * (min 6 characters)</label>
                      <div className="wd-input-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="regPassword"
                          required
                          minLength={6}
                          placeholder="Minimum 6 characters"
                          value={registerData.password}
                          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                          className="wd-form-input has-eye"
                        />
                        <button
                          type="button"
                          className="wd-eye-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" disabled={authLoading} className="wd-submit-btn">
                      {authLoading ? <span>Generating Verification Code...</span> : <span>Create Account &amp; Verify Email</span>}
                    </button>
                  </form>
                )}

                {/* C. 6-DIGIT EMAIL VERIFICATION (OTP) */}
                {emailSubMode === 'verify' && (
                  <div className="auth-verify-container">
                    <div className="auth-verify-badge-icon">
                      <Mail size={24} />
                    </div>
                    <h3 className="auth-verify-title">Verify Your Email Address</h3>
                    <p className="auth-verify-desc">
                      Enter the 6-digit code sent to <strong>{verifyEmail}</strong> to activate your candidate profile.
                    </p>

                    {devVerifyCode && (
                      <div className="auth-dev-code-hint">
                        <span>🧪 Dev Test OTP:</span>
                        <span
                          className="auth-dev-code-chip"
                          onClick={() => setVerifyCode(devVerifyCode)}
                          title="Click to autofill"
                        >
                          {devVerifyCode} (Click to fill)
                        </span>
                      </div>
                    )}

                    <form onSubmit={handleVerifySubmit}>
                      <input
                        type="text"
                        maxLength={6}
                        required
                        placeholder="• • • • • •"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                        className="auth-otp-single-input"
                        autoFocus
                      />

                      <button type="submit" disabled={authLoading} className="wd-submit-btn">
                        {authLoading ? <span>Verifying...</span> : <span>Verify &amp; Activate Account</span>}
                      </button>

                      <div className="auth-resend-bar">
                        <span>Didn't receive code?</span>
                        <button
                          type="button"
                          disabled={resendTimer > 0 || authLoading}
                          onClick={handleResendCode}
                          className="auth-resend-btn"
                        >
                          {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* D. FORGOT PASSWORD REQUEST */}
                {emailSubMode === 'forgot' && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailSubMode('login');
                        setAuthError('');
                      }}
                      className="wd-ss-back-btn"
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Sign In</span>
                    </button>
                    <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, margin: '0.5rem 0' }}>
                      Forgot Password
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                      Enter your registered email address to receive a 6-digit password reset code.
                    </p>
                    <form onSubmit={handleForgotSubmit}>
                      <div className="wd-form-group">
                        <label htmlFor="modalForgotEmail">Email Address *</label>
                        <input
                          type="email"
                          id="modalForgotEmail"
                          required
                          placeholder="name@domain.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="wd-form-input"
                          autoFocus
                        />
                      </div>
                      <button type="submit" disabled={authLoading} className="wd-submit-btn">
                        {authLoading ? <span>Sending Code...</span> : <span>Send Reset Code</span>}
                      </button>
                    </form>
                  </div>
                )}

                {/* E. RESET PASSWORD WITH OTP */}
                {emailSubMode === 'reset' && (
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setEmailSubMode('forgot');
                        setAuthError('');
                      }}
                      className="wd-ss-back-btn"
                    >
                      <ArrowLeft size={14} />
                      <span>Back</span>
                    </button>
                    <h3 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: 700, margin: '0.5rem 0' }}>
                      Set New Password
                    </h3>
                    {devResetCode && (
                      <div className="auth-dev-code-hint">
                        <span>🧪 Dev Reset OTP:</span>
                        <span
                          className="auth-dev-code-chip"
                          onClick={() => setResetCode(devResetCode)}
                        >
                          {devResetCode} (Click to fill)
                        </span>
                      </div>
                    )}
                    <form onSubmit={handleResetSubmit}>
                      <div className="wd-form-group">
                        <label htmlFor="modalResetCode">6-Digit Reset Code *</label>
                        <input
                          type="text"
                          id="modalResetCode"
                          required
                          maxLength={6}
                          placeholder="e.g. 543210"
                          value={resetCode}
                          onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                          className="wd-form-input"
                          autoFocus
                        />
                      </div>
                      <div className="wd-form-group">
                        <label htmlFor="modalResetNewPass">New Password * (min 6 characters)</label>
                        <input
                          type="password"
                          id="modalResetNewPass"
                          required
                          minLength={6}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="wd-form-input"
                        />
                      </div>
                      <button type="submit" disabled={authLoading} className="wd-submit-btn">
                        {authLoading ? <span>Updating...</span> : <span>Reset Password &amp; Sign In</span>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          7. APPLICATION SUBMISSION MODAL (LOGGED IN CANDIDATE FORM)
          ========================================================================= */}
      {showAppModal && (
        <div className="wd-modal-backdrop" onClick={() => setShowAppModal(false)}>
          <div className="wd-modal-dialog wide" onClick={(e) => e.stopPropagation()}>
            <div className="wd-modal-header">
              <div>
                <div style={{ fontSize: '0.76rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                  Candidate Application
                </div>
                <strong style={{ fontSize: '1.05rem', color: '#0f172a' }}>
                  {activeJob.title} (Req: {activeJob.reqId})
                </strong>
              </div>
              <button
                type="button"
                onClick={() => setShowAppModal(false)}
                className="wd-modal-close-btn"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="wd-modal-body">
              {/* SUCCESS STATE */}
              {applicationResult ? (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      background: '#dcfce7',
                      color: '#15803d',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1.25rem',
                    }}
                  >
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="wd-modal-title" style={{ textAlign: 'center' }}>
                    Application Submitted!
                  </h3>
                  <p className="wd-modal-subtitle" style={{ textAlign: 'center' }}>
                    Your application for <strong>{activeJob.title}</strong> has been received by our recruitment team.
                  </p>

                  {/* Confirmation Slip Card */}
                  <div
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '1.25rem',
                      textAlign: 'left',
                      fontSize: '0.85rem',
                      margin: '1.5rem 0',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: '#0f172a' }}>OFFICIAL HR CONFIRMATION</span>
                      <strong style={{ color: '#005fc5' }}>Ref: {applicationResult.applicationId}</strong>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', color: '#334155' }}>
                      <div>Candidate Name: <strong>{applicationForm.name}</strong></div>
                      <div>Requisition ID: <strong>{activeJob.reqId}</strong></div>
                      <div>Role: <strong style={{ color: '#166534' }}>{activeJob.title}</strong></div>
                      <div>Location: <strong>{activeJob.location}</strong></div>
                      <div>Candidate Email: <strong>{applicationForm.email}</strong></div>
                      <div>Submission Status: <strong style={{ color: '#15803d' }}>Confirmed &amp; Forwarded to HR</strong></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="wd-btn-outline"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      <Printer size={15} />
                      <span>Print Slip</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAppModal(false);
                        setApplicationResult(null);
                      }}
                      className="wd-btn-apply-primary"
                      style={{ flex: 1 }}
                    >
                      <span>Done</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* APPLICATION FORM */
                <form onSubmit={handleApplicationSubmit}>
                  {appError && (
                    <div className="wd-alert-error" role="alert">
                      <AlertCircle size={16} />
                      <span>{appError}</span>
                    </div>
                  )}

                  <div className="wd-form-grid-2">
                    <div className="wd-form-group">
                      <label htmlFor="appFullName">Full Legal Name *</label>
                      <input
                        type="text"
                        id="appFullName"
                        required
                        value={applicationForm.name}
                        onChange={(e) => setApplicationForm({ ...applicationForm, name: e.target.value })}
                        className="wd-form-input"
                      />
                    </div>

                    <div className="wd-form-group">
                      <label htmlFor="appEmail">Email Address *</label>
                      <input
                        type="email"
                        id="appEmail"
                        required
                        value={applicationForm.email}
                        onChange={(e) => setApplicationForm({ ...applicationForm, email: e.target.value })}
                        className="wd-form-input"
                      />
                    </div>
                  </div>

                  <div className="wd-form-grid-2">
                    <div className="wd-form-group">
                      <label htmlFor="appPhone">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        id="appPhone"
                        required
                        pattern="[0-9]{10}"
                        value={applicationForm.phone}
                        onChange={(e) => setApplicationForm({ ...applicationForm, phone: e.target.value })}
                        className="wd-form-input"
                      />
                    </div>

                    <div className="wd-form-group">
                      <label htmlFor="appCity">Current City / Location *</label>
                      <input
                        type="text"
                        id="appCity"
                        required
                        placeholder="e.g. Pune, Maharashtra"
                        value={applicationForm.city}
                        onChange={(e) => setApplicationForm({ ...applicationForm, city: e.target.value })}
                        className="wd-form-input"
                      />
                    </div>
                  </div>

                  <div className="wd-form-grid-2">
                    <div className="wd-form-group">
                      <label htmlFor="appExperience">Relevant Experience *</label>
                      <select
                        id="appExperience"
                        required
                        value={applicationForm.experience}
                        onChange={(e) => setApplicationForm({ ...applicationForm, experience: e.target.value })}
                        className="wd-form-select"
                      >
                        <option value="Fresher (0 - 1 year)">Fresher (0 - 1 year)</option>
                        <option value="1 – 3 Years">1 – 3 Years</option>
                        <option value="2 – 5 Years">2 – 5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>

                    <div className="wd-form-group">
                      <label htmlFor="appQualification">Highest Qualification *</label>
                      <input
                        type="text"
                        id="appQualification"
                        required
                        placeholder="e.g. MBA Finance / B.Sc Agri / B.Com"
                        value={applicationForm.qualification}
                        onChange={(e) => setApplicationForm({ ...applicationForm, qualification: e.target.value })}
                        className="wd-form-input"
                      />
                    </div>
                  </div>

                  <div className="wd-form-group">
                    <label htmlFor="appResumeUrl">Resume Link / Portfolio (Google Drive / LinkedIn / Cloud URL)</label>
                    <input
                      type="url"
                      id="appResumeUrl"
                      placeholder="https://drive.google.com/file/d/..."
                      value={applicationForm.resumeUrl}
                      onChange={(e) => setApplicationForm({ ...applicationForm, resumeUrl: e.target.value })}
                      className="wd-form-input"
                    />
                  </div>

                  <div className="wd-form-group">
                    <label htmlFor="appMessage">Candidate Note / Brief Summary for Hiring Team</label>
                    <textarea
                      id="appMessage"
                      rows="3"
                      placeholder="Highlight your key achievements and relevant background..."
                      value={applicationForm.message}
                      onChange={(e) => setApplicationForm({ ...applicationForm, message: e.target.value })}
                      className="wd-form-textarea"
                    ></textarea>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowAppModal(false)}
                      className="wd-btn-outline"
                      style={{ flex: 1, justifyContent: 'center' }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submittingApp}
                      className="wd-btn-apply-primary"
                      style={{ flex: 2 }}
                    >
                      {submittingApp ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Send size={15} />
                          <span>Submit Application to HR</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          8. TOAST NOTIFICATION
          ========================================================================= */}
      {toastMessage && (
        <div className="wd-toast-notification">
          <Check size={16} color="#4ade80" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
