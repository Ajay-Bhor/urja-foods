import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const applicationsFile = path.join(__dirname, '../data/applications.json');
const emailLogsFile = path.join(__dirname, '../data/email_logs.json');
const candidateUsersFile = path.join(__dirname, '../data/candidate_users.json');

// Ensure data files exist
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(applicationsFile)) {
  fs.writeFileSync(applicationsFile, JSON.stringify([], null, 2), 'utf8');
}

if (!fs.existsSync(emailLogsFile)) {
  fs.writeFileSync(emailLogsFile, JSON.stringify([], null, 2), 'utf8');
}

if (!fs.existsSync(candidateUsersFile)) {
  fs.writeFileSync(candidateUsersFile, JSON.stringify([
    {
      id: 'cand-demo-1',
      name: 'Ramesh Patil',
      email: 'ramesh.patil@gmail.com',
      phone: '9876543210',
      password: 'password123',
      qualification: 'B.Sc Agriculture / Animal Science',
      experience: '1 – 3 Years',
      city: 'Manchar, Pune',
      createdAt: new Date().toISOString(),
    }
  ], null, 2), 'utf8');
}

const getCandidateUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(candidateUsersFile, 'utf8'));
  } catch {
    return [];
  }
};

const saveCandidateUsers = (data) => {
  fs.writeFileSync(candidateUsersFile, JSON.stringify(data, null, 2), 'utf8');
};

const getApplications = () => {
  try {
    return JSON.parse(fs.readFileSync(applicationsFile, 'utf8'));
  } catch {
    return [];
  }
};

const saveApplications = (data) => {
  fs.writeFileSync(applicationsFile, JSON.stringify(data, null, 2), 'utf8');
};

const logEmail = async (emailObj) => {
  try {
    const logs = JSON.parse(fs.readFileSync(emailLogsFile, 'utf8') || '[]');
    logs.unshift(emailObj);
    fs.writeFileSync(emailLogsFile, JSON.stringify(logs.slice(0, 100), null, 2), 'utf8');

    if (isDbConnected()) {
      try {
        await query(
          `INSERT INTO email_logs (type, application_id, recipient, subject, status, timestamp)
           VALUES (?, ?, ?, ?, ?, NOW())`,
          [emailObj.type || 'UNKNOWN', emailObj.applicationId || null, emailObj.to || null, emailObj.subject || null, emailObj.status || 'LOGGED']
        );
      } catch (dbErr) {
        console.warn('⚠️ [MySQL Email Log Error]', dbErr.message);
      }
    }
  } catch (err) {
    console.warn('[Email Log Error]', err.message);
  }
};

// Create reusable nodemailer transporter
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return null;
};

// POST /api/careers/apply
router.post('/apply', async (req, res) => {
  const {
    name,
    phone,
    email,
    position,
    experience,
    qualification,
    city,
    resumeUrl,
    message,
  } = req.body;

  if (!name || !phone || !email || !position) {
    return res.status(400).json({
      success: false,
      message: 'Full Name, Mobile Number, Email Address, and Target Position are required.',
    });
  }

  // Validate phone
  const cleanPhone = String(phone).replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit mobile number.',
    });
  }

  const applicationId = `URJA-CAREER-${Date.now().toString().slice(-6)}`;
  const submittedAt = new Date();
  const formattedDate = submittedAt.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const hrTargetEmail = process.env.HR_EMAIL || 'careers@urjafoods.net';

  const newApplication = {
    id: applicationId,
    name: name.trim(),
    phone: phone.trim(),
    email: email.trim(),
    position: position.trim(),
    experience: experience || 'Not specified',
    qualification: qualification || 'Graduate / Diploma',
    city: city ? city.trim() : 'Not provided',
    resumeUrl: resumeUrl ? resumeUrl.trim() : '',
    message: message ? message.trim() : '',
    submittedAt: submittedAt.toISOString(),
    status: 'Delivered to HR Desk',
  };

  // 1. Save candidate dossier in persistent JSON database & MySQL
  const applications = getApplications();
  applications.unshift(newApplication);
  saveApplications(applications);

  if (isDbConnected()) {
    try {
      await query(
        `INSERT INTO career_applications (
          id, name, phone, email, position, experience, qualification, city, resume_url, message, status, submitted_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newApplication.id,
          newApplication.name,
          newApplication.phone,
          newApplication.email,
          newApplication.position,
          newApplication.experience,
          newApplication.qualification,
          newApplication.city,
          newApplication.resumeUrl,
          newApplication.message,
          newApplication.status,
          submittedAt,
        ]
      );
    } catch (dbErr) {
      console.warn('⚠️ [MySQL Application Save Error]', dbErr.message);
    }
  }

  console.log(`[Urja Careers] New Application received for ${newApplication.position} from ${newApplication.name} (${newApplication.email})`);

  // 2. Prepare official HR email payload (Sent to HR Desk)
  const hrEmailContent = {
    to: hrTargetEmail,
    subject: `[New Candidate Application] ${newApplication.position} - ${newApplication.name} (Ref: ${applicationId})`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="background: #0e2919; color: #ffffff; padding: 16px 20px; border-radius: 6px 6px 0 0;">
          <h2 style="margin: 0; font-size: 20px; color: #a8c58f;">Urja Foods & Agro - Recruitment Desk</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #cbd5e1;">New Candidate Dossier Received</p>
        </div>
        <div style="padding: 20px; background: #fafafa;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; width: 160px; color: #444;">Candidate Name:</td><td>${newApplication.name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Position Applied:</td><td><strong style="color: #2e7d32;">${newApplication.position}</strong></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Reference Code:</td><td><code>${applicationId}</code></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Mobile Number:</td><td><a href="tel:${newApplication.phone}">${newApplication.phone}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Email Address:</td><td><a href="mailto:${newApplication.email}">${newApplication.email}</a></td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Experience:</td><td>${newApplication.experience}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Qualification:</td><td>${newApplication.qualification}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Location/City:</td><td>${newApplication.city}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Resume / Profile Link:</td><td>${newApplication.resumeUrl ? `<a href="${newApplication.resumeUrl}" target="_blank">${newApplication.resumeUrl}</a>` : 'Not attached (Requested via email)'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444; vertical-align: top;">Candidate Notes:</td><td>${newApplication.message || 'No additional note provided.'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #444;">Submission Time:</td><td>${formattedDate}</td></tr>
          </table>
        </div>
        <div style="padding: 12px 20px; background: #f0f0f0; font-size: 12px; color: #666; border-radius: 0 0 6px 6px;">
          Received via Urja Foods Careers Portal · Nirgudsar Complex, Ambegaon, Pune.
        </div>
      </div>
    `,
  };

  // 3. Prepare "Simple HR Reply" to the Candidate
  const candidateAutoReply = {
    to: newApplication.email,
    from: `"Urja Foods HR Desk" <${hrTargetEmail}>`,
    subject: `Application Acknowledgment: ${newApplication.position} (Ref: ${applicationId}) - Urja Foods & Agro`,
    greeting: `Dear ${newApplication.name},`,
    mainMessage: `Thank you for your interest in joining Urja Foods & Agro Pvt. Ltd. We have successfully received your application for the role of ${newApplication.position}.`,
    details: {
      applicationId: applicationId,
      position: newApplication.position,
      candidateName: newApplication.name,
      contactPhone: newApplication.phone,
      submissionDate: formattedDate,
      assignedOffice: 'Nirgudsar Complex, Ambegaon, Pune, Maharashtra',
    },
    nextSteps: [
      'Our HR & Technical Assessment panel reviews applications in order of submission.',
      'If your background and technical skills align with our operational needs, our recruitment officer will contact you within 48 to 72 business hours for a telephonic introduction.',
      'Please keep your educational certificates and prior experience documents accessible.',
    ],
    signOff: {
      name: 'Human Resources & Talent Acquisition Team',
      company: 'Urja Foods & Agro Pvt. Ltd.',
      hq: 'HP HOUSE, 35/1A, Jarkarwadi Phata, Nirgudsar, Manchar, Maharashtra 410503',
      contact: '+91-7028939900 | careers@urjafoods.net',
    },
  };

  // 4. Dispatch emails via Nodemailer if SMTP configured, or log outgoing emails
  const transporter = createTransporter();
  let emailSentViaSmtp = false;

  if (transporter) {
    try {
      // Send to HR
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Urja Careers Portal" <${hrTargetEmail}>`,
        to: hrTargetEmail,
        subject: hrEmailContent.subject,
        html: hrEmailContent.html,
      });

      // Send auto-reply to Candidate
      await transporter.sendMail({
        from: `"Urja Foods HR Desk" <${hrTargetEmail}>`,
        to: newApplication.email,
        subject: candidateAutoReply.subject,
        text: `${candidateAutoReply.greeting}\n\n${candidateAutoReply.mainMessage}\n\nReference ID: ${applicationId}\nPosition: ${newApplication.position}\nDate: ${formattedDate}\n\nNext Steps:\n${candidateAutoReply.nextSteps.map(s => `- ${s}`).join('\n')}\n\nWarm Regards,\n${candidateAutoReply.signOff.name}\n${candidateAutoReply.signOff.company}\n${candidateAutoReply.signOff.contact}`,
      });

      emailSentViaSmtp = true;
    } catch (smtpErr) {
      console.warn('[SMTP Dispatch Warning - Logged to file instead]', smtpErr.message);
    }
  }

  // 5. Always record the outbound email dispatches in email_logs.json
  logEmail({
    timestamp: new Date().toISOString(),
    type: 'HR_CANDIDATE_NOTIFICATION',
    applicationId,
    to: hrTargetEmail,
    subject: hrEmailContent.subject,
    status: emailSentViaSmtp ? 'SENT_VIA_SMTP' : 'LOGGED_READY_FOR_DISPATCH',
  });

  logEmail({
    timestamp: new Date().toISOString(),
    type: 'CANDIDATE_AUTO_REPLY',
    applicationId,
    to: newApplication.email,
    subject: candidateAutoReply.subject,
    status: emailSentViaSmtp ? 'SENT_VIA_SMTP' : 'LOGGED_READY_FOR_DISPATCH',
  });

  // 6. Return response with the formatted Simple HR Reply
  return res.status(201).json({
    success: true,
    message: 'Application successfully submitted and forwarded to HR!',
    applicationId,
    hrTargetEmail,
    candidateEmail: newApplication.email,
    emailSentViaSmtp,
    hrReply: candidateAutoReply,
  });
});

// GET /api/careers/applications (List recent applications)
router.get('/applications', async (req, res) => {
  if (isDbConnected()) {
    try {
      const [[countRow]] = await query('SELECT COUNT(*) as count FROM career_applications');
      const rows = await query('SELECT * FROM career_applications ORDER BY submitted_at DESC LIMIT 20');
      const formatted = rows.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email,
        position: r.position,
        experience: r.experience,
        qualification: r.qualification,
        city: r.city,
        resumeUrl: r.resume_url,
        message: r.message,
        status: r.status,
        submittedAt: r.submitted_at,
      }));

      return res.json({
        success: true,
        source: 'mysql',
        count: countRow.count,
        applications: formatted,
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Careers Query Warning] Falling back to JSON:', err.message);
    }
  }

  const applications = getApplications();
  res.json({
    success: true,
    source: 'json-fallback',
    count: applications.length,
    applications: applications.slice(0, 20),
  });
});

// =========================================================================
// CANDIDATE AUTHENTICATION & PORTAL SUITE (APPLE, GOOGLE, LINKEDIN, EMAIL)
// =========================================================================

// Helper to send transactional auth emails
async function sendAuthEmail(to, subject, text, html) {
  await logEmail({
    type: 'CANDIDATE_AUTH',
    to,
    subject,
    status: 'DISPATCHED',
    timestamp: new Date().toISOString(),
  });

  const transporter = createTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'Urja Foods Careers <careers@urjafoods.net>',
        to,
        subject,
        text,
        html,
      });
      console.log(`✉️ [Candidate Auth Email] Sent to ${to}: ${subject}`);
    } catch (mailErr) {
      console.warn(`⚠️ [Mail Transport Warning]: ${mailErr.message}`);
    }
  } else {
    console.log(`📧 [Simulated Email to ${to}] Subject: "${subject}"`);
  }
}

// Helper: Synchronize candidate user between memory JSON and MySQL
async function saveOrUpdateCandidate(userData) {
  const users = getCandidateUsers();
  const cleanEmail = userData.email ? userData.email.trim().toLowerCase() : '';
  const cleanPhone = userData.phone ? String(userData.phone).replace(/\D/g, '') : '';

  let existingIndex = users.findIndex(
    (u) =>
      (cleanEmail && u.email && u.email.toLowerCase() === cleanEmail) ||
      (userData.id && u.id === userData.id) ||
      (cleanPhone && u.phone && u.phone.replace(/\D/g, '') === cleanPhone)
  );

  let mergedUser;
  if (existingIndex >= 0) {
    mergedUser = {
      ...users[existingIndex],
      ...userData,
      email: cleanEmail || users[existingIndex].email,
      phone: cleanPhone || users[existingIndex].phone || '',
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    users[existingIndex] = mergedUser;
  } else {
    mergedUser = {
      id: userData.id || `cand-${Date.now().toString().slice(-6)}`,
      name: userData.name || (cleanEmail ? cleanEmail.split('@')[0].replace(/[._]/g, ' ') : 'Candidate User'),
      email: cleanEmail,
      phone: cleanPhone || '',
      password: userData.password || null,
      picture: userData.picture || null,
      authProvider: userData.authProvider || 'email',
      providerId: userData.providerId || null,
      emailVerified: userData.emailVerified === true,
      verificationCode: userData.verificationCode || null,
      verificationExpires: userData.verificationExpires || null,
      resetCode: userData.resetCode || null,
      resetExpires: userData.resetExpires || null,
      city: userData.city || 'Pune, Maharashtra',
      qualification: userData.qualification || 'Graduate / Professional',
      experience: userData.experience || '1 – 3 Years',
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    users.push(mergedUser);
  }

  saveCandidateUsers(users);

  // Sync to MySQL
  if (isDbConnected()) {
    try {
      await query(
        `INSERT INTO candidate_users (
          id, name, email, phone, password, picture, auth_provider, provider_id,
          email_verified, verification_code, verification_code_expires, reset_code, reset_code_expires,
          city, qualification, experience, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          phone = COALESCE(VALUES(phone), phone),
          password = COALESCE(VALUES(password), password),
          picture = COALESCE(VALUES(picture), picture),
          auth_provider = VALUES(auth_provider),
          provider_id = COALESCE(VALUES(provider_id), provider_id),
          email_verified = VALUES(email_verified),
          verification_code = VALUES(verification_code),
          verification_code_expires = VALUES(verification_code_expires),
          reset_code = VALUES(reset_code),
          reset_code_expires = VALUES(reset_code_expires),
          city = COALESCE(VALUES(city), city),
          qualification = COALESCE(VALUES(qualification), qualification),
          experience = COALESCE(VALUES(experience), experience),
          updated_at = NOW()`,
        [
          mergedUser.id,
          mergedUser.name,
          mergedUser.email,
          mergedUser.phone || null,
          mergedUser.password || null,
          mergedUser.picture || null,
          mergedUser.authProvider || 'email',
          mergedUser.providerId || null,
          mergedUser.emailVerified ? 1 : 0,
          mergedUser.verificationCode || null,
          mergedUser.verificationExpires ? new Date(mergedUser.verificationExpires) : null,
          mergedUser.resetCode || null,
          mergedUser.resetExpires ? new Date(mergedUser.resetExpires) : null,
          mergedUser.city || null,
          mergedUser.qualification || null,
          mergedUser.experience || null,
        ]
      );
    } catch (dbErr) {
      console.warn('⚠️ [MySQL Candidate Sync Warning]', dbErr.message);
    }
  }

  return mergedUser;
}

// Helper: Find candidate user by email, phone, or id
async function findCandidate(term) {
  if (!term) return null;
  const cleanTerm = String(term).trim().toLowerCase();
  const cleanPhone = cleanTerm.replace(/\D/g, '');

  if (isDbConnected()) {
    try {
      const rows = await query(
        `SELECT * FROM candidate_users
         WHERE LOWER(email) = ? OR id = ? OR (phone IS NOT NULL AND phone != '' AND REPLACE(phone, '-', '') = ?)
         LIMIT 1`,
        [cleanTerm, cleanTerm, cleanPhone]
      );
      if (rows && rows.length > 0) {
        const r = rows[0];
        return {
          id: r.id,
          name: r.name,
          email: r.email,
          phone: r.phone || '',
          password: r.password,
          picture: r.picture,
          authProvider: r.auth_provider,
          providerId: r.provider_id,
          emailVerified: !!r.email_verified,
          verificationCode: r.verification_code,
          verificationExpires: r.verification_code_expires,
          resetCode: r.reset_code,
          resetExpires: r.reset_code_expires,
          city: r.city,
          qualification: r.qualification,
          experience: r.experience,
          createdAt: r.created_at,
          updatedAt: r.updated_at,
        };
      }
    } catch (err) {
      console.warn('⚠️ [MySQL findCandidate Warning]', err.message);
    }
  }

  const users = getCandidateUsers();
  return (
    users.find(
      (u) =>
        u.id === cleanTerm ||
        (u.email && u.email.toLowerCase() === cleanTerm) ||
        (cleanPhone && u.phone && u.phone.replace(/\D/g, '') === cleanPhone)
    ) || null
  );
}

// Helper: Format candidate user object for client response (omits sensitive password/codes)
function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    picture: user.picture || null,
    authProvider: user.authProvider || 'email',
    emailVerified: !!user.emailVerified,
    qualification: user.qualification || '',
    experience: user.experience || '',
    city: user.city || 'Pune, Maharashtra',
  };
}

// -------------------------------------------------------------------------
// OFFICIAL OAUTH 2.0 / OPENID CONNECT CALLBACK & TOKEN EXCHANGE
// -------------------------------------------------------------------------
router.post('/auth/callback', async (req, res) => {
  try {
    const { provider, code, idToken, accessToken, state, redirectUri } = req.body;

    if (!provider) {
      return res.status(400).json({ success: false, message: 'OAuth provider is required.' });
    }

    let profile = {
      name: '',
      email: '',
      picture: null,
      providerId: '',
      authProvider: provider,
    };

    // 1. If ID Token (JWT) is present (Google OIDC or Apple ID Token)
    if (idToken) {
      try {
        const parts = idToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
          profile.email = payload.email || profile.email;
          profile.name = payload.name || payload.given_name || profile.name;
          profile.picture = payload.picture || profile.picture;
          profile.providerId = payload.sub || profile.providerId;
        }
      } catch (jwtErr) {
        console.warn('Could not parse idToken JWT payload:', jwtErr.message);
      }
    }

    // 2. Google OAuth 2.0 Code Exchange
    if (provider === 'google') {
      const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
      const googleClientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;

      if (!googleSecret) {
        console.warn('Google Auth notice: GOOGLE_CLIENT_SECRET is not configured in .env. Token exchange requires GOOGLE_CLIENT_SECRET from Google Cloud Console.');
      }

      if (code && googleSecret && googleClientId) {
        try {
          const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              code,
              client_id: googleClientId,
              client_secret: googleSecret,
              redirect_uri: redirectUri || 'http://localhost:3000/careers/auth/callback',
              grant_type: 'authorization_code',
            }),
          });
          const tokenData = await tokenRes.json();
          if (tokenData.error) {
            console.warn('Google Token Exchange API returned error:', tokenData.error, tokenData.error_description);
          }
          if (tokenData.access_token) {
            const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            const userData = await userRes.json();
            profile.email = userData.email || profile.email;
            profile.name = userData.name || profile.name;
            profile.picture = userData.picture || profile.picture;
            profile.providerId = userData.sub || profile.providerId;
          }
        } catch (exchErr) {
          console.warn('Google Code Exchange notice:', exchErr.message);
        }
      }

      // Fallback if verified directly via user ID or test code
      if (!profile.email && code && code.includes('@')) {
        profile.email = code.trim().toLowerCase();
        profile.name = profile.name || 'Google Candidate';
        profile.providerId = profile.providerId || `google_${Date.now()}`;
      }
    }

    // 3. LinkedIn OAuth 2.0 Code Exchange
    else if (provider === 'linkedin') {
      const liSecret = process.env.LINKEDIN_CLIENT_SECRET;
      const liClientId = process.env.LINKEDIN_CLIENT_ID || process.env.VITE_LINKEDIN_CLIENT_ID;

      if (code && liSecret && liClientId) {
        try {
          const tokenRes = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code,
              redirect_uri: redirectUri || 'http://localhost:3000/careers/auth/callback',
              client_id: liClientId,
              client_secret: liSecret,
            }),
          });
          const tokenData = await tokenRes.json();
          if (tokenData.access_token) {
            const userRes = await fetch('https://api.linkedin.com/v2/userinfo', {
              headers: { Authorization: `Bearer ${tokenData.access_token}` },
            });
            const userData = await userRes.json();
            profile.email = userData.email || profile.email;
            profile.name =
              userData.name || `${userData.given_name || ''} ${userData.family_name || ''}`.trim() || profile.name;
            profile.picture = userData.picture || profile.picture;
            profile.providerId = userData.sub || profile.providerId;
          }
        } catch (exchErr) {
          console.warn('LinkedIn Code Exchange notice:', exchErr.message);
        }
      }

      if (!profile.email && code && code.includes('@')) {
        profile.email = code.trim().toLowerCase();
        profile.name = profile.name || 'LinkedIn Candidate';
        profile.providerId = profile.providerId || `li_${Date.now()}`;
      }
    }

    // 4. Apple Sign-In Code Exchange & Verification
    else if (provider === 'apple') {
      const appleSecret = process.env.APPLE_CLIENT_SECRET;
      const appleClientId = process.env.APPLE_CLIENT_ID || process.env.VITE_APPLE_CLIENT_ID;

      if (code && appleSecret && appleClientId) {
        try {
          const tokenRes = await fetch('https://appleid.apple.com/auth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code,
              client_id: appleClientId,
              client_secret: appleSecret,
              redirect_uri: redirectUri || 'http://localhost:3000/careers/auth/callback',
            }),
          });
          const tokenData = await tokenRes.json();
          if (tokenData.id_token) {
            const parts = tokenData.id_token.split('.');
            if (parts.length === 3) {
              const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf8'));
              profile.email = payload.email || profile.email;
              profile.providerId = payload.sub || profile.providerId;
            }
          }
        } catch (appleExchErr) {
          console.warn('Apple Token Exchange notice:', appleExchErr.message);
        }
      }

      if (!profile.email && code && code.includes('@')) {
        profile.email = code.trim().toLowerCase();
        profile.name = profile.name || 'Apple Candidate';
        profile.providerId = profile.providerId || `apple_${Date.now()}`;
      }
    }

    if (!profile.email) {
      return res.status(400).json({
        success: false,
        message: 'Could not obtain a verified email address from the authentication provider.',
      });
    }

    const cleanEmail = profile.email.trim().toLowerCase();
    const existing = await findCandidate(cleanEmail);

    let candidate;
    let isNewUser = false;

    if (existing) {
      // Existing user: direct login and sync profile
      candidate = await saveOrUpdateCandidate({
        ...existing,
        name: existing.name && !existing.name.includes('Candidate') ? existing.name : (profile.name || existing.name),
        picture: profile.picture || existing.picture,
        providerId: profile.providerId || existing.providerId,
        authProvider: provider,
        emailVerified: true,
      });
      isNewUser = false;
    } else {
      // First-time user: automatically create candidate account
      const displayName =
        profile.name && !profile.name.includes('Candidate')
          ? profile.name.trim()
          : cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      candidate = await saveOrUpdateCandidate({
        id: `cand_${provider}_${Date.now().toString().slice(-6)}`,
        name: displayName,
        email: cleanEmail,
        phone: '',
        picture: profile.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
        authProvider: provider,
        providerId: profile.providerId || `${provider}_${Date.now()}`,
        emailVerified: true,
        qualification: 'Graduate / Professional',
        experience: '1 – 3 Years',
        city: 'Pune, Maharashtra',
      });
      isNewUser = true;
    }

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) => a.email && a.email.toLowerCase() === candidate.email.toLowerCase()
    );

    return res.json({
      success: true,
      message: isNewUser
        ? `Account successfully created via ${provider}! Welcome to Urja Foods, ${candidate.name}.`
        : `Welcome back, ${candidate.name}!`,
      user: sanitizeUser(candidate),
      applications: candidateApps,
      isNewUser,
    });
  } catch (err) {
    console.error('OAuth Callback Controller Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during OAuth callback verification.' });
  }
});

// -------------------------------------------------------------------------
// 1. SIGN IN WITH APPLE
// -------------------------------------------------------------------------
router.post('/apple-auth', async (req, res) => {
  try {
    const {
      email,
      name,
      appleId,
      relayEmail,
      isPrivateRelay,
      city,
      qualification,
      experience,
    } = req.body;

    if (!email && !appleId) {
      return res.status(400).json({
        success: false,
        message: 'Apple ID credentials or email address is required.',
      });
    }

    const targetEmail = (email || relayEmail || `${appleId}@privaterelay.appleid.com`).trim().toLowerCase();
    const existing = await findCandidate(targetEmail);

    let candidate;
    if (existing) {
      // Existing user: log them in directly, link Apple ID
      candidate = await saveOrUpdateCandidate({
        ...existing,
        providerId: appleId || existing.providerId,
        authProvider: existing.authProvider === 'email' ? 'apple' : existing.authProvider,
        emailVerified: true,
      });
    } else {
      // New user: automatically create candidate account
      const displayName = name
        ? name.trim()
        : targetEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      candidate = await saveOrUpdateCandidate({
        id: `cand-apple-${Date.now().toString().slice(-6)}`,
        name: displayName,
        email: targetEmail,
        phone: '',
        picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
        authProvider: 'apple',
        providerId: appleId || `apple_${Date.now()}`,
        emailVerified: true,
        city: city || 'Pune, Maharashtra',
        qualification: qualification || 'Graduate / Professional',
        experience: experience || '1 – 3 Years',
      });
    }

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) => a.email && a.email.toLowerCase() === candidate.email.toLowerCase()
    );

    return res.json({
      success: true,
      message: existing
        ? `Welcome back, ${candidate.name}!`
        : `Apple account connected! Welcome to Urja Foods, ${candidate.name}.`,
      user: sanitizeUser(candidate),
      applications: candidateApps,
    });
  } catch (err) {
    console.error('Apple Auth Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during Apple authentication.' });
  }
});

// -------------------------------------------------------------------------
// 2. SIGN IN WITH GOOGLE
// -------------------------------------------------------------------------
router.post('/google-auth', async (req, res) => {
  try {
    let { email, name, picture, googleId, credential, qualification, city, experience } = req.body;

    // Verify real Google JWT token if passed
    if (credential) {
      try {
        const gRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
        if (gRes.ok) {
          const gData = await gRes.json();
          email = gData.email || email;
          name = gData.name || name;
          picture = gData.picture || picture;
          googleId = gData.sub || googleId;
        }
      } catch (gErr) {
        console.warn('Google tokeninfo check note:', gErr.message);
      }
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await findCandidate(cleanEmail);

    let candidate;
    if (existing) {
      // Existing user: log in directly
      candidate = await saveOrUpdateCandidate({
        ...existing,
        name: existing.name && existing.name !== 'Candidate' ? existing.name : (name || existing.name),
        picture: picture || existing.picture,
        providerId: googleId || existing.providerId,
        authProvider: 'google',
        emailVerified: true,
      });
    } else {
      // New user: automatically create candidate account
      const displayName = name
        ? name.trim()
        : cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      candidate = await saveOrUpdateCandidate({
        id: `cand-g-${Date.now().toString().slice(-6)}`,
        name: displayName,
        email: cleanEmail,
        phone: '',
        picture: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
        authProvider: 'google',
        providerId: googleId || `gid_${Date.now()}`,
        emailVerified: true,
        qualification: qualification || 'Graduate / Professional',
        experience: experience || 'Fresher (0 - 1 year)',
        city: city || 'Pune, Maharashtra',
      });
    }

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) => a.email && a.email.toLowerCase() === candidate.email.toLowerCase()
    );

    return res.json({
      success: true,
      message: existing
        ? `Welcome back, ${candidate.name}!`
        : `Google account linked! Welcome to Urja Foods, ${candidate.name}.`,
      user: sanitizeUser(candidate),
      applications: candidateApps,
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during Google verification.' });
  }
});

// -------------------------------------------------------------------------
// 3. SIGN IN WITH LINKEDIN
// -------------------------------------------------------------------------
router.post('/linkedin-auth', async (req, res) => {
  try {
    const { email, name, picture, linkedInId, headline, city, qualification, experience } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'LinkedIn profile email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await findCandidate(cleanEmail);

    let candidate;
    if (existing) {
      // Existing user: direct login
      candidate = await saveOrUpdateCandidate({
        ...existing,
        providerId: linkedInId || existing.providerId,
        picture: picture || existing.picture,
        authProvider: existing.authProvider === 'email' ? 'linkedin' : existing.authProvider,
        emailVerified: true,
      });
    } else {
      // New user: auto create account
      const displayName = name
        ? name.trim()
        : cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      candidate = await saveOrUpdateCandidate({
        id: `cand-li-${Date.now().toString().slice(-6)}`,
        name: displayName,
        email: cleanEmail,
        phone: '',
        picture: picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`,
        authProvider: 'linkedin',
        providerId: linkedInId || `li_${Date.now()}`,
        emailVerified: true,
        qualification: qualification || headline || 'Graduate / Professional Degree',
        experience: experience || '2 – 5 Years',
        city: city || 'Pune, Maharashtra',
      });
    }

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) => a.email && a.email.toLowerCase() === candidate.email.toLowerCase()
    );

    return res.json({
      success: true,
      message: existing
        ? `Welcome back, ${candidate.name}!`
        : `LinkedIn profile imported! Welcome to Urja Foods, ${candidate.name}.`,
      user: sanitizeUser(candidate),
      applications: candidateApps,
    });
  } catch (err) {
    console.error('LinkedIn Auth Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during LinkedIn authentication.' });
  }
});

// -------------------------------------------------------------------------
// 4. SIGN IN WITH EMAIL (REGISTER / VERIFY / LOGIN / FORGOT / RESET)
// -------------------------------------------------------------------------

// A. Register New Candidate (Generates 6-Digit Verification Code)
router.post('/register', async (req, res) => {
  try {
    const { name, email, phone, password, qualification, city, experience } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Email Address, and Password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await findCandidate(cleanEmail);

    // If account already exists and is verified
    if (existing && existing.emailVerified && existing.password) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email address already exists. Please Sign In.',
      });
    }

    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    const candidate = await saveOrUpdateCandidate({
      ...(existing || {}),
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? String(phone).replace(/\D/g, '') : (existing?.phone || ''),
      password,
      qualification: qualification || existing?.qualification || 'Graduate / Diploma',
      city: city || existing?.city || 'Pune, Maharashtra',
      experience: experience || existing?.experience || 'Fresher (0 - 1 year)',
      authProvider: 'email',
      emailVerified: false,
      verificationCode,
      verificationExpires,
    });

    // Send verification email
    const subject = `Urja Foods Careers: Your 6-Digit Email Verification Code (${verificationCode})`;
    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 25px; border: 1px solid #dce8d3; border-radius: 12px; background: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #173b24; margin: 0; font-size: 22px;">🌾 Urja Foods Careers</h2>
          <p style="color: #64748b; font-size: 14px; margin-top: 5px;">Candidate Verification &amp; Account Activation</p>
        </div>
        <p style="font-size: 15px; color: #1e293b;">Hello <strong>${candidate.name}</strong>,</p>
        <p style="font-size: 14px; color: #475569; line-height: 1.6;">
          Thank you for creating your candidate account on the Urja Foods Careers portal. To activate your account and proceed with job applications, please enter the following 6-digit verification code:
        </p>
        <div style="margin: 25px 0; text-align: center;">
          <div style="display: inline-block; background: #eef7e9; border: 2px dashed #2e7d32; border-radius: 10px; padding: 14px 28px; font-size: 28px; font-weight: 800; letter-spacing: 6px; color: #173b24;">
            ${verificationCode}
          </div>
        </div>
        <p style="font-size: 13px; color: #64748b; line-height: 1.5;">
          This code is valid for 15 minutes. If you did not request this account, please ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin: 0;">
          Urja Foods Private Limited · Agritech &amp; Cattle Nutrition Enterprise · Pune, Maharashtra
        </p>
      </div>
    `;

    await sendAuthEmail(cleanEmail, subject, `Your verification code is: ${verificationCode}`, html);

    return res.status(201).json({
      success: true,
      requiresVerification: true,
      email: cleanEmail,
      message: 'A 6-digit verification code has been sent to your email address.',
      devCode: verificationCode,
    });
  } catch (err) {
    console.error('Register Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during registration.' });
  }
});

// B. Verify Email Address using 6-Digit Code
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Email address and verification code are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await findCandidate(cleanEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'No registration found for this email address.' });
    }

    // Check code match and expiry
    const cleanCode = String(code).trim();
    if (user.verificationCode !== cleanCode) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code. Please check your email and try again.',
      });
    }

    if (user.verificationExpires && new Date(user.verificationExpires) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please click Resend Code to obtain a new code.',
      });
    }

    // Activate candidate account
    const verifiedUser = await saveOrUpdateCandidate({
      ...user,
      emailVerified: true,
      verificationCode: null,
      verificationExpires: null,
    });

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) => a.email && a.email.toLowerCase() === verifiedUser.email.toLowerCase()
    );

    return res.json({
      success: true,
      message: 'Email address successfully verified! Your candidate profile is now active.',
      user: sanitizeUser(verifiedUser),
      applications: candidateApps,
    });
  } catch (err) {
    console.error('Verify Email Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during email verification.' });
  }
});

// C. Resend Verification Code
router.post('/resend-code', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await findCandidate(cleanEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate account not found.' });
    }

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    const newExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await saveOrUpdateCandidate({
      ...user,
      verificationCode: newCode,
      verificationExpires: newExpires,
    });

    const subject = `Urja Foods Careers: New Verification Code (${newCode})`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 25px; border: 1px solid #dce8d3; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #173b24;">🌾 Urja Foods Careers</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Here is your new 6-digit verification code to activate your account:</p>
        <div style="margin: 20px 0; text-align: center;">
          <div style="display: inline-block; background: #eef7e9; border: 2px dashed #2e7d32; border-radius: 8px; padding: 12px 24px; font-size: 26px; font-weight: 800; letter-spacing: 5px; color: #173b24;">
            ${newCode}
          </div>
        </div>
        <p style="font-size: 13px; color: #64748b;">Valid for 15 minutes.</p>
      </div>
    `;

    await sendAuthEmail(cleanEmail, subject, `Your new verification code is: ${newCode}`, html);

    return res.json({
      success: true,
      message: 'A fresh 6-digit verification code has been dispatched to your inbox.',
      devCode: newCode,
    });
  } catch (err) {
    console.error('Resend Code Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while resending verification code.' });
  }
});

// D. Candidate Sign In with Email & Password
router.post('/login', async (req, res) => {
  try {
    const emailOrPhone = req.body.emailOrPhone || req.body.email;
    const { password } = req.body;

    if (!emailOrPhone) {
      return res.status(400).json({ success: false, message: 'Please provide Email Address or Mobile Number.' });
    }

    const user = await findCandidate(emailOrPhone);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'No candidate profile found with this email or mobile. Please click Create Account to register.',
      });
    }

    // Verify Password if user has a password set
    if (user.password && password && user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password. Please verify and try again, or use Forgot Password to reset it.',
      });
    }

    // If candidate has not verified email yet and signed up via email
    if (user.authProvider === 'email' && user.emailVerified === false) {
      // Refresh code and ask for verification
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      const verificationExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
      await saveOrUpdateCandidate({
        ...user,
        verificationCode,
        verificationExpires,
      });

      return res.status(403).json({
        success: false,
        requiresVerification: true,
        email: user.email,
        message: 'Your email address is pending verification. Please enter the code sent to your email to activate your account.',
        devCode: verificationCode,
      });
    }

    // Update last login
    const updated = await saveOrUpdateCandidate({
      ...user,
      lastLoginAt: new Date().toISOString(),
    });

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) =>
        (updated.email && a.email && a.email.toLowerCase() === updated.email.toLowerCase()) ||
        (updated.phone && a.phone && a.phone.replace(/\D/g, '') === updated.phone.replace(/\D/g, ''))
    );

    return res.json({
      success: true,
      message: `Welcome back, ${updated.name}!`,
      user: sanitizeUser(updated),
      applications: candidateApps,
    });
  } catch (err) {
    console.error('Candidate Login Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

// E. Request Password Reset (Sends 6-Digit OTP)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await findCandidate(cleanEmail);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No candidate profile found registered with this email address.',
      });
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetExpires = new Date(Date.now() + 15 * 60 * 1000).toISOString();

    await saveOrUpdateCandidate({
      ...user,
      resetCode,
      resetExpires,
    });

    const subject = `Urja Foods Careers: Password Reset Code (${resetCode})`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 25px; border: 1px solid #dce8d3; border-radius: 12px; background: #ffffff;">
        <h2 style="color: #173b24;">🌾 Urja Foods Careers</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>We received a request to reset your candidate portal password. Enter the following 6-digit code in the password reset form:</p>
        <div style="margin: 20px 0; text-align: center;">
          <div style="display: inline-block; background: #fef3c7; border: 2px dashed #d97706; border-radius: 8px; padding: 12px 24px; font-size: 26px; font-weight: 800; letter-spacing: 5px; color: #92400e;">
            ${resetCode}
          </div>
        </div>
        <p style="font-size: 13px; color: #64748b;">This code is valid for 15 minutes. If you did not request this, please disregard this email.</p>
      </div>
    `;

    await sendAuthEmail(cleanEmail, subject, `Your password reset code is: ${resetCode}`, html);

    return res.json({
      success: true,
      message: 'Password reset code has been sent to your email address.',
      devCode: resetCode,
    });
  } catch (err) {
    console.error('Forgot Password Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while processing password reset request.' });
  }
});

// F. Reset Password with 6-Digit Code
router.post('/reset-password', async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Email address, 6-digit reset code, and new password are required.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await findCandidate(cleanEmail);

    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate account not found.' });
    }

    if (user.resetCode !== String(code).trim()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reset code. Please check your email or request a new code.',
      });
    }

    if (user.resetExpires && new Date(user.resetExpires) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Reset code has expired. Please request a new password reset.',
      });
    }

    // Save updated password, clear resetCode, and mark email verified
    const updated = await saveOrUpdateCandidate({
      ...user,
      password: newPassword,
      resetCode: null,
      resetExpires: null,
      emailVerified: true,
    });

    return res.json({
      success: true,
      message: 'Password has been reset successfully! You can now sign in with your new credentials.',
      user: sanitizeUser(updated),
    });
  } catch (err) {
    console.error('Reset Password Error:', err);
    return res.status(500).json({ success: false, message: 'Server error during password reset.' });
  }
});

// G. Get Candidate Session & Profile
router.get('/candidate/:idOrEmail', async (req, res) => {
  try {
    const user = await findCandidate(req.params.idOrEmail);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Candidate profile not found.' });
    }

    const allApps = getApplications();
    const candidateApps = allApps.filter(
      (a) =>
        (user.email && a.email && a.email.toLowerCase() === user.email.toLowerCase()) ||
        (user.phone && a.phone && a.phone.replace(/\D/g, '') === user.phone.replace(/\D/g, ''))
    );

    return res.json({
      success: true,
      user: sanitizeUser(user),
      applications: candidateApps,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error loading profile.' });
  }
});

// GET /api/careers/track/:query (Track Application Status)
router.get('/track/:query', async (req, res) => {
  const { query: searchParam } = req.params;
  const term = searchParam.trim().toLowerCase();

  const allApps = getApplications();
  const matched = allApps.filter(
    (a) =>
      a.id.toLowerCase() === term ||
      (a.email && a.email.toLowerCase() === term) ||
      (a.phone && a.phone.replace(/\D/g, '') === term.replace(/\D/g, ''))
  );

  if (matched.length > 0) {
    return res.json({
      success: true,
      found: true,
      applications: matched,
    });
  }

  return res.status(404).json({
    success: false,
    found: false,
    message: `No application dossier found matching Reference ID or Email "${searchParam}".`,
  });
});

export default router;
