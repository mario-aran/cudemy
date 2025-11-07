import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import eslintBaseConfig, { sharedLanguageOptions } from './eslint.config.js';

export default [
  // Extended configs
  eslintBaseConfig,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,

  // Settings
  { languageOptions: { ...sharedLanguageOptions, globals: globals.browser } },
];
