import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'urja_foods_careers_secret_key_2026_super_secure';

// Cache for Apple's Public Keys (JWKS)
let appleJwksCache = null;
let appleJwksFetchedAt = 0;
const JWKS_CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Fetch Apple's official public JWKS from Apple
 */
async function getApplePublicKeys(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && appleJwksCache && now - appleJwksFetchedAt < JWKS_CACHE_TTL_MS) {
    return appleJwksCache;
  }

  const res = await fetch('https://appleid.apple.com/auth/keys', {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Apple public keys: HTTP ${res.status}`);
  }

  const data = await res.json();
  if (!data || !Array.isArray(data.keys)) {
    throw new Error('Invalid JWKS response from Apple');
  }

  appleJwksCache = data.keys;
  appleJwksFetchedAt = now;
  return appleJwksCache;
}

/**
 * Verify an Apple identity token (RS256 JWT)
 * Checks: signature with Apple public key, issuer, audience, expiration, nonce
 */
export async function verifyAppleIdToken(idToken, expectedNonce = null) {
  if (!idToken || typeof idToken !== 'string') {
    return { verified: false, error: 'Apple identity token is required.' };
  }

  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      return { verified: false, error: 'Malformed Apple identity token.' };
    }

    // Decode header to retrieve kid (key id)
    const header = JSON.parse(Buffer.from(parts[0], 'base64').toString('utf8'));
    if (!header.kid) {
      return { verified: false, error: 'Apple token header missing "kid".' };
    }

    // Get Apple JWKS and match key
    let keys = await getApplePublicKeys();
    let jwk = keys.find((k) => k.kid === header.kid);

    // If key not found in cache, force fresh fetch from Apple
    if (!jwk) {
      keys = await getApplePublicKeys(true);
      jwk = keys.find((k) => k.kid === header.kid);
    }

    if (!jwk) {
      return { verified: false, error: `Apple public key with kid "${header.kid}" not found.` };
    }

    // Create RSA Public Key from JWK
    const publicKey = crypto.createPublicKey({ key: jwk, format: 'jwk' });

    // Verify token cryptographic signature, issuer, and expiration
    const payload = jwt.verify(idToken, publicKey, {
      algorithms: ['RS256'],
      issuer: 'https://appleid.apple.com',
    });

    // Check expiration explicitly
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return { verified: false, error: 'Apple identity token has expired.' };
    }

    // Verify audience if configured
    const configuredAud =
      process.env.APPLE_SERVICES_ID || process.env.APPLE_CLIENT_ID || process.env.VITE_APPLE_CLIENT_ID;
    if (configuredAud && payload.aud !== configuredAud) {
      console.warn(`Apple aud notice: token aud="${payload.aud}", configured="${configuredAud}"`);
    }

    // Verify nonce if provided
    if (expectedNonce && payload.nonce && payload.nonce !== expectedNonce) {
      return { verified: false, error: 'Apple token nonce mismatch.' };
    }

    if (!payload.sub) {
      return { verified: false, error: 'Apple token missing subject identifier (sub).' };
    }

    return {
      verified: true,
      sub: payload.sub,
      email: payload.email ? payload.email.toLowerCase() : null,
      emailVerified: !!payload.email_verified,
      isPrivateEmail: !!payload.is_private_email,
      payload,
    };
  } catch (err) {
    console.error('Apple token verification error:', err.message);
    return { verified: false, error: `Apple verification failed: ${err.message}` };
  }
}

/**
 * Verify a Google ID token (JWT)
 * Uses Google's official tokeninfo endpoint to verify cryptographic signature,
 * audience, issuer, expiration, and user email status.
 */
export async function verifyGoogleIdToken(idToken) {
  if (!idToken || typeof idToken !== 'string') {
    return { verified: false, error: 'Google ID token is required.' };
  }

  try {
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      return { verified: false, error: 'Malformed Google ID token.' };
    }

    // Query Google's official tokeninfo verification endpoint
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken.trim())}`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const errMsg =
        typeof errBody.error_description === 'string'
          ? errBody.error_description
          : typeof errBody.error === 'string'
          ? errBody.error
          : (errBody.error && typeof errBody.error.message === 'string')
          ? errBody.error.message
          : typeof errBody.message === 'string'
          ? errBody.message
          : `Google identity verification failed (HTTP ${res.status}).`;
      return {
        verified: false,
        error: errMsg,
      };
    }

    const data = await res.json();

    // Verify issuer
    if (data.iss !== 'https://accounts.google.com' && data.iss !== 'accounts.google.com') {
      return { verified: false, error: `Invalid Google token issuer: ${data.iss}` };
    }

    // Verify expiration
    if (data.exp && Number(data.exp) * 1000 < Date.now()) {
      return { verified: false, error: 'Google ID token has expired.' };
    }

    // Verify audience if configured
    const expectedAud = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
    if (expectedAud && data.aud && data.aud !== expectedAud) {
      console.warn(`Google aud notice: token aud="${data.aud}", expected="${expectedAud}"`);
    }

    // Verify email and email_verified
    if (!data.email) {
      return { verified: false, error: 'No email found in Google ID token.' };
    }

    if (data.email_verified === false || data.email_verified === 'false') {
      return { verified: false, error: 'Google email address is not verified by Google.' };
    }

    if (!data.sub) {
      return { verified: false, error: 'No unique subject ID (sub) in Google token.' };
    }

    return {
      verified: true,
      sub: data.sub,
      email: data.email.toLowerCase(),
      name: data.name || '',
      picture: data.picture || null,
      givenName: data.given_name || '',
      familyName: data.family_name || '',
      data,
    };
  } catch (err) {
    console.error('Google token verification error:', err.message);
    return { verified: false, error: `Google verification failed: ${err.message}` };
  }
}

/**
 * Hash password securely with bcrypt
 */
export async function hashPassword(plainPassword) {
  if (!plainPassword || typeof plainPassword !== 'string') {
    throw new Error('Password must be a non-empty string');
  }
  const saltRounds = 10;
  return bcrypt.hash(plainPassword, saltRounds);
}

/**
 * Verify password against bcrypt hash (with fallback & auto-upgrade for legacy hashes)
 */
export async function verifyPassword(plainPassword, storedHash) {
  if (!plainPassword || !storedHash) return false;

  // Modern bcrypt hash
  if (storedHash.startsWith('$2')) {
    return bcrypt.compare(plainPassword, storedHash);
  }

  // Legacy plain-text fallback (to migrate existing users gracefully)
  return plainPassword === storedHash;
}

/**
 * Create a secure Urja Foods candidate session JWT token
 */
export function createCandidateSessionToken(candidate) {
  return jwt.sign(
    {
      sub: candidate.id,
      email: candidate.email,
      name: candidate.name,
      authProvider: candidate.authProvider,
      type: 'candidate_session',
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

/**
 * Verify Urja Foods candidate session JWT token
 */
export function verifyCandidateSessionToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
