import mysql from 'mysql2/promise';

let pool = null;
let isConnected = false;

// Default initial catalog data for seeding
export const defaultProducts = [
  {
    id: 'supreme-gold-5000',
    name: 'Urja Supreme Gold (5000)',
    marathiName: 'उर्जा सुप्रीम गोल्ड (५०००)',
    category: 'cattle',
    categoryName: 'Cattle Feed (Milking)',
    tag: 'Bestseller',
    badgeColor: 'emerald',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Supreme-Gold-Front-300x300.webp',
    description: 'High-energy cattle pellet feed specially balanced with bypass protein and essential minerals to boost milk yield and high SNF.',
    specs: ['Protein: 22% Min', 'Fat: 4.5% Min', 'Fiber: 8.5% Max', 'Moisture: 10% Max'],
    packaging: '50 kg Bag',
    benefits: ['Substantial increase in milk quantity', 'Improves milk fat percentage', 'Maintains cattle body condition']
  },
  {
    id: 'malai-plus-8000',
    name: 'Urja Malai Plus (8000)',
    marathiName: 'उर्जा मलाई प्लस (८०००)',
    category: 'cattle',
    categoryName: 'Cattle Feed (High Yield)',
    tag: 'Premium Quality',
    badgeColor: 'amber',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Malai-Plus-Front-300x300.webp',
    description: 'Advanced nutritional pellet formula fortified with micro-minerals and bypass fats, tailored for heavy milking cows and buffaloes.',
    specs: ['Protein: 24% Min', 'Fat: 5.5% Min', 'Calcium: 1.2% Min', 'Phosphorus: 0.6% Min'],
    packaging: '50 kg Bag',
    benefits: ['Prevents post-calving metabolic issues', 'Enhances creamy milk texture', 'Supports healthy reproductive cycle']
  },
  {
    id: 'milk-o-milk',
    name: 'Urja Milk O Milk',
    marathiName: 'उर्जा मिल्क ओ मिल्क',
    category: 'cattle',
    categoryName: 'Cattle Feed (Milking)',
    tag: 'Daily Milking',
    badgeColor: 'emerald',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Milk-O-Milk-Front-300x300.webp',
    description: 'Balanced dairy concentrate promoting regular ruminal fermentation and sustained daily milk synthesis throughout the lactation period.',
    specs: ['Protein: 20% Min', 'Fat: 3.5% Min', 'Digestible Energy: High', 'Form: Pelleted'],
    packaging: '50 kg Bag',
    benefits: ['Optimal feed conversion ratio', 'Easily digestible ingredients', 'Economical daily feed solution']
  },
  {
    id: 'max-magic',
    name: 'Urja Max Magic',
    marathiName: 'उर्जा मॅक्स मॅजिक',
    category: 'cattle',
    categoryName: 'Cattle Feed (Peak Lactation)',
    tag: 'Peak Energy',
    badgeColor: 'amber',
    image: 'https://www.urjafoods.net/wp-content/uploads/2025/08/Max-Magic-Front-300x300.webp',
    description: 'Maximum energy dense cattle ration for high-yielding crossbred cows to sustain peak lactation curves without weight loss.',
    specs: ['Energy: High Density', 'Added Enzymes & Probiotics', 'Chelated Minerals', 'Steam Cooked'],
    packaging: '50 kg Bag',
    benefits: ['Prolongs peak lactation period', 'Fast digestion & zero bloating', 'Strengthens immunity']
  },
  {
    id: 'calf-starter-gold',
    name: 'Urja Calf Starter Gold',
    marathiName: 'उर्जा काल्फ स्टार्टर गोल्ड',
    category: 'cattle',
    categoryName: 'Calf Nutrition',
    tag: 'Growth Formula',
    badgeColor: 'blue',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/New-Project-2021-07-06T103829.787-300x194.jpg',
    description: 'Scientifically crafted starter crumble for young calves to stimulate rapid rumen papillae development and early weaning.',
    specs: ['Crude Protein: 24%', 'Milk Solids Enriched', 'Essential Amino Acids', 'Micro Pellets'],
    packaging: '25 kg / 50 kg Bag',
    benefits: ['Accelerates calf weight gain', 'Reduces weaning mortality', 'Builds robust future herd']
  },
  {
    id: 'broiler-finisher-1',
    name: 'Urja Broiler Finisher-1',
    marathiName: 'उर्जा ब्रॉयलर फिनिशर-१',
    category: 'poultry',
    categoryName: 'Poultry & Broiler Feed',
    tag: 'European Standard',
    badgeColor: 'teal',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/New-Project-2021-07-06T103907.054-300x194.jpg',
    description: '100% antibiotic-free broiler finisher pellet produced in a fully automated 150 TPD computerized plant for optimum FCR and carcass yield.',
    specs: ['Protein: 19.5% Min', 'Metabolizable Energy: 3150 kcal/kg', 'Zero Antibiotic Residues', 'Uniform Pellet Size'],
    packaging: '50 kg Bag',
    benefits: ['Superior Feed Conversion Ratio (FCR)', 'Uniform bird body weight', 'Produces juicy, antibiotic-free meat']
  },
  {
    id: 'gavran-feed-starter-finisher',
    name: 'Gavran & Deshi Breeder Feed',
    marathiName: 'गावरान व देशी ब्रीडर फीड',
    category: 'poultry',
    categoryName: 'Deshi Poultry Feed',
    tag: 'Natural Formula',
    badgeColor: 'orange',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/gavrnstrtr-300x194.jpg',
    description: 'Custom formulated for indigenous country chicken breeds (Gavran / Deshi), ensuring natural feather shine, disease resistance, and robust vitality.',
    specs: ['Natural Grains & Pulses', 'Herbal Extracts Added', 'Balanced Amino Profile', 'Crumbles & Pellets'],
    packaging: '50 kg Bag',
    benefits: ['Enhanced natural taste & firmness', 'Lower mortality in village settings', 'Fast feathering & active birds']
  },
  {
    id: 'layer-concentrate-35-50',
    name: 'Layer Concentrate (35% & 50%)',
    marathiName: 'लेयर कॉन्सन्ट्रेट (३५% व ५०%)',
    category: 'layer',
    categoryName: 'Commercial Layer Concentrate',
    tag: 'Max Egg Production',
    badgeColor: 'purple',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/prt-300x194.jpg',
    description: 'High-potency amino acid and mineral concentrate designed to be blended with local grains for top egg production and sturdy shell quality.',
    specs: ['Available: 35% & 50% Mix', 'Methionine & Lysine Fortified', 'Calcium & Phytase Boosted', 'Dust Free Mash/Pellet'],
    packaging: '50 kg Bag',
    benefits: ['Sustains >92% peak egg laying rate', 'Thick, crack-resistant brown & white shells', 'Reduces overall feed mixing cost']
  },
  {
    id: 'layer-pre-mix',
    name: 'Layer Pre-Mix (5% & 35%)',
    marathiName: 'लेयर प्री-मिक्स (५% व ३५%)',
    category: 'layer',
    categoryName: 'Commercial Pre-Mixes',
    tag: 'Custom Blending',
    badgeColor: 'purple',
    image: 'https://www.urjafoods.net/wp-content/uploads/2021/07/New-Project-2021-07-06T104000.163-300x194.jpg',
    description: 'Precision trace mineral, vitamin, and toxin-binder premix to manufacture cost-effective farm-made feeds with complete batch uniformity.',
    specs: ['Active Vitamins A, D3, E, B-Complex', 'Toxin Binders Included', 'High Bioavailability', 'Fine Premix'],
    packaging: '25 kg Bag',
    benefits: ['Eliminates nutritional deficiencies', 'Protects against mycotoxins', 'Optimizes feed efficiency']
  }
];

// Default initial job openings data for seeding
export const defaultJobOpenings = [
  {
    id: 'vet-field-officer',
    department: 'Veterinary & Animal Health',
    deptKey: 'vet',
    title: 'Veterinary Field Officer (पशुवैद्यकीय क्षेत्र अधिकारी)',
    location: 'Western Maharashtra (Pune, Ahmednagar, Solapur)',
    type: 'Full-time',
    experience: '1 - 4 Years',
    qualification: 'B.V.Sc & A.H / Diploma in Animal Husbandry',
    salary: '₹3,00,000 - ₹5,50,000 PA + Travel & Daily Allowance',
    openings: 3,
    isActive: true,
    responsibilities: [
      'Conduct dairy farm visits to diagnose herd health and milk yield drops',
      'Recommend scientific feeding schedules using Urja Supreme Gold & Malai Plus',
      'Conduct farmer training seminars and calf health awareness camps',
      'Collaborate with local dairy cooperatives and veterinary medical teams'
    ]
  },
  {
    id: 'feed-mill-engineer',
    department: 'Feed Plant & Engineering',
    deptKey: 'plant',
    title: 'Feed Mill Shift In-Charge / Electrical Engineer (फीड मिल ऑपरेटर)',
    location: 'Nirgudsar Feed Plant, Ambegaon, Pune',
    type: 'Full-time',
    experience: '2 - 5 Years',
    qualification: 'Diploma / B.E. (Mechanical / Electrical / Agro Engineering)',
    salary: '₹3,50,000 - ₹6,00,000 PA + Accommodation on-site',
    openings: 2,
    isActive: true,
    responsibilities: [
      'Supervise 150 TPD computerized feed pelleting plant operations',
      'Monitor automated batch weighing, steam boilers, conditioning, and pellet cooling',
      'Conduct preventive maintenance of hammer mills, mixers, and pneumatic lines',
      'Ensure zero plant downtime and compliance with ISO safety protocols'
    ]
  },
  {
    id: 'ec-shed-supervisor',
    department: 'Poultry Farm Operations',
    deptKey: 'poultry',
    title: 'European EC Broiler Shed Supervisor (युरोपियन ईसी शेड सुपरवायझर)',
    location: 'Ambegaon / Junnar / Shirur, Pune',
    type: 'Full-time',
    experience: '1 - 3 Years',
    qualification: 'B.Sc Agriculture / Poultry Science Diploma',
    salary: '₹2,80,000 - ₹4,50,000 PA + Farm Allowance',
    openings: 4,
    isActive: true,
    responsibilities: [
      'Operate automated European climate control, tunnel ventilation, and cooling pads',
      'Oversee automatic pan feeding, nipple drinking lines, and bird biosecurity',
      'Maintain strict FCR standards (1.5 - 1.6) and zero-antibiotic rearing practices',
      'Coordinate bird lifting schedules with Urja logistics and dispatch'
    ]
  },
  {
    id: 'sales-manager-dairy',
    department: 'Sales & Distribution',
    deptKey: 'sales',
    title: 'Territory Sales Executive - Cattle Feed (क्षेत्रीय विक्री प्रतिनिधी)',
    location: 'Solapur / Kolhapur / Sangli / Marathwada',
    type: 'Full-time',
    experience: '2 - 6 Years in Agro / Cattle Feed / Dairy inputs',
    qualification: 'Any Graduate / MBA Marketing / B.Sc Agri',
    salary: '₹3,20,000 - ₹5,80,000 PA + Attractive Sales Incentives',
    openings: 3,
    isActive: true,
    responsibilities: [
      'Expand Urja Pashu Aahar dealer and distributor network in assigned territory',
      'Coordinate with large dairy farmers, milk collection centers, and taluka societies',
      'Drive seasonal sales campaigns for Supreme Gold 5000 and Malai Plus 8000',
      'Track market demand, competitor pricing, and ensure timely dealer collections'
    ]
  },
  {
    id: 'qc-lab-chemist',
    department: 'Quality Assurance (QA/QC)',
    deptKey: 'qa',
    title: 'Quality Assurance & Nutrition Lab Chemist (गुणवत्ता नियंत्रण केमिस्ट)',
    location: 'Nirgudsar Plant, Pune',
    type: 'Full-time',
    experience: '1 - 3 Years',
    qualification: 'B.Sc / M.Sc Chemistry / Food Science / Biochemistry',
    salary: '₹2,60,000 - ₹4,20,000 PA + Plant Benefits',
    openings: 2,
    isActive: true,
    responsibilities: [
      'Conduct proximate analysis of raw materials (maize, soyameal, de-oiled rice bran)',
      'Perform moisture, protein, fiber, fat, and aflatoxin testing of feed samples',
      'Ensure finished pellet durability index (PDI) meets strict Urja benchmark standards',
      'Maintain NABL / ISO calibration records and daily lab test certificates'
    ]
  }
];

// Initialize MySQL Tables
async function initTables() {
  if (!pool) return;

  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS \`products\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`name\` VARCHAR(255) NOT NULL,
      \`marathiName\` VARCHAR(255),
      \`category\` VARCHAR(64) NOT NULL,
      \`categoryName\` VARCHAR(255) NOT NULL,
      \`tag\` VARCHAR(64) DEFAULT '',
      \`badgeColor\` VARCHAR(32) DEFAULT 'emerald',
      \`image\` TEXT,
      \`description\` TEXT,
      \`specs\` JSON,
      \`packaging\` VARCHAR(64) DEFAULT '50 kg Bag',
      \`benefits\` JSON,
      \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_category (\`category\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createJobOpeningsTable = `
    CREATE TABLE IF NOT EXISTS \`job_openings\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`department\` VARCHAR(255),
      \`deptKey\` VARCHAR(64) NOT NULL,
      \`title\` VARCHAR(255) NOT NULL,
      \`location\` VARCHAR(255),
      \`type\` VARCHAR(64) DEFAULT 'Full-time',
      \`experience\` VARCHAR(128),
      \`qualification\` VARCHAR(255),
      \`salary\` VARCHAR(255),
      \`openings\` INT DEFAULT 1,
      \`responsibilities\` JSON,
      \`isActive\` BOOLEAN DEFAULT TRUE,
      \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_deptKey (\`deptKey\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createInquiriesTable = `
    CREATE TABLE IF NOT EXISTS \`inquiries\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`inquiryId\` VARCHAR(64) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`phone\` VARCHAR(64) NOT NULL,
      \`email\` VARCHAR(255) DEFAULT 'N/A',
      \`inquiryType\` VARCHAR(128) DEFAULT 'Feed Inquiry',
      \`location\` VARCHAR(255) DEFAULT 'Maharashtra',
      \`message\` TEXT,
      \`status\` VARCHAR(64) DEFAULT 'New',
      \`notes\` TEXT,
      \`receivedAt\` VARCHAR(64),
      \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_inquiryId (\`inquiryId\`),
      INDEX idx_status (\`status\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createApplicationsTable = `
    CREATE TABLE IF NOT EXISTS \`job_applications\` (
      \`id\` VARCHAR(64) PRIMARY KEY,
      \`applicationId\` VARCHAR(64) NOT NULL,
      \`name\` VARCHAR(255) NOT NULL,
      \`phone\` VARCHAR(64) NOT NULL,
      \`email\` VARCHAR(255) DEFAULT 'N/A',
      \`position\` VARCHAR(255) NOT NULL,
      \`qualification\` VARCHAR(255) DEFAULT 'N/A',
      \`experience\` VARCHAR(128) DEFAULT 'N/A',
      \`location\` VARCHAR(255) DEFAULT 'Maharashtra',
      \`resumeText\` TEXT,
      \`status\` VARCHAR(64) DEFAULT 'Under Review',
      \`hrNotes\` TEXT,
      \`emailAudit\` JSON,
      \`receivedAt\` VARCHAR(64),
      \`createdAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_applicationId (\`applicationId\`),
      INDEX idx_status (\`status\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  await pool.query(createProductsTable);
  await pool.query(createJobOpeningsTable);
  await pool.query(createInquiriesTable);
  await pool.query(createApplicationsTable);
}

// Seed initial data if tables are empty
export async function seedInitialData() {
  if (!pool) return;

  try {
    const [pRows] = await pool.query('SELECT COUNT(*) as cnt FROM `products`');
    if (pRows[0].cnt === 0) {
      console.log('🌱 Seeding initial product catalog into MySQL...');
      for (const p of defaultProducts) {
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
      console.log(`✅ Seeded ${defaultProducts.length} products into MySQL.`);
    }

    const [jRows] = await pool.query('SELECT COUNT(*) as cnt FROM `job_openings`');
    if (jRows[0].cnt === 0) {
      console.log('🌱 Seeding initial career openings into MySQL...');
      for (const j of defaultJobOpenings) {
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
      console.log(`✅ Seeded ${defaultJobOpenings.length} job openings into MySQL.`);
    }
  } catch (err) {
    console.error('⚠️ [MySQL Seeding Error]:', err.message);
  }
}

// Connect to MySQL Database
export async function connectDB() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'urja_foods';

  try {
    console.log(`🔌 Attempting MySQL connection to ${user}@${host}:${port}...`);
    // 1. Ensure database exists
    const initConn = await mysql.createConnection({ host, port, user, password });
    await initConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await initConn.end();

    // 2. Create connection pool
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: 'utf8mb4'
    });

    const testConn = await pool.getConnection();
    testConn.release();
    isConnected = true;

    console.log(`🐬 [MySQL] Successfully connected to database: "${database}" on host: ${host}:${port}`);

    // 3. Initialize tables & seed data
    await initTables();
    await seedInitialData();

    return true;
  } catch (err) {
    isConnected = false;
    console.error(`\n❌ [MySQL] Connection could not be established (${err.message}).`);
    console.error(`   • Ensure MySQL service is running.`);
    console.error(`   • Check DB_USER and DB_PASSWORD in server/.env.\n`);
    return false;
  }
}

// Introspect DB status and table row statistics
export async function getDbStatus() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const database = process.env.DB_NAME || 'urja_foods';

  const status = {
    connected: isConnected,
    state: isConnected ? 'connected' : 'disconnected',
    engine: 'MySQL 8.0',
    database,
    host,
    port,
    collections: {
      inquiries: 0,
      applications: 0,
      products: 0,
      jobOpenings: 0
    }
  };

  if (isConnected && pool) {
    try {
      const [inqRows] = await pool.query('SELECT COUNT(*) as cnt FROM `inquiries`');
      const [appRows] = await pool.query('SELECT COUNT(*) as cnt FROM `job_applications`');
      const [prodRows] = await pool.query('SELECT COUNT(*) as cnt FROM `products`');
      const [jobRows] = await pool.query('SELECT COUNT(*) as cnt FROM `job_openings`');

      status.collections.inquiries = inqRows[0].cnt;
      status.collections.applications = appRows[0].cnt;
      status.collections.products = prodRows[0].cnt;
      status.collections.jobOpenings = jobRows[0].cnt;
    } catch (err) {
      console.error('Error fetching MySQL counts:', err.message);
    }
  }

  return status;
}

export function getPool() {
  return pool;
}
