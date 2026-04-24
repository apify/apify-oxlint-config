import type { OxlintConfig } from 'oxlint';

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
 * Returns `OxlintConfig` (not the narrower `ApifyOxlintConfig`), which is
 * re-exported from oxlint, so default-exporting the result is safe under
 * `composite` / `--isolatedDeclarations` TypeScript projects.
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
