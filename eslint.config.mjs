import jslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import tslint from "typescript-eslint";

export default [
  jslint.configs.recommended,
  ...tslint.configs.recommended,
  ...astro.configs.recommended,
  {
    ignores: [".dist/*", "**/*.d.ts"],
  },
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
];
