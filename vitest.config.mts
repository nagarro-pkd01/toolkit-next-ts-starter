import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    coverage: {
      exclude: [
        "src/**/*.d.ts",
        "src/app/**/layout.tsx",
        "src/app/**/page.tsx",
      ],
      include: ["src/**/*.{ts,tsx}"],
      provider: "v8",
    },
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      ".next/**",
      "e2e/**",
      "templates/**",
    ],
    include: [
      "src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    pool: "vmThreads",
    setupFiles: ["./vitest.setup.ts"],
  },
});
