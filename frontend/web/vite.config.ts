/* docs:
- install: https://vite.dev/guide/#scaffolding-your-first-vite-project
- using env in config: https://vite.dev/config/#using-environment-variables-in-config
*/

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the
  // `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), ''); // process.cwd requires "@types/node"

  // Vite config
  return {
    plugins: [
      react(), // "@vitejs/plugin-react-swc": Babel replacement for faster compilation
      tailwindcss(), // "tailwindcss" for vite
    ],
    server: { port: Number(env.VITE_PORT) || 5173 },
    resolve: {
      // Path aliases
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
