import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataPath = path.join(__dirname, '../data/jobs.json');

const getFallbackData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch {
    return [];
  }
};

const formatJob = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    title: row.title,
    dept: row.dept,
    location: row.location,
    experience: row.experience,
    type: row.type,
    vacancies: row.vacancies,
    summary: row.summary,
    responsibilities: typeof row.responsibilities === 'string' ? JSON.parse(row.responsibilities) : (row.responsibilities || []),
    requirements: typeof row.requirements === 'string' ? JSON.parse(row.requirements) : (row.requirements || []),
    status: row.status,
  };
};

// GET /api/jobs
router.get('/', async (req, res) => {
  const { dept } = req.query;

  if (isDbConnected()) {
    try {
      let sql = 'SELECT * FROM job_postings WHERE status = "Active"';
      const params = [];

      if (dept && dept !== 'All') {
        sql += ' AND dept = ?';
        params.push(dept);
      }

      sql += ' ORDER BY created_at DESC';
      const rows = await query(sql, params);

      return res.json({
        success: true,
        source: 'mysql',
        count: rows.length,
        jobs: rows.map(formatJob),
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for jobs:', err.message);
    }
  }

  let list = getFallbackData();
  if (dept && dept !== 'All') {
    list = list.filter((j) => j.dept.toLowerCase() === dept.toLowerCase());
  }

  res.json({
    success: true,
    source: 'json-fallback',
    count: list.length,
    jobs: list,
  });
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM job_postings WHERE id = ? LIMIT 1', [id]);
      if (rows.length > 0) {
        return res.json({
          success: true,
          source: 'mysql',
          job: formatJob(rows[0]),
        });
      }
    } catch (err) {
      console.warn('⚠️ [MySQL Query Error] Falling back to JSON for single job:', err.message);
    }
  }

  const list = getFallbackData();
  const job = list.find((j) => j.id === id);
  if (!job) {
    return res.status(404).json({ success: false, message: 'Job posting not found' });
  }
  res.json({ success: true, source: 'json-fallback', job });
});

export default router;
