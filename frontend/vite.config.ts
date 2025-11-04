import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access outside the docker container
    watch: {
      usePolling: true, // Enables watch mode inside the docker container
    },
  },
});
