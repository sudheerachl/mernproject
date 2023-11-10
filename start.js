/*const { exec } = require('child_process');

// Command to start backend
const backendCommand = 'npm start --prefix backend';

// Command to start frontend
const frontendCommand = 'npm run dev --prefix frontend';

console.log('Starting backend and frontend concurrently...');
const process = exec(`concurrently "${backendCommand}" "${frontendCommand}"`);

process.stdout.on('data', (data) => {
  console.log(data);
});

process.stderr.on('data', (data) => {
  console.error(data);
});

process.on('close', (code) => {
  console.log(`Processes exited with code ${code}`);
  // You can add additional handling if needed
});*/
const { spawn } = require('child_process');

const startBackend = spawn('node', ['backend/index.js'], {
  stdio: 'inherit',
});

// Wait for the backend to start before starting the frontend
startBackend.on('ready', () => {
  spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    cwd: 'frontend',
  });
});

startBackend.on('close', (code) => {
  if (code !== 0) {
    console.error('Backend exited with code:', code);
    process.exit(code);
  }
});
