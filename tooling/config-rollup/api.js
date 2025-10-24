const { buildJS, buildDTS } = require('./base');

module.exports = [
  buildJS('cjs', 'src/index.ts', 'dist/cjs'),
  buildJS('esm', 'src/index.ts', 'dist/esm'),
  buildDTS('cjs', 'src/index.ts', 'dist/cjs'),
  buildDTS('esm', 'src/index.ts', 'dist/esm'),
];
