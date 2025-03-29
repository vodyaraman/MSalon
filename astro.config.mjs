import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  integrations: [react()],
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/_mixins.scss" as *;
          @use "@/styles/_variables.scss" as *;
          `
        }
      }
    }
  }
});
