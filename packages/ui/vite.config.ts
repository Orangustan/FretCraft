import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@guitar-st/core": path.resolve(__dirname, "../core/src/index.ts"),
      "@guitar-st/audio-lab": path.resolve(__dirname, "../audio-lab/src/index.ts"),
      "@/": path.resolve(__dirname, "./src/"),
    },
  },
});
