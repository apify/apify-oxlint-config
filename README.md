# apify-oxlint-config

Shared [oxlint](https://oxc.rs) configuration used across [Apify](https://apify.com/) projects. Mirrors the rule set of [`@apify/eslint-config`](https://github.com/apify/apify-eslint-config) for projects that have migrated from ESLint to oxlint.

## How to add to your project

Install the packages as dev dependencies:

```bash
npm install --save-dev @apify/oxlint-config oxlint
```

If you want type-aware rules (`typescript/no-floating-promises`, `typescript/await-thenable`, ...) also install:

```bash
npm install --save-dev oxlint-tsgolint
```

Add an `oxlint.config.ts` (or `.js`/`.mjs`) at your project root and spread the preset into it:

```ts
import { defineConfig } from 'oxlint';
import sharedConfig from '@apify/oxlint-config';

export default defineConfig({
    ...sharedConfig,
    // local plugin additions, e.g. for React projects:
    plugins: [...sharedConfig.plugins, 'react'],
    overrides: [
        ...sharedConfig.overrides,
        // local overrides
    ],
});
```

Run lint:

```bash
npx oxlint --type-aware
```

## What's included

The shared config provides:

- **Plugins** — `typescript`, `import`, `unicorn`, `jest`, `promise` (Rust-side, no install required). React plugins are intentionally **not** included; consumers add `'react'` to `plugins` if their project uses React. (Note: oxlint's `react` plugin already covers React Hooks rules; there's no separate `react-hooks` plugin.)
- **Rules** — the Apify house rules: `typescript/consistent-type-imports`, `typescript/no-floating-promises`, `unicorn/prefer-node-protocol`, `import/no-default-export`, `unicorn/no-await-in-promise-methods`, plus the curated `off` list of TypeScript strict rules we don't want.
- **Overrides** — relaxed rules for test files, vite/jest/vitest config files, story files, and integration test directories.

Test framework helpers (`describe`, `it`, `expect`, `vi`, ...) are intentionally **not** declared as globals — test files should import them directly from `vitest`/`@jest/globals` so editors, type-checkers and linters agree on what's in scope.

## What's NOT included

The shared config does **not** declare `jsPlugins` (the JS-side plugins like `eslint-plugin-storybook`, `eslint-plugin-cypress`, `eslint-plugin-playwright`, `@tanstack/eslint-plugin-query`). Those carry their own peer dependencies and are project-specific. Add them in your own config:

```ts
export default defineConfig({
    ...sharedConfig,
    jsPlugins: [
        { name: 'storybook', specifier: 'eslint-plugin-storybook' },
        { name: 'playwright', specifier: 'eslint-plugin-playwright' },
    ],
});
```

## Overriding rules

Spread the preset and add your own `rules` block — yours win over the preset:

```ts
export default defineConfig({
    ...sharedConfig,
    rules: {
        ...sharedConfig.rules,
        'no-console': 'off',
    },
});
```

## License

Apache-2.0
