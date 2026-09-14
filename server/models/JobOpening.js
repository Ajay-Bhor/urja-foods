import { getPool, defaultJobOpenings } from '../db.js';

function parseOpening(row) {
  if (!row) return null;
  return {
    ...row,
    isActive: Boolean(row.isActive),
    responsibilities: typeof row.responsibilities === 'string' ? JSON.parse(row.responsibilities) : (row.responsibilities || [])
  };
}

export const JobOpening = {
  find: (filter = {}) => {
    const queryPromise = (async () => {
      const pool = getPool();
      if (!pool) {
        let results = [...defaultJobOpenings];
        if (filter.deptKey && filter.deptKey !== 'all') {
          results = results.filter(j => j.deptKey === filter.deptKey);
        }
        return results;
      }

      try {
        let sql = 'SELECT * FROM `job_openings` WHERE `isActive` = 1';
        const params = [];
        if (filter.deptKey && filter.deptKey !== 'all') {
          sql += ' AND `deptKey` = ?';
          params.push(filter.deptKey);
        }

        const [rows] = await pool.query(sql, params);
        return rows.map(parseOpening);
      } catch (err) {
        console.warn('MySQL JobOpening.find error, fallback to defaults:', err.message);
        let results = [...defaultJobOpenings];
        if (filter.deptKey && filter.deptKey !== 'all') {
          results = results.filter(j => j.deptKey === filter.deptKey);
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
    if (!pool) return defaultJobOpenings.length;

    try {
      let sql = 'SELECT COUNT(*) as cnt FROM `job_openings`';
      const params = [];
      if (filter.deptKey && filter.deptKey !== 'all') {
        sql += ' WHERE `deptKey` = ?';
        params.push(filter.deptKey);
      }
      const [rows] = await pool.query(sql, params);
      return rows[0].cnt;
    } catch (err) {
      return defaultJobOpenings.length;
    }
  },

  insertMany: async (docs) => {
    const pool = getPool();
    if (!pool) return docs;

    for (const j of docs) {
      await pool.query(
        `INSERT INTO \`job_openings\` (\`id\`, \`department\`, \`deptKey\`, \`title\`, \`location\`, \`type\`, \`experience\`, \`qualification\`, \`salary\`, \`openings\`, \`responsibilities\`, \`isActive\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE \`title\`=VALUES(\`title\`)`,
        [
          j.id,
          j.department,
          j.deptKey,
          j.title,
          j.location,
          j.type,
          j.experience,
          j.qualification,
          j.salary,
          j.openings,
          JSON.stringify(j.responsibilities || []),
          j.isActive ? 1 : 0
        ]
      );
    }
    return docs;
  }
};

export default JobOpening;
