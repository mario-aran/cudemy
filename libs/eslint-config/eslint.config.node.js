import { defineConfig } from 'eslint/config';
import globals from 'globals';
import eslintBaseConfig, { sharedLanguageOptions } from './eslint.config.js';

export default defineConfig([
  // Extended configs
  eslintBaseConfig,

  // Settings
  { languageOptions: { ...sharedLanguageOptions, globals: globals.node } },
]);
