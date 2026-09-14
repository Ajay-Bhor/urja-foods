import { getPool } from '../db.js';

export class Inquiry {
  constructor(data) {
    this.data = {
      id: data.id || data.inquiryId || `URJA-${Date.now()}`,
      inquiryId: data.inquiryId || data.id || `URJA-${Date.now()}`,
      name: (data.name || '').trim(),
      phone: (data.phone || '').trim(),
      email: (data.email || 'N/A').trim(),
      inquiryType: data.inquiryType || 'Feed Inquiry',
      location: data.location || 'Maharashtra',
      message: data.message || '',
      status: data.status || 'New',
      notes: data.notes || '',
      receivedAt: data.receivedAt || new Date().toISOString()
    };
  }

  async save() {
    const pool = getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO \`inquiries\` (\`id\`, \`inquiryId\`, \`name\`, \`phone\`, \`email\`, \`inquiryType\`, \`location\`, \`message\`, \`status\`, \`notes\`, \`receivedAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE \`status\`=VALUES(\`status\`), \`notes\`=VALUES(\`notes\`)`,
        [
          this.data.id,
          this.data.inquiryId,
          this.data.name,
          this.data.phone,
          this.data.email,
          this.data.inquiryType,
          this.data.location,
          this.data.message,
          this.data.status,
          this.data.notes,
          this.data.receivedAt
        ]
      );
    }
    return this.data;
  }

  static find(filter = {}) {
    const queryFn = async (sortField = 'createdAt', sortDir = 'DESC') => {
      const pool = getPool();
      if (!pool) return [];

      try {
        let sql = 'SELECT * FROM `inquiries`';
        const params = [];
        const where = [];

        if (filter.status) {
          where.push('`status` = ?');
          params.push(filter.status);
        }

        if (where.length > 0) {
          sql += ' WHERE ' + where.join(' AND ');
        }

        sql += ` ORDER BY \`${sortField}\` ${sortDir}`;

        const [rows] = await pool.query(sql, params);
        return rows.map(r => ({
          ...r,
          id: r.inquiryId || r.id
        }));
      } catch (err) {
        console.error('MySQL Inquiry.find error:', err.message);
        return [];
      }
    };

    let currentSortField = 'createdAt';
    let currentSortDir = 'DESC';

    const queryObj = {
      sort: (sortSpec = {}) => {
        const [field, dir] = Object.entries(sortSpec)[0] || [];
        if (field) {
          currentSortField = field;
          currentSortDir = dir === -1 ? 'DESC' : 'ASC';
        }
        return {
          lean: () => queryFn(currentSortField, currentSortDir),
          then: (resolve, reject) => queryFn(currentSortField, currentSortDir).then(resolve, reject)
        };
      },
      lean: () => queryFn(currentSortField, currentSortDir),
      then: (resolve, reject) => queryFn(currentSortField, currentSortDir).then(resolve, reject)
    };

    return queryObj;
  }

  static async findOneAndUpdate(filter = {}, update = {}, options = {}) {
    const pool = getPool();
    if (!pool) return null;

    try {
      const targetId = filter.id || filter.inquiryId || (filter.$or && (filter.$or[0]?.inquiryId || filter.$or[0]?.id));
      if (!targetId) return null;

      const sets = [];
      const params = [];

      if (update.status) {
        sets.push('`status` = ?');
        params.push(update.status);
      }
      if (update.notes !== undefined) {
        sets.push('`notes` = ?');
        params.push(update.notes);
      }

      if (sets.length > 0) {
        params.push(targetId, targetId);
        await pool.query(
          `UPDATE \`inquiries\` SET ${sets.join(', ')} WHERE \`inquiryId\` = ? OR \`id\` = ?`,
          params
        );
      }

      const [rows] = await pool.query(
        'SELECT * FROM `inquiries` WHERE `inquiryId` = ? OR `id` = ? LIMIT 1',
        [targetId, targetId]
      );

      if (rows.length === 0) return null;
      const updated = { ...rows[0], id: rows[0].inquiryId || rows[0].id };

      return {
        ...updated,
        lean: () => Promise.resolve(updated),
        then: (resolve) => Promise.resolve(updated).then(resolve)
      };
    } catch (err) {
      console.error('MySQL Inquiry.findOneAndUpdate error:', err.message);
      return null;
    }
  }

  static async countDocuments(filter = {}) {
    const pool = getPool();
    if (!pool) return 0;

    try {
      const [rows] = await pool.query('SELECT COUNT(*) as cnt FROM `inquiries`');
      return rows[0].cnt;
    } catch (err) {
      return 0;
    }
  }
}

export default Inquiry;
