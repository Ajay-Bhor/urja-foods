import 'dotenv/config';
import mysql from 'mysql2/promise';
import { initDB, getDbHealth } from '../config/db.js';

async function runTest() {
  console.log('==============================================');
  console.log('🔍 Testing MySQL Connection for Urja Foods');
  console.log('==============================================');
  console.log(`Host:     ${process.env.DB_HOST || 'localhost'}`);
  console.log(`Port:     ${process.env.DB_PORT || 3307}`);
  console.log(`User:     ${process.env.DB_USER || 'root'}`);
  console.log(`Database: ${process.env.DB_NAME || 'urja_foods_db'}`);
  console.log(`Password: ${process.env.DB_PASSWORD ? '******** (Provided)' : '(Empty)'}`);
  console.log('----------------------------------------------');

  try {
    const success = await initDB();

    if (success) {
      console.log('✅ Connection Test PASSED!');
      const health = await getDbHealth();
      console.log('📊 Database Status:', JSON.stringify(health, null, 2));
    } else {
      console.log('❌ Connection Test FAILED.');
      console.log('👉 Tip: If your MySQL root user has a password, open .env and set:');
      console.log('   DB_PASSWORD=your_actual_password');
    }
  } catch (err) {
    console.error('❌ Unexpected Error during test:', err);
  } finally {
    process.exit(0);
  }
}

runTest();
