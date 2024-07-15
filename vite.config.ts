import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/My-website/",
  server: {
    port: 5174,
    host: true,
  },
});