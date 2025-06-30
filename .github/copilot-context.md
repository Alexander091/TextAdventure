# .github/copilot-context.md

# GitHub Copilot Project Context

## Monorepo Structure

- **Monorepo managed by [NX](https://nx.dev/)** (see `nx.json`, workspace scripts, and project structure).
- **Workspaces**: `packages/*`, `libs/database`
- **Primary Languages**: TypeScript, Svelte (for UI)
- **Node.js**: >=20.0.0

## Main Applications & Libraries

### Applications (in `packages/`)

- **text-adventure-client-api**: NestJS backend for client
- **text-adventure-editor-api**: NestJS backend for editor
- **text-adventure-client-ui**: Svelte frontend for client
- **text-adventure-editor-ui**: Svelte frontend for editor

### Libraries

- **libs/database**: Shared database logic (likely for both APIs)

## Tooling & Best Practices

- **TypeScript**: All projects use TypeScript, with shared configs (`tsconfig.base.json`)
- **Testing**: Jest for unit tests
- **Linting**: ESLint, Prettier
- **Build Tools**: Vite (for Svelte), Webpack (for APIs), SWC for fast builds
- **Svelte**: Used for UI projects
- **NestJS**: Used for API projects
- **Docker**: Dockerfile(s) and docker-compose for containerization
- **Nx**: Used for orchestration, dependency graph, caching, and consistent scripts

## Scripts (from root `package.json`)

- `start:*`, `build:*`, `test:*` for each app, all routed through `nx`
- Workspaces managed via `workspaces` field

## Best Practices Observed

- **Separation of concerns**: APIs and UIs are separate, with shared libraries for common logic.
- **Consistent tooling**: All projects use the same linting, formatting, and testing tools.
- **Monorepo**: NX enables code sharing, caching, and scalable development.
- **Type safety**: TypeScript everywhere.
- **Containerization**: Docker support for deployment and local dev.

## Recommendations

- Use NX generators for new libs/apps to ensure consistency.
- Keep shared logic in `libs/` for maximum reuse.
- Use NX affected commands for efficient CI/CD.
- Keep dependencies up to date via Nx and Renovate.
- Use environment variables for configuration (12-factor app).
- Use strict TypeScript settings for safety.

---

This context file provides a high-level overview for GitHub Copilot to understand your project structure, tech stack, and best practices, enabling it to generate context-aware code and suggestions.

