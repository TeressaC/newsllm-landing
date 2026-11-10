import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileSiteContent } from './scripts/compile-site-content.js';

const projectRoot = dirname(fileURLToPath(import.meta.url));
const outputRoot = join(projectRoot, 'dist');
const pageFiles = ['index.html', 'zh.html', 'styles.css', 'main.js'];
const carbonIcons = [
  'policy', 'group', 'chart--column', 'user--multiple', 'network--public',
  'earth', 'book', 'health-cross', 'globe', 'arrow--right', 'arrow--left',
  'arrow--up-right', 'arrow--down-right', 'add', 'subtract', 'close',
  'menu', 'checkmark', 'search'
];

compileSiteContent();
rmSync(outputRoot, { recursive: true, force: true });
mkdirSync(outputRoot, { recursive: true });
pageFiles.forEach(file => cpSync(join(projectRoot, file), join(outputRoot, file)));
if (existsSync(join(projectRoot, 'assets'))) {
  cpSync(join(projectRoot, 'assets'), join(outputRoot, 'assets'), { recursive: true });
}
const iconOutput = join(outputRoot, 'assets', 'carbon');
mkdirSync(iconOutput, { recursive: true });
carbonIcons.forEach(icon => {
  cpSync(
    join(projectRoot, 'node_modules', '@carbon', 'icons', 'svg', '32', `${icon}.svg`),
    join(iconOutput, `${icon}.svg`)
  );
});
console.log('已建立 dist/ 靜態網站。');
