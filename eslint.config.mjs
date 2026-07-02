import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next (paths updated for the workspace layout):
    "frontend/.next/**",
    "frontend/out/**",
    "frontend/build/**",
    "frontend/next-env.d.ts",
    "graphify-out/**",
  ]),
  {
    settings: {
      // Linting runs from the workspace root where `react` isn't installed;
      // pin the version instead of letting eslint-plugin-react "detect" it.
      react: { version: "19.2" },
    },
    rules: {
      // App Router only — there is no pages/ directory to guard links against.
      "@next/next/no-html-link-for-pages": "off",
      // Allow intentionally-unused params (interface skeletons, deferred providers).
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
]);

export default eslintConfig;
