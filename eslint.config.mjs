import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated Webflow capture and migration artifacts are preserved verbatim.
    "public/**",
    "migration/**",
    "qa/**",
    // Visual comparison utilities are generated for one-off migration QA.
    "scripts/compare-layout.mjs",
    "scripts/measure-page.mjs",
    "scripts/qa-diff-*.mjs",
  ]),
]);

export default eslintConfig;
