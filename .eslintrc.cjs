/**
 * @type {import('eslint').ESLint.ConfigData}
 */
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    plugins: ['perfectionist', 'unused-imports', 'prettier'], // Removed '@typescript-eslint'
    extends: ['airbnb', 'airbnb/hooks', 'prettier'], // Removed 'airbnb-typescript'
    parserOptions: {
      sourceType: "module",
      ecmaVersion : 2020
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'], // Specify extensions to resolve
        },
      },
    },
    /**
     * 0 ~ 'off'
     * 1 ~ 'warn'
     * 2 ~ 'error'
     */
    rules: {
      // general
      "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
      'no-alert': 0,
      camelcase: 0,
      'no-console': 0,
      'no-unused-vars': 0,
      'no-nested-ternary': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'no-restricted-exports': 0,
      'no-promise-executor-return': 0,
      'import/prefer-default-export': 0,
      'prefer-destructuring': [1, { object: true, array: false }],
      // react
      'react/no-children-prop': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-array-index-key': 0,
      'react/require-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'react/function-component-definition': 0,
      'react/jsx-no-duplicate-props': [1, { ignoreCase: false }],
      'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],
      'react/no-unstable-nested-components': [1, { allowAsProps: true }],
      // jsx-a11y
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/control-has-associated-label': 0,
      // unused imports
      'unused-imports/no-unused-imports': 1,
      'unused-imports/no-unused-vars': [
        0,
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ]
    },
  };