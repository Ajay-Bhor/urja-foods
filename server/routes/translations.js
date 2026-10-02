import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const dataPath = path.join(__dirname, '../data/translations.json');

/**
 * Safely load fallback JSON data
 */
function getFallbackData() {
  try {
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading fallback translations.json:', err.message);
  }
  return { translations: { en: {}, hi: {}, mr: {} }, items: [] };
}

/**
 * Save updated translations to fallback JSON file
 */
function saveFallbackData(data) {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing fallback translations.json:', err.message);
  }
}

/**
 * GET /api/translations
 * Returns translations dictionary mapped by language code: { en: {...}, hi: {...}, mr: {...} }
 */
router.get('/', async (req, res) => {
  const { lang } = req.query;

  if (isDbConnected()) {
    try {
      let sql = 'SELECT lang_code, trans_key, trans_value, category FROM translations';
      const params = [];
      if (lang) {
        sql += ' WHERE lang_code = ?';
        params.push(lang);
      }
      const rows = await query(sql, params);

      const dict = { en: {}, hi: {}, mr: {} };
      rows.forEach((row) => {
        if (!dict[row.lang_code]) {
          dict[row.lang_code] = {};
        }
        dict[row.lang_code][row.trans_key] = row.trans_value;
      });

      return res.json({
        success: true,
        source: 'mysql',
        translations: lang ? dict[lang] || {} : dict,
      });
    } catch (err) {
      console.warn('⚠️ [MySQL] Failed to query translations, using JSON fallback:', err.message);
    }
  }

  const fallback = getFallbackData();
  const translations = fallback.translations || { en: {}, hi: {}, mr: {} };
  return res.json({
    success: true,
    source: 'json-fallback',
    translations: lang ? translations[lang] || {} : translations,
  });
});

/**
 * GET /api/translations/list
 * Returns list view for Admin translation manager with search and filters
 */
router.get('/list', async (req, res) => {
  const { lang, category, search } = req.query;

  if (isDbConnected()) {
    try {
      let sql = 'SELECT id, lang_code, trans_key, trans_value, category, updated_at FROM translations WHERE 1=1';
      const params = [];

      if (lang) {
        sql += ' AND lang_code = ?';
        params.push(lang);
      }
      if (category && category !== 'all') {
        sql += ' AND category = ?';
        params.push(category);
      }
      if (search && search.trim()) {
        sql += ' AND (trans_key LIKE ? OR trans_value LIKE ?)';
        const term = `%${search.trim()}%`;
        params.push(term, term);
      }

      sql += ' ORDER BY trans_key ASC, lang_code ASC';
      const rows = await query(sql, params);

      return res.json({
        success: true,
        source: 'mysql',
        total: rows.length,
        items: rows,
      });
    } catch (err) {
      console.warn('⚠️ [MySQL] Failed to query translations list, using JSON fallback:', err.message);
    }
  }

  const fallback = getFallbackData();
  let items = fallback.items || [];

  if (lang) {
    items = items.filter((i) => i.lang_code === lang);
  }
  if (category && category !== 'all') {
    items = items.filter((i) => i.category === category);
  }
  if (search && search.trim()) {
    const s = search.toLowerCase();
    items = items.filter((i) =>
      i.trans_key.toLowerCase().includes(s) || (i.trans_value && i.trans_value.toLowerCase().includes(s))
    );
  }

  return res.json({
    success: true,
    source: 'json-fallback',
    total: items.length,
    items,
  });
});

/**
 * POST /api/translations
 * Add or update a single translation entry
 */
router.post('/', async (req, res) => {
  const { lang_code, trans_key, trans_value, category } = req.body;

  if (!lang_code || !trans_key || trans_value === undefined) {
    return res.status(400).json({ success: false, message: 'Missing required translation fields (lang_code, trans_key, trans_value)' });
  }

  const cat = category || 'general';

  if (isDbConnected()) {
    try {
      await query(
        `INSERT INTO translations (lang_code, trans_key, trans_value, category)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE trans_value = VALUES(trans_value), category = VALUES(category)`,
        [lang_code, trans_key, trans_value, cat]
      );
    } catch (err) {
      console.error('MySQL translation save error:', err.message);
      return res.status(500).json({ success: false, message: 'Database save failed', error: err.message });
    }
  }

  // Update fallback file
  const fallback = getFallbackData();
  if (!fallback.translations[lang_code]) fallback.translations[lang_code] = {};
  fallback.translations[lang_code][trans_key] = trans_value;

  const itemIdx = fallback.items.findIndex(
    (i) => i.lang_code === lang_code && i.trans_key === trans_key
  );
  if (itemIdx >= 0) {
    fallback.items[itemIdx].trans_value = trans_value;
    fallback.items[itemIdx].category = cat;
  } else {
    fallback.items.push({
      lang_code,
      trans_key,
      trans_value,
      category: cat,
    });
  }
  saveFallbackData(fallback);

  return res.json({
    success: true,
    message: 'Translation saved successfully',
    translation: { lang_code, trans_key, trans_value, category: cat },
  });
});

/**
 * POST /api/translations/batch
 * Batch save multiple translations (e.g. from Admin editor)
 */
router.post('/batch', async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid items array' });
  }

  if (isDbConnected()) {
    try {
      for (const item of items) {
        if (!item.lang_code || !item.trans_key) continue;
        await query(
          `INSERT INTO translations (lang_code, trans_key, trans_value, category)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE trans_value = VALUES(trans_value), category = VALUES(category)`,
          [item.lang_code, item.trans_key, item.trans_value || '', item.category || 'general']
        );
      }
    } catch (err) {
      console.error('Batch MySQL save error:', err.message);
      return res.status(500).json({ success: false, message: 'Database batch save failed', error: err.message });
    }
  }

  // Update fallback JSON
  const fallback = getFallbackData();
  for (const item of items) {
    if (!item.lang_code || !item.trans_key) continue;
    if (!fallback.translations[item.lang_code]) fallback.translations[item.lang_code] = {};
    fallback.translations[item.lang_code][item.trans_key] = item.trans_value || '';

    const idx = fallback.items.findIndex(
      (i) => i.lang_code === item.lang_code && i.trans_key === item.trans_key
    );
    if (idx >= 0) {
      fallback.items[idx].trans_value = item.trans_value || '';
      if (item.category) fallback.items[idx].category = item.category;
    } else {
      fallback.items.push({
        lang_code: item.lang_code,
        trans_key: item.trans_key,
        trans_value: item.trans_value || '',
        category: item.category || 'general',
      });
    }
  }
  saveFallbackData(fallback);

  return res.json({
    success: true,
    message: `Successfully saved ${items.length} translations`,
    count: items.length,
  });
});

/**
 * DELETE /api/translations/:lang/:key
 * Delete a translation entry
 */
router.delete('/:lang/:key', async (req, res) => {
  const { lang, key } = req.params;

  if (isDbConnected()) {
    try {
      await query('DELETE FROM translations WHERE lang_code = ? AND trans_key = ?', [lang, key]);
    } catch (err) {
      console.error('MySQL translation delete error:', err.message);
    }
  }

  const fallback = getFallbackData();
  if (fallback.translations[lang]) {
    delete fallback.translations[lang][key];
  }
  fallback.items = fallback.items.filter(
    (i) => !(i.lang_code === lang && i.trans_key === key)
  );
  saveFallbackData(fallback);

  return res.json({
    success: true,
    message: `Translation '${key}' (${lang}) deleted`,
  });
});

export default router;
