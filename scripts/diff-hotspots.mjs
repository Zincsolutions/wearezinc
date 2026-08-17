import { PNG } from 'pngjs';
import fs from 'node:fs';
const f = process.argv[2];
const png = PNG.sync.read(fs.readFileSync(f));
const { width, height, data } = png;
// pixelmatch writes diff pixels in red-ish; count non-transparent-notgray pixels per 100px band
const BAND = 100;
const bands = new Array(Math.ceil(height / BAND)).fill(0);
for (let y = 0; y < height; y++) {
  let rowCount = 0;
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (r > 200 && g < 100 && b < 100) rowCount++;  // red diff marker
  }
  bands[Math.floor(y / BAND)] += rowCount;
}
const total = bands.reduce((a, b) => a + b, 0);
console.log('total red diff pixels:', total);
const ranked = bands.map((v, i) => [i * BAND, v]).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
console.log('top hotspot bands (y-start, diff-pixels, % of total):');
for (const [y, v] of ranked.slice(0, 15)) {
  console.log(`  y=${String(y).padStart(6)}  ${String(v).padStart(8)}  ${((v / total) * 100).toFixed(1)}%`);
}
