// eslint-disable-next-line no-undef
module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    settings: { react: { version: 'detect' } },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'prefer-destructuring': ['error', { object: true, array: false }],
        'import/prefer-default-export': 0,
        'react/prop-types': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/no-inferrable-types': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'no-cond-assign': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/no-non-null-asserted-optional-chain': 0, // Look i know what i'm doing, honest
    },
};
