// Simple test script to check if the build works
const { execSync } = require('child_process');

console.log('Testing Next.js build...');

try {
  // Run the build command
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}