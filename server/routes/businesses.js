import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataPath = path.join(__dirname, '../data/businesses.json');

const getFallbackData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {
    return [];
  }
};

const formatBusiness = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    number: row.number,
    title: row.title,
    shortTitle: row.short_title,
    category: row.category,
    tag: row.tag,
    tagline: row.tagline,
    overview: row.overview,
    image: row.image,
    products: typeof row.products === 'string' ? JSON.parse(row.products) : (row.products || []),
    stats: typeof row.stats === 'string' ? JSON.parse(row.stats) : (row.stats || []),
    features: typeof row.features === 'string' ? JSON.parse(row.features) : (row.features || []),
    processSteps: typeof row.process_steps === 'string' ? JSON.parse(row.process_steps) : (row.process_steps || []),
  };
};

// GET /api/businesses
router.get('/', async (req, res) => {
  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM businesses ORDER BY number ASC');
      return res.json({
        success: true,
        source: 'mysql',
        count: rows.length,
        businesses: rows.map(formatBusiness),
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for businesses:', err.message);
    }
  }

  const list = getFallbackData();
  res.json({
    success: true,
    source: 'json-fallback',
    count: list.length,
    businesses: list,
  });
});

// GET /api/businesses/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM businesses WHERE id = ? LIMIT 1', [id]);
      if (rows.length > 0) {
        return res.json({
          success: true,
          source: 'mysql',
          business: formatBusiness(rows[0]),
        });
      }
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for single business:', err.message);
    }
  }

  const list = getFallbackData();
  const found = list.find((b) => b.id === id);
  if (!found) {
    return res.status(404).json({ success: false, message: 'Business sector not found' });
  }
  res.json({ success: true, source: 'json-fallback', business: found });
});

export default router;
