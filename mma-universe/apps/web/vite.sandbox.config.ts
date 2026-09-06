/** Builds the fight lab: the whole simulation plus the renderer, as one self-contained page. */
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: { entry: 'src/sandbox/main.ts', formats: ['iife'], name: 'FightLab', fileName: () => 'lab.js' },
    outDir: 'dist-sandbox',
    emptyOutDir: true,
    target: 'es2020',
  },
});
