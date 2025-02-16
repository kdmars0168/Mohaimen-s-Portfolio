import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "", // ✅ Ensure base is empty for Vercel
  plugins: [react()],
  build: {
    outDir: "dist", // ✅ Ensure correct output directory
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
