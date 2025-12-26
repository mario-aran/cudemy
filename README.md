# PNPM + Workspace

This template was created manually.

---

## Config files

- .editorconfig
- .gitignore
- .prettierignore | .prettierrc
- docker-compose.yaml
- eslint.config.js
- package.json | pnpm-lock.yaml | pnpm-workspace.yaml
- README.md

## Packages

- "eslint" | "@eslint/js" | "globals" | "typescript-eslint"
  - "eslint-config-prettier"
  - "eslint-plugin-check-file"
  - "eslint-plugin-react-hooks"
  - "eslint-plugin-react-refresh"
- "prettier"
  - "prettier-plugin-tailwindcss"

## Docs

Prettier

- installation: https://prettier.io/docs/install
- .prettierrc: https://prettier.io/docs/configuration
- .prettierignore: https://prettier.io/docs/ignore

---

## Commands

Helpers

- `pnpm run clean`: Delete files ignored by git
- `pnpm run format:eol`: Convert all files to LF
- `pnpm install`: Install dependencies
- `pnpm approve-builds`: Approve post-install scripts
- `pnpm up --latest -r --interactive`: Update dependencies to the last version
- `pnpm add -w <package_name>`: Add package to workspace root
- `pnpm add --workspace <scoped_package_name>`: Add scoped package

Format code

- `pnpm run format`: Run prettier
- `pnpm run lint`: Run eslint
- `pnpm run typecheck`: Run type checker

Start dev

- `pnpm run dev:frontend`: Run frontends in development
- `pnpm run dev:services`: Run microservices in development

Start prod

- `pnpm run build`: Build all
- `pnpm run preview:frontend`: Run frontends in preview
- `pnpm run start:services`: Run microservices in production
