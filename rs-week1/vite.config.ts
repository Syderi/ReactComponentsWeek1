/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/ReactComponentsWeek1/react-components',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
