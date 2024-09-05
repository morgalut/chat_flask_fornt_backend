import globals from 'globals';

/** @type {import('eslint').Linter.Config} */
export default {
    languageOptions: {
        globals: globals.node // Adjust to 'globals.node' for Node.js environment
    },
    env: {
        node: true,
        es6: true
    },
    extends: [
        'eslint:recommended',
        'plugin:node/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'off',
        'indent': ['error', 2],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always']
    }
};
