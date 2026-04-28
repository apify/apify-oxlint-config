import { defineConfig as oxlintDefineConfig } from 'oxlint';

/**
 * Shared oxlint preset for Apify projects.
 *
 * Most consumers should call {@link defineConfig} below — it merges the
 * preset with project-local additions and returns a typed `OxlintConfig`,
 * which avoids declaration-emit issues in `composite` TS projects:
 *
 *     import { defineConfig } from '@apify/oxlint-config';
 *
 *     export default defineConfig({
 *         plugins: ['react'],
 *         overrides: [{ files: [...], rules: {...} }],
 *     });
 *
 * The raw preset is still exported as the default if you want to spread
 * manually.
 */
const sharedConfig = {
    plugins: ['typescript', 'import', 'unicorn', 'jest', 'vitest', 'promise'],
    env: {
        node: true,
        browser: true,
        es2022: true,
    },
    rules: {
        'no-console': 'error',
        'no-plusplus': 'off',
        'no-await-in-loop': 'off',
        'no-continue': 'off',
        'no-void': ['error', { allowAsStatement: true }],
        'no-use-before-define': [
            'error',
            { functions: false, classes: true, variables: true, allowNamedExports: false },
        ],
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: { array: false, object: true },
                AssignmentExpression: { array: false, object: false },
            },
            { enforceForRenamedProperties: false },
        ],
        'no-labels': 'error',
        'guard-for-in': 'error',
        'typescript/no-shadow': 'error',
        'no-shadow': 'off',
        'typescript/no-non-null-assertion': 'off',
        'typescript/no-useless-constructor': 'error',
        'no-useless-constructor': 'off',
        'typescript/default-param-last': 'error',
        'default-param-last': 'off',
        'typescript/no-floating-promises': 'error',
        'typescript/await-thenable': 'error',
        'typescript/no-misused-promises': [
            'error',
            { checksVoidReturn: { arguments: false, attributes: false } },
        ],
        'typescript/promise-function-async': 'error',
        'typescript/consistent-type-imports': 'error',
        'typescript/array-type': 'error',
        'typescript/adjacent-overload-signatures': 'error',
        'typescript/no-for-in-array': 'error',
        'typescript/no-implied-eval': 'error',
        'typescript/no-inferrable-types': 'error',
        'typescript/no-confusing-non-null-assertion': 'error',
        'typescript/prefer-includes': 'error',
        'no-unused-vars': 'off',
        'typescript/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', ignoreRestSiblings: true },
        ],
        'typescript/no-empty-function': 'error',
        'no-empty-function': 'off',
        'typescript/consistent-return': 'error',
        'consistent-return': 'off',
        'typescript/dot-notation': 'error',
        'dot-notation': 'off',
        'import/no-default-export': 'error',
        'import/named': 'off',
        'unicorn/prefer-node-protocol': 'error',
        'unicorn/no-await-in-promise-methods': 'error',
        'jest/require-to-throw-message': 'off',
        'jest/prefer-snapshot-hint': 'off',
        // Vitest plugin auto-enables most of its rules at error level. Keep
        // the few that catch real bugs and turn the noisy/opinionated/buggy
        // ones off:
        // - hoisted-apis-on-top: false-positive on `vi.mocked()`, which is
        //   a TypeScript type-helper (not a hoisted API).
        // - require-mock-type-parameters: too aggressive (every .mock() call
        //   would need a type parameter); opt-in per project if desired.
        // - consistent-each-for, warn-todo, require-local-test-context-for-
        //   concurrent-snapshots: opinion / niche.
        // - valid-describe-callback: false-positive on the
        //   `describe(name, options, fn)` API (e.g. `{ retry: 10 }`) — the
        //   rule treats the options object as an invalid second argument.
        // - valid-expect: misfires on chai-style assertions used by Cypress
        //   (`expect(x).to.be.greaterThan(y)`); the vitest plugin has no
        //   notion of chai's `.to.*` modifier chain. Cypress tests live in
        //   the same workspaces as vitest tests, so file-glob scoping isn't
        //   reliable — disable globally.
        'vitest/hoisted-apis-on-top': 'off',
        'vitest/require-mock-type-parameters': 'off',
        'vitest/consistent-each-for': 'off',
        'vitest/warn-todo': 'off',
        'vitest/require-local-test-context-for-concurrent-snapshots': 'off',
        'vitest/valid-describe-callback': 'off',
        'vitest/valid-expect': 'off',
        'typescript/unbound-method': 'off',
        'typescript/restrict-template-expressions': 'off',
        'typescript/no-useless-default-assignment': 'off',
        'typescript/no-duplicate-type-constituents': 'off',
        'typescript/no-redundant-type-constituents': 'off',
        'typescript/no-misused-spread': 'off',
        'typescript/require-array-sort-compare': 'off',
        'typescript/no-base-to-string': 'off',
        'typescript/no-array-delete': 'off',
        'typescript/no-unnecessary-parameter-property-assignment': 'off',
        'typescript/no-meaningless-void-operator': 'off',
        'typescript/restrict-plus-operands': 'off',
        'typescript/no-unsafe-argument': 'off',
        'typescript/no-unsafe-assignment': 'off',
        'typescript/no-unsafe-call': 'off',
        'typescript/no-unsafe-member-access': 'off',
        'typescript/no-unsafe-return': 'off',
        'typescript/prefer-nullish-coalescing': 'off',
        'typescript/prefer-optional-chain': 'off',
        'typescript/strict-boolean-expressions': 'off',
        'unicorn/no-new-array': 'off',
        'unicorn/no-useless-fallback-in-spread': 'off',
        'unicorn/no-useless-spread': 'off',
        'unicorn/no-thenable': 'off',
        'unicorn/prefer-module': 'off',
        'unicorn/filename-case': 'off',
        'promise/no-callback-in-promise': 'off',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'promise/param-names': 'off',
        'promise/no-nesting': 'off',
        'promise/no-promise-in-callback': 'off',
        'promise/no-return-wrap': 'off',
        'promise/prefer-await-to-callbacks': 'off',
        'promise/prefer-await-to-then': 'off',
    },
    overrides: [
        {
            files: ['**/*.spec.*', '**/*.test.*', '**/test/**', '**/tests/**', '**/integration_tests/**'],
            rules: {
                'no-console': 'off',
                'typescript/no-inferrable-types': 'off',
                'typescript/promise-function-async': 'off',
                'typescript/await-thenable': 'off',
                'typescript/no-floating-promises': 'off',
                'typescript/no-misused-promises': 'off',
                'jest/no-disabled-tests': 'error',
                'jest/no-conditional-expect': 'error',
                'jest/no-focused-tests': 'error',
                'jest/valid-expect': 'off',
                'import/no-default-export': 'off',
            },
        },
        {
            files: [
                '**/vite.config*.{ts,mts,js,mjs}',
                '**/vitest.config*.{ts,mts,js,mjs}',
                '**/jest.config*.{js,mjs}',
            ],
            rules: { 'import/no-default-export': 'off' },
        },
        {
            files: ['**/*.stories.{js,jsx,ts,tsx,mjs,cjs}'],
            rules: { 'no-console': 'off', 'import/no-default-export': 'off' },
        },
        {
            files: ['**/integration_tests/**'],
            rules: { 'jest/expect-expect': 'off' },
        },
    ],
};

export default sharedConfig;

/**
 * Wraps oxlint's `defineConfig` to merge a project-local config on top of
 * the Apify preset. Arrays (`plugins`, `overrides`) are concatenated;
 * objects (`rules`, `env`) are shallow-merged with the consumer winning;
 * everything else (`ignorePatterns`, `jsPlugins`, `categories`, …) is
 * passed through unchanged.
 *
 * @param {Partial<import('oxlint').OxlintConfig>} [overrides]
 * @returns {import('oxlint').OxlintConfig}
 */
export function defineConfig(overrides = {}) {
    return oxlintDefineConfig({
        ...sharedConfig,
        ...overrides,
        plugins: overrides.plugins
            ? [...sharedConfig.plugins, ...overrides.plugins]
            : sharedConfig.plugins,
        overrides: overrides.overrides
            ? [...sharedConfig.overrides, ...overrides.overrides]
            : sharedConfig.overrides,
        rules: overrides.rules
            ? { ...sharedConfig.rules, ...overrides.rules }
            : sharedConfig.rules,
        env: overrides.env ? { ...sharedConfig.env, ...overrides.env } : sharedConfig.env,
    });
}
