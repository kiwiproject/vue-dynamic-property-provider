import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import typescript2 from "rollup-plugin-typescript2";
import * as path from "node:path";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [
    vue(),
    eslint(),
    dts({
      insertTypesEntry: true,
    }),
    typescript2({
      check: false,
      include: ["src/components/**/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          outDir: "dist",
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
      },
      exclude: ["vite.config.ts"],
    }),
  ],
  build: {
    lib: {
      entry: "src/components/index.ts",
      name: "DynamicPropertyField",
      formats: ["es", "cjs", "umd"],
      fileName: (format) => `dynamic-property-provider.${format}.js`,
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      input: {
        main: path.resolve(__dirname, "src/components/main.ts"),
      },
      external: ["vue", "@headlessui/vue"],
      output: {
        exports: "named",
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".vue", ".js", ".mjs", ".ts"],
  },
});
