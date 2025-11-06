import { defineConfig } from 'eslint/config';
import globals from 'globals';
import eslintBaseConfig, { sharedLanguageOptions } from './eslint.config';

export default defineConfig([
  {
    extends: [eslintBaseConfig],
    languageOptions: {
      ...sharedLanguageOptions,
      globals: globals.node,
    },
  },
]);
