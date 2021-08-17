import { execSync } from 'child_process';
import fs from 'fs-extra';

execSync('yarn babel index.js --out-dir dist', {
  stdio: 'inherit',
});

fs.copyFileSync('index.js', 'dist/index.mjs');
