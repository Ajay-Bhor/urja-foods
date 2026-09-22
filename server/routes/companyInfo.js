import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataPath = path.join(__dirname, '../data/company_info.json');

const getFallbackData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {
    return [];
  }
};

const formatInfo = (row) => {
  if (!row) return null;
  return {
    infoKey: row.info_key,
    category: row.category,
    title: row.title,
    infoValue: typeof row.info_value === 'string' ? JSON.parse(row.info_value) : row.info_value,
  };
};

// GET /api/company-info
router.get('/', async (req, res) => {
  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM company_info');
      const map = {};
      rows.forEach((r) => {
        const item = formatInfo(r);
        map[item.infoKey] = item.infoValue;
      });

      return res.json({
        success: true,
        source: 'mysql',
        companyInfo: map,
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for company info:', err.message);
    }
  }

  const list = getFallbackData();
  const map = {};
  list.forEach((item) => {
    map[item.infoKey] = item.infoValue;
  });

  res.json({
    success: true,
    source: 'json-fallback',
    companyInfo: map,
  });
});

// GET /api/company-info/:key
router.get('/:key', async (req, res) => {
  const { key } = req.params;

  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM company_info WHERE info_key = ? LIMIT 1', [key]);
      if (rows.length > 0) {
        const item = formatInfo(rows[0]);
        return res.json({
          success: true,
          source: 'mysql',
          key: item.infoKey,
          title: item.title,
          data: item.infoValue,
        });
      }
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for company info key:', err.message);
    }
  }

  const list = getFallbackData();
  const found = list.find((item) => item.infoKey === key);
  if (!found) {
    return res.status(404).json({ success: false, message: 'Company information key not found' });
  }

  res.json({
    success: true,
    source: 'json-fallback',
    key: found.infoKey,
    title: found.title,
    data: found.infoValue,
  });
});

export default router;
