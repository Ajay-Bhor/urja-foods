import nodemailer from 'nodemailer';

// In-memory store for email audit trail
export const emailAuditTrail = [];

// Determine email transporter: use SMTP if configured, else test/mock transporter
let transporter;

if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  console.log('📧 Nodemailer initialized with configured live SMTP server.');
} else {
  // Built-in JSON/stream transport for guaranteed local delivery and audit logging
  transporter = nodemailer.createTransport({
    jsonTransport: true
  });
  console.log('📧 Nodemailer initialized in internal delivery mode (audit trail active).');
}

const HR_DEFAULT_EMAIL = process.env.HR_EMAIL || 'hr@urjafoods.net';
const SENDER_DEFAULT = process.env.MAIL_FROM || '"Urja Foods Careers" <careers@urjafoods.net>';

/**
 * Send internal notification email to Urja Foods HR Department
 */
export async function sendHrNotification(application) {
  const hrSubject = `[Urja Careers] New Application: ${application.position} - ${application.name} (${application.id})`;
  
  const hrHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; background-color: #f4f6f8; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #14532d; padding: 20px 24px; color: #ffffff; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0; font-size: 12px; color: #bbf7d0; }
    .content { padding: 24px; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: 700; margin-bottom: 16px; border: 1px solid #fde68a; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    td { padding: 10px 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; }
    td.label { font-weight: 700; color: #475569; width: 35%; background: #f8fafc; }
    td.val { color: #0f172a; font-weight: 500; }
    .notes { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; font-size: 13px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin-top: 10px; }
    .footer { background: #f8fafc; padding: 14px 24px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
    .btn { display: inline-block; padding: 8px 16px; background: #16a34a; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 700; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Urja Foods & Agro • Internal HR Alert</h2>
      <p>Automated Recruitment Notification System</p>
    </div>
    <div class="content">
      <span class="badge">NEW CANDIDATE DOSSIER</span>
      <p style="margin-top:0; font-size: 14px;">A new job application has been submitted on the Urja Careers Portal.</p>
      
      <table>
        <tr>
          <td class="label">Reference ID:</td>
          <td class="val" style="font-family: monospace; font-weight: 700; color: #15803d;">${application.id}</td>
        </tr>
        <tr>
          <td class="label">Position Applied:</td>
          <td class="val" style="font-weight: 700;">${application.position}</td>
        </tr>
        <tr>
          <td class="label">Candidate Name:</td>
          <td class="val"><strong>${application.name}</strong></td>
        </tr>
        <tr>
          <td class="label">Contact Mobile:</td>
          <td class="val"><a href="tel:${application.phone}" style="color: #16a34a; text-decoration: none; font-weight: bold;">${application.phone}</a></td>
        </tr>
        <tr>
          <td class="label">Email Address:</td>
          <td class="val"><a href="mailto:${application.email}" style="color: #2563eb; text-decoration: none;">${application.email || 'N/A'}</a></td>
        </tr>
        <tr>
          <td class="label">Location / City:</td>
          <td class="val">${application.location}</td>
        </tr>
        <tr>
          <td class="label">Highest Qualification:</td>
          <td class="val">${application.qualification}</td>
        </tr>
        <tr>
          <td class="label">Total Experience:</td>
          <td class="val">${application.experience}</td>
        </tr>
        <tr>
          <td class="label">Submitted At:</td>
          <td class="val">${new Date(application.receivedAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</td>
        </tr>
      </table>

      <strong style="font-size: 13px; color: #334155;">Candidate Experience Summary & Resume Link:</strong>
      <div class="notes">${application.resumeText || 'No additional notes provided.'}</div>

      <div style="margin-top: 20px; text-align: right;">
        <a href="mailto:${application.email}?subject=Urja%20Foods%20Interview%20Invitation%20-%20Ref%20${application.id}" class="btn">Reply to Candidate</a>
      </div>
    </div>
    <div class="footer">
      Urja Foods & Agro Pvt. Ltd. • Human Resources Department • Nirgudsar, Pune 410503
    </div>
  </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: SENDER_DEFAULT,
      to: HR_DEFAULT_EMAIL,
      subject: hrSubject,
      html: hrHtml
    });

    const record = {
      type: 'HR_NOTIFICATION',
      applicationId: application.id,
      recipient: HR_DEFAULT_EMAIL,
      subject: hrSubject,
      html: hrHtml,
      status: 'DELIVERED',
      sentAt: new Date().toISOString()
    };
    emailAuditTrail.push(record);
    console.log(`[Email Dispatched] Internal HR notification sent to ${HR_DEFAULT_EMAIL} for application ${application.id}`);
    return { success: true, record };
  } catch (err) {
    console.error(`[Email Error] Failed to send HR notification for ${application.id}:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * Send official confirmation email to the Job Applicant
 */
export async function sendCandidateConfirmation(application) {
  if (!application.email || !application.email.includes('@')) {
    console.log(`[Email Skipped] Candidate ${application.name} has no valid email.`);
    return { success: false, reason: 'NO_VALID_EMAIL' };
  }

  const candidateSubject = `Application Received: ${application.position} - Urja Foods & Agro (Ref: ${application.id})`;

  const candidateHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 24px; background-color: #f7f9f6; color: #1e293b; }
    .container { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { background: linear-gradient(135deg, #14532d 0%, #166534 100%); padding: 28px 30px; color: #ffffff; text-align: left; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; }
    .header h1 span { color: #fbbf24; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #dcfce7; }
    .content { padding: 30px; text-align: left; font-size: 14px; line-height: 1.65; color: #334155; }
    .greeting { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    .ref-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px 20px; margin: 20px 0; text-align: left; }
    .ref-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #15803d; margin-bottom: 4px; }
    .ref-id { font-size: 20px; font-weight: 800; color: #14532d; font-family: monospace; letter-spacing: 0.5px; }
    .ref-sub { font-size: 12px; color: #475569; margin-top: 4px; }
    .timeline { background: #fafaf9; border-radius: 12px; padding: 18px 20px; margin: 24px 0; border: 1px solid #f2f2ee; }
    .timeline-title { font-weight: 700; font-size: 13px; color: #1e293b; margin-bottom: 12px; }
    .step { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 13px; color: #475569; }
    .step-num { width: 22px; height: 22px; border-radius: 50%; background: #16a34a; color: white; font-size: 11px; font-weight: bold; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
    .footer { background: #f8fafc; padding: 20px 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; line-height: 1.5; }
    .contact-strip { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="container">
    
    <div class="header">
      <h1>URJA <span>FOODS</span> & AGRO PVT. LTD.</h1>
      <p>Human Resources & Talent Acquisition Division • Nirgudsar, Pune</p>
    </div>

    <div class="content">
      <div class="greeting">Dear ${application.name},</div>
      
      <p>
        Thank you for your interest in joining <strong>Urja Foods & Agro Pvt. Ltd.</strong> We have formally received your job application through our careers portal.
      </p>

      <div class="ref-box">
        <div class="ref-title">Application Confirmation & Tracking Code</div>
        <div class="ref-id">${application.id}</div>
        <div class="ref-sub">Position: <strong>${application.position}</strong></div>
      </div>

      <p>
        Here is a summary of the details registered in our central recruitment system:
      </p>

      <ul style="padding-left: 20px; margin: 12px 0; font-size: 13px; color: #475569;">
        <li><strong>Applicant Name:</strong> ${application.name}</li>
        <li><strong>Contact Number:</strong> ${application.phone}</li>
        <li><strong>Location:</strong> ${application.location}</li>
        <li><strong>Qualification:</strong> ${application.qualification}</li>
        <li><strong>Relevant Experience:</strong> ${application.experience}</li>
      </ul>

      <div class="timeline">
        <div class="timeline-title">What Happens Next in Our Recruitment Process:</div>
        
        <div class="step">
          <div class="step-num">1</div>
          <div><strong>Profile Screening:</strong> Our HR and technical division heads review your qualifications against open vacancy requirements (within 3 - 5 business days).</div>
        </div>

        <div class="step">
          <div class="step-num">2</div>
          <div><strong>Telephonic Interaction:</strong> Shortlisted candidates are contacted directly via phone/email for preliminary discussion and scheduling.</div>
        </div>

        <div class="step">
          <div class="step-num">3</div>
          <div><strong>Technical & Plant Interview:</strong> Direct round with division managers at our Nirgudsar Corporate Feed Mill or respective field office.</div>
        </div>
      </div>

      <p style="font-size: 13px; color: #64748b;">
        Please save this email and quote your Reference ID <strong>${application.id}</strong> in all future communications with our team.
      </p>

      <p style="margin-top: 24px; font-weight: 600; color: #1e293b;">
        Warm regards,<br>
        <span style="color: #15803d; font-weight: 700;">Human Resources Team</span><br>
        Urja Foods & Agro Pvt. Ltd.<br>
        <span style="font-size: 12px; font-weight: 400; color: #64748b;">Empowering Rural Prosperity Since 2005</span>
      </p>
    </div>

    <div class="footer">
      <div><strong>Urja Foods & Agro Headquarters & 150 TPD Feed Mill:</strong></div>
      <div>At Post Nirgudsar, Taluka Ambegaon, District Pune, Maharashtra 410503, India.</div>
      <div class="contact-strip">
        Direct HR Helpline: +91-7028939900 • Email: careers@urjafoods.net • Web: www.urjafoods.net
      </div>
    </div>

  </div>
</body>
</html>
  `;

  try {
    const info = await transporter.sendMail({
      from: SENDER_DEFAULT,
      to: application.email,
      subject: candidateSubject,
      html: candidateHtml
    });

    const record = {
      type: 'CANDIDATE_CONFIRMATION',
      applicationId: application.id,
      recipient: application.email,
      subject: candidateSubject,
      html: candidateHtml,
      status: 'DELIVERED',
      sentAt: new Date().toISOString()
    };
    emailAuditTrail.push(record);
    console.log(`[Email Dispatched] Official confirmation email sent to candidate ${application.email} for application ${application.id}`);
    return { success: true, record };
  } catch (err) {
    console.error(`[Email Error] Failed to send candidate confirmation to ${application.email}:`, err);
    return { success: false, error: err.message };
  }
}

/**
 * Retrieve all sent emails or emails filtered by application ID
 */
export function getSentEmails(applicationId = null) {
  if (applicationId) {
    return emailAuditTrail.filter(e => e.applicationId === applicationId);
  }
  return emailAuditTrail;
}
