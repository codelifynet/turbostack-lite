/**
 * Security-related constants.
 */
export const BLOCKED_PATH_PATTERNS: readonly RegExp[] = [
  /^\/\.env/,
  /^\/\.git/,
  /^\/\.vscode/,
  /^\/node_modules/,
  /^\/package\.json/,
  /^\/package-lock\.json/,
  /^\/bun\.lockb/,
  /^\/yarn\.lock/,
  /^\/pnpm-lock\.yaml/,
  /^\/tsconfig/,
  /^\/@vite/,
  /^\/actutor/, // Common typo of actuator
  /^\/actuator/,
  /^\/debug/,
  /\/\.env$/,
  /\/\.git\//,
  /\/config\.json$/,
  /\/sftp\.json$/,
] as const;

