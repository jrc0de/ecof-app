import legacy from "@vitejs/plugin-legacy"
import vue from "@vitejs/plugin-vue"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      "@": new URL("./src", import.meta.url).pathname,
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
})
