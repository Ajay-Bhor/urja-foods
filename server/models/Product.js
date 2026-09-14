import { getPool, defaultProducts } from '../db.js';

function parseProduct(row) {
  if (!row) return null;
  return {
    ...row,
    specs: typeof row.specs === 'string' ? JSON.parse(row.specs) : (row.specs || []),
    benefits: typeof row.benefits === 'string' ? JSON.parse(row.benefits) : (row.benefits || [])
  };
}

export const Product = {
  find: (filter = {}) => {
    const queryPromise = (async () => {
      const pool = getPool();
      if (!pool) {
        let results = [...defaultProducts];
        if (filter.category && filter.category !== 'all') {
          results = results.filter(p => p.category === filter.category);
        }
        return results;
      }

      try {
        let sql = 'SELECT * FROM `products`';
        const params = [];
        if (filter.category && filter.category !== 'all') {
          sql += ' WHERE `category` = ?';
          params.push(filter.category);
        }

        const [rows] = await pool.query(sql, params);
        return rows.map(parseProduct);
      } catch (err) {
        console.warn('MySQL Product.find error, fallback to defaults:', err.message);
        let results = [...defaultProducts];
        if (filter.category && filter.category !== 'all') {
          results = results.filter(p => p.category === filter.category);
        }
        return results;
      }
    })();

    return {
      lean: () => queryPromise,
      then: (resolve, reject) => queryPromise.then(resolve, reject)
    };
  },

  countDocuments: async (filter = {}) => {
    const pool = getPool();
    if (!pool) return defaultProducts.length;

    try {
      let sql = 'SELECT COUNT(*) as cnt FROM `products`';
      const params = [];
      if (filter.category && filter.category !== 'all') {
        sql += ' WHERE `category` = ?';
        params.push(filter.category);
      }
      const [rows] = await pool.query(sql, params);
      return rows[0].cnt;
    } catch (err) {
      return defaultProducts.length;
    }
  },

  insertMany: async (docs) => {
    const pool = getPool();
    if (!pool) return docs;

    for (const p of docs) {
      await pool.query(
        `INSERT INTO \`products\` (\`id\`, \`name\`, \`marathiName\`, \`category\`, \`categoryName\`, \`tag\`, \`badgeColor\`, \`image\`, \`description\`, \`specs\`, \`packaging\`, \`benefits\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE \`name\`=VALUES(\`name\`)`,
        [
          p.id,
          p.name,
          p.marathiName,
          p.category,
          p.categoryName,
          p.tag,
          p.badgeColor,
          p.image,
          p.description,
          JSON.stringify(p.specs || []),
          p.packaging,
          JSON.stringify(p.benefits || [])
        ]
      );
    }
    return docs;
  }
};

export default Product;
