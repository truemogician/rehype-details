import { execSync } from 'child_process';
import fs from 'fs-extra';

execSync('tsc', { stdio: 'inherit' });
const cjs = 'lib/index.cjs';
if (fs.existsSync(cjs))
	fs.removeSync(cjs)
execSync(`yarn babel index.js -o ${cjs}`, { stdio: 'inherit' });
fs.moveSync("index.d.ts", "lib/index.d.ts");
fs.moveSync('index.js', "lib/index.js");
