import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.DEV !== true ? './' : '/',
  build: {
    assetsInlineLimit: 0,
  },
});
