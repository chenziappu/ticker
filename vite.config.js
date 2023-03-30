import { defineConfig } from "vite";
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/Ticker.js'),
      name: 'Ticker',
      fileName: 'ticker'
    }
  }
})