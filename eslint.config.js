/* docs:
- setup: https://eslint.org/docs/latest/use/getting-started
- eslint.config.js: https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file
- "typescript-eslint": https://typescript-eslint.io/getting-started/
- linting with type information: https://typescript-eslint.io/getting-started/typed-linting/
- disable type checked: https://typescript-eslint.io/users/configs#disable-type-checked
*/

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// ---------------------------
// VALUES
// ---------------------------

const baseLanguageOptions = {
  ecmaVersion: 2020,
  parserOptions: {
    projectService: true, // "typescript-eslint": Enables linting with type information
  },
};

const eslintConfigBase = defineConfig([
  globalIgnores([
    '**/dist/',
    '**/coverage/',
    '**/migrations/',
    '**/resources/',
    '**/shadcn/ui/',
  ]),

  // Extended configs
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked, // Strict with type information
  tseslint.configs.stylisticTypeChecked, // Stylistic with type information

  // Settings
  {
    plugins: { 'check-file': checkFile },
    rules: {
      // "eslint"
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['..', '../**', 'src/*', 'tests/*'],
              message: 'Use a path alias instead',
            },
            {
              group: ['@/lib/drizzle/schemas/*'],
              message: 'Use "@/lib/drizzle/schemas" instead',
            },
          ],
        },
      ],

      // "typescript-eslint"
      '@typescript-eslint/no-floating-promises': 'error',

      // "eslint-plugin-check-file"
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.ts': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { '**/': 'KEBAB_CASE' }],
    },
  },

  eslintConfigPrettier, // Must be placed last to override other configs
]);

// ---------------------------
// ENTRYPOINT
// ---------------------------

export default defineConfig([
  // Configs
  {
    files: ['**/*', 'eslint.config.js'],
    ignores: ['frontend/**/*'],
    extends: [eslintConfigBase],
    languageOptions: { ...baseLanguageOptions, globals: globals.node },
  },
  {
    files: ['frontend/**/*'],
    extends: [
      eslintConfigBase,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: { ...baseLanguageOptions, globals: globals.browser },
  },

  // Overrides
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    extends: [tseslint.configs.disableTypeChecked], // Disables linting with type information
  },
]);
