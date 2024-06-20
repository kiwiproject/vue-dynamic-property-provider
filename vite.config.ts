import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

// import typescript2 from "rollup-plugin-typescript2";
// import * as path from "node:path";
// import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [vue(), dts({ tsconfigPath: "tsconfig-build.json" })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      formats: ["es", "cjs"],
      fileName: (format) => `vue-dynamic-property-provider.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["vue", "@headlessui/vue"],
    },
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "src"),
  //   },
  //   extensions: [".vue", ".js", ".mjs", ".ts"],
  // },
});
