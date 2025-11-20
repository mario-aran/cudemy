## Instructions

Prepare code

- `pnpm run clean`: Delete git ignored files
- `pnpm install`: Install dependencies
- `pnpm approve-builds`: (Optional) Approve post-install scripts
- `pnpm up --latest -r --interactive`: (Optional) Update dependencies to the last version
- `pnpm add -w <package_name>`: (Optional) Add package to workspace root
- `pnpm add --workspace <scoped_package_name>`: (Optional) Add scoped package

Format code

- `pnpm run format`: Run prettier
- `pnpm run lint`: Run eslint
- `pnpm run typecheck`: Run type checker

Start

- `pnpm run dev`: Run application in development and watch mode
