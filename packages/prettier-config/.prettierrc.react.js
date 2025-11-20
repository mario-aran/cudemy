import prettierBaseConfig from './.prettierrc.js';

export default {
  // Extended configs
  ...prettierBaseConfig,

  // Settings
  plugins: ['prettier-plugin-tailwindcss'],
};
