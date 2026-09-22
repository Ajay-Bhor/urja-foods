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
      hq: 'At Post Nirgudsar, Taluka Ambegaon, District Pune - 412406, Maharashtra',
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

export default router;
