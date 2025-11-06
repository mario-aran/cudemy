// note: This file prevents the consumer from seeing "Could not find a declaration file for module"

import { Config } from 'eslint/config';

declare module '@scope/eslint-config/node' {
  const config: Config[];
  export default config;
}

declare module '@scope/eslint-config/react' {
  const config: Config[];
  export default config;
}
