import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';
export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls: false } })], resolve: { dedupe: ['vue'] },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    outDir: '../ui-dist', emptyOutDir: true,
    lib: { entry: fileURLToPath(new URL('./src/main.js', import.meta.url)), formats: ['es'], fileName: () => 'workbench.js', cssFileName: 'workbench' },
    target: 'es2020', minify: true
  }
});
