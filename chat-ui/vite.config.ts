import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext',
    lib: {
      entry: 'src/MyButton.ts',
      formats: ['es'],
      fileName: 'my-lit-button',
    },
    rollupOptions: {
      external: /^lit/,
    }
  }
});
