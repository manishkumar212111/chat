import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig({
  plugins: [
    cssInjectedByJsPlugin(),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        app: './src/main.jsx',
      },
    },
  },
  base: 'https://cdn.jsdelivr.net/gh/manish7297/chat/chat/dist/'
})