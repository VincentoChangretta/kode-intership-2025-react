import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      'react-hooks': eslintPluginReactHooks,
    },
    rules: {
      'prettier/prettier': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      indent: ['error', 2],
      'no-undef': 'warn',
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
    ignores: ['build/**'],
  },
];
