import { spawnSync } from 'node:child_process';
import { existsSync, cpSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const deploymentRoot = process.cwd();
const result = spawnSync('bun', ['run', 'build'], {
  cwd: appRoot,
  env: { ...process.env, VERCEL: '1' },
  stdio: 'inherit',
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const output = join(appRoot, '.vercel/output');
for (const file of ['config.json', 'static', 'functions/__server.func/index.mjs']) {
  if (!existsSync(join(output, file))) throw new Error(`Missing Vercel build artifact: ${file}`);
}
if (JSON.parse(readFileSync(join(output, 'config.json'), 'utf8')).version !== 3) {
  throw new Error('Expected Vercel Build Output API version 3');
}
if (deploymentRoot !== appRoot) {
  mkdirSync(join(deploymentRoot, '.vercel'), { recursive: true });
  cpSync(output, join(deploymentRoot, '.vercel/output'), { recursive: true });
}
console.log(`Verified Vercel server and static output at ${join(deploymentRoot, '.vercel/output')}`);
