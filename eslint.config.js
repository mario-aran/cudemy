import eslintConfigNode from '@scope/eslint-config/node';
import eslintConfigReact from '@scope/eslint-config/react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['frontend/**/*'],
    extends: [eslintConfigReact],
  },
  {
    files: ['{services,packages}/**/*'],
    extends: [eslintConfigNode],
  },
]);
