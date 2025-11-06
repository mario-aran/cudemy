import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginCheckFile from 'eslint-plugin-check-file';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export const sharedLanguageOptions = {
  ecmaVersion: 2020,
  parserOptions: {
    projectService: true, // "typescript-eslint": enables linting with type information
    tsconfigRootDir: import.meta.dirname, // scoped package: uses "tsconfig.json" from consumer
  },
};

export default defineConfig([
  globalIgnores([
    '**/dist/',
    '**/coverage/',
    '**/migrations/',
    '**/resources/',
    'eslint.config.d.ts', // To avoid usage of "tsconfig.json"
  ]),

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.strictTypeChecked, // "typescript-eslint": strict with type information
      tseslint.configs.stylisticTypeChecked, // "typescript-eslint": stylistic with type information
      eslintConfigPrettier, // Must be placed last to override other configs
    ],
    languageOptions: sharedLanguageOptions,
    plugins: {
      'check-file': eslintPluginCheckFile,
    },
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
              group: ['@/libs/drizzle/schemas/*'],
              message: 'Use "@/libs/drizzle/schemas" instead',
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
      'check-file/folder-naming-convention': [
        'error',
        { '{src,tests}/**': 'KEBAB_CASE' },
      ],
    },
  },

  // "typescript-eslint": disables linting with type information
  { files: ['**/*.{js,jsx}'], extends: [tseslint.configs.disableTypeChecked] },
]);
