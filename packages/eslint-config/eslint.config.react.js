import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { eslintBaseConfig, sharedLanguageOptions } from './eslint.config.js';

export default defineConfig([
  // Extended configs
  eslintBaseConfig,
  reactHooks.configs.flat['recommended-latest'],
  reactRefresh.configs.vite,

  // Settings
  { languageOptions: { ...sharedLanguageOptions, globals: globals.browser } },
]);
