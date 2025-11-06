import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import eslintBaseConfig, { sharedLanguageOptions } from './eslint.config';

export default defineConfig([
  {
    extends: [
      eslintBaseConfig,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ...sharedLanguageOptions,
      globals: globals.browser,
    },
  },
]);
