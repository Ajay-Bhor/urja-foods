import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicImagesDir = path.resolve(__dirname, '../public/images');
if (!fs.existsSync(publicImagesDir)) {
  fs.mkdirSync(publicImagesDir, { recursive: true });
}

const images = [
  {
    name: 'businesses-hero.jpg',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=80',
  },
  {
    name: 'biz-poultry.jpg',
    url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'biz-nutrition.jpg',
    url: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'biz-chicken.jpg',
    url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'biz-organic.jpg',
    url: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'biz-soya.jpg',
    url: 'https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'biz-landscape.jpg',
    url: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
  },
];

async function downloadAll() {
  for (const img of images) {
    const dest = path.join(publicImagesDir, img.name);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already exists: ${img.name}`);
      continue;
    }
    try {
      console.log(`Downloading: ${img.name}...`);
      const res = await fetch(img.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved: ${img.name} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${img.name}:`, err.message);
    }
  }
}

downloadAll();
