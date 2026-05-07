import type { OxlintConfig as RawOxlintConfig } from 'oxlint';

/**
 * Re-aliased {@link RawOxlintConfig} owned by this package. Structurally
 * identical to oxlint's `OxlintConfig`, but living in `@apify/oxlint-config`
 * means TypeScript can write a portable name when emitting inferred types
 * for consumer config files (`export default defineConfig({...})`) instead
 * of chasing back to oxlint via pnpm's `.pnpm/...` resolved path — which
 * trips TS2883 ("inferred type cannot be named portably") in IDEs and
 * `--isolatedDeclarations` builds.
 */
export interface OxlintConfig extends RawOxlintConfig {}

/**
 * Narrow {@link OxlintConfig} so the keys this preset always populates
 * (`plugins`, `overrides`, `rules`, `env`) are non-optional. That lets
 * consumers spread them directly without a non-null assertion.
 */
export type ApifyOxlintConfig = OxlintConfig & {
    plugins: NonNullable<OxlintConfig['plugins']>;
    overrides: NonNullable<OxlintConfig['overrides']>;
    rules: NonNullable<OxlintConfig['rules']>;
    env: NonNullable<OxlintConfig['env']>;
};

/**
 * Wraps oxlint's `defineConfig` to merge a project-local config on top of
 * the Apify preset. Arrays (`plugins`, `overrides`) are concatenated;
 * objects (`rules`, `env`) are shallow-merged with the consumer winning;
 * everything else (`ignorePatterns`, `jsPlugins`, `categories`, …) is
 * passed through unchanged.
 *
 * Returns this package's {@link OxlintConfig} alias rather than oxlint's
 * raw type, so consumers can `export default defineConfig({...})` from a
 * `composite` / `--isolatedDeclarations` TS project (or any IDE that runs
 * the same checks) without TS2883.
 *
 *     import { defineConfig } from '@apify/oxlint-config';
 *
 *     export default defineConfig({
 *         plugins: ['react'],
 *         overrides: [{ files: [...], rules: {...} }],
 *     });
 */
export function defineConfig(overrides?: Partial<OxlintConfig>): OxlintConfig;

declare const config: ApifyOxlintConfig;
export default config;
