import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import security from 'eslint-plugin-security'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'playwright-report', 'test-results']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      jsxA11y.flatConfigs.recommended,
      security.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Disallow eval and similar dynamic code execution
      'security/detect-eval-with-expression': 'error',
      // Disallow non-literal RegExp to prevent ReDoS
      'security/detect-non-literal-regexp': 'warn',
      // Disallow unsafe use of fs with variables
      'security/detect-non-literal-fs-filename': 'warn',
      // Disallow object injection via bracket notation with variables
      'security/detect-object-injection': 'warn',
      // Disallow use of deprecated Buffer() constructor
      'security/detect-new-buffer': 'error',
      // Disallow pseudo-random number generators for security-sensitive uses
      'security/detect-pseudoRandomBytes': 'error',
    },
  },
])
