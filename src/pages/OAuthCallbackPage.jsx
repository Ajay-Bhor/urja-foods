import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, AlertCircle, RefreshCw, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [candidateName, setCandidateName] = useState('');
  const [targetDestination, setTargetDestination] = useState('/careers/login');

  useEffect(() => {
    async function handleCallback() {
      // 1. Parse parameters from both Search Query and Hash Fragment (Apple uses hash fragment)
      const queryProvider = searchParams.get('provider') || '';
      // Also check URL hash for parameters from providers using response_mode=fragment (e.g. Apple)
      const hash = window.location.hash.substring(1);
      const hashParams = new URLSearchParams(hash);

      const code = searchParams.get('code') || hashParams.get('code') || '';
      const error = searchParams.get('error') || hashParams.get('error') || '';
      const errorDescription =
        searchParams.get('error_description') ||
        hashParams.get('error_description') ||
        searchParams.get('error_subtype') ||
        '';
      const rawState = searchParams.get('state') || hashParams.get('state') || '';
      const idToken = hashParams.get('id_token') || searchParams.get('id_token') || '';
      const accessToken = hashParams.get('access_token') || searchParams.get('access_token') || '';

      // 2. Decode State parameter to retrieve original context (jobId, return redirect)
      let stateData = {};
      if (rawState) {
        try {
          const decoded = decodeURIComponent(rawState);
          stateData = JSON.parse(atob(decoded));
        } catch {
          try {
            stateData = JSON.parse(atob(rawState));
          } catch {
            stateData = {};
          }
        }
      }

      const provider = queryProvider || stateData.provider || 'oauth';
      const jobId = stateData.jobId || searchParams.get('jobId') || '';
      const redirect = stateData.redirect || searchParams.get('redirect') || '';

      const dest = jobId ? `/careers/apply?jobId=${jobId}` : redirect || '/careers/login';
      setTargetDestination(dest);

      // 3. Handle Provider Cancellation or Authentication Errors
      if (error) {
        const errorText =
          error === 'access_denied'
            ? 'Sign in was cancelled or access was not granted.'
            : errorDescription || error || 'Provider authentication error occurred.';

        setStatus('error');
        setErrorMessage(errorText);

        // Notify opener popup
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: 'OAUTH_ERROR',
              provider,
              error: errorText,
            },
            window.location.origin
          );
          setTimeout(() => {
            try {
              window.close();
            } catch {}
          }, 1500);
        }
        return;
      }

      // 4. Verify Authorization Code or Tokens with Backend
      try {
        const redirectUri = `${window.location.origin}/careers/auth/callback?provider=${provider}`;

        const res = await fetch('/api/careers/auth/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            provider,
            code,
            idToken,
            accessToken,
            state: rawState,
            redirectUri,
            jobId,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success && data.user) {
          setStatus('success');
          setCandidateName(data.user.name || 'Candidate');

          // Store verified candidate in local storage
          localStorage.setItem('urja_candidate_user', JSON.stringify(data.user));

          // Post message to opener window if running in popup
          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(
              {
                type: 'OAUTH_SUCCESS',
                provider,
                user: data.user,
                isNewUser: data.isNewUser,
              },
              window.location.origin
            );

            setTimeout(() => {
              try {
                window.close();
              } catch {}
            }, 800);
          } else {
            // Mobile or standalone full-page flow: Navigate directly
            setTimeout(() => {
              navigate(dest, { replace: true });
            }, 1200);
          }
        } else {
          setStatus('error');
          setErrorMessage(data.message || 'Unable to complete candidate account verification.');

          if (window.opener && !window.opener.closed) {
            window.opener.postMessage(
              {
                type: 'OAUTH_ERROR',
                provider,
                error: data.message || 'Authentication failed',
              },
              window.location.origin
            );
          }
        }
      } catch (err) {
        console.error('OAuth Callback exchange error:', err);
        setStatus('error');
        setErrorMessage('Network connection error while validating authentication.');

        if (window.opener && !window.opener.closed) {
          window.opener.postMessage(
            {
              type: 'OAUTH_ERROR',
              provider,
              error: 'Network connection error during authentication.',
            },
            window.location.origin
          );
        }
      }
    }

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8fafc',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07)',
          padding: '2.5rem 2rem',
          textAlign: 'center',
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <img
            src="/images/urja-logo.png"
            alt="Urja Foods"
            style={{ height: '36px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#173b24' }}>
            🌾 Urja Foods Careers
          </span>
        </div>

        {/* Processing State */}
        {status === 'processing' && (
          <div>
            <div style={{ display: 'inline-flex', padding: '1rem', background: '#eff6ff', borderRadius: '50%', marginBottom: '1.25rem' }}>
              <RefreshCw size={36} color="#005fc5" className="animate-spin" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>
              Completing Authentication
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, margin: 0 }}>
              Verifying your profile credentials with the official authentication provider...
            </p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div>
            <div style={{ display: 'inline-flex', padding: '1rem', background: '#dcfce7', borderRadius: '50%', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={36} color="#15803d" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>
              Authentication Successful!
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#166534', fontWeight: 600, margin: '0 0 0.5rem' }}>
              Welcome, {candidateName}!
            </p>
            <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0 }}>
              Redirecting you to the candidate portal...
            </p>
          </div>
        )}

        {/* Error State */}
        {status === 'error' && (
          <div>
            <div style={{ display: 'inline-flex', padding: '1rem', background: '#fee2e2', borderRadius: '50%', marginBottom: '1.25rem' }}>
              <AlertCircle size={36} color="#dc2626" />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 0.5rem' }}>
              Authentication Notice
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#b91c1c', margin: '0 0 1.5rem', lineHeight: 1.5 }}>
              {errorMessage}
            </p>

            <Link
              to={targetDestination}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                width: '100%',
                padding: '0.75rem 1rem',
                background: '#173b24',
                color: '#ffffff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.92rem',
                boxSizing: 'border-box',
              }}
            >
              <ArrowLeft size={16} />
              <span>Return to Career Sign-In</span>
            </Link>
          </div>
        )}

        <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#94a3b8' }}>
          <ShieldCheck size={14} color="#16a34a" />
          <span>Official OAuth 2.0 / OpenID Connect Certified</span>
        </div>
      </div>
    </div>
  );
}
