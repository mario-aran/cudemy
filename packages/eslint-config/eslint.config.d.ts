// note: This file prevents consumers from seeing the warning "Could not find a declaration file for module"

declare module '@scope/eslint-config/node' {
  const config: import('eslint/config').Config[];
  export default config;
}

declare module '@scope/eslint-config/react' {
  const config: import('eslint/config').Config[];
  export default config;
}
