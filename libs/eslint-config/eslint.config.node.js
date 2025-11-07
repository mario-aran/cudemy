import globals from 'globals';
import eslintBaseConfig, { sharedLanguageOptions } from './eslint.config.js';

export default [
  // Extended configs
  eslintBaseConfig,

  // Settings
  { languageOptions: { ...sharedLanguageOptions, globals: globals.node } },
];
