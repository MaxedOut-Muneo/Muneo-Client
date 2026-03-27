import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

/** @type {import("eslint").Linter.Config[]} */
export const baseConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    rules: {
      // General JS
      'prefer-const': 'error',
      'no-var': 'error',
      curly: ['error', 'all'],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-implicit-coercion': 'error',
      'no-undef': 'off',
      'no-warning-comments': [
        'warn',
        {
          terms: ['TODO', 'FIXME', 'XXX', 'BUG'],
          location: 'anywhere',
        },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          selector: 'variable',
          leadingUnderscore: 'allow',
        },
        { format: ['camelCase', 'PascalCase'], selector: 'function' },
        { format: ['PascalCase'], selector: 'interface' },
        { format: ['PascalCase'], selector: 'typeAlias' },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',

      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // Import ordering
      'import/no-duplicates': ['error', { 'prefer-inline': true }],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './*.css',
              group: 'sibling',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'never',
        },
      ],

      // Restricted imports
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'util',
              importNames: ['isArray'],
              message: 'Array.isArray를 대신 사용해주세요!',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '.next/', '.turbo/'],
  },
];

export default baseConfig;
