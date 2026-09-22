import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, isDbConnected } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const productsPath = path.join(__dirname, '../data/products.json');

// Read products from JSON fallback
const getFallbackProducts = () => {
  try {
    const raw = fs.readFileSync(productsPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading products.json:', err);
    return [];
  }
};

// Format MySQL row to match API schema
const formatProduct = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    tag: row.tag,
    price: row.price,
    originalPrice: row.original_price,
    discount: row.discount,
    rating: parseFloat(row.rating) || 5.0,
    reviewsCount: row.reviews_count || 0,
    sizes: typeof row.sizes === 'string' ? JSON.parse(row.sizes) : (row.sizes || []),
    shortDescription: row.short_description,
    description: row.description,
    specs: typeof row.specs === 'string' ? JSON.parse(row.specs) : (row.specs || {}),
    benefits: typeof row.benefits === 'string' ? JSON.parse(row.benefits) : (row.benefits || []),
    image: row.image,
  };
};

// GET all products or filter by category / search
router.get('/', async (req, res) => {
  const { category, search } = req.query;

  if (isDbConnected()) {
    try {
      let sql = 'SELECT * FROM products WHERE 1=1';
      const params = [];

      if (category && category !== 'All') {
        sql += ' AND LOWER(category) = LOWER(?)';
        params.push(category);
      }

      if (search) {
        sql += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?)';
        const q = `%${search.toLowerCase()}%`;
        params.push(q, q, q);
      }

      sql += ' ORDER BY name ASC';
      const rows = await query(sql, params);
      const formatted = rows.map(formatProduct);

      return res.json({
        success: true,
        source: 'mysql',
        total: formatted.length,
        products: formatted,
      });
    } catch (err) {
      console.warn('⚠️ [MySQL Query Warning] Falling back to JSON:', err.message);
    }
  }

  // Fallback to JSON
  let list = getFallbackProducts();

  if (category && category !== 'All') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    source: 'json-fallback',
    total: list.length,
    products: list,
  });
});

// GET single product by id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (isDbConnected()) {
    try {
      const rows = await query('SELECT * FROM products WHERE id = ? LIMIT 1', [id]);
      if (rows.length > 0) {
        return res.json({
          success: true,
          source: 'mysql',
          product: formatProduct(rows[0]),
        });
      }
    } catch (err) {
      console.warn('⚠️ [MySQL Query Warning] Falling back to JSON for single product:', err.message);
    }
  }

  const list = getFallbackProducts();
  const product = list.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, source: 'json-fallback', product });
});

export default router;
