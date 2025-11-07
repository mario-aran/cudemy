import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import checkFile from 'eslint-plugin-check-file';
import { globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

export const sharedLanguageOptions = {
  ecmaVersion: 2020,
  parserOptions: {
    projectService: true, // "typescript-eslint": Enables linting with type information
    tsconfigRootDir: import.meta.dirname, // Scoped package: Forces use of consumer's "tsconfig.json"
  },
};

export const eslintBaseConfig = [
  // ---------------------------
  // IGNORES
  // ---------------------------

  globalIgnores([
    '**/dist/',
    '**/coverage/',
    '**/migrations/',
    '**/resources/',
  ]),

  // ---------------------------
  // EXTENDED CONFIGS
  // ---------------------------

  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked, // "typescript-eslint": Strict with type information
  tseslint.configs.stylisticTypeChecked, // "typescript-eslint": Stylistic with type information

  // ---------------------------
  // SETTINGS
  // ---------------------------

  {
    languageOptions: sharedLanguageOptions,
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

  // ---------------------------
  // OVERRIDES
  // ---------------------------

  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    extends: [
      tseslint.configs.disableTypeChecked, // "typescript-eslint": Disables linting with type information
    ],
  },

  // ---------------------------
  // ESLINT-CONFIG-PRETTIER
  // ---------------------------

  eslintConfigPrettier, // Must be placed last to override other configs
];
