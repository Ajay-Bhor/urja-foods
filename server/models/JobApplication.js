import { getPool } from '../db.js';

function parseApplication(row) {
  if (!row) return null;
  return {
    ...row,
    id: row.applicationId || row.id,
    emailAudit: typeof row.emailAudit === 'string' ? JSON.parse(row.emailAudit) : (row.emailAudit || null)
  };
}

export class JobApplication {
  constructor(data) {
    this.data = {
      id: data.id || data.applicationId || `URJA-JOB-${Date.now().toString().slice(-6)}`,
      applicationId: data.applicationId || data.id || `URJA-JOB-${Date.now().toString().slice(-6)}`,
      name: (data.name || '').trim(),
      phone: (data.phone || '').trim(),
      email: (data.email || 'N/A').trim(),
      position: data.position || '',
      qualification: data.qualification || 'N/A',
      experience: data.experience || 'N/A',
      location: data.location || 'Maharashtra',
      resumeText: data.resumeText || '',
      status: data.status || 'Under Review',
      hrNotes: data.hrNotes || '',
      emailAudit: data.emailAudit || null,
      receivedAt: data.receivedAt || new Date().toISOString()
    };
  }

  async save() {
    const pool = getPool();
    if (pool) {
      await pool.query(
        `INSERT INTO \`job_applications\` (\`id\`, \`applicationId\`, \`name\`, \`phone\`, \`email\`, \`position\`, \`qualification\`, \`experience\`, \`location\`, \`resumeText\`, \`status\`, \`hrNotes\`, \`emailAudit\`, \`receivedAt\`)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE \`status\`=VALUES(\`status\`), \`hrNotes\`=VALUES(\`hrNotes\`)`,
        [
          this.data.id,
          this.data.applicationId,
          this.data.name,
          this.data.phone,
          this.data.email,
          this.data.position,
          this.data.qualification,
          this.data.experience,
          this.data.location,
          this.data.resumeText,
          this.data.status,
          this.data.hrNotes,
          this.data.emailAudit ? JSON.stringify(this.data.emailAudit) : null,
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
        let sql = 'SELECT * FROM \`job_applications\`';
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
        return rows.map(parseApplication);
      } catch (err) {
        console.error('MySQL JobApplication.find error:', err.message);
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
      const targetId = filter.id || filter.applicationId || (filter.$or && (filter.$or[0]?.applicationId || filter.$or[0]?.id));
      if (!targetId) return null;

      const sets = [];
      const params = [];

      if (update.status) {
        sets.push('`status` = ?');
        params.push(update.status);
      }
      if (update.hrNotes !== undefined) {
        sets.push('`hrNotes` = ?');
        params.push(update.hrNotes);
      }

      if (sets.length > 0) {
        params.push(targetId, targetId);
        await pool.query(
          `UPDATE \`job_applications\` SET ${sets.join(', ')} WHERE \`applicationId\` = ? OR \`id\` = ?`,
          params
        );
      }

      const [rows] = await pool.query(
        'SELECT * FROM \`job_applications\` WHERE \`applicationId\` = ? OR \`id\` = ? LIMIT 1',
        [targetId, targetId]
      );

      if (rows.length === 0) return null;
      const updated = parseApplication(rows[0]);

      return {
        ...updated,
        lean: () => Promise.resolve(updated),
        then: (resolve) => Promise.resolve(updated).then(resolve)
      };
    } catch (err) {
      console.error('MySQL JobApplication.findOneAndUpdate error:', err.message);
      return null;
    }
  }

  static async countDocuments(filter = {}) {
    const pool = getPool();
    if (!pool) return 0;

    try {
      const [rows] = await pool.query('SELECT COUNT(*) as cnt FROM `job_applications`');
      return rows[0].cnt;
    } catch (err) {
      return 0;
    }
  }
}

export default JobApplication;
