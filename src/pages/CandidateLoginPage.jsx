import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Lock, Mail, User } from 'lucide-react';

export default function CandidateLoginPage() {
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/careers/apply';

  // Handle email + password submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please provide a valid email format (e.g. name@example.com).');
      return;
    }
    if (!password || password.length < 4) {
      setErrorMessage('Password must be at least 4 characters long.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const displayName =
        mode === 'signup' && fullName.trim()
          ? fullName.trim()
          : email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      const candidateUser = {
        name: displayName,
        email: email.trim(),
        authMethod: mode === 'signup' ? 'New Account' : 'Email & Password',
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('urja_candidate_user', JSON.stringify(candidateUser));
      setIsLoading(false);
      navigate(redirectPath);
    }, 550);
  };

  // Handle Google Sign-in simulation
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const candidateUser = {
        name: 'Ramesh Patil',
        email: 'ramesh.patil@gmail.com',
        authMethod: 'Google Identity',
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('urja_candidate_user', JSON.stringify(candidateUser));
      setIsLoading(false);
      navigate(redirectPath);
    }, 450);
  };

  // Handle Apple Sign-in simulation
  const handleAppleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      const candidateUser = {
        name: 'Pooja Kulkarni',
        email: 'pooja.kulkarni@icloud.com',
        authMethod: 'Apple ID',
        loggedInAt: new Date().toISOString(),
      };
      localStorage.setItem('urja_candidate_user', JSON.stringify(candidateUser));
      setIsLoading(false);
      navigate(redirectPath);
    }, 450);
  };

  return (
    <div className="career-portal-view" style={{ padding: '2.5rem 1rem 4rem' }}>
      {/* Return to Careers Link */}
      <div style={{ maxWidth: '440px', margin: '0 auto 1.25rem' }}>
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
          <span>Return to All Careers</span>
        </Link>
      </div>

      <div
        className="career-login-container"
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
          padding: '2.75rem 2.25rem',
        }}
      >
        {/* Welcome Back Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '2.1rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.025em',
              marginBottom: '0.5rem',
            }}
          >
            {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            {mode === 'signup'
              ? 'Join Urja Foods Talent Acquisition Portal'
              : 'Sign in to complete and track your job application'}
          </p>
        </div>

        {/* Social Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
          {/* [ Continue with Google ] */}
          <button
            type="button"
            className="career-social-btn btn-google"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 600,
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#1e293b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: '20px', height: '20px' }}>
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* [ Continue with Apple ] */}
          <button
            type="button"
            className="career-social-btn btn-apple"
            onClick={handleAppleSignIn}
            disabled={isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: 600,
              background: '#000000',
              color: '#ffffff',
              border: '1px solid #000000',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <svg viewBox="0 0 170 170" width="18" height="18" fill="currentColor">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-5.78-8.8-10.37-18.77-13.78-29.9-3.41-11.13-5.12-21.84-5.12-32.14 0-14.54 3.73-26.68 11.18-36.43 7.45-9.75 16.89-14.74 28.32-14.97 4.93 0 10.42 1.25 16.49 3.74 6.07 2.5 10.12 3.86 12.16 4.09 1.62-.23 5.92-1.64 12.89-4.22 6.98-2.59 12.73-3.72 17.27-3.4 12.77 1.02 22.84 5.95 30.21 14.8-11.39 6.89-17.02 16.39-16.89 28.49.12 9.54 3.85 17.65 11.19 24.32 7.34 6.67 16.14 10.51 26.4 11.53-2.23 6.97-4.99 14.07-8.28 21.31zM119.22 33.59c0-6.73 2.51-13.33 7.54-19.79 5.03-6.47 11.52-11.08 19.46-13.8-1.27 6.47-4.05 12.74-8.34 18.82-4.29 6.08-9.84 10.37-16.66 12.87-.52-.66-1.12-1.32-1.8-1.97-.2-.2-.2-.2-.2-.13z" />
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Subtle Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            color: '#94a3b8',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            margin: '1.75rem 0',
          }}
        >
          <div style={{ flex: 1, borderBottom: '1px solid #e2e8f0' }} />
          <span style={{ padding: '0 0.85rem' }}>OR</span>
          <div style={{ flex: 1, borderBottom: '1px solid #e2e8f0' }} />
        </div>

        {/* Validation Error Message */}
        {errorMessage && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#991b1b',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              fontSize: '0.875rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                htmlFor="signup-name"
                style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}
              >
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                className="career-input-field"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label
              htmlFor="signin-email"
              style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}
            >
              Email
            </label>
            <input
              id="signin-email"
              type="email"
              className="career-input-field"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div style={{ marginBottom: '1.75rem' }}>
            <label
              htmlFor="signin-password"
              style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}
            >
              Password
            </label>
            <input
              id="signin-password"
              type="password"
              className="career-input-field"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* [ Sign In ] or [ Create Account ] */}
          <button
            type="submit"
            className="career-submit-btn"
            disabled={isLoading}
            style={{
              width: '100%',
              background: '#173b24',
              color: '#ffffff',
              border: 'none',
              padding: '0.95rem',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
          >
            {isLoading
              ? 'Verifying...'
              : mode === 'signup'
              ? 'Create Account'
              : 'Sign In'}
          </button>
        </form>

        {/* Footer: Don't have an account? [ Create Account ] */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
          {mode === 'signin' ? (
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMessage('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#173b24',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textDecoration: 'underline',
                }}
              >
                Create Account
              </button>
            </p>
          ) : (
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMessage('');
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#173b24',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textDecoration: 'underline',
                }}
              >
                Sign In
              </button>
            </p>
          )}

          {/* Quick Demo Login Shortcut */}
          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              className="career-demo-btn"
              onClick={handleGoogleSignIn}
              style={{
                background: '#eaf5eb',
                border: '1px solid #cce5ce',
                color: '#173b24',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              ⚡ Fast Demo Login (Ramesh Patil)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
