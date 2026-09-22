import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const inquiriesFile = path.join(__dirname, '../data/inquiries.json');

// Ensure file exists for fallback/backup
if (!fs.existsSync(inquiriesFile)) {
  fs.writeFileSync(inquiriesFile, JSON.stringify([], null, 2), 'utf8');
}

const getFallbackInquiries = () => {
  try {
    return JSON.parse(fs.readFileSync(inquiriesFile, 'utf8'));
  } catch {
    return [];
  }
};

const saveFallbackInquiries = (data) => {
  try {
    fs.writeFileSync(inquiriesFile, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.warn('⚠️ [File Backup Warning] Could not save inquiries.json:', err.message);
  }
};

// POST /api/inquiries
router.post('/', async (req, res) => {
  const { name, phone, email, interest, district, message, animalCount, farmType } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Full name and active phone number are required.',
    });
  }

  // Simple phone number validation (at least 10 digits)
  const cleanPhone = String(phone).replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid 10-digit mobile number.',
    });
  }

  const newInquiry = {
    id: `INQ-${Date.now()}`,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : null,
    interest: interest || 'General Inquiry',
    district: district || 'Maharashtra',
    farmType: farmType || 'Dairy / Poultry',
    animalCount: animalCount || null,
    message: message ? message.trim() : '',
    createdAt: new Date().toISOString(),
    status: 'Pending Contact',
  };

  let savedToDb = false;

  // Insert into MySQL if connected
  if (isDbConnected()) {
    try {
      await query(
        `INSERT INTO inquiries (
          id, name, phone, email, interest, district, farm_type, animal_count, message, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          newInquiry.id,
          newInquiry.name,
          newInquiry.phone,
          newInquiry.email,
          newInquiry.interest,
          newInquiry.district,
          newInquiry.farmType,
          newInquiry.animalCount,
          newInquiry.message,
          newInquiry.status,
          new Date(newInquiry.createdAt),
        ]
      );
      savedToDb = true;
    } catch (err) {
      console.warn('⚠️ [MySQL Inquiry Insert Error] Falling back to file storage:', err.message);
    }
  }

  // Always keep JSON storage updated as reliable backup
  const list = getFallbackInquiries();
  list.unshift(newInquiry);
  saveFallbackInquiries(list);

  console.log(
    `[Urja Foods API] New inquiry received from ${newInquiry.name} (${newInquiry.phone}) for ${newInquiry.interest} [Saved to ${savedToDb ? 'MySQL & JSON' : 'JSON Backup'}]`
  );

  res.status(201).json({
    success: true,
    message: 'Dhanyawad! Your inquiry has been received. Our agricultural advisor will contact you within 24 hours.',
    inquiryId: newInquiry.id,
    storage: savedToDb ? 'mysql' : 'local-backup',
  });
});

// GET /api/inquiries (summary)
router.get('/', async (req, res) => {
  if (isDbConnected()) {
    try {
      const [[countRow]] = await query('SELECT COUNT(*) as count FROM inquiries');
      const rows = await query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 5');

      const formatted = rows.map((r) => ({
        id: r.id,
        name: r.name,
        phone: r.phone,
        email: r.email,
        interest: r.interest,
        district: r.district,
        farmType: r.farm_type,
        animalCount: r.animal_count,
        message: r.message,
        status: r.status,
        createdAt: r.created_at,
      }));

      return res.json({
        success: true,
        source: 'mysql',
        count: countRow.count,
        recent: formatted,
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Inquiries Query Warning] Falling back to JSON:', err.message);
    }
  }

  const list = getFallbackInquiries();
  res.json({
    success: true,
    source: 'json-fallback',
    count: list.length,
    recent: list.slice(0, 5),
  });
});

export default router;
