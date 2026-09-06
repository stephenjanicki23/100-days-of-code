/** Builds the portrait stand — a development harness, never shipped with the viewer. */
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: { entry: 'src/portrait/main.ts', formats: ['iife'], name: 'Portrait', fileName: () => 'portrait.js' },
    outDir: 'dist-portrait',
    emptyOutDir: true,
    target: 'es2020',
  },
});
