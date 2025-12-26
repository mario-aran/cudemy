# PNPM + Workspace

This template was created manually.

---

## Config files

- [x] .editorconfig
- [x] .gitignore
- [x] .prettierignore | .prettierrc
- [x] docker-compose.yaml
- [x] eslint.config.js
- [x] package.json | pnpm-lock.yaml | pnpm-workspace.yaml
- [x] README.md

## Packages

- [x] "eslint" | "@eslint/js" | "globals" | "typescript-eslint"
  - "eslint-config-prettier"
  - "eslint-plugin-check-file"
  - "eslint-plugin-react-hooks"
  - "eslint-plugin-react-refresh"

- [x] "prettier"
  - "prettier-plugin-tailwindcss"

## Commands

Prepare code

- `pnpm run clean`: Delete files ignored by git
- `pnpm run format:eol`: (Optional) Convert all files to LF
- `pnpm install`: Install dependencies
- `pnpm up --latest -r --interactive`: (Optional) Update dependencies to the last version

Format code

- `pnpm run format`: Run prettier
- `pnpm run lint`: Run eslint
- `pnpm run typecheck`: Run type checker

Start dev

- `pnpm run dev:frontend`: Run frontend in development
- `pnpm run dev:services`: Run all microservices in development

Start prod

- `pnpm run build`: Build all packages
- `pnpm run preview:frontend`: Run frontend in production preview
- `pnpm run start:services`: Run all microservices in production

Install packages

- `pnpm add -w <package_name>`: (Optional) Add package to workspace root
- `pnpm add --workspace <scoped_package_name>`: (Optional) Add scoped package
- `pnpm approve-builds`: (Optional) Approve post-install scripts

## Docs

- [x] "prettier"
- [x] "prettier-plugin-tailwindcss"
  - installation: https://prettier.io/docs/install
  - ".prettierrc": https://prettier.io/docs/configuration
  - ".prettierignore": https://prettier.io/docs/ignore
  - "prettier-plugin-tailwindcss": https://github.com/tailwindlabs/prettier-plugin-tailwindcss#readme

- [x] "eslint" | "@eslint/js" | "globals" | "typescript-eslint"
- [x] "eslint-config-prettier" | "eslint-plugin-check-file" | "eslint-plugin-react-hooks" | "eslint-plugin-react-refresh"
  - installation: https://eslint.org/docs/latest/use/getting-started
  - "eslint.config": https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file
  - "typescript-eslint": https://typescript-eslint.io/getting-started/
  - linting with type information: https://typescript-eslint.io/getting-started/typed-linting/
  - disable type checked: https://typescript-eslint.io/users/configs#disable-type-checked
  - "eslint-config-prettier": https://prettier.io/docs/install#eslint-and-other-linters
  - "eslint-plugin-check-file": https://github.com/dukeluo/eslint-plugin-check-file
  - "eslint-plugin-react-hooks": https://www.npmjs.com/package/eslint-plugin-react-hooks
  - "eslint-plugin-react-refresh": https://www.npmjs.com/package/eslint-plugin-react-refresh

## Notas

- typescript | @types/node | tsx | tsc-alias
- prettier | prettier-plugin-tailwindcss
- typescript-eslint | eslint | @eslint/js | globals
  - eslint-config-prettier
  - eslint-plugin-check-file
  - eslint-plugin-react-hooks
  - eslint-plugin-react-refresh
- vitest | vitest/coverage-v8 | supertest | @types/supertest | testcontainers | @testcontainers/postgresql | @testcontainers/redis
- drizzle-orm | drizzle-kit | pg | @types/pg
- express | @types/express
  - cors | @types/cors
  - dotenv
  - http-status-codes
- swagger-ui-express | @types/swagger-ui-express
- winston | morgan | @types/morgan
- nodemailer | @types/nodemailer
- zod
