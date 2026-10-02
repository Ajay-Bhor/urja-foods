import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Briefcase,
  MapPin,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  FileText,
  KeyRound,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import {
  getAuthToken,
  setAuthToken,
  getAuthUser,
  setAuthUser,
  clearAuthSession,
  authFetch,
} from '../utils/auth.js';
import '../styles/career-auth.css';

export default function CareerAuthPage({ initialMode = 'login' }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mode: 'login' | 'signup'
  const queryMode = searchParams.get('mode');
  const [mode, setMode] = useState(queryMode || initialMode === 'signup' ? 'signup' : 'login');

  // View state: 'options' | 'email_form' | 'forgot' | 'verify' | 'reset'
  const [viewState, setViewState] = useState('options');

  const jobId = searchParams.get('jobId') || '';
  const jobTitle = searchParams.get('title') || '';
  const redirectParam = searchParams.get('redirect');
  const reason = searchParams.get('reason') || '';

  // Target application URL helper
  const getTargetRedirectUrl = () => {
    if (redirectParam) return redirectParam;
    if (jobId) {
      return `/careers/apply?jobId=${encodeURIComponent(jobId)}&title=${encodeURIComponent(jobTitle)}`;
    }
    return '/careers/apply';
  };

  // Current session user from JWT local storage
  const [currentUser, setCurrentUser] = useState(() => getAuthUser());

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Email Sign In State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regQualification, setRegQualification] = useState('B.Sc. Agriculture / B.Tech Dairy');
  const [regCity, setRegCity] = useState('Pune, Maharashtra');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // OTP Verification & Forgot Password State
  const [verifyEmail, setVerifyEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const googleBtnContainerRef = useRef(null);

  const showAlert = (msg, type = 'error') => {
    setAlert({ msg, type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearAlert = () => setAlert(null);

  const saveUserSession = (user, token) => {
    setCurrentUser(user);
    setAuthUser(user);
    if (token) setAuthToken(token);
  };

  // Centralized authentication completion handler: updates session and redirects to Job Application Page
  const handleSuccessfulAuth = (user, token, welcomeMsg) => {
    saveUserSession(user, token);
    showAlert(welcomeMsg || `Welcome, ${user.name}!`, 'success');
    const targetUrl = getTargetRedirectUrl();
    setTimeout(() => {
      navigate(targetUrl, { replace: true });
    }, 700);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    clearAuthSession();
    showAlert('You have been signed out.', 'success');
  };

  // --------------------------------------------------------------------------
  // 1. SESSION REVALIDATION ON MOUNT (Verifies Cryptographic JWT Token)
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (getAuthToken()) {
      authFetch('/api/careers/session')
        .then((r) => r.json())
        .then((d) => {
          if (d.success && d.user) {
            setCurrentUser(d.user);
            setAuthUser(d.user);
          } else {
            clearAuthSession();
            setCurrentUser(null);
          }
        })
        .catch(() => {});
    }
  }, []);

  // --------------------------------------------------------------------------
  // 2. OFFICIAL GOOGLE IDENTITY SERVICES INITIALIZATION
  // --------------------------------------------------------------------------
  useEffect(() => {
    const googleClientId =
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      '602217033274-4776geaf1igni2jdosj2j79e667ngi81.apps.googleusercontent.com';

    const initializeGoogle = () => {
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
          });

          // Render Google's official Sign In button if container exists
          if (googleBtnContainerRef.current) {
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: mode === 'login' ? 'signin_with' : 'signup_with',
              shape: 'pill',
              logo_alignment: 'left',
              width: googleBtnContainerRef.current.offsetWidth || 340,
            });
          }
        } catch (err) {
          console.warn('Google Identity Services initialization notice:', err);
        }
      }
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          initializeGoogle();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [mode, viewState]);

  // Handle Google Token Response (Receives real Google ID token JWT)
  const handleGoogleCredentialResponse = async (response) => {
    if (!response?.credential) {
      showAlert('Google authentication did not return a valid ID token.');
      return;
    }

    try {
      setIsLoading(true);
      clearAlert();

      // Send token securely to backend for cryptographic verification
      const res = await fetch('/api/careers/google-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: response.credential }),
      });

      const data = await res.json();
      if (data.success) {
        handleSuccessfulAuth(data.user, data.token, data.message || `Welcome, ${data.user.name}!`);
      } else {
        showAlert(data.message || 'Google token verification failed on the server.');
      }
    } catch {
      showAlert('Error connecting to authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignInClick = () => {
    clearAlert();
    if (window.google?.accounts?.id) {
      // Trigger official Google One Tap / Account Chooser
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: trigger click on rendered official button inside hidden container
          const officialBtn = googleBtnContainerRef.current?.querySelector('div[role="button"]');
          if (officialBtn) officialBtn.click();
        }
      });
    } else {
      showAlert('Google authentication service is initializing. Please wait a moment.');
    }
  };

  // --------------------------------------------------------------------------
  // 3. OFFICIAL SIGN IN WITH APPLE (OFFICIAL APPLE AUTHENTICATION FLOW)
  // --------------------------------------------------------------------------
  const handleAppleSignIn = async () => {
    clearAlert();
    setIsLoading(true);

    try {
      // Ensure Apple SDK is loaded
      if (!window.AppleID?.auth) {
        await new Promise((resolve, reject) => {
          if (window.AppleID?.auth) return resolve();
          const script = document.createElement('script');
          script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/auth.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load official Apple Sign-in SDK.'));
          document.head.appendChild(script);
        });
      }

      const appleClientId =
        import.meta.env.VITE_APPLE_CLIENT_ID ||
        'net.urjafoods.careers';
      const redirectUri =
        import.meta.env.VITE_APPLE_REDIRECT_URI ||
        `${window.location.origin}/careers/auth/callback?provider=apple`;
      const nonce = crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

      // Initialize official AppleID auth
      window.AppleID.auth.init({
        clientId: appleClientId,
        scope: 'name email',
        redirectURI: redirectUri,
        state: `urja_apple_${Date.now()}`,
        nonce,
        usePopup: true,
      });

      // Opens official Apple authentication popup (Apple handles 2FA and credentials)
      const data = await window.AppleID.auth.signIn();

      if (!data?.authorization?.id_token) {
        showAlert('Apple authentication did not return an identity token.');
        setIsLoading(false);
        return;
      }

      // Send official Apple identity token securely to backend for verification
      const res = await fetch('/api/careers/apple-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_token: data.authorization.id_token,
          code: data.authorization.code,
          user: data.user,
          nonce,
        }),
      });

      const result = await res.json();
      if (result.success) {
        handleSuccessfulAuth(result.user, result.token, result.message || `Welcome, ${result.user.name}!`);
      } else {
        showAlert(result.message || 'Apple identity token could not be verified by server.');
      }
    } catch (err) {
      if (err?.error === 'popup_closed_by_user') {
        showAlert('Apple authentication was closed before completion.');
      } else {
        showAlert(err?.error || err?.message || 'Error opening official Apple authentication.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 4. EMAIL + PASSWORD LOGIN (VERIFIED AGAINST DATABASE WITH BCRYPT)
  // --------------------------------------------------------------------------
  const handleEmailLoginSubmit = async (e) => {
    e.preventDefault();
    clearAlert();

    if (!loginEmail.trim() || !loginPassword) {
      showAlert('Please enter both your email address/mobile and password.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/careers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone: loginEmail.trim(), password: loginPassword }),
      });
      const data = await res.json();

      if (data.success) {
        handleSuccessfulAuth(data.user, data.token, `Welcome back, ${data.user.name}!`);
      } else if (data.requiresVerification) {
        setVerifyEmail(data.email || loginEmail.trim());
        setDevOtpHint(data.devCode || '');
        setViewState('verify');
        showAlert(data.message || 'Please enter the 6-digit code to activate your account.', 'success');
      } else {
        showAlert(data.message || 'Invalid credentials. Please verify your email and password.');
      }
    } catch {
      showAlert('Network error while signing in.');
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 5. REGISTRATION SUBMISSION (BCRYPT HASHED PASSWORDS)
  // --------------------------------------------------------------------------
  const handleEmailSignupSubmit = async (e) => {
    e.preventDefault();
    clearAlert();

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      showAlert('Please fill in your name, email, and password.');
      return;
    }
    if (regPassword.length < 6) {
      showAlert('Password must be at least 6 characters long.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showAlert('Passwords do not match. Please re-enter your password.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/careers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          email: regEmail.trim(),
          phone: regPhone.trim(),
          password: regPassword,
          qualification: regQualification,
          city: regCity,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setVerifyEmail(regEmail.trim());
        setDevOtpHint(data.devCode || '');
        setViewState('verify');
        showAlert(data.message || 'Account created! Enter the 6-digit code sent to your email.', 'success');
      } else {
        showAlert(data.message || 'Registration could not be completed.');
      }
    } catch {
      showAlert('Network error during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------------------------------------------------
  // 6. OTP VERIFICATION & PASSWORD RESET
  // --------------------------------------------------------------------------
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    clearAlert();

    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      showAlert('Please enter the 6-digit activation code.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/careers/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail, code: otpCode.trim() }),
      });
      const data = await res.json();

      if (data.success) {
        handleSuccessfulAuth(data.user, data.token, 'Account activated successfully!');
        setViewState('options');
      } else {
        showAlert(data.message || 'Invalid or expired verification code.');
      }
    } catch {
      showAlert('Network error while verifying code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    clearAlert();

    if (!verifyEmail.trim()) {
      showAlert('Please enter your registered email address.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/careers/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setDevOtpHint(data.devCode || '');
        showAlert('Reset code sent! Enter the code and your new password.', 'success');
        setViewState('reset');
      } else {
        showAlert(data.message || 'Unable to request password reset.');
      }
    } catch {
      showAlert('Network error during password reset request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    clearAlert();

    if (!otpCode.trim() || !newPassword) {
      showAlert('Please enter both the reset code and your new password.');
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/careers/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: verifyEmail.trim(), code: otpCode.trim(), newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        showAlert('Password reset successfully! Please sign in with your new password.', 'success');
        setViewState('email_form');
        setMode('login');
        setLoginEmail(verifyEmail.trim());
      } else {
        showAlert(data.message || 'Password reset failed.');
      }
    } catch {
      showAlert('Network error resetting password.');
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================================================
  // VIEW: MAIN WORKDAY ATS CARD
  // ==========================================================================
  return (
    <div className="wd-auth-page">
      {/* Top Bar Navigation */}
      <div className="wd-auth-topbar">
        <Link to="/careers" className="wd-back-btn">
          <ArrowLeft size={14} />
          <span>Back to Careers</span>
        </Link>
        <div className="wd-auth-brand-tag">
          Urja Foods Careers
        </div>
      </div>

      <div className="wd-auth-card">
        {currentUser ? (
          <div className="wd-session-view">
            <div className="wd-session-avatar">
              {currentUser.picture ? (
                <img src={currentUser.picture} alt={currentUser.name} />
              ) : (
                <User size={36} color="#16a34a" />
              )}
            </div>
            <h1 className="wd-session-name">{currentUser.name}</h1>
            <div className="wd-session-email">{currentUser.email}</div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ecfdf5', color: '#047857', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, margin: '8px 0 20px' }}>
              <ShieldCheck size={14} />
              <span>Verified Session ({currentUser.authProvider?.toUpperCase() || 'URJA'})</span>
            </div>

            <div className="wd-session-btn-wrap">
              <Link
                to={getTargetRedirectUrl()}
                className="wd-pill-btn wd-pill-solid-blue"
              >
                {jobTitle ? `Continue Application for ${jobTitle}` : 'Proceed to Job Application Form'}
              </Link>

              <Link to="/careers" className="wd-pill-btn wd-pill-outline-black">
                <Briefcase size={16} />
                Explore Open Positions
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="wd-pill-btn wd-pill-outline-blue"
                style={{ borderColor: '#ef4444', color: '#ef4444' }}
              >
                Sign Out / Use Another Account
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Informational banner when redirected from Apply Now */}
            {(reason === 'apply' || reason === 'auth_required') && (
              <div
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #86efac',
                  borderRadius: '12px',
                  padding: '14px 18px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  textAlign: 'left',
                }}
              >
                <ShieldCheck size={22} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.94rem', color: '#166534', marginBottom: '3px' }}>
                    Authentication Required to Apply
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#374151', lineHeight: '1.45' }}>
                    {jobTitle ? (
                      <>Please sign in or create an account with Google, Apple, or Email to start your application for <strong>{jobTitle}</strong>.</>
                    ) : (
                      <>Please authenticate below with Google, Apple, or Email before accessing the Job Application form.</>
                    )}
                  </div>
                </div>
              </div>
            )}

            <h1 className="wd-auth-title">
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </h1>

            <p className="wd-auth-subtitle">
              Welcome!{' '}
              {mode === 'login' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setViewState('options');
                      clearAlert();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      font: 'inherit',
                      color: 'inherit',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    Create an account
                  </button>{' '}
                  to manage your applications with us.
                </>
              ) : (
                <>Sign up to apply and track your job applications with us.</>
              )}{' '}
              Account creation and use is subject to the{' '}
              <a
                href="#privacy"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    'Urja Foods Recruitment Privacy Statement: Your candidate information is strictly used for recruitment and job evaluation processes in accordance with data protection regulations.'
                  );
                }}
                className="wd-auth-privacy-link"
              >
                Workday Recruitment Privacy Statement
              </a>
              .
            </p>

            {alert && (
              <div className={`wd-alert-box ${alert.type}`}>
                {alert.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle2 size={16} />}
                <span>{alert.msg}</span>
              </div>
            )}

            {/* --------------------------------------------------------------
                MAIN PILL BUTTONS (Matching User Flow)
               -------------------------------------------------------------- */}
            {viewState === 'options' && (
              <div className="wd-auth-actions">
                {/* 1. Official Apple Authentication */}
                <button
                  type="button"
                  className="wd-pill-btn wd-pill-outline-black"
                  onClick={handleAppleSignIn}
                  disabled={isLoading}
                >
                  <svg viewBox="0 0 170 170" width="18" height="18" fill="currentColor">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.59-7.79-11.67-14.24-5.99-9.46-10.82-20.2-14.5-32.22-3.68-12.01-5.52-23.23-5.52-33.65 0-14.03 3.42-25.75 10.25-35.18 6.83-9.42 15.46-14.28 25.88-14.58 5.12 0 10.74 1.34 16.85 4.02 6.11 2.68 10.02 4.09 11.73 4.24 1.45-.2 5.48-1.63 12.08-4.31 6.6-2.68 12.16-3.88 16.69-3.61 12.44.83 22.41 5.34 29.91 13.54-10.96 6.64-16.31 15.67-16.06 27.09.25 8.92 3.65 16.35 10.21 22.31 6.56 5.96 14.31 9.38 23.26 10.27-2.28 7.02-5.13 14.37-8.56 22.06zM119.22 33.15c0-7.23 2.65-14.07 7.95-20.52 5.3-6.45 11.75-10.66 19.34-12.63.42 1.33.63 2.58.63 3.75 0 7.23-2.73 14.12-8.19 20.67-5.46 6.55-12 10.75-19.63 12.6-.1-.97-.1-2.26-.1-3.87z" />
                  </svg>
                  <span>Sign in with Apple</span>
                </button>

                {/* 2. Official Google Authentication */}
                <button
                  type="button"
                  className="wd-pill-btn wd-pill-outline-black"
                  onClick={handleGoogleSignInClick}
                  disabled={isLoading}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                  <span>Sign in with Google</span>
                </button>

                {/* Google Official Button Container (Renders official GIS button for seamless 1-click fallback) */}
                <div
                  ref={googleBtnContainerRef}
                  style={{ display: 'none' }}
                  aria-hidden="true"
                ></div>

                {/* OR Divider */}
                <div className="wd-auth-divider">
                  <span>OR</span>
                </div>

                {/* 3. Email + Password Button */}
                <button
                  type="button"
                  className="wd-pill-btn wd-pill-outline-blue"
                  onClick={() => {
                    setViewState('email_form');
                    clearAlert();
                  }}
                >
                  <Mail size={16} />
                  <span>{mode === 'login' ? 'Sign in with email' : 'Create account with email'}</span>
                </button>
              </div>
            )}

            {/* --------------------------------------------------------------
                EMAIL SIGN IN FORM (VERIFIED WITH BCRYPT)
               -------------------------------------------------------------- */}
            {viewState === 'email_form' && mode === 'login' && (
              <form onSubmit={handleEmailLoginSubmit} className="wd-email-form-wrap">
                <div className="wd-form-group">
                  <label>Email Address or Mobile</label>
                  <input
                    type="text"
                    placeholder="e.g. rahul.sharma@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="wd-form-input"
                    required
                    autoFocus
                  />
                </div>

                <div className="wd-form-group">
                  <label>Password</label>
                  <div className="wd-form-input-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="wd-form-input"
                      required
                    />
                    <button
                      type="button"
                      className="wd-form-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="wd-form-extras">
                  <label className="wd-form-checkbox">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="wd-forgot-pass-link"
                    onClick={() => {
                      setVerifyEmail(loginEmail.trim());
                      setViewState('forgot');
                      clearAlert();
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="wd-pill-btn wd-pill-solid-blue"
                >
                  {isLoading ? <span>Signing In...</span> : <span>Sign In</span>}
                </button>

                <div style={{ textAlign: 'center', marginTop: '14px' }}>
                  <button
                    type="button"
                    className="wd-back-options-btn"
                    onClick={() => {
                      setViewState('options');
                      clearAlert();
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to all options</span>
                  </button>
                </div>
              </form>
            )}

            {/* --------------------------------------------------------------
                EMAIL REGISTRATION FORM (BCRYPT HASHING)
               -------------------------------------------------------------- */}
            {viewState === 'email_form' && mode === 'signup' && (
              <form onSubmit={handleEmailSignupSubmit} className="wd-email-form-wrap">
                <div className="wd-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Patil"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="wd-form-input"
                    required
                    autoFocus
                  />
                </div>

                <div className="wd-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. ramesh.patil@example.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    className="wd-form-input"
                    required
                  />
                </div>

                <div className="wd-form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    className="wd-form-input"
                  />
                </div>

                <div className="wd-form-group">
                  <label>Password</label>
                  <div className="wd-form-input-wrap">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Minimum 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="wd-form-input"
                      required
                    />
                    <button
                      type="button"
                      className="wd-form-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="wd-form-group">
                  <label>Verify New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    className="wd-form-input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="wd-pill-btn wd-pill-solid-blue"
                >
                  {isLoading ? <span>Creating Account...</span> : <span>Create Account</span>}
                </button>

                <div style={{ textAlign: 'center', marginTop: '14px' }}>
                  <button
                    type="button"
                    className="wd-back-options-btn"
                    onClick={() => {
                      setViewState('options');
                      clearAlert();
                    }}
                  >
                    <ArrowLeft size={14} />
                    <span>Back to all options</span>
                  </button>
                </div>
              </form>
            )}

            {/* --------------------------------------------------------------
                6-DIGIT EMAIL VERIFICATION VIEW
               -------------------------------------------------------------- */}
            {viewState === 'verify' && (
              <form onSubmit={handleVerifySubmit} className="wd-email-form-wrap">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ecfdf5', color: '#16a34a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                    <KeyRound size={22} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px 0', color: '#111827' }}>
                    Enter Activation Code
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    We sent a 6-digit verification code to <strong>{verifyEmail}</strong>.
                  </p>
                  {devOtpHint && (
                    <div style={{ marginTop: '8px', fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '6px', display: 'inline-block' }}>
                      Verification Code: <strong>{devOtpHint}</strong>
                    </div>
                  )}
                </div>

                <div className="wd-form-group">
                  <label style={{ textAlign: 'center' }}>6-Digit Verification Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="wd-form-input"
                    style={{ textAlign: 'center', fontSize: '22px', letterSpacing: '6px', fontWeight: 800 }}
                    required
                    autoFocus
                  />
                </div>

                <button type="submit" disabled={isLoading} className="wd-pill-btn wd-pill-solid-blue">
                  {isLoading ? <span>Verifying...</span> : <span>Activate &amp; Sign In</span>}
                </button>

                <button
                  type="button"
                  className="wd-back-options-btn"
                  onClick={() => setViewState('options')}
                >
                  <ArrowLeft size={14} />
                  <span>Back to all options</span>
                </button>
              </form>
            )}

            {/* --------------------------------------------------------------
                FORGOT PASSWORD VIEW
               -------------------------------------------------------------- */}
            {viewState === 'forgot' && (
              <form onSubmit={handleForgotPasswordSubmit} className="wd-email-form-wrap">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px 0', color: '#111827' }}>
                    Reset Candidate Password
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    Enter your registered email address and we'll dispatch a 6-digit password reset code.
                  </p>
                </div>

                <div className="wd-form-group">
                  <label>Registered Email</label>
                  <input
                    type="email"
                    placeholder="e.g. rahul.sharma@example.com"
                    value={verifyEmail}
                    onChange={(e) => setVerifyEmail(e.target.value)}
                    className="wd-form-input"
                    required
                    autoFocus
                  />
                </div>

                <button type="submit" disabled={isLoading} className="wd-pill-btn wd-pill-solid-blue">
                  {isLoading ? <span>Sending Code...</span> : <span>Send Reset Code</span>}
                </button>

                <button
                  type="button"
                  className="wd-back-options-btn"
                  onClick={() => setViewState('email_form')}
                >
                  <ArrowLeft size={14} />
                  <span>Back to Sign In</span>
                </button>
              </form>
            )}

            {/* --------------------------------------------------------------
                RESET PASSWORD VIEW
               -------------------------------------------------------------- */}
            {viewState === 'reset' && (
              <form onSubmit={handleResetPasswordSubmit} className="wd-email-form-wrap">
                <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 6px 0', color: '#111827' }}>
                    Set New Password
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                    Enter the code sent to <strong>{verifyEmail}</strong> along with your new password.
                  </p>
                  {devOtpHint && (
                    <div style={{ marginTop: '8px', fontSize: '12px', background: '#fef3c7', color: '#92400e', padding: '4px 10px', borderRadius: '6px', display: 'inline-block' }}>
                      Reset Code: <strong>{devOtpHint}</strong>
                    </div>
                  )}
                </div>

                <div className="wd-form-group">
                  <label>6-Digit Reset Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="wd-form-input"
                    style={{ textAlign: 'center', fontSize: '20px', letterSpacing: '4px', fontWeight: 700 }}
                    required
                    autoFocus
                  />
                </div>

                <div className="wd-form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="wd-form-input"
                    required
                  />
                </div>

                <button type="submit" disabled={isLoading} className="wd-pill-btn wd-pill-solid-blue">
                  {isLoading ? <span>Saving...</span> : <span>Save Password &amp; Sign In</span>}
                </button>

                <button
                  type="button"
                  className="wd-back-options-btn"
                  onClick={() => setViewState('email_form')}
                >
                  <ArrowLeft size={14} />
                  <span>Cancel</span>
                </button>
              </form>
            )}

            {/* Switch Mode Prompt (Sign In vs Create Account) */}
            <div className="wd-auth-switch-prompt">
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="wd-auth-switch-link"
                    onClick={() => {
                      setMode('signup');
                      setViewState('options');
                      clearAlert();
                    }}
                  >
                    Create an account
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="wd-auth-switch-link"
                    onClick={() => {
                      setMode('login');
                      setViewState('options');
                      clearAlert();
                    }}
                  >
                    Sign In
                  </button>
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
