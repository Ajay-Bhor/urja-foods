import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { isTokenValid, authFetch, clearAuthSession, setAuthUser } from '../utils/auth.js';
import CareerApplicationPortal from './CareerApplicationPortal';

export default function CareerApplyPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // State: 'verifying' | 'authenticated' | 'unauthorized'
  const [authState, setAuthState] = useState(() => {
    return isTokenValid() ? 'verifying' : 'unauthorized';
  });

  useEffect(() => {
    // 1. Synchronous Client-Side Token Validity Check
    if (!isTokenValid()) {
      const redirectPath = location.pathname + location.search;
      navigate(`/careers/login?redirect=${encodeURIComponent(redirectPath)}&reason=auth_required`, {
        replace: true,
      });
      return;
    }

    // 2. Cryptographic Server-Side Token & Session Verification
    let isMounted = true;
    authFetch('/api/careers/session')
      .then(async (res) => {
        if (!isMounted) return;
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.user) {
            setAuthUser(data.user);
            setAuthState('authenticated');
            return;
          }
        }
        // If 401 or invalid response:
        clearAuthSession();
        setAuthState('unauthorized');
        const redirectPath = location.pathname + location.search;
        navigate(`/careers/login?redirect=${encodeURIComponent(redirectPath)}&reason=auth_required`, {
          replace: true,
        });
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn('Backend session revalidation offline fallback:', err);
        // Fallback: If JWT token passes local cryptographic expiration check, permit access
        if (isTokenValid()) {
          setAuthState('authenticated');
        } else {
          clearAuthSession();
          setAuthState('unauthorized');
          const redirectPath = location.pathname + location.search;
          navigate(`/careers/login?redirect=${encodeURIComponent(redirectPath)}&reason=auth_required`, {
            replace: true,
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [location, navigate]);

  // Loading Screen while verifying candidate credentials
  if (authState === 'verifying') {
    return (
      <div
        style={{
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
        }}
      >
        <div
          style={{
            maxWidth: '440px',
            width: '100%',
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)',
            padding: '2.5rem 2rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 1.25rem',
              borderRadius: '50%',
              background: '#ecfdf5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
            }}
          >
            <ShieldCheck size={36} />
          </div>
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#1e293b',
              margin: '0 0 0.5rem',
            }}
          >
            Verifying Authentication
          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#64748b',
              lineHeight: 1.5,
              margin: '0 0 1.5rem',
            }}
          >
            Validating your candidate credentials for the Urja Foods Job Application portal...
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#059669',
              fontSize: '0.85rem',
              fontWeight: 600,
            }}
          >
            <Loader2 size={16} className="animate-spin" />
            <span>Securing application session...</span>
          </div>
        </div>
      </div>
    );
  }

  // If unauthorized, redirect is handled in useEffect
  if (authState === 'unauthorized') {
    return null;
  }

  // Authenticated: Render Application Portal
  return <CareerApplicationPortal />;
}
