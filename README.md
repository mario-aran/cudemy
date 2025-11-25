# PNPM + Workspace

This template was created manually.

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

## Config files

- [x] .editorconfig
- [x] .gitignore
- [x] .prettierignore | .prettierrc
- [x] docker-compose.yaml
- [x] eslint.config.js
- [x] package.json | pnpm-lock.yaml | pnpm-workspace.yaml
- [x] README.md
