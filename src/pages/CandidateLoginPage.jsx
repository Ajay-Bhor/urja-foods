import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Briefcase,
  LogOut,
  KeyRound,
  RefreshCw,
  FileCheck,
  ChevronRight,
  MapPin,
  GraduationCap,
  Settings,
} from 'lucide-react';
import {
  openOfficialOAuth,
  getProviderClientId,
  setProviderClientId,
  getAuthorizedRedirectUri,
  OAUTH_CONFIG,
} from '../utils/oauth';

export default function CandidateLoginPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const targetJobId = searchParams.get('jobId') || '';
  const redirectUrl = searchParams.get('redirect') || '';

  // Auth Mode: 'social' | 'login' | 'register' | 'verify' | 'forgot' | 'reset'
  const [authMode, setAuthMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'social');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [oauthConfigModal, setOauthConfigModal] = useState(null);
  const [configInputId, setConfigInputId] = useState('');

  // Candidate Session
  const [candidateUser, setCandidateUser] = useState(() => {
    try {
      const saved = localStorage.getItem('urja_candidate_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [userApplications, setUserApplications] = useState([]);

  // Form states
  const [loginForm, setLoginForm] = useState({
    emailOrPhone: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    qualification: 'Graduate / Professional',
    city: 'Pune, Maharashtra',
    password: '',
  });

  const [verifyEmail, setVerifyEmail] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [devVerificationCode, setDevVerificationCode] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const [forgotEmail, setForgotEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [devResetCode, setDevResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Toast trigger
  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4000);
  };

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Load user applications if logged in
  useEffect(() => {
    if (candidateUser && (candidateUser.email || candidateUser.phone)) {
      const fetchApps = async () => {
        try {
          const queryTerm = candidateUser.email || candidateUser.phone;
          const res = await fetch(`/api/careers/candidate/${encodeURIComponent(queryTerm)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.applications) {
              setUserApplications(data.applications);
            }
          }
        } catch {
          // ignore background fetch error
        }
      };
      fetchApps();
    }
  }, [candidateUser]);

  // Listen for Social OAuth popup window postMessages
  useEffect(() => {
    const handleAuthMessage = (e) => {
      if (!e.data || typeof e.data !== 'object') return;

      if (
        e.data.type === 'OAUTH_SUCCESS' ||
        e.data.type === 'GOOGLE_AUTH_SUCCESS' ||
        e.data.type === 'APPLE_AUTH_SUCCESS' ||
        e.data.type === 'LINKEDIN_AUTH_SUCCESS'
      ) {
        const verifiedUser = e.data.user;
        if (!verifiedUser) return;
        setCandidateUser(verifiedUser);
        localStorage.setItem('urja_candidate_user', JSON.stringify(verifiedUser));

        const providerName =
          e.data.provider === 'apple' || e.data.type === 'APPLE_AUTH_SUCCESS'
            ? 'Apple Account'
            : e.data.provider === 'google' || e.data.type === 'GOOGLE_AUTH_SUCCESS'
            ? 'Google Account'
            : 'LinkedIn Account';

        triggerToast(`Signed in successfully via ${providerName}!`);

        if (targetJobId) {
          setTimeout(() => navigate(`/careers/apply?jobId=${targetJobId}`), 800);
        } else if (redirectUrl) {
          setTimeout(() => navigate(redirectUrl), 800);
        }
      }
    };

    window.addEventListener('message', handleAuthMessage);
    return () => window.removeEventListener('message', handleAuthMessage);
  }, [targetJobId, redirectUrl, navigate]);

  // Handle Official OAuth 2.0 (Google, Apple, LinkedIn)
  const handleOfficialOAuthClick = async (provider) => {
    setErrorMsg('');
    setIsLoading(true);

    try {
      const result = await openOfficialOAuth(provider, {
        jobId: targetJobId,
        redirect: redirectUrl,
      });

      if (result && result.user) {
        setCandidateUser(result.user);
        localStorage.setItem('urja_candidate_user', JSON.stringify(result.user));
        triggerToast(
          result.isNewUser
            ? `Account created! Welcome to Urja Foods, ${result.user.name}!`
            : `Welcome back, ${result.user.name}!`
        );

        if (targetJobId) {
          setTimeout(() => navigate(`/careers/apply?jobId=${targetJobId}`), 600);
        } else if (redirectUrl) {
          setTimeout(() => navigate(redirectUrl), 600);
        }
      }
    } catch (err) {
      console.warn(`${provider} official auth notice:`, err.message);
      if (err.message && err.message.includes('not configured yet')) {
        setOauthConfigModal(provider);
        setConfigInputId(getProviderClientId(provider));
      } else if (!err.message?.includes('closed') && !err.message?.includes('cancelled')) {
        setErrorMsg(err.message || `Official ${provider} sign-in failed. Please try again.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveAndLaunchOAuth = (provider) => {
    if (!configInputId.trim()) {
      triggerToast('Please enter a valid Client ID.');
      return;
    }
    setProviderClientId(provider, configInputId.trim());
    setOauthConfigModal(null);
    triggerToast(`Official ${OAUTH_CONFIG[provider]?.name} Client ID saved! Launching official login...`);
    setTimeout(() => {
      handleOfficialOAuthClick(provider);
    }, 200);
  };

  // 1-Click Demo Sign In (Ramesh Patil)
  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/careers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emailOrPhone: 'ramesh.patil@gmail.com',
          password: 'password123',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        setCandidateUser(data.user);
        localStorage.setItem('urja_candidate_user', JSON.stringify(data.user));
        if (data.applications) setUserApplications(data.applications);
        triggerToast('Signed in with Demo Candidate Account (Ramesh Patil)!');

        if (targetJobId) {
          navigate(`/careers/apply?jobId=${targetJobId}`);
        }
      } else {
        setErrorMsg(data.message || 'Demo login failed');
      }
    } catch {
      const demo = {
        id: 'cand-demo-1',
        name: 'Ramesh Patil',
        email: 'ramesh.patil@gmail.com',
        phone: '9876543210',
        qualification: 'B.Sc Agriculture / Animal Science',
        city: 'Pune, Maharashtra',
        authProvider: 'email',
        emailVerified: true,
      };
      setCandidateUser(demo);
      localStorage.setItem('urja_candidate_user', JSON.stringify(demo));
      triggerToast('Signed in with Demo Candidate Account!');
      if (targetJobId) navigate(`/careers/apply?jobId=${targetJobId}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Email Sign In Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/careers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (res.status === 403 && data.requiresVerification) {
        // Needs email verification
        setVerifyEmail(data.email || loginForm.emailOrPhone);
        if (data.devCode) setDevVerificationCode(data.devCode);
        setAuthMode('verify');
        setResendTimer(45);
        setErrorMsg(data.message || 'Please verify your email address to activate your account.');
        return;
      }

      if (res.ok && data.success && data.user) {
        setCandidateUser(data.user);
        localStorage.setItem('urja_candidate_user', JSON.stringify(data.user));
        if (data.applications) setUserApplications(data.applications);
        triggerToast(`Welcome back, ${data.user.name}!`);

        if (targetJobId) {
          navigate(`/careers/apply?jobId=${targetJobId}`);
        } else if (redirectUrl) {
          navigate(redirectUrl);
        }
      } else {
        setErrorMsg(data.message || 'Invalid credentials. Please verify your email/password.');
      }
    } catch (err) {
      setErrorMsg('Network error connecting to login server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Register New Candidate Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/careers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerForm),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVerifyEmail(data.email || registerForm.email);
        if (data.devCode) setDevVerificationCode(data.devCode);
        setResendTimer(45);
        setAuthMode('verify');
        setSuccessMsg('Account created! Enter the 6-digit verification code sent to your email.');
      } else {
        setErrorMsg(data.message || 'Registration failed. Please check the form.');
      }
    } catch {
      setErrorMsg('Unable to reach registration server.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify Email Address Submit
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!verifyCode || verifyCode.trim().length !== 6) {
      setErrorMsg('Please enter the complete 6-digit code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

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
        triggerToast('Email address verified! Account activated successfully.');

        if (targetJobId) {
          navigate(`/careers/apply?jobId=${targetJobId}`);
        } else {
          setAuthMode('social');
        }
      } else {
        setErrorMsg(data.message || 'Invalid verification code. Please try again.');
      }
    } catch {
      setErrorMsg('Error verifying code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend Verification Code
  const handleResendCode = async () => {
    if (resendTimer > 0) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/careers/resend-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.devCode) setDevVerificationCode(data.devCode);
        setResendTimer(45);
        triggerToast('New 6-digit code sent to your email.');
      } else {
        setErrorMsg(data.message || 'Could not resend code.');
      }
    } catch {
      setErrorMsg('Network error resending code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password Request
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/careers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.devCode) setDevResetCode(data.devCode);
        setAuthMode('reset');
        setSuccessMsg('Reset code sent! Check your inbox.');
      } else {
        setErrorMsg(data.message || 'Could not send reset code.');
      }
    } catch {
      setErrorMsg('Server error sending reset code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password Submit
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

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
        triggerToast('Password reset successfully! Please sign in with your new password.');
        setAuthMode('login');
        setLoginForm({ emailOrPhone: forgotEmail, password: '' });
      } else {
        setErrorMsg(data.message || 'Failed to reset password.');
      }
    } catch {
      setErrorMsg('Server error resetting password.');
    } finally {
      setIsLoading(false);
    }
  };

  // Sign Out
  const handleSignOut = () => {
    setCandidateUser(null);
    localStorage.removeItem('urja_candidate_user');
    setUserApplications([]);
    setAuthMode('social');
    triggerToast('You have been signed out.');
  };

  return (
    <div className="cr-pure-login-page">
      <div className="cr-login-glow-bg" />

      {/* Global Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            background: '#173b24',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.9rem',
            fontWeight: 600,
            animation: 'fadeIn 0.25s ease-out',
          }}
        >
          <CheckCircle2 size={18} color="#86efac" />
          <span>{toastMsg}</span>
        </div>
      )}

      <div className="cr-pure-login-container">
        {/* Top Header */}
        <div className="cr-pure-login-header">
          <Link to="/careers" className="cr-login-brand-link" title="Urja Foods Careers">
            <img src="/logo.png" alt="Urja Foods" style={{ height: '36px', objectFit: 'contain' }} />
            <span>Urja Foods Careers</span>
          </Link>
          <div className="cr-login-portal-tag">Candidate Portal &amp; Authentication</div>

          {targetJobId && (
            <div className="cr-login-target-pill">
              <span className="cr-pill-label">Signing in to apply for:</span>
              <span className="cr-pill-job-name">Bank Loans - Senior Associate</span>
              <span className="cr-pill-dept">(Req: R-798533)</span>
            </div>
          )}
        </div>

        {/* =========================================================================
            IF LOGGED IN: DISPLAY CANDIDATE PORTAL STATUS DASHBOARD
            ========================================================================= */}
        {candidateUser ? (
          <div className="cand-portal-card">
            <div className="cand-profile-row">
              {candidateUser.picture ? (
                <img
                  src={candidateUser.picture}
                  alt={candidateUser.name}
                  className="cand-profile-avatar"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(candidateUser.name)}`;
                  }}
                />
              ) : (
                <div className="cand-profile-initials">
                  {candidateUser.name ? candidateUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <div className="cand-profile-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <h2 className="cand-profile-name">{candidateUser.name}</h2>
                  <span className={`cand-portal-badge ${candidateUser.authProvider || 'email'}`}>
                    {candidateUser.authProvider === 'apple'
                      ? 'Apple ID'
                      : candidateUser.authProvider === 'google'
                      ? 'Google Account'
                      : candidateUser.authProvider === 'linkedin'
                      ? 'LinkedIn Profile'
                      : 'Email Verified'}
                  </span>
                </div>
                <p className="cand-profile-email">{candidateUser.email}</p>
                {candidateUser.phone && (
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0' }}>
                    📞 {candidateUser.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="cand-profile-stats-grid">
              <div className="cand-stat-box">
                <div className="cand-stat-lbl">Location</div>
                <div className="cand-stat-val">{candidateUser.city || 'Pune, MH'}</div>
              </div>
              <div className="cand-stat-box">
                <div className="cand-stat-lbl">Qualification</div>
                <div className="cand-stat-val">{candidateUser.qualification || 'Graduate'}</div>
              </div>
              <div className="cand-stat-box">
                <div className="cand-stat-lbl">Status</div>
                <div className="cand-stat-val" style={{ color: '#166534' }}>Active Candidate</div>
              </div>
            </div>

            {/* Applications list */}
            {userApplications && userApplications.length > 0 && (
              <div className="cand-app-history-box">
                <div className="cand-app-history-title">
                  <span>Your Submitted Applications ({userApplications.length})</span>
                  <FileCheck size={16} color="#166534" />
                </div>
                {userApplications.map((app) => (
                  <div key={app.id} className="cand-app-item">
                    <div>
                      <div className="cand-app-role">{app.position}</div>
                      <div className="cand-app-date">Ref: {app.id} · {new Date(app.submittedAt).toLocaleDateString()}</div>
                    </div>
                    <span className="cand-app-status-badge">{app.status || 'Under Review'}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              <Link
                to={targetJobId ? `/careers/apply?jobId=${targetJobId}` : '/careers'}
                className="cr-login-submit-btn"
                style={{ flex: 1, textDecoration: 'none' }}
              >
                <span>{targetJobId ? 'Continue to Job Application' : 'Explore Open Positions'}</span>
                <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="wd-submit-btn"
                style={{
                  background: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  padding: '0.85rem 1.25rem',
                  width: 'auto',
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        ) : (
          /* =========================================================================
              IF NOT LOGGED IN: CANDIDATE AUTHENTICATION CARD
              ========================================================================= */
          <div className="cr-pure-login-card">
            <div className="cr-pure-card-body">
              {/* Error & Success Alerts */}
              {errorMsg && (
                <div className="cr-login-error-alert" role="alert">
                  <AlertCircle size={18} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    background: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    color: '#166534',
                    padding: '0.75rem 1rem',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    marginBottom: '1.25rem',
                  }}
                  role="alert"
                >
                  <CheckCircle2 size={18} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  VIEW 1: SOCIAL AUTH CHOICES (DEFAULT STATE STREET / WORKDAY ATS)
                  ----------------------------------------------------------------- */}
              {authMode === 'social' && (
                <div>
                  <div className="cr-card-title-group">
                    <h2 className="cr-card-title">Sign In</h2>
                    <p className="cr-card-subtitle">
                      Sign in with your Apple, Google, or LinkedIn account to automatically create or access your Urja Foods candidate profile.
                    </p>
                  </div>

                  <p className="wd-ss-legal-p">
                    By signing in with <strong>Apple, Google, or LinkedIn</strong>, you consent to Urja Foods using information from your social account to support your recruitment process in accordance with the{' '}
                    <a href="#privacy" onClick={(e) => { e.preventDefault(); triggerToast('Privacy Notice loaded'); }} className="wd-ss-legal-link">
                      Urja Foods Privacy Notice
                    </a>.
                  </p>

                  {/* 1. Sign in with Apple */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleOfficialOAuthClick('apple')}
                    className="wd-ss-btn-social"
                    title="Sign in with Apple"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.61 1.34-.55.63-.99 1.68-.86 2.7.99.08 2.02-.44 2.55-1.19z" />
                    </svg>
                    <span>{isLoading ? 'Connecting to Apple...' : 'Sign in with Apple'}</span>
                  </button>

                  {/* 2. Sign in with Google */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleOfficialOAuthClick('google')}
                    className="wd-ss-btn-social"
                    title="Sign in with Google"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                    </svg>
                    <span>{isLoading ? 'Connecting to Google...' : 'Sign in with Google'}</span>
                  </button>

                  {/* 3. Sign in with LinkedIn */}
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => handleOfficialOAuthClick('linkedin')}
                    className="wd-ss-btn-social"
                    title="Sign in with LinkedIn"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#0077B5">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>{isLoading ? 'Connecting to LinkedIn...' : 'Sign in with LinkedIn'}</span>
                  </button>

                  {/* OR Divider */}
                  <div className="wd-ss-or-divider">
                    <span>OR</span>
                  </div>

                  {/* 4. Sign in with Email Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg('');
                    }}
                    className="wd-ss-btn-email"
                  >
                    Sign in with email
                  </button>

                  {/* Configure OAuth Credentials Link */}
                  <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setOauthConfigModal('google');
                        setConfigInputId(getProviderClientId('google'));
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#64748b',
                        fontSize: '0.8rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      <Settings size={13} />
                      <span>Official OAuth Client Configuration &amp; Redirect URIs</span>
                    </button>
                  </div>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  VIEW 2: EMAIL SIGN IN / REGISTER TABS
                  ----------------------------------------------------------------- */}
              {(authMode === 'login' || authMode === 'register') && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('social');
                      setErrorMsg('');
                    }}
                    className="wd-ss-back-btn"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to all sign-in options</span>
                  </button>

                  {/* Toggle between Sign In and Create Account */}
                  <div className="wd-modal-tabs" style={{ marginBottom: '1.4rem' }}>
                    <button
                      type="button"
                      className={`wd-modal-tab ${authMode === 'login' ? 'active' : ''}`}
                      onClick={() => {
                        setAuthMode('login');
                        setErrorMsg('');
                      }}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className={`wd-modal-tab ${authMode === 'register' ? 'active' : ''}`}
                      onClick={() => {
                        setAuthMode('register');
                        setErrorMsg('');
                      }}
                    >
                      Create Account
                    </button>
                  </div>

                  {/* A. Sign In Form */}
                  {authMode === 'login' && (
                    <form onSubmit={handleLoginSubmit} className="cr-login-form">
                      <div className="cr-login-field">
                        <label htmlFor="loginEmailOrPhone">Email Address or Mobile Phone *</label>
                        <div className="cr-login-input-wrap">
                          <User size={16} className="cr-field-icon" />
                          <input
                            type="text"
                            id="loginEmailOrPhone"
                            required
                            placeholder="e.g. ramesh.patil@gmail.com"
                            value={loginForm.emailOrPhone}
                            onChange={(e) => setLoginForm({ ...loginForm, emailOrPhone: e.target.value })}
                            className="cr-login-input with-icon"
                            autoFocus
                          />
                        </div>
                      </div>

                      <div className="cr-login-field">
                        <div className="cr-label-with-link">
                          <label htmlFor="loginPassword">Password *</label>
                          <button
                            type="button"
                            onClick={() => {
                              setForgotEmail(loginForm.emailOrPhone.includes('@') ? loginForm.emailOrPhone : '');
                              setAuthMode('forgot');
                              setErrorMsg('');
                            }}
                            className="cr-text-link"
                            style={{ fontSize: '0.78rem' }}
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="cr-login-input-wrap">
                          <Lock size={16} className="cr-field-icon" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="loginPassword"
                            required
                            placeholder="Enter your password"
                            value={loginForm.password}
                            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                            className="cr-login-input with-icon with-eye"
                          />
                          <button
                            type="button"
                            className="cr-eye-toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <button type="submit" disabled={isLoading} className="cr-login-submit-btn">
                        {isLoading ? <span>Verifying...</span> : <span>Sign In &amp; Continue</span>}
                      </button>

                      {/* 1-Click Demo Login Button */}
                      <div className="cr-login-demo-box">
                        <span className="cr-demo-hint">Quick Evaluator Account</span>
                        <button type="button" onClick={handleDemoLogin} className="cr-demo-login-btn">
                          <Sparkles size={14} color="#166534" />
                          <span>⚡ 1-Click Sign In with Demo Account (Ramesh Patil)</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {/* B. Create Account Form */}
                  {authMode === 'register' && (
                    <form onSubmit={handleRegisterSubmit} className="cr-login-form">
                      <div className="cr-login-field">
                        <label htmlFor="regName">Full Legal Name *</label>
                        <div className="cr-login-input-wrap">
                          <User size={16} className="cr-field-icon" />
                          <input
                            type="text"
                            id="regName"
                            required
                            placeholder="e.g. Ramesh Patil"
                            value={registerForm.name}
                            onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                            className="cr-login-input with-icon"
                            autoFocus
                          />
                        </div>
                      </div>

                      <div className="cr-login-row">
                        <div className="cr-login-field">
                          <label htmlFor="regEmail">Email Address *</label>
                          <div className="cr-login-input-wrap">
                            <Mail size={16} className="cr-field-icon" />
                            <input
                              type="email"
                              id="regEmail"
                              required
                              placeholder="name@domain.com"
                              value={registerForm.email}
                              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                              className="cr-login-input with-icon"
                            />
                          </div>
                        </div>

                        <div className="cr-login-field">
                          <label htmlFor="regPhone">Mobile Phone *</label>
                          <div className="cr-login-input-wrap">
                            <Phone size={16} className="cr-field-icon" />
                            <input
                              type="tel"
                              id="regPhone"
                              required
                              pattern="[0-9]{10}"
                              placeholder="10-digit phone"
                              value={registerForm.phone}
                              onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                              className="cr-login-input with-icon"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="cr-login-field">
                        <label htmlFor="regQualification">Qualification / Background</label>
                        <div className="cr-login-input-wrap">
                          <GraduationCap size={16} className="cr-field-icon" />
                          <input
                            type="text"
                            id="regQualification"
                            placeholder="e.g. B.Sc Agri / MBA / B.Com / Diploma"
                            value={registerForm.qualification}
                            onChange={(e) => setRegisterForm({ ...registerForm, qualification: e.target.value })}
                            className="cr-login-input with-icon"
                          />
                        </div>
                      </div>

                      <div className="cr-login-field">
                        <label htmlFor="regPassword">Password * (min 6 characters)</label>
                        <div className="cr-login-input-wrap">
                          <Lock size={16} className="cr-field-icon" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            id="regPassword"
                            required
                            minLength={6}
                            placeholder="Choose a secure password"
                            value={registerForm.password}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="cr-login-input with-icon with-eye"
                          />
                          <button
                            type="button"
                            className="cr-eye-toggle-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>

                      <button type="submit" disabled={isLoading} className="cr-login-submit-btn">
                        {isLoading ? <span>Generating Verification Code...</span> : <span>Register &amp; Verify Email</span>}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* -----------------------------------------------------------------
                  VIEW 3: 6-DIGIT EMAIL VERIFICATION (OTP ACTIVATION)
                  ----------------------------------------------------------------- */}
              {authMode === 'verify' && (
                <div className="auth-verify-container">
                  <div className="auth-verify-badge-icon">
                    <Mail size={26} />
                  </div>
                  <h2 className="auth-verify-title">Verify Your Email Address</h2>
                  <p className="auth-verify-desc">
                    We sent a 6-digit verification code to <strong>{verifyEmail}</strong>. Enter the code below to activate your candidate profile.
                  </p>

                  {/* Dev Code Helper for Seamless Local Testing */}
                  {devVerificationCode && (
                    <div className="auth-dev-code-hint">
                      <span>🧪 Dev Test OTP Code:</span>
                      <span
                        className="auth-dev-code-chip"
                        onClick={() => setVerifyCode(devVerificationCode)}
                        title="Click to autofill"
                      >
                        {devVerificationCode} (Click to fill)
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleVerifySubmit}>
                    <input
                      type="text"
                      maxLength={6}
                      pattern="[0-9]{6}"
                      required
                      placeholder="• • • • • •"
                      value={verifyCode}
                      onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, ''))}
                      className="auth-otp-single-input"
                      autoFocus
                    />

                    <button type="submit" disabled={isLoading} className="cr-login-submit-btn">
                      {isLoading ? <span>Verifying Code...</span> : <span>Verify &amp; Activate Account</span>}
                    </button>

                    <div className="auth-resend-bar">
                      <span>Didn't receive the email?</span>
                      <button
                        type="button"
                        disabled={resendTimer > 0 || isLoading}
                        onClick={handleResendCode}
                        className="auth-resend-btn"
                      >
                        {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                      </button>
                    </div>

                    <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('register');
                          setErrorMsg('');
                        }}
                        className="cr-text-link"
                        style={{ fontSize: '0.82rem' }}
                      >
                        ← Change email address or register again
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  VIEW 4: FORGOT PASSWORD REQUEST
                  ----------------------------------------------------------------- */}
              {authMode === 'forgot' && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg('');
                    }}
                    className="wd-ss-back-btn"
                  >
                    <ArrowLeft size={14} />
                    <span>Back to Sign In</span>
                  </button>

                  <div className="cr-card-title-group">
                    <h2 className="cr-card-title">Forgot Password</h2>
                    <p className="cr-card-subtitle">
                      Enter the email address registered with your candidate account. We'll send you a 6-digit code to reset your password.
                    </p>
                  </div>

                  <form onSubmit={handleForgotSubmit} className="cr-login-form">
                    <div className="cr-login-field">
                      <label htmlFor="forgotEmailInput">Email Address *</label>
                      <div className="cr-login-input-wrap">
                        <Mail size={16} className="cr-field-icon" />
                        <input
                          type="email"
                          id="forgotEmailInput"
                          required
                          placeholder="name@domain.com"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          className="cr-login-input with-icon"
                          autoFocus
                        />
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="cr-login-submit-btn">
                      {isLoading ? <span>Sending Code...</span> : <span>Send Reset Code</span>}
                    </button>
                  </form>
                </div>
              )}

              {/* -----------------------------------------------------------------
                  VIEW 5: RESET PASSWORD FORM WITH CODE
                  ----------------------------------------------------------------- */}
              {authMode === 'reset' && (
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot');
                      setErrorMsg('');
                    }}
                    className="wd-ss-back-btn"
                  >
                    <ArrowLeft size={14} />
                    <span>Back</span>
                  </button>

                  <div className="cr-card-title-group">
                    <h2 className="cr-card-title">Create New Password</h2>
                    <p className="cr-card-subtitle">
                      Enter the 6-digit reset code sent to <strong>{forgotEmail}</strong> and your new password.
                    </p>
                  </div>

                  {devResetCode && (
                    <div className="auth-dev-code-hint">
                      <span>🧪 Dev Reset OTP:</span>
                      <span
                        className="auth-dev-code-chip"
                        onClick={() => setResetCode(devResetCode)}
                        title="Click to fill"
                      >
                        {devResetCode} (Click to fill)
                      </span>
                    </div>
                  )}

                  <form onSubmit={handleResetSubmit} className="cr-login-form">
                    <div className="cr-login-field">
                      <label htmlFor="resetCodeInput">6-Digit Reset Code *</label>
                      <input
                        type="text"
                        id="resetCodeInput"
                        required
                        maxLength={6}
                        placeholder="e.g. 543210"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
                        className="cr-login-input"
                        autoFocus
                      />
                    </div>

                    <div className="cr-login-field">
                      <label htmlFor="resetNewPassword">New Password * (min 6 characters)</label>
                      <div className="cr-login-input-wrap">
                        <Lock size={16} className="cr-field-icon" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          id="resetNewPassword"
                          required
                          minLength={6}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="cr-login-input with-icon with-eye"
                        />
                        <button
                          type="button"
                          className="cr-eye-toggle-btn"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <button type="submit" disabled={isLoading} className="cr-login-submit-btn">
                      {isLoading ? <span>Updating Password...</span> : <span>Reset Password &amp; Sign In</span>}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Official OAuth Configuration Modal */}
        {oauthConfigModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 99999,
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                background: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                padding: '28px 24px',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={22} color="#16a34a" />
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: 0, color: '#0f172a' }}>
                    Official {OAUTH_CONFIG[oauthConfigModal]?.name} OAuth Setup
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOauthConfigModal(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '20px',
                    color: '#94a3b8',
                    cursor: 'pointer',
                  }}
                >
                  &times;
                </button>
              </div>

              {/* Provider Selector Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {['google', 'apple', 'linkedin'].map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => {
                      setOauthConfigModal(prov);
                      setConfigInputId(getProviderClientId(prov));
                    }}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '8px',
                      border: oauthConfigModal === prov ? '2px solid #16a34a' : '1px solid #e2e8f0',
                      background: oauthConfigModal === prov ? '#f0fdf4' : '#f8fafc',
                      color: oauthConfigModal === prov ? '#166534' : '#64748b',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                    }}
                  >
                    {prov}
                  </button>
                ))}
              </div>

              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '14px', lineHeight: 1.5 }}>
                Enter your official Client ID from the {OAUTH_CONFIG[oauthConfigModal]?.name} Developer Console to enable live official authentication.
              </p>

              {/* Technical Details for Dev Console */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '16px',
                  fontSize: '12px',
                  color: '#334155',
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#0f172a' }}>Authorized Origin:</strong>
                  <code style={{ display: 'block', background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', marginTop: '2px', wordBreak: 'break-all' }}>
                    {window.location.origin}
                  </code>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <strong style={{ color: '#0f172a' }}>Authorized Redirect URI:</strong>
                  <code style={{ display: 'block', background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', marginTop: '2px', wordBreak: 'break-all' }}>
                    {getAuthorizedRedirectUri(oauthConfigModal)}
                  </code>
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>Required Permissions (Scopes):</strong>
                  <div style={{ color: '#166534', fontWeight: 500, marginTop: '2px' }}>
                    <code>{OAUTH_CONFIG[oauthConfigModal]?.scope}</code>
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>
                  Official {OAUTH_CONFIG[oauthConfigModal]?.name} Client ID:
                </label>
                <input
                  type="text"
                  placeholder={`Paste your ${OAUTH_CONFIG[oauthConfigModal]?.name} Client ID here...`}
                  value={configInputId}
                  onChange={(e) => setConfigInputId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '13px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                  autoFocus
                />
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                  Environment variable: <code>VITE_{oauthConfigModal.toUpperCase()}_CLIENT_ID</code>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setOauthConfigModal(null)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    background: '#ffffff',
                    color: '#64748b',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveAndLaunchOAuth(oauthConfigModal)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#16a34a',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Save &amp; Launch Official OAuth
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
