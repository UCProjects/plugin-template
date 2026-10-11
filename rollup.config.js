import { readFileSync } from 'node:fs';
import json from '@rollup/plugin-json';
import { header } from './scripts/header.js';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const meta = header(pkg);
const { name } = pkg;

const metaFile = {
  name: 'meta-file',
  generateBundle() {
    this.emitFile({ type: 'asset', fileName: `${name}.meta.js`, source: `${meta}\n` });
  },
};

export default {
  input: 'src/index.js',
  output: {
    file: `dist/${name}.user.js`,
    format: 'iife',
    banner: meta,
    esModule: false,
  },
  plugins: [json(), metaFile],
};
