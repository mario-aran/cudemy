import eslintConfigNode from '@scope/eslint-config/node';
import eslintConfigReact from '@scope/eslint-config/react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['services/**/*'],
    extends: [eslintConfigNode],
  },
  {
    files: ['frontend/**/*'],
    extends: [eslintConfigReact],
  },
]);
