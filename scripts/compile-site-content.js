import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { stripTypeScriptTypes } from 'node:module';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(projectRoot, 'src', 'site-content.ts');
const outputPath = join(projectRoot, 'assets', 'site-content.js');

export function compileSiteContent() {
  const source = readFileSync(sourcePath, 'utf8');
  const compiled = stripTypeScriptTypes(source, { mode: 'strip' });
  writeFileSync(outputPath, compiled);
}
