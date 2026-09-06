/**
 * Builds the standalone viewer as one self-contained IIFE, three.js included.
 *
 * The published artifact runs under a CSP that admits scripts from a short list of CDNs and
 * nothing else, so the page carries its own code rather than fetching it. Bundling three.js
 * in costs about 600 kB of inline text, which is nothing against the 16 MB budget and removes
 * every runtime dependency.
 */

import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/artifact/main.ts',
      formats: ['iife'],
      name: 'MmaFightViewer',
      fileName: () => 'viewer.js',
    },
    outDir: 'dist-artifact',
    emptyOutDir: true,
    target: 'es2020',
  },
});
