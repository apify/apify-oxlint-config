import type { OxlintConfig } from 'oxlint';

/**
 * Narrow {@link OxlintConfig} so the keys this preset always populates
 * (`plugins`, `overrides`, `rules`, `env`) are non-optional. That lets
 * consumers spread them directly without a non-null assertion:
 *
 *     export default defineConfig({
 *         ...sharedConfig,
 *         plugins: [...sharedConfig.plugins, 'react'],
 *         overrides: [...sharedConfig.overrides, { ... }],
 *     });
 */
export type ApifyOxlintConfig = OxlintConfig & {
    plugins: NonNullable<OxlintConfig['plugins']>;
    overrides: NonNullable<OxlintConfig['overrides']>;
    rules: NonNullable<OxlintConfig['rules']>;
    env: NonNullable<OxlintConfig['env']>;
};

declare const config: ApifyOxlintConfig;
export default config;
