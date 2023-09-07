import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), basicSsl()],
  resolve: {
    alias: {
      "@": path.join(__dirname, "./src/"),
      components: path.join(__dirname, "./src/shared/components/"),
      pages: path.join(__dirname, "./src/pages/"),
      hooks: path.join(__dirname, "./src/shared/hooks/"),
      utils: path.join(__dirname, "./src/shared/utils/"),
    },
  },
});