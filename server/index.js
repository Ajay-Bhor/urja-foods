import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import { initDB, getDbHealth, isDbConnected } from './config/db.js';
import productsRouter from './routes/products.js';
import inquiryRouter from './routes/inquiry.js';
import calculatorRouter from './routes/calculator.js';
import careersRouter from './routes/careers.js';
import businessesRouter from './routes/businesses.js';
import milestonesRouter from './routes/milestones.js';
import jobsRouter from './routes/jobs.js';
import companyInfoRouter from './routes/companyInfo.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/products', productsRouter);
app.use('/api/inquiries', inquiryRouter);
app.use('/api/calculate', calculatorRouter);
app.use('/api/careers', careersRouter);
app.use('/api/businesses', businessesRouter);
app.use('/api/milestones', milestonesRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/company-info', companyInfoRouter);

// Enhanced Health check endpoint with Database status
app.get('/api/health', async (req, res) => {
  const dbHealth = await getDbHealth();
  res.json({
    status: 'ok',
    service: 'Urja Foods Backend API',
    timestamp: new Date().toISOString(),
    version: '1.2.0',
    database: dbHealth,
  });
});

// Serve static frontend build if it exists (for production)
const distPath = path.join(__dirname, '../dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  // If API route not found
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found' });
  }
  // Otherwise fallback to index.html in production
  const indexPath = path.join(distPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('Urja Foods API Server is running. Vite dev server is on port 3000.');
    }
  });
});

// Initialize Database and Start Server
async function startServer() {
  console.log('🌾 Initializing Urja Foods Backend Services...');
  await initDB();

  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`🌾 Urja Foods Server running on port ${PORT}`);
    console.log(`🌾 API Health: http://localhost:${PORT}/api/health`);
    console.log(`🌾 Products API: http://localhost:${PORT}/api/products`);
    console.log(`🌾 Businesses API: http://localhost:${PORT}/api/businesses`);
    console.log(`🌾 Milestones API: http://localhost:${PORT}/api/milestones`);
    console.log(`🌾 Jobs API: http://localhost:${PORT}/api/jobs`);
    console.log(`🌾 Company Info API: http://localhost:${PORT}/api/company-info`);
    console.log(`🌾 Database status: ${isDbConnected() ? '✅ MySQL Connected' : '⚠️ Fallback JSON Mode'}`);
    console.log(`=========================================`);
  });
}

startServer();
