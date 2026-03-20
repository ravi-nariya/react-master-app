# Master React App

A production-ready React + TypeScript application scaffold built with Vite.

This project demonstrates a practical frontend baseline with:

- Redux Toolkit + Redux Saga state management
- Persistent store with redux-persist
- Internationalization via i18next (English and Hindi)
- Unit, accessibility, and end-to-end testing
- Storybook component documentation
- Optional OpenTelemetry tracing for browser observability
- Security-conscious defaults in Vite headers and linting

## Tech Stack

- React 19
- TypeScript 5
- Vite 8
- Redux Toolkit, Redux Saga, redux-persist
- i18next + react-i18next
- Jest + React Testing Library + jest-axe
- Playwright + axe-core/playwright
- Storybook 10
- ESLint 9 (React hooks, a11y, and security plugins)
- OpenTelemetry Web SDK

## Features

- Counter workflow with sync + saga-driven updates
- Language switching in UI (EN / HI)
- Reusable design-system style components (`Button`, `Text`, `Icon`)
- Alias-based imports (`@`, `@components`, `@view`, etc.)
- Security headers for dev server and preview server
- Profiling toggle for React Profiler

## Project Structure

```text
master-react-app/
  src/
    config/            # Runtime app configuration (env parsing and guards)
    locales/           # Translation resources
    store/             # Redux store, reducers, sagas, feature slices
    test/              # Jest setup and test utilities/mocks
    theme/             # Shared design tokens and CSS foundations
    view/components/   # Reusable UI components + stories + tests
    App.tsx            # Main feature page (counter + language controls)
    i18n.ts            # i18next initialization
    telemetry.ts       # OpenTelemetry bootstrapping
    main.tsx           # App bootstrap (Provider, PersistGate, optional Profiler)
  tests/e2e/           # Playwright E2E and a11y specs
  .storybook/          # Storybook configuration
  eslint.config.js     # Lint rules with a11y and security checks
  jest.config.cjs      # Unit test configuration
  playwright.config.ts # E2E configuration
  vite.config.ts       # Build/dev configuration and server security headers
```

## Prerequisites

- Node.js 20+
- npm 10+

## Quick Start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Environment Variables

Mode-specific files are already present:

- `.env.development`
- `.env.production`

Variables used by the app:

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_APP_ENV` | Yes | App environment (`development`, `production`, `test`) |
| `VITE_API_BASE_URL` | Yes | Base URL for backend API calls |
| `VITE_ENABLE_REACT_PROFILER` | No | Enables runtime React profiling outside dev |
| `VITE_ENABLE_OTEL` | No | Enables OpenTelemetry initialization when `true` |
| `VITE_OTEL_SERVICE_NAME` | No | Service name attached to traces |
| `VITE_OTEL_EXPORTER_OTLP_ENDPOINT` | No | OTLP HTTP traces endpoint |

Important:

- `src/config/appConfig.ts` enforces required environment variables.
- Prefer `appConfig` over direct `import.meta.env` usage in feature code.

## Available Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts Vite dev server |
| `npm run build` | Type-checks and builds production bundle |
| `npm run preview` | Serves built app locally |
| `npm run lint` | Runs ESLint across the repo |
| `npm run lint:fix` | Auto-fixes lint issues where possible |
| `npm run test` | Runs Jest test suite |
| `npm run test:watch` | Runs Jest in watch mode |
| `npm run test:coverage` | Runs Jest with coverage output |
| `npm run test:e2e` | Runs Playwright end-to-end tests |
| `npm run test:e2e:ui` | Opens Playwright UI mode |
| `npm run storybook` | Starts Storybook on port 6006 |
| `npm run build-storybook` | Builds static Storybook |
| `npm run audit:check` | Runs npm audit (moderate+ threshold) |
| `npm run audit:ci` | Runs audit-ci for CI security checks |
| `npm run security:check` | Runs audit check + lint |

## Testing Strategy

This repository uses three quality layers:

1. Unit and component tests (Jest + Testing Library)
2. Accessibility checks in unit tests (jest-axe)
3. Browser-level and a11y E2E tests (Playwright + axe-core)

Run all core checks locally:

```bash
npm run lint
npm run test:coverage
npm run test:e2e
```

To view the latest Playwright HTML report:

```bash
npx playwright show-report --host 127.0.0.1 --port 9324
```

## Storybook

Storybook is configured with:

- `@storybook/addon-a11y`
- `@storybook/addon-docs`

Start it with:

```bash
npm run storybook
```

## Security and Code Quality

The project includes multiple safeguards:

- Vite security headers (`CSP frame-ancestors`, `X-Frame-Options`, `X-Content-Type-Options`, etc.)
- ESLint security plugin rules
- Accessibility linting via `eslint-plugin-jsx-a11y`
- Husky pre-commit hook running:
  - `lint-staged` (ESLint fix + TypeScript check on staged files)
  - `npm audit --audit-level=moderate`

## Observability

OpenTelemetry browser instrumentation is available in `src/telemetry.ts` and initialized in `src/main.tsx`.

When `VITE_ENABLE_OTEL=true`, the app:

- Instruments document load, fetch, and XHR
- Exports traces to OTLP endpoint if configured
- Falls back to console span exporter when endpoint is missing/unavailable

## Best Practices for Contributors

Follow this workflow before opening a PR:

1. Keep components and hooks focused on a single responsibility.
2. Avoid `any`; use strict TypeScript types and narrowing.
3. Validate all external inputs and treat API responses as untrusted.
4. Prefer semantic HTML and keyboard-accessible interactions.
5. Add or update tests for every behavior change and bug fix.
6. Run `npm run lint`, `npm run test:coverage`, and `npm run test:e2e` locally.
7. Avoid secrets in code; use environment variables.

## Troubleshooting

### App fails at startup with missing env error

`src/config/appConfig.ts` throws if required env variables are absent. Ensure your `.env.development` or `.env.production` contains valid values.

### Playwright cannot connect to dev server

Ensure no process is already using port `5173`, then rerun `npm run test:e2e`.

### OTLP export not working

Verify:

- `VITE_ENABLE_OTEL=true`
- `VITE_OTEL_EXPORTER_OTLP_ENDPOINT` points to a reachable OTLP HTTP traces endpoint

## License

No license file is currently present in this repository.
