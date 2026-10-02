import { verifyCandidateSessionToken } from '../services/authService.js';

/**
 * Express middleware to strictly require valid JWT candidate authentication
 * Validates 'Authorization: Bearer <token>' or 'x-access-token'
 */
export function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers['x-access-token'];

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied: No authentication token provided. Please log in.',
      });
    }

    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7).trim()
      : authHeader.trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied: Empty or malformed authorization token.',
      });
    }

    const decoded = verifyCandidateSessionToken(token);

    if (!decoded || !decoded.sub) {
      return res.status(401).json({
        success: false,
        message: 'Access denied: Invalid or expired JWT token. Please sign in again.',
      });
    }

    // Attach decoded JWT identity payload to req
    req.user = decoded;
    req.candidate = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Token verification failed.',
    });
  }
}

/**
 * Express middleware for optional JWT authentication
 * If a valid JWT is supplied, attaches req.user / req.candidate.
 * If not supplied, request proceeds anonymously.
 */
export function optionalAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers['x-access-token'];
    if (authHeader) {
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7).trim()
        : authHeader.trim();
      if (token) {
        const decoded = verifyCandidateSessionToken(token);
        if (decoded && decoded.sub) {
          req.user = decoded;
          req.candidate = decoded;
        }
      }
    }
  } catch {
    // Ignore error for optional authentication
  }
  next();
}
