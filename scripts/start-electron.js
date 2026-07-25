import { spawn } from 'child_process';
import http from 'http';

function checkViteReady() {
  http.get('http://localhost:5173', (res) => {
    if (res.statusCode === 200 || res.statusCode === 304) {
      console.log('Vite dev server is ready! Launching Electron...');
      const electronCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
      const electronProcess = spawn(electronCmd, ['electron', '.'], { stdio: 'inherit', shell: true });
      electronProcess.on('close', () => process.exit());
    } else {
      setTimeout(checkViteReady, 500);
    }
  }).on('error', () => {
    setTimeout(checkViteReady, 500);
  });
}

checkViteReady();
