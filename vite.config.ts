import { resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";


export default defineConfig({
  plugins: [tailwindcss(), vue()],
  build: {
    commonjsOptions: {
      include: ["node_modules/**"]
    },
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `vue-dynamic-property-provider.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["vue"],
    },
  },
});
