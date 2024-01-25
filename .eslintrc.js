module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // 'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'standard-with-typescript',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:vuejs-accessibility/recommended',
    '@vue/eslint-config-prettier',
  ],
  parser: 'vue-eslint-parser',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['import', 'tsdoc', 'html', 'vue'],
  },
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    '@typescript-eslint/strict-boolean-expressions': off,
    'no-unused-vars': 'warn',
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'type-annotation',
    ],
    '@typescript-eslint/consistent-type-imports': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: true },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',
    'import/default': 'off',
    'import/no-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          [
            'builtin',
            'external',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
        ],
        pathGroups: [
          {
            pattern:
              '{vue,vue-router,vuex,@/store,vue-i18n,pinia,vite,vitest,vitest/**,@vitejs/**,@vue/**,@logue/vue2-helpers}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{vuetify,vuetify/**,@mdi/**,webfontloader}',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '{@/**}',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        newlinesBetween: 'always',
      },
    ],
    'tsdoc/syntax': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
        },
      },
    ],
    'vue/multi-word-component-names': 'warn',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
      'vue-eslint-parser': ['.vue'],
    },
    'import/resolver': {
      typescript: true,
      alias: {
        map: [
          ['@', './src'],
          ['~', './node_modules'],
        ],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.vue'],
      },
    },
    vite: {
      configPath: './vite.config.ts',
    },
  },
};
