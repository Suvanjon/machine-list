const fs = require('fs');
const { PNG } = require('pngjs');
const f = process.argv[2];
const png = PNG.sync.read(fs.readFileSync(f));
const w = png.width, h = png.height, d = png.data;
const visited = new Uint8Array(w * h);
const nearWhite = p => d[p * 4] >= 236 && d[p * 4 + 1] >= 236 && d[p * 4 + 2] >= 236;
const stack = [];
const push = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const p = y * w + x;
  if (visited[p]) return;
  visited[p] = 1;
  if (nearWhite(p)) stack.push(p);
};
for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
while (stack.length) {
  const p = stack.pop();
  const x = p % w, y = (p - x) / w;
  push(x + 1, y); push(x - 1, y); push(x, y + 1); push(x, y - 1);
}
for (let p = 0; p < w * h; p++) if (visited[p]) d[p * 4 + 3] = 0;
fs.writeFileSync(f, PNG.sync.write(png));
console.log(f + ' ' + w + 'x' + h + ' transparent');
