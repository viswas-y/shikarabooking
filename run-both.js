const { spawn } = require('child_process');
const path = require('path');

console.log('========================================================');
console.log('🛥️  Starting Sithara Shikara CMS & Website concurrently...');
console.log('   CMS (Admin + API): http://localhost:5000');
console.log('   Website:           http://localhost:3000');
console.log('========================================================\n');

// Start CMS
const cmsProcess = spawn('npm', ['start'], {
  cwd: path.join(__dirname, 'cms'),
  shell: true,
  stdio: 'inherit'
});

// Start Website
const websiteProcess = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'website'),
  shell: true,
  stdio: 'inherit'
});

function handleExit() {
  try { cmsProcess.kill(); } catch (_) {}
  try { websiteProcess.kill(); } catch (_) {}
  process.exit(0);
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
