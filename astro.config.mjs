// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://przemek-kepka.com',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [vue(), sitemap()]
});