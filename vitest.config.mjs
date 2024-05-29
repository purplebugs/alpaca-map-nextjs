import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    alias: {
      // Ref: https://vitest.dev/guide/common-errors#cannot-find-module-relative-path
      "@/api/": new URL("./src/app/api/", import.meta.url).pathname,
      "@/functions/": new URL("./src/functions/", import.meta.url).pathname,
    },
  },
});
