async function runChecks() {
  const endpoints = [
    { name: 'Health Check (Backend)', url: 'http://localhost:5000/api/health' },
    { name: 'Products API (Backend)', url: 'http://localhost:5000/api/products' },
    { name: 'Businesses API (Backend)', url: 'http://localhost:5000/api/businesses' },
    { name: 'Milestones API (Backend)', url: 'http://localhost:5000/api/milestones' },
    { name: 'Job Postings API (Backend)', url: 'http://localhost:5000/api/jobs' },
    { name: 'Company Info API (Backend)', url: 'http://localhost:5000/api/company-info' },
    { name: 'Frontend Root (Port 3000)', url: 'http://localhost:3000/' },
    { name: 'Health Check (Proxied 3000)', url: 'http://localhost:3000/api/health' },
    { name: 'Products API (Proxied 3000)', url: 'http://localhost:3000/api/products' }
  ];

  console.log('====================================================');
  console.log('🚀 SYSTEM HEALTH & APPLICATION DIAGNOSTICS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  for (const item of endpoints) {
    try {
      const res = await fetch(item.url);
      const isJson = (res.headers.get('content-type') || '').includes('application/json');
      let detail = '';
      if (isJson) {
        const json = await res.json();
        if (Array.isArray(json)) {
          detail = `(Loaded ${json.length} items from MySQL)`;
        } else if (json.status) {
          detail = `(Status: ${json.status}, DB Connected: ${json.database?.connected})`;
        } else {
          detail = '(JSON Response OK)';
        }
      } else {
        const text = await res.text();
        detail = `(HTML Document OK - ${text.length} bytes)`;
      }

      console.log(`✅ [${res.status} ${res.statusText}] ${item.name.padEnd(30)} ${detail}`);
      passed++;
    } catch (err) {
      console.log(`❌ [FAILED]       ${item.name.padEnd(30)} Error: ${err.message}`);
      failed++;
    }
  }

  console.log('\n====================================================');
  console.log(`Summary: ${passed} passed, ${failed} failed.`);
  console.log('====================================================');
}

runChecks();
