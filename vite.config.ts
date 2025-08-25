import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteCSSExportPlugin from 'vite-plugin-css-export';
import svgr from "vite-plugin-svgr";

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), ViteCSSExportPlugin(), svgr()],

  // github pages deployment, repo name
  // set the same base in BrowserRouter basename prop
  base: process.env.NODE_ENV === 'production' ? '/async-race/' : '/',
});
