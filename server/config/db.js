import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'urja_foods_db',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
  charset: 'utf8mb4',
};

let pool = null;
let isConnected = false;
let lastError = null;

/**
 * Initialize Database, create tables, and seed all company information
 */
export async function initDB() {
  try {
    // 1. Establish initial connection to MySQL server to ensure database exists
    const serverConnection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      charset: 'utf8mb4',
    });

    await serverConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
    );
    await serverConnection.end();

    // 2. Create the connection pool with the specific database
    pool = mysql.createPool(dbConfig);

    // Test pool connection
    const conn = await pool.getConnection();
    conn.release();

    // 3. Create all tables if they do not exist
    await createTables();

    // 4. Seed all information if tables are empty
    await seedInitialData();

    isConnected = true;
    lastError = null;
    console.log(`✅ [MySQL] Successfully connected to '${dbConfig.database}' on ${dbConfig.host}:${dbConfig.port}`);
    return true;
  } catch (error) {
    isConnected = false;
    lastError = error.message;
    console.warn(`⚠️ [MySQL Connection Notice]: ${error.message}`);
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.warn(`👉 Access denied for user '${dbConfig.user}'. Please set the correct DB_PASSWORD in your .env file.`);
    } else if (error.code === 'ECONNREFUSED') {
      console.warn(`👉 Could not connect to MySQL server at ${dbConfig.host}:${dbConfig.port}. Is the MySQL service running?`);
    }
    console.warn(`💡 Running in resilient mode: local JSON data will be used as fallback until MySQL connects.`);
    return false;
  }
}

/**
 * Create tables for all application entities:
 * Products, Inquiries, Career Applications, Email Logs,
 * Businesses, Milestones, Job Postings, and Company Info.
 */
async function createTables() {
  if (!pool) return;

  // 1. Products Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      tag VARCHAR(100) DEFAULT NULL,
      price VARCHAR(50) DEFAULT NULL,
      original_price VARCHAR(50) DEFAULT NULL,
      discount VARCHAR(50) DEFAULT NULL,
      rating DECIMAL(3,2) DEFAULT 5.00,
      reviews_count INT DEFAULT 0,
      sizes JSON DEFAULT NULL,
      short_description TEXT DEFAULT NULL,
      description TEXT DEFAULT NULL,
      specs JSON DEFAULT NULL,
      benefits JSON DEFAULT NULL,
      image VARCHAR(500) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 2. Inquiries Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) DEFAULT NULL,
      interest VARCHAR(255) DEFAULT NULL,
      district VARCHAR(100) DEFAULT NULL,
      farm_type VARCHAR(100) DEFAULT NULL,
      animal_count VARCHAR(50) DEFAULT NULL,
      message TEXT DEFAULT NULL,
      status VARCHAR(50) DEFAULT 'Pending Contact',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 3. Career Applications Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS career_applications (
      id VARCHAR(64) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) DEFAULT NULL,
      position VARCHAR(255) DEFAULT NULL,
      experience VARCHAR(100) DEFAULT NULL,
      qualification VARCHAR(255) DEFAULT NULL,
      city VARCHAR(100) DEFAULT NULL,
      resume_url VARCHAR(500) DEFAULT NULL,
      message TEXT DEFAULT NULL,
      status VARCHAR(100) DEFAULT 'Delivered to HR Desk',
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_submitted_at (submitted_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 4. Email Logs Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS email_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(100) DEFAULT NULL,
      application_id VARCHAR(64) DEFAULT NULL,
      recipient VARCHAR(255) DEFAULT NULL,
      subject VARCHAR(255) DEFAULT NULL,
      status VARCHAR(100) DEFAULT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_application_id (application_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 5. Businesses Table (All 5 agribusiness sectors)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS businesses (
      id VARCHAR(64) PRIMARY KEY,
      number VARCHAR(10) DEFAULT NULL,
      title VARCHAR(255) NOT NULL,
      short_title VARCHAR(100) DEFAULT NULL,
      category VARCHAR(100) DEFAULT NULL,
      tag VARCHAR(100) DEFAULT NULL,
      tagline TEXT DEFAULT NULL,
      overview TEXT DEFAULT NULL,
      image VARCHAR(500) DEFAULT NULL,
      products JSON DEFAULT NULL,
      stats JSON DEFAULT NULL,
      features JSON DEFAULT NULL,
      process_steps JSON DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (category)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 6. Milestones Table (Historical milestones)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS milestones (
      id INT AUTO_INCREMENT PRIMARY KEY,
      year VARCHAR(20) NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(500) DEFAULT NULL,
      display_order INT DEFAULT 0,
      INDEX idx_year (year)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 7. Job Postings Table (Active company vacancies)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS job_postings (
      id VARCHAR(64) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      dept VARCHAR(100) NOT NULL,
      location VARCHAR(255) NOT NULL,
      experience VARCHAR(100) DEFAULT NULL,
      type VARCHAR(100) DEFAULT NULL,
      vacancies VARCHAR(50) DEFAULT NULL,
      summary TEXT DEFAULT NULL,
      responsibilities JSON DEFAULT NULL,
      requirements JSON DEFAULT NULL,
      status VARCHAR(50) DEFAULT 'Active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_dept (dept),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);

  // 8. Company Info Table (Values, Chairman Message, Contacts, Perks)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS company_info (
      info_key VARCHAR(100) PRIMARY KEY,
      category VARCHAR(50) DEFAULT NULL,
      title VARCHAR(255) DEFAULT NULL,
      info_value JSON DEFAULT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
}

/**
 * Helper to safely read JSON from server/data
 */
function readJson(filename) {
  const filePath = path.join(__dirname, `../data/${filename}`);
  if (fs.existsSync(filePath)) {
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Seed all information into database if empty
 */
async function seedInitialData() {
  if (!pool) return;

  // 1. Seed Products
  const [productRows] = await pool.query('SELECT COUNT(*) as count FROM products');
  if (productRows[0].count === 0) {
    const products = readJson('products.json');
    if (products) {
      for (const p of products) {
        await pool.query(
          `INSERT INTO products (
            id, name, category, tag, price, original_price, discount,
            rating, reviews_count, sizes, short_description, description,
            specs, benefits, image
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            p.id,
            p.name,
            p.category,
            p.tag || null,
            p.price || null,
            p.originalPrice || null,
            p.discount || null,
            p.rating || 5.0,
            p.reviewsCount || 0,
            JSON.stringify(p.sizes || []),
            p.shortDescription || null,
            p.description || null,
            JSON.stringify(p.specs || {}),
            JSON.stringify(p.benefits || []),
            p.image || null,
          ]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${products.length} products`);
    }
  }

  // 2. Seed Inquiries
  const [inquiryRows] = await pool.query('SELECT COUNT(*) as count FROM inquiries');
  if (inquiryRows[0].count === 0) {
    const inquiries = readJson('inquiries.json');
    if (inquiries && inquiries.length > 0) {
      for (const inq of inquiries) {
        await pool.query(
          `INSERT INTO inquiries (
            id, name, phone, email, interest, district, farm_type, animal_count, message, status, created_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            inq.id,
            inq.name,
            inq.phone,
            inq.email || null,
            inq.interest || null,
            inq.district || null,
            inq.farmType || null,
            inq.animalCount || null,
            inq.message || null,
            inq.status || 'Pending Contact',
            inq.createdAt ? new Date(inq.createdAt) : new Date(),
          ]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${inquiries.length} inquiries`);
    }
  }

  // 3. Seed Applications
  const [appRows] = await pool.query('SELECT COUNT(*) as count FROM career_applications');
  if (appRows[0].count === 0) {
    const apps = readJson('applications.json');
    if (apps && apps.length > 0) {
      for (const a of apps) {
        await pool.query(
          `INSERT INTO career_applications (
            id, name, phone, email, position, experience, qualification, city, resume_url, message, status, submitted_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            a.id,
            a.name,
            a.phone,
            a.email || null,
            a.position || null,
            a.experience || null,
            a.qualification || null,
            a.city || null,
            a.resumeUrl || null,
            a.message || null,
            a.status || 'Delivered to HR Desk',
            a.submittedAt ? new Date(a.submittedAt) : new Date(),
          ]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${apps.length} career applications`);
    }
  }

  // 4. Seed Businesses
  const [bizRows] = await pool.query('SELECT COUNT(*) as count FROM businesses');
  if (bizRows[0].count === 0) {
    const businesses = readJson('businesses.json');
    if (businesses) {
      for (const b of businesses) {
        await pool.query(
          `INSERT INTO businesses (
            id, number, title, short_title, category, tag, tagline, overview, image,
            products, stats, features, process_steps
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            b.id,
            b.number,
            b.title,
            b.shortTitle,
            b.category,
            b.tag,
            b.tagline,
            b.overview,
            b.image,
            JSON.stringify(b.products || []),
            JSON.stringify(b.stats || []),
            JSON.stringify(b.features || []),
            JSON.stringify(b.processSteps || []),
          ]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${businesses.length} business sectors`);
    }
  }

  // 5. Seed Milestones
  const [mileRows] = await pool.query('SELECT COUNT(*) as count FROM milestones');
  if (mileRows[0].count === 0) {
    const milestones = readJson('milestones.json');
    if (milestones) {
      for (const m of milestones) {
        await pool.query(
          `INSERT INTO milestones (year, title, description, image, display_order)
           VALUES (?, ?, ?, ?, ?)`,
          [m.year, m.title, m.description, m.image, m.displayOrder || 0]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${milestones.length} historical milestones`);
    }
  }

  // 6. Seed Job Postings
  const [jobRows] = await pool.query('SELECT COUNT(*) as count FROM job_postings');
  if (jobRows[0].count === 0) {
    const jobs = readJson('jobs.json');
    if (jobs) {
      for (const j of jobs) {
        await pool.query(
          `INSERT INTO job_postings (
            id, title, dept, location, experience, type, vacancies, summary,
            responsibilities, requirements, status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            j.id,
            j.title,
            j.dept,
            j.location,
            j.experience,
            j.type,
            j.vacancies,
            j.summary,
            JSON.stringify(j.responsibilities || []),
            JSON.stringify(j.requirements || []),
            j.status || 'Active',
          ]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${jobs.length} job postings`);
    }
  }

  // 7. Seed Company Info
  const [infoRows] = await pool.query('SELECT COUNT(*) as count FROM company_info');
  if (infoRows[0].count === 0) {
    const infoList = readJson('company_info.json');
    if (infoList) {
      for (const item of infoList) {
        await pool.query(
          `INSERT INTO company_info (info_key, category, title, info_value)
           VALUES (?, ?, ?, ?)`,
          [item.infoKey, item.category, item.title, JSON.stringify(item.infoValue)]
        );
      }
      console.log(`🌱 [MySQL] Seeded ${infoList.length} corporate profile entries`);
    }
  }
}

/**
 * Execute a query using the connection pool
 */
export async function query(sql, params = []) {
  if (!isConnected || !pool) {
    throw new Error('MySQL is not connected');
  }
  const [results] = await pool.query(sql, params);
  return results;
}

/**
 * Check if MySQL database is active and connected
 */
export function isDbConnected() {
  return isConnected;
}

/**
 * Get the underlying connection pool
 */
export function getPool() {
  return pool;
}

/**
 * Health statistics for /api/health
 */
export async function getDbHealth() {
  if (!isConnected || !pool) {
    return {
      connected: false,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      error: lastError,
      mode: 'fallback (local JSON files)',
    };
  }

  try {
    const [[productsCount]] = await pool.query('SELECT COUNT(*) as count FROM products');
    const [[inquiriesCount]] = await pool.query('SELECT COUNT(*) as count FROM inquiries');
    const [[careersCount]] = await pool.query('SELECT COUNT(*) as count FROM career_applications');
    const [[bizCount]] = await pool.query('SELECT COUNT(*) as count FROM businesses');
    const [[milestonesCount]] = await pool.query('SELECT COUNT(*) as count FROM milestones');
    const [[jobsCount]] = await pool.query('SELECT COUNT(*) as count FROM job_postings');
    const [[infoCount]] = await pool.query('SELECT COUNT(*) as count FROM company_info');

    return {
      connected: true,
      database: dbConfig.database,
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      mode: 'active (MySQL)',
      tables: {
        products: productsCount.count,
        inquiries: inquiriesCount.count,
        career_applications: careersCount.count,
        businesses: bizCount.count,
        milestones: milestonesCount.count,
        job_postings: jobsCount.count,
        company_info: infoCount.count,
      },
    };
  } catch (err) {
    return {
      connected: false,
      database: dbConfig.database,
      error: err.message,
      mode: 'fallback (local JSON files)',
    };
  }
}

export default {
  initDB,
  query,
  isDbConnected,
  getPool,
  getDbHealth,
};
