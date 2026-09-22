import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataPath = path.join(__dirname, '../data/milestones.json');

const getFallbackData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {
    return [];
  }
};

// GET /api/milestones
router.get('/', async (req, res) => {
  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM milestones ORDER BY display_order ASC, year ASC');
      return res.json({
        success: true,
        source: 'mysql',
        count: rows.length,
        milestones: rows.map((r) => ({
          id: r.id,
          year: r.year,
          title: r.title,
          description: r.description,
          image: r.image,
          displayOrder: r.display_order,
        })),
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for milestones:', err.message);
    }
  }

  const list = getFallbackData();
  res.json({
    success: true,
    source: 'json-fallback',
    count: list.length,
    milestones: list,
  });
});

export default router;
