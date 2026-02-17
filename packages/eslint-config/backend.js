import globals from "globals";
import { config as baseConfig } from "./base.js";

/**
 * A custom ESLint configuration for backend (Node/Bun) applications.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const backendConfig = [
  ...baseConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];

