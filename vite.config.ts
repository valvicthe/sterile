import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Prevent Vite from obscuring Tauri errors
  clearScreen: false,
  // Tauri expects fixed ports on development runtimes
  server: {
    port: 5173,
    strictPort: true,
  },
  // Environment variables Tauri injects
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    // Tauri supports es2021/esnext
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    // Don't minify debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // Generate sourcemaps for debugging production compiles
    sourcemap: !!process.env.TAURI_DEBUG,
  },
});
