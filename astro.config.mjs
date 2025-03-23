import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  }
});
