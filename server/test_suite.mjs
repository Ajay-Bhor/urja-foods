// test_suite.mjs - Comprehensive Full Website Test Suite for Urja Foods & Agro
import { execSync } from 'child_process';
import http from 'http';

const BASE_URL = 'http://localhost:5000';
const CLIENT_URL = 'http://localhost:5173';

const results = {
  timestamp: new Date().toISOString(),
  summary: { total: 0, passed: 0, failed: 0 },
  tests: []
};

function recordTest(category, name, passed, details = null) {
  results.summary.total++;
  if (passed) results.summary.passed++;
  else results.summary.failed++;

  results.tests.push({
    category,
    name,
    passed,
    details
  });

  const icon = passed ? '✅' : '❌';
  console.log(`${icon} [${category}] ${name}`);
  if (details && !passed) {
    console.error(`   Error details:`, details);
  }
}

async function fetchJson(url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const reqOptions = {
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname + parsed.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, headers: res.headers, body: json });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, raw: data });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(typeof options.body === 'string' ? options.body : JSON.stringify(options.body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('=====================================================');
  console.log('🌾 URJA FOODS & AGRO — FULL WEBSITE TEST SUITE');
  console.log('=====================================================\n');

  // --- 1. FRONTEND BUILD VERIFICATION ---
  console.log('\n--- 1. Client Production Build Verification ---');
  try {
    const buildOutput = execSync('npm.cmd run build', { cwd: 'e:/website data/New folder/client', stdio: 'pipe' }).toString();
    const passed = buildOutput.includes('built in') || buildOutput.includes('dist/');
    recordTest('Build', 'Vite client build executes with 0 errors', passed, buildOutput.slice(-300));
  } catch (err) {
    recordTest('Build', 'Vite client build executes with 0 errors', false, err.message);
  }

  // --- 2. FRONTEND SERVER HTTP TEST ---
  console.log('\n--- 2. Frontend Web Server Availability ---');
  try {
    const clientRes = await fetchJson(CLIENT_URL);
    recordTest('Frontend Server', 'Vite dev server returns HTTP 200 at http://localhost:5173', clientRes.status === 200);
  } catch (err) {
    recordTest('Frontend Server', 'Vite dev server returns HTTP 200 at http://localhost:5173', false, err.message);
  }

  // --- 3. BACKEND HEALTH & OVERVIEW ---
  console.log('\n--- 3. Backend Health & Corporate Overview APIs ---');
  try {
    const health = await fetchJson(`${BASE_URL}/api/health`);
    recordTest('Backend API', 'GET /api/health returns status ok', health.status === 200 && health.body?.status === 'ok');

    // Database Engine Status Check
    const dbStatus = await fetchJson(`${BASE_URL}/api/urja/db-status`);
    const validDb = dbStatus.status === 200 && (dbStatus.body?.state === 'connected' || dbStatus.body?.connected === true);
    recordTest('MySQL Engine', 'GET /api/urja/db-status returns database state & collections stats', validDb, `State: ${dbStatus.body?.state} | Engine: ${dbStatus.body?.engine || 'MySQL'}`);

    const overview = await fetchJson(`${BASE_URL}/api/urja/overview`);
    const validOverview = overview.status === 200 &&
      overview.body?.founder?.includes('Pramod') &&
      Array.isArray(overview.body?.services) && overview.body.services.length >= 5 &&
      Array.isArray(overview.body?.brands) && overview.body.brands.length >= 6;
    recordTest('Backend API', 'GET /api/urja/overview returns founder, services, and brands', validOverview);
  } catch (err) {
    recordTest('Backend API', 'Health / Overview endpoints reachable', false, err.message);
  }

  // --- 4. PRODUCTS CATALOG API ---
  console.log('\n--- 4. Products Catalog & Filtering APIs ---');
  try {
    const allProducts = await fetchJson(`${BASE_URL}/api/urja/products`);
    recordTest('Products API', 'GET /api/urja/products returns full catalog (>= 9 items)', 
      allProducts.status === 200 && Array.isArray(allProducts.body) && allProducts.body.length >= 9);

    const cattleProducts = await fetchJson(`${BASE_URL}/api/urja/products?category=cattle`);
    const cattleOk = cattleProducts.status === 200 && 
      cattleProducts.body.length > 0 && 
      cattleProducts.body.every(p => p.category === 'cattle');
    recordTest('Products API', 'GET /api/urja/products?category=cattle filters correctly', cattleOk);

    const poultryProducts = await fetchJson(`${BASE_URL}/api/urja/products?category=poultry`);
    const poultryOk = poultryProducts.status === 200 && 
      poultryProducts.body.length > 0 && 
      poultryProducts.body.every(p => p.category === 'poultry');
    recordTest('Products API', 'GET /api/urja/products?category=poultry filters correctly', poultryOk);

    const layerProducts = await fetchJson(`${BASE_URL}/api/urja/products?category=layer`);
    const layerOk = layerProducts.status === 200 && 
      layerProducts.body.length > 0 && 
      layerProducts.body.every(p => p.category === 'layer');
    recordTest('Products API', 'GET /api/urja/products?category=layer filters correctly', layerOk);
  } catch (err) {
    recordTest('Products API', 'Products endpoints exception', false, err.message);
  }

  // --- 5. FARMER & DEALER INQUIRY API ---
  console.log('\n--- 5. Inquiry & Leads API ---');
  try {
    // Valid submission
    const inquiryPayload = {
      name: 'Ramesh Patil (Automated Test)',
      phone: '+91-9876543210',
      email: 'ramesh.patil@test.com',
      inquiryType: 'Urja Supreme Gold Dealership',
      location: 'Baramati, Pune',
      message: 'Interested in becoming an authorized distributor for Urja Pashu Aahar.'
    };
    const inquiryRes = await fetchJson(`${BASE_URL}/api/urja/inquire`, {
      method: 'POST',
      body: inquiryPayload
    });
    const testInqId = inquiryRes.body?.inquiryId;
    recordTest('Inquiry API', 'POST /api/urja/inquire registers new lead and returns ID', 
      inquiryRes.status === 201 && inquiryRes.body?.success === true && !!testInqId);

    // Verify GET /api/urja/inquiries retrieves persisted inquiries
    const listInquiries = await fetchJson(`${BASE_URL}/api/urja/inquiries`);
    const inquiryFound = listInquiries.status === 200 &&
      Array.isArray(listInquiries.body?.inquiries) &&
      listInquiries.body.inquiries.some(i => (i.inquiryId === testInqId || i.id === testInqId));
    recordTest('Inquiry API', 'GET /api/urja/inquiries retrieves stored inquiries from Database/cache', inquiryFound);

    // Verify PATCH /api/urja/inquiries/:id/status updates lead status
    if (testInqId) {
      const updateInq = await fetchJson(`${BASE_URL}/api/urja/inquiries/${testInqId}/status`, {
        method: 'PATCH',
        body: { status: 'Contacted', notes: 'Contacted via telephone.' }
      });
      recordTest('Inquiry API', 'PATCH /api/urja/inquiries/:id/status updates inquiry lead status', 
        updateInq.status === 200 && updateInq.body?.inquiry?.status === 'Contacted');
    }

    // Invalid submission (missing name/phone)
    const invalidInquiry = await fetchJson(`${BASE_URL}/api/urja/inquire`, {
      method: 'POST',
      body: { message: 'Incomplete' }
    });
    recordTest('Inquiry API', 'POST /api/urja/inquire rejects invalid request with HTTP 400', 
      invalidInquiry.status === 400);
  } catch (err) {
    recordTest('Inquiry API', 'Inquiry endpoint exception', false, err.message);
  }

  // --- 6. CAREERS & RECRUITMENT PIPELINE ---
  console.log('\n--- 6. Careers, Application & Automated Email Pipeline ---');
  let testAppId = null;
  try {
    // Fetch job openings
    const jobs = await fetchJson(`${BASE_URL}/api/urja/careers`);
    recordTest('Careers API', 'GET /api/urja/careers returns active job openings (5 roles)', 
      jobs.status === 200 && Array.isArray(jobs.body) && jobs.body.length === 5);

    // Filter jobs by department
    const vetJobs = await fetchJson(`${BASE_URL}/api/urja/careers?dept=vet`);
    recordTest('Careers API', 'GET /api/urja/careers?dept=vet filters veterinary openings', 
      vetJobs.status === 200 && vetJobs.body.length > 0 && vetJobs.body.every(j => j.deptKey === 'vet'));

    // Submit Job Application with email to trigger Nodemailer pipeline
    const applicantPayload = {
      name: 'Dr. Swapnil Deshmukh',
      phone: '+91-9423001122',
      email: 'dr.swapnil.deshmukh@example.com',
      position: 'Veterinary Field Officer (पशुवैद्यकीय क्षेत्र अधिकारी)',
      qualification: 'B.V.Sc & A.H (Animal Husbandry)',
      experience: '3.5 Years in Dairy Herd Nutrition & Health',
      location: 'Ahmednagar / Pune',
      resumeText: 'Passionate veterinarian with 3.5 years field experience advising commercial dairy herds on balanced ration formulations and yield improvement.'
    };

    const applyRes = await fetchJson(`${BASE_URL}/api/urja/careers/apply`, {
      method: 'POST',
      body: applicantPayload
    });

    const appSubmitted = applyRes.status === 201 && applyRes.body?.success === true;
    testAppId = applyRes.body?.applicationId;
    recordTest('Careers Pipeline', 'POST /api/urja/careers/apply creates application with ID', 
      appSubmitted && !!testAppId);

    // Check Internal HR Notification dispatched
    recordTest('Careers Pipeline', 'Internal HR notification automatically dispatched to hr@urjafoods.net', 
      applyRes.body?.hrNotified === true);

    // Check Candidate Confirmation Email generated
    recordTest('Careers Pipeline', 'Candidate confirmation letter dispatched with application receipt', 
      applyRes.body?.candidateConfirmationSent === true);

    // Check HTML preview returned
    recordTest('Careers Pipeline', 'Email generator produces branded HTML layout with Urja styling', 
      typeof applyRes.body?.candidateEmailPreview === 'string' && applyRes.body.candidateEmailPreview.includes('Urja Foods & Agro'));

  } catch (err) {
    recordTest('Careers Pipeline', 'Careers application pipeline exception', false, err.message);
  }

  // --- 7. INTERNAL HR RECRUITMENT PORTAL APIS ---
  console.log('\n--- 7. Internal HR Recruitment Portal Management APIs ---');
  try {
    // List all applications
    const hrApps = await fetchJson(`${BASE_URL}/api/urja/careers/applications`);
    const hasApplication = hrApps.status === 200 && 
      Array.isArray(hrApps.body?.applications) &&
      hrApps.body.applications.some(a => a.id === testAppId);
    recordTest('HR Portal API', 'GET /api/urja/careers/applications returns candidate roster including test candidate', hasApplication);

    // Verify recent emails list is tracked
    const hasRecentEmails = Array.isArray(hrApps.body?.recentEmails) && hrApps.body.recentEmails.length > 0;
    recordTest('HR Portal API', 'HR portal retrieves recent email dispatch audit log', hasRecentEmails);

    // Update status (e.g. to Shortlisted)
    if (testAppId) {
      const updateStatus = await fetchJson(`${BASE_URL}/api/urja/careers/applications/${testAppId}/status`, {
        method: 'PATCH',
        body: {
          status: 'Interview Scheduled',
          hrNotes: 'Candidate has strong dairy veterinary background. Scheduled for interview with Dr. Head of Nutrition.'
        }
      });
      const statusUpdated = updateStatus.status === 200 && 
        updateStatus.body?.application?.status === 'Interview Scheduled';
      recordTest('HR Portal API', 'PATCH /api/urja/careers/applications/:id/status updates status & HR notes', statusUpdated);

      // Check candidate email audit trail
      const candidateEmails = await fetchJson(`${BASE_URL}/api/urja/careers/applications/${testAppId}/emails`);
      const emailsFound = candidateEmails.status === 200 && Array.isArray(candidateEmails.body) && candidateEmails.body.length >= 2;
      recordTest('HR Portal API', 'GET /api/urja/careers/applications/:id/emails returns audit trail (HR alert + candidate letter)', emailsFound);
    }
  } catch (err) {
    recordTest('HR Portal API', 'HR portal management API exception', false, err.message);
  }

  // --- 8. LANGUAGE CONTEXT COMPLETENESS ---
  console.log('\n--- 8. Multi-Language (EN / MR / HI) Consistency ---');
  try {
    const fs = await import('fs');
    const langContextFile = fs.readFileSync('e:/website data/New folder/client/src/context/LanguageContext.jsx', 'utf-8');
    
    const hasEn = langContextFile.includes('en: {') && langContextFile.includes('careers:');
    const hasMr = langContextFile.includes('mr: {') && langContextFile.includes('careers:');
    const hasHi = langContextFile.includes('hi: {') && langContextFile.includes('careers:');
    recordTest('Localization', 'LanguageContext contains complete dictionaries for EN, MR, and HI', hasEn && hasMr && hasHi);

    const hasNavCareersEn = langContextFile.includes("careers: 'Careers'") || langContextFile.includes('careers: "Careers"');
    const hasNavCareersMr = langContextFile.includes("careers: 'करिअर'") || langContextFile.includes('careers: "करिअर"');
    const hasNavCareersHi = langContextFile.includes("careers: 'करियर'") || langContextFile.includes('careers: "करियर"');
    recordTest('Localization', 'Navigation keys present for all 3 languages (English, Marathi, Hindi)', 
      hasNavCareersEn && hasNavCareersMr && hasNavCareersHi);
  } catch (err) {
    recordTest('Localization', 'Localization inspection exception', false, err.message);
  }

  // --- 9. CLIENT SEO & HTML INTEGRITY ---
  console.log('\n--- 9. Client SEO & HTML Structure ---');
  try {
    const fs = await import('fs');
    const indexHtml = fs.readFileSync('e:/website data/New folder/client/index.html', 'utf-8');
    
    const hasTitle = indexHtml.includes('<title>') && indexHtml.includes('Urja Foods');
    const hasMetaDesc = indexHtml.includes('name="description"');
    const hasViewport = indexHtml.includes('name="viewport"');
    const hasRootDiv = indexHtml.includes('id="root"');

    recordTest('SEO & HTML', 'index.html contains title, meta description, responsive viewport, and #root div', 
      hasTitle && hasMetaDesc && hasViewport && hasRootDiv);
  } catch (err) {
    recordTest('SEO & HTML', 'SEO inspection exception', false, err.message);
  }

  // --- 9. SUMMARY OF RESULTS ---
  console.log('\n=====================================================');
  console.log(`TEST EXECUTION SUMMARY:`);
  console.log(`Total Tests Run : ${results.summary.total}`);
  console.log(`Passed          : ${results.summary.passed} ✅`);
  console.log(`Failed          : ${results.summary.failed} ❌`);
  console.log(`Success Rate    : ${((results.summary.passed / results.summary.total) * 100).toFixed(1)}%`);
  console.log('=====================================================\n');

  return results;
}

runTests().then((res) => {
  if (res.summary.failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}).catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
