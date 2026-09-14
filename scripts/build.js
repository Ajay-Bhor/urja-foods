const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌾 Starting Urja Foods Production Build Pipeline...');

const rootDir = path.resolve(__dirname, '..');
const clientDir = path.join(rootDir, 'client');
const clientDist = path.join(clientDir, 'dist');
const rootDist = path.join(rootDir, 'dist');

try {
  // Step 1: Ensure client dependencies are installed
  console.log('📦 Checking and installing client dependencies...');
  execSync('npm --prefix client install', {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env
  });

  // Step 2: Build client Vite app
  console.log('⚡ Building Vite frontend bundle...');
  execSync('npm --prefix client run build', {
    cwd: rootDir,
    stdio: 'inherit',
    env: process.env
  });

  // Step 3: Copy client/dist to root /dist for host compatibility (Cloudflare Pages, Vercel, Netlify)
  if (fs.existsSync(clientDist)) {
    console.log('📂 Mirroring build output to root ./dist directory...');
    if (fs.existsSync(rootDist)) {
      fs.rmSync(rootDist, { recursive: true, force: true });
    }
    fs.cpSync(clientDist, rootDist, { recursive: true });
    console.log('✅ Output successfully generated at:');
    console.log('   - ' + clientDist);
    console.log('   - ' + rootDist);
  }

  console.log('🎉 Urja Foods build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
