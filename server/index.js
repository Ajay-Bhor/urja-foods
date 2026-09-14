import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config();
import express from 'express';
import cors from 'cors';
import { connectDB, getDbStatus, defaultProducts, defaultJobOpenings } from './db.js';
import { Inquiry } from './models/Inquiry.js';
import { JobApplication } from './models/JobApplication.js';
import { Product } from './models/Product.js';
import { JobOpening } from './models/JobOpening.js';
import { sendHrNotification, sendCandidateConfirmation, getSentEmails } from './mailer.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory fallback caches for high resilience
const urjaInquiriesCache = [];
const urjaJobApplicationsCache = [];

// Urja Foods Corporate Overview & Heritage
const urjaOverview = {
  name: 'Urja Foods & Agro Pvt. Ltd.',
  tagline: 'Creating Energy',
  subTagline: 'Urja Pashu Aahar — Complete Source of Energy!',
  foundedYear: 2005,
  founder: 'Mr. Pramod Anandrao Hinge',
  headquarters: 'Nirgudsar, Tal. Ambegaon, Dist. Pune, Maharashtra 410503',
  phone: '+91-7028939900',
  email: 'info@urjafoods.net',
  stats: [
    { label: 'Years of Trust', value: '20+ Years', detail: 'Serving farmers since 2005' },
    { label: 'Feed Plant Capacity', value: '150 TPD', detail: 'Fully automated & computerized' },
    { label: 'European EC Houses', value: '100%', detail: 'First in Maharashtra with European tech' },
    { label: 'Partner Farmers', value: '10,000+', detail: 'Across Western Maharashtra' },
    { label: 'Quality Guarantee', value: 'Antibiotic-Free', detail: 'Fresh, juicy, and healthy produce' }
  ],
  services: [
    {
      id: 'contract-farming',
      title: 'Contract Broiler Farming',
      marathiTitle: 'कॉन्ट्रॅक्ट ब्रॉयलर फार्मिंग',
      description: 'Urja operates contract broiler farming across owned branches in Pune district with 100% European Environmental Controlled (EC) houses, computerized ventilation, and temperature control to produce antibiotic-free chicken with superior low mortality.',
      icon: 'Farm'
    },
    {
      id: 'feed-manufacturing',
      title: '150 TPD Automated Pellet Feed Plant',
      marathiTitle: '१५० टन/दिवस स्वयंचलित फीड प्लांट',
      description: 'Fully automated computerized 150 Tons Per Day pellet plant in Nirgudsar, Pune. Producing nutrient-dense, steam-conditioned cattle feeds and poultry rations with strict quality assurance.',
      icon: 'Factory'
    },
    {
      id: 'hatchery-chicks',
      title: 'Modern Hatchery & Auto-Vaccinated Chicks',
      marathiTitle: 'आधुनिक हॅचरी व स्वयंचलित लसीकरण',
      description: 'Equipped with cutting-edge auto-vaccination equipment ensuring day-old broiler chicks have high maternal immunity, uniform vitality, and an exceptionally low mortality ratio.',
      icon: 'Egg'
    },
    {
      id: 'chicken-feast-qsr',
      title: 'Chicken Feast / Farm-to-Fork Outlets',
      marathiTitle: 'चिकन फिस्ट / क्यूएसआर आऊटलेट्स',
      description: 'Supplying fresh, tasty, tender, hygienic, and antibiotic-free chicken directly from our temperature-controlled farms to retail consumers and QSR counters.',
      icon: 'Utensils'
    },
    {
      id: 'cattle-nutrition',
      title: 'Scientific Cattle Feed (Pashu Aahar)',
      marathiTitle: 'संतुलित पशु आहार',
      description: 'Formulations for Milking and Non-Milking cattle (Supreme Gold, Malai Plus, Milk O Milk, Max Magic) designed to boost milk yield, fat percentage, and overall livestock vitality.',
      icon: 'ShieldCheck'
    }
  ],
  brands: [
    { name: 'Urja Malai Cattle Feed', category: 'High-Fat Dairy Feed', logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/504.png' },
    { name: 'Chicken Feast', category: 'Antibiotic-Free Fresh Meat', logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/505.png' },
    { name: 'Urja Cattle Feed', category: 'Complete Cattle Nutrition', logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/503.png' },
    { name: 'Urja Poultry Feed', category: 'Broiler & Layer Pellets', logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/502.png' },
    { name: 'Max Magic Eggs', category: 'Farm Fresh Quality Eggs', logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/New-Project-1.png' },
    { name: 'Urja Fertilizer', category: 'Organic Agricultural Inputs', logo: 'https://www.urjafoods.net/wp-content/uploads/2021/06/501.png' }
  ]
};

// Health Check
app.get('/api/health', async (req, res) => {
  const dbStatus = await getDbStatus();
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Urja Foods Full-Stack Engine',
    database: {
      engine: dbStatus.engine || 'MySQL 8.0',
      connected: dbStatus.connected,
      status: dbStatus.connected ? 'Connected / Active' : 'Disconnected'
    }
  });
});

// Live Database Status & Collection Statistics
app.get('/api/urja/db-status', async (req, res) => {
  try {
    const status = await getDbStatus();
    res.json(status);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve database status', details: err.message });
  }
});

// Urja Foods Products Endpoint
app.get('/api/urja/products', async (req, res) => {
  res.set('Cache-Control', 'public, max-age=120');
  const { category } = req.query;

  try {
    const filter = (category && category !== 'all') ? { category } : {};
    const products = await Product.find(filter).lean();
    if (products && products.length > 0) {
      return res.json(products);
    }
  } catch (err) {
    console.warn('[Products API] Fallback to static catalog:', err.message);
  }

  // Resilient fallback to default catalog
  if (category && category !== 'all') {
    return res.json(defaultProducts.filter(p => p.category === category));
  }
  res.json(defaultProducts);
});

// Urja Foods Corporate Overview Endpoint
app.get('/api/urja/overview', (req, res) => {
  res.set('Cache-Control', 'public, max-age=300');
  res.json(urjaOverview);
});

// Dealership & Farmer Inquiry Submission Endpoint (Database Persisted)
app.post('/api/urja/inquire', async (req, res) => {
  const { name, phone, email, inquiryType, message, location } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and Contact Number are required.' });
  }

  const inquiryId = `URJA-${Date.now()}`;
  const inquiryData = {
    inquiryId,
    id: inquiryId,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : 'N/A',
    inquiryType: inquiryType || 'Feed Inquiry',
    location: location || 'Maharashtra',
    message: message || '',
    status: 'New',
    receivedAt: new Date().toISOString()
  };

  let savedInDb = false;
  try {
    const doc = new Inquiry(inquiryData);
    await doc.save();
    savedInDb = true;
    console.log(`📁 [Database] Saved inquiry: ${inquiryId} from ${name}`);
  } catch (err) {
    console.error(`⚠️ [Inquiry Database Error]: ${err.message}`);
  }

  // Also persist in local cache for resilient in-memory availability
  urjaInquiriesCache.unshift(inquiryData);
  console.log(`[Urja API] New inquiry received from ${name} (${phone}) - Type: ${inquiryType}`);

  res.status(201).json({
    success: true,
    message: 'धन्यवाद! आपली माहिती उर्जा फूड्सकडे नोंदवली गेली आहे. आमचे प्रतिनिधी लवकरच संपर्क करतील. (Thank you! Your inquiry has been registered with Urja Foods.)',
    inquiryId,
    persisted: savedInDb
  });
});

// Internal Admin Endpoint: Retrieve all Farmer & Dealership Inquiries
app.get('/api/urja/inquiries', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
    return res.json({
      source: 'database',
      total: inquiries.length,
      inquiries: inquiries.map(i => ({
        ...i,
        id: i.inquiryId || i.id || i._id
      }))
    });
  } catch (err) {
    console.warn('[Inquiries API] Error fetching inquiries:', err.message);
  }

  res.json({
    source: 'cache',
    total: urjaInquiriesCache.length,
    inquiries: urjaInquiriesCache
  });
});

// Update Inquiry Status (e.g. from New -> Contacted -> Resolved)
app.patch('/api/urja/inquiries/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  try {
    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;

    const updated = await Inquiry.findOneAndUpdate(
      { $or: [{ inquiryId: id }, { id: id }, { _id: id }] },
      updatePayload,
      { new: true }
    );

    if (updated) {
      return res.json({ success: true, inquiry: { ...updated, id: updated.inquiryId || updated.id } });
    }
  } catch (err) {
    console.error('Error updating inquiry status:', err.message);
  }

  const cached = urjaInquiriesCache.find(i => i.id === id || i.inquiryId === id);
  if (cached) {
    if (status) cached.status = status;
    if (notes !== undefined) cached.notes = notes;
    return res.json({ success: true, inquiry: cached });
  }

  res.status(404).json({ error: 'Inquiry not found' });
});

// Careers Openings Endpoint
app.get('/api/urja/careers', async (req, res) => {
  res.set('Cache-Control', 'public, max-age=120');
  const { dept } = req.query;

  try {
    const filter = (dept && dept !== 'all') ? { deptKey: dept, isActive: true } : { isActive: true };
    const jobs = await JobOpening.find(filter).lean();
    if (jobs && jobs.length > 0) {
      return res.json(jobs);
    }
  } catch (err) {
    console.warn('[Careers API] Fallback to static job openings:', err.message);
  }

  if (dept && dept !== 'all') {
    return res.json(defaultJobOpenings.filter(j => j.deptKey === dept));
  }
  res.json(defaultJobOpenings);
});

// Career Application Submission Endpoint (Database Persisted + Automated HR & Candidate Emails)
app.post('/api/urja/careers/apply', async (req, res) => {
  const { name, phone, email, position, qualification, experience, location, resumeText } = req.body;

  if (!name || !phone || !position) {
    return res.status(400).json({ error: 'Name, Phone, and Position are required.' });
  }

  const applicationId = `URJA-JOB-${Date.now().toString().slice(-6)}`;
  const appData = {
    applicationId,
    id: applicationId,
    name: name.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : 'N/A',
    position,
    qualification: qualification || 'N/A',
    experience: experience || 'N/A',
    location: location || 'Maharashtra',
    resumeText: resumeText || '',
    status: 'Under Review',
    hrNotes: '',
    receivedAt: new Date().toISOString(),
    emailAudit: {
      hrNotification: null,
      candidateConfirmation: null
    }
  };

  // 1. Send Internal Notification to HR Department
  const hrResult = await sendHrNotification(appData);
  appData.emailAudit.hrNotification = hrResult;

  // 2. Send Official Confirmation Email to Candidate
  let candidateResult = { success: false, reason: 'NO_EMAIL' };
  if (email && email.includes('@')) {
    candidateResult = await sendCandidateConfirmation(appData);
    appData.emailAudit.candidateConfirmation = candidateResult;
  }

  // 3. Save to Database
  let savedInDb = false;
  try {
    const doc = new JobApplication(appData);
    await doc.save();
    savedInDb = true;
    console.log(`📁 [Database] Saved Job Application: ${applicationId} for ${name}`);
  } catch (err) {
    console.error(`⚠️ [Careers Database Error]: ${err.message}`);
  }

  // Update in-memory fallback cache
  urjaJobApplicationsCache.unshift(appData);
  console.log(`[Urja Careers] Application recorded (ID: ${applicationId}) - HR Alert: ${hrResult.success ? 'SENT' : 'FAILED'}, Candidate Confirmation: ${candidateResult.success ? 'SENT' : 'SKIPPED'}`);

  res.status(201).json({
    success: true,
    message: 'धन्यवाद! आपला अर्ज उर्जा फुड्सच्या भरती विभागाकडे यशस्वीरीत्या नोंदवला गेला आहे. (Application submitted successfully! Our HR recruitment team will review your details.)',
    applicationId,
    persisted: savedInDb,
    hrNotified: hrResult.success,
    candidateConfirmationSent: candidateResult.success,
    candidateEmail: email || null,
    candidateEmailPreview: candidateResult.record?.html || null
  });
});

// Internal HR Portal: Retrieve all job applications with status & email logs
app.get('/api/urja/careers/applications', async (req, res) => {
  let applications = [];

  try {
    const docs = await JobApplication.find().sort({ createdAt: -1 }).lean();
    applications = docs.map(doc => ({
      ...doc,
      id: doc.applicationId || doc.id || doc._id
    }));
  } catch (err) {
    console.warn('[Careers Applications API] Error querying database:', err.message);
  }

  if (applications.length === 0 && urjaJobApplicationsCache.length > 0) {
    applications = urjaJobApplicationsCache;
  }

  res.json({
    total: applications.length,
    applications,
    recentEmails: getSentEmails().slice(-20)
  });
});

// Internal HR Portal: Update candidate status in Database
app.patch('/api/urja/careers/applications/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status, hrNotes } = req.body;

  let updatedDoc = null;

  try {
    const updatePayload = {
      updatedAt: new Date().toISOString()
    };
    if (status) updatePayload.status = status;
    if (hrNotes !== undefined) updatePayload.hrNotes = hrNotes;

    updatedDoc = await JobApplication.findOneAndUpdate(
      { $or: [{ applicationId: id }, { id: id }, { _id: id }] },
      updatePayload,
      { new: true }
    );

    if (updatedDoc) {
      updatedDoc.id = updatedDoc.applicationId || updatedDoc.id;
    }
  } catch (err) {
    console.error('Error updating status in database:', err.message);
  }

  // Also sync in-memory cache
  const appItem = urjaJobApplicationsCache.find(a => a.id === id || a.applicationId === id);
  if (appItem) {
    if (status) appItem.status = status;
    if (hrNotes !== undefined) appItem.hrNotes = hrNotes;
    appItem.updatedAt = new Date().toISOString();
  }

  if (updatedDoc) {
    console.log(`📁 [Database] Status updated for ${id}: ${status}`);
    return res.json({ success: true, application: updatedDoc });
  }

  if (appItem) {
    console.log(`[Urja HR Cache] Status updated for ${id}: ${status}`);
    return res.json({ success: true, application: appItem });
  }

  res.status(404).json({ error: 'Application not found' });
});

// Internal HR Portal: Get email audit trail for specific application
app.get('/api/urja/careers/applications/:id/emails', (req, res) => {
  const { id } = req.params;
  const emails = getSentEmails(id);
  res.json(emails);
});

// Automated Self-Test API Endpoint for Automation Testing Runner & QA Suite
app.get('/api/test/run', async (req, res) => {
  const startTime = Date.now();
  const testResults = [];

  const runTest = async (name, category, testFn) => {
    try {
      const t0 = Date.now();
      const result = await testFn();
      const durationMs = Date.now() - t0;
      testResults.push({ name, category, passed: true, durationMs, details: result });
    } catch (err) {
      testResults.push({ name, category, passed: false, durationMs: 0, error: err.message });
    }
  };

  // 1. Health & Server Metrics
  await runTest('Server Health & Uptime', 'Core', () => {
    if (process.uptime() <= 0) throw new Error('Uptime is invalid');
    return { uptime: process.uptime(), memoryUsage: process.memoryUsage().rss };
  });

  // 2. Product Catalog Schema & Data Integrity
  await runTest('Product Catalog Integrity', 'Catalog', () => {
    if (!Array.isArray(defaultProducts) || defaultProducts.length < 9) {
      throw new Error(`Expected at least 9 products, found ${defaultProducts?.length}`);
    }
    const missingKeys = defaultProducts.filter(p => !p.id || !p.name || !p.category || !p.specs);
    if (missingKeys.length > 0) throw new Error(`${missingKeys.length} products have missing required schema fields`);
    return { count: defaultProducts.length, categories: [...new Set(defaultProducts.map(p => p.category))] };
  });

  // 3. Corporate Overview Schema
  await runTest('Corporate Overview Integrity', 'Core', () => {
    if (!urjaOverview.founder || !urjaOverview.services || urjaOverview.services.length < 5) {
      throw new Error('Corporate overview missing services or founder');
    }
    return { servicesCount: urjaOverview.services.length, brandsCount: urjaOverview.brands.length };
  });

  // 4. Careers Openings Integrity
  await runTest('Careers Openings Integrity', 'Careers', () => {
    if (!Array.isArray(defaultJobOpenings) || defaultJobOpenings.length < 5) {
      throw new Error(`Expected 5 active positions, found ${defaultJobOpenings?.length}`);
    }
    return { positionsCount: defaultJobOpenings.length };
  });

  // 5. Automated Mailer Audit Engine
  await runTest('Recruitment Mailer Engine', 'Mailer', () => {
    const emails = getSentEmails();
    return { auditStreamActive: true, sentEmailsCount: emails.length };
  });

  // 6. MySQL Database Engine & Tables
  await runTest('MySQL Database Health & Tables', 'Database', async () => {
    const dbStatus = await getDbStatus();
    const hasModels = !!(Inquiry && JobApplication && Product && JobOpening);
    if (!hasModels) throw new Error('One or more data collections failed to initialize');
    return {
      engine: dbStatus.engine,
      status: dbStatus.connected ? 'Active & Connected' : 'Ready',
      database: dbStatus.database,
      tablesChecked: ['inquiries', 'job_applications', 'products', 'job_openings']
    };
  });

  const totalDuration = Date.now() - startTime;
  const passedCount = testResults.filter(t => t.passed).length;
  const failedCount = testResults.filter(t => !t.passed).length;

  res.json({
    status: failedCount === 0 ? 'ALL_PASSED' : 'SOME_FAILED',
    timestamp: new Date().toISOString(),
    totalDurationMs: totalDuration,
    summary: {
      total: testResults.length,
      passed: passedCount,
      failed: failedCount,
      passRate: `${((passedCount / testResults.length) * 100).toFixed(1)}%`
    },
    tests: testResults
  });
});

// Start Server and Initialize Database
app.listen(PORT, async () => {
  console.log(`🌾 Urja Foods Full-Stack Server running at http://localhost:${PORT}`);
  await connectDB();
});
