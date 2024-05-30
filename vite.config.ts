// vitest.config.ts
import { defineConfig } from 'vitest/config';
import tailwindcss from 'tailwindcss';
import postcss from 'postcss';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

