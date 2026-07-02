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
  // Layering enforcement — AGENTS.md "File organization rules". These keep the
  // frontend/backend boundary intact no matter which tool or session writes code.
  {
    files: ["frontend/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../backend/*", "../../backend/*", "../../../backend/*", "../../../../backend/*"],
              message: "Import backend code via the @backend/* alias, not relative paths.",
            },
            {
              group: [
                "@backend/repositories/mock-data",
                "@backend/repositories/mock-data/*",
                "@backend/repositories/*/mock",
                "@backend/services/*/mock",
              ],
              message:
                "UI talks only to service/repository interfaces — never mock data or mock implementations directly (AGENTS.md).",
            },
            {
              group: ["@backend/services/payment/razorpay", "@backend/services/shipping/shiprocket"],
              message:
                "Vendor providers stay behind the service interface + feature flag — import the service index instead.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["backend/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "@backend/*"],
              message: "The backend package uses relative imports only (path aliases are frontend tsconfig constructs).",
            },
            {
              group: ["*frontend*"],
              message: "The backend never imports from the frontend.",
            },
          ],
        },
      ],
    },
  },
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
