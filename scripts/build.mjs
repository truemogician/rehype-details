import { execSync } from 'child_process';
import fs from 'fs-extra';

execSync('tsc', { stdio: 'inherit' });
execSync('yarn babel index.js --out-dir dist', { stdio: 'inherit' });
fs.copyFileSync('index.js', 'dist/index.mjs');
fs.renameSync('dist/index.js', 'dist/index.cjs');
