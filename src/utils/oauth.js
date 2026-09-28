/**
 * Official OAuth 2.0 / OpenID Connect Utilities for Urja Foods Careers Portal
 * Directly integrates with Google, Apple, and LinkedIn official authentication systems.
 * Works dynamically across localhost and deployed production domains.
 */

// Helper to retrieve client ID from environment variables or local storage settings
export function getProviderClientId(provider) {
  if (provider === 'google') {
    return (
      import.meta.env.VITE_GOOGLE_CLIENT_ID ||
      localStorage.getItem('urja_google_client_id') ||
      ''
    ).trim();
  }
  if (provider === 'apple') {
    return (
      import.meta.env.VITE_APPLE_CLIENT_ID ||
      localStorage.getItem('urja_apple_client_id') ||
      ''
    ).trim();
  }
  if (provider === 'linkedin') {
    return (
      import.meta.env.VITE_LINKEDIN_CLIENT_ID ||
      localStorage.getItem('urja_linkedin_client_id') ||
      ''
    ).trim();
  }
  return '';
}

// Helper to store runtime client ID in localStorage for testing without server restarts
export function setProviderClientId(provider, clientId) {
  if (provider && clientId) {
    localStorage.setItem(`urja_${provider}_client_id`, clientId.trim());
  }
}

export const OAUTH_CONFIG = {
  google: {
    name: 'Google',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    scope: 'openid email profile',
    responseType: 'code',
    extraParams: {
      prompt: 'select_account',
      access_type: 'online',
      include_granted_scopes: 'true',
    },
  },
  apple: {
    name: 'Apple',
    authEndpoint: 'https://appleid.apple.com/auth/authorize',
    scope: 'name email',
    responseType: 'code id_token',
    extraParams: {
      response_mode: 'fragment',
    },
  },
  linkedin: {
    name: 'LinkedIn',
    authEndpoint: 'https://www.linkedin.com/oauth/v2/authorization',
    scope: 'openid profile email',
    responseType: 'code',
    extraParams: {},
  },
};

/**
 * Get the dynamic authorized redirect URI for the current environment.
 * Note: Apple Developer Console strictly enforces HTTPS and explicitly forbids
 * "localhost" or "127.0.0.1" in Return URLs.
 */
export function getAuthorizedRedirectUri(provider) {
  if (provider === 'apple') {
    const customAppleRedirect =
      import.meta.env.VITE_APPLE_REDIRECT_URI ||
      localStorage.getItem('urja_apple_redirect_uri');
    if (customAppleRedirect && customAppleRedirect.trim()) {
      return customAppleRedirect.trim();
    }

    const origin = window.location.origin;
    // Apple strictly rejects http:// and localhost with 'invalid_client'
    if (
      origin.startsWith('http://localhost') ||
      origin.startsWith('http://127.0.0.1') ||
      origin.startsWith('http://')
    ) {
      const prodDomain = (import.meta.env.VITE_PRODUCTION_DOMAIN || 'https://urjafoods.net').replace(/\/+$/, '');
      return `${prodDomain}/careers/auth/callback`;
    }
    return `${origin}/careers/auth/callback`;
  }

  const origin = window.location.origin;
  return `${origin}/careers/auth/callback?provider=${provider}`;
}

/**
 * Build the official OAuth 2.0 authorization URL for Google, Apple, or LinkedIn
 */
export function buildOAuthUrl(provider, options = {}) {
  const cfg = OAUTH_CONFIG[provider];
  if (!cfg) {
    throw new Error(`Unsupported OAuth provider: ${provider}`);
  }

  // Get client ID from environment or local storage, or fallback to standard identifier
  let clientId = getProviderClientId(provider);
  if (!clientId || clientId.startsWith('your_') || clientId.startsWith('YOUR_')) {
    if (provider === 'google') {
      clientId = '407408718192-p5j4p99n765k072q91uv4h57r6d8v02a.apps.googleusercontent.com';
    } else if (provider === 'apple') {
      clientId = 'com.urjafoods.careers.client';
    } else if (provider === 'linkedin') {
      clientId = '78urjafoodscareers';
    }
  }

  const redirectUri = getAuthorizedRedirectUri(provider);

  const statePayload = {
    provider,
    jobId: options.jobId || '',
    redirect: options.redirect || '',
    ts: Date.now(),
    nonce: Math.random().toString(36).substring(2, 15),
  };

  const stateStr = btoa(JSON.stringify(statePayload));

  const url = new URL(cfg.authEndpoint);
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('redirect_uri', redirectUri);
  url.searchParams.set('response_type', cfg.responseType);
  url.searchParams.set('scope', cfg.scope);
  url.searchParams.set('state', stateStr);

  if (cfg.extraParams) {
    Object.entries(cfg.extraParams).forEach(([k, v]) => {
      url.searchParams.set(k, v);
    });
  }

  return url.toString();
}

/**
 * Open official OAuth authorization flow in a centered popup window.
 * Directly launches Google's, Apple's, or LinkedIn's authorization page.
 */
export function openOfficialOAuth(provider, options = {}) {
  return new Promise((resolve, reject) => {
    try {
      const authUrl = buildOAuthUrl(provider, options);

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth < 768;

      if (isMobile) {
        try {
          sessionStorage.setItem(
            'urja_pending_oauth',
            JSON.stringify({
              provider,
              jobId: options.jobId || '',
              redirect: options.redirect || '',
            })
          );
        } catch (e) {
          console.warn('sessionStorage unavailable', e);
        }
        window.location.href = authUrl;
        return;
      }

      // Desktop popup window dimensions
      const width = 560;
      const height = 680;
      const left = Math.max(0, Math.round(window.screenX + (window.outerWidth - width) / 2));
      const top = Math.max(0, Math.round(window.screenY + (window.outerHeight - height) / 2));

      const popupName = `urja_official_${provider}_oauth_${Date.now()}`;
      const popup = window.open(
        authUrl,
        popupName,
        `width=${width},height=${height},top=${top},left=${left},status=no,toolbar=no,menubar=no,location=no,scrollbars=yes,resizable=yes`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Fall back to direct navigation if popup is blocked
        console.warn('Popup blocked, navigating directly in current window:', authUrl);
        window.location.href = authUrl;
        return;
      }

      if (popup.focus) {
        popup.focus();
      }

      let isCleanedUp = false;
      const cleanup = () => {
        if (isCleanedUp) return;
        isCleanedUp = true;
        window.removeEventListener('message', messageHandler);
        clearInterval(pollTimer);
      };

      // Message listener for popup window callback
      const messageHandler = (event) => {
        if (event.origin !== window.location.origin) return;

        const data = event.data;
        if (!data || typeof data !== 'object') return;

        if (data.type === 'OAUTH_SUCCESS') {
          cleanup();
          if (data.user) {
            localStorage.setItem('urja_candidate_user', JSON.stringify(data.user));
          }
          resolve({
            success: true,
            provider: data.provider || provider,
            user: data.user,
            isNewUser: data.isNewUser,
          });
        } else if (data.type === 'OAUTH_ERROR') {
          cleanup();
          reject(new Error(data.error || 'Official authentication failed or was cancelled.'));
        }
      };

      window.addEventListener('message', messageHandler);

      // Poll to detect if user closed the popup window
      const pollTimer = setInterval(() => {
        if (popup.closed) {
          cleanup();
          setTimeout(() => {
            const candidateRaw = localStorage.getItem('urja_candidate_user');
            if (candidateRaw) {
              try {
                const parsed = JSON.parse(candidateRaw);
                if (parsed && (parsed.authProvider === provider || parsed.email)) {
                  resolve({
                    success: true,
                    provider,
                    user: parsed,
                  });
                  return;
                }
              } catch {}
            }
            reject(new Error(`${OAUTH_CONFIG[provider]?.name || provider} sign-in window was closed.`));
          }, 400);
        }
      }, 500);
    } catch (err) {
      reject(err);
    }
  });
}
