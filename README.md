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

Add an `.oxlintrc.json` at your project root that extends the shared config. oxlint's `extends` only accepts file paths (not bare specifiers), so reach into `node_modules` directly:

```jsonc
{
    "$schema": "./node_modules/oxlint/configuration_schema.json",
    "extends": ["./node_modules/@apify/oxlint-config/index.json"]
}
```

Run lint:

```bash
npx oxlint --type-aware
```

## What's included

The shared config provides:

- **Plugins** — `typescript`, `import`, `unicorn`, `jest`, `promise`, `react`, `react-hooks` (Rust-side, no install required).
- **Globals** — `vi`, `describe`, `it`, `test`, `expect`, `beforeAll`, `beforeEach`, `afterAll`, `afterEach` (so test files don't need to import from vitest/jest).
- **Rules** — the Apify house rules: `typescript/consistent-type-imports`, `typescript/no-floating-promises`, `unicorn/prefer-node-protocol`, `import/no-default-export`, `unicorn/no-await-in-promise-methods`, plus the curated `off` list of TypeScript strict rules we don't want.
- **Overrides** — relaxed rules for test files, vite/jest/vitest config files, story files, and integration test directories.

## What's NOT included

The shared config intentionally does **not** declare `jsPlugins` (the JS-side plugins like `eslint-plugin-storybook`, `eslint-plugin-cypress`, `eslint-plugin-playwright`, `@tanstack/eslint-plugin-query`). Those carry their own peer dependencies and are project-specific. Add them in your own `.oxlintrc.json` if you need them:

```jsonc
{
    "$schema": "./node_modules/oxlint/configuration_schema.json",
    "extends": ["./node_modules/@apify/oxlint-config/index.json"],
    "jsPlugins": [
        { "name": "storybook", "specifier": "eslint-plugin-storybook" },
        { "name": "playwright", "specifier": "eslint-plugin-playwright" }
    ]
}
```

## Overriding rules

oxlint merges configs from extends-first to consumer-last; the consumer wins. Tighten or loosen a rule in your `.oxlintrc.json`:

```jsonc
{
    "extends": ["./node_modules/@apify/oxlint-config/index.json"],
    "rules": {
        "no-console": "off"
    }
}
```

## License

Apache-2.0
