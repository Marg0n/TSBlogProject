import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { 
    languageOptions: { 
      globals: globals.node,// Specifies the global variables, making them read-only as required by the flat config system.
      parser: tsParser, // Sets the parser for TypeScript files to ensure ESLint can parse TypeScript syntax correctly.
    } 
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    ignores: [".node_modules/*", "dist/*"],
    rules: {
      eqeqeq: "error", // Enforce strict equality
      "no-unused-vars": "error",
      "no-unused-expressions": "off", // Disable the original rule
      "@typescript-eslint/no-unused-expressions": "error", // Use TypeScript-specific rule
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
      "no-console": "warn",
      "no-undef": "error",
    },
  },
];