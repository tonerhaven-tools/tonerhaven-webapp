import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";
import generouted from "@generouted/solid-router/plugin";

export default defineConfig({
  plugins: [react(), generouted(), basicSsl()],
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
