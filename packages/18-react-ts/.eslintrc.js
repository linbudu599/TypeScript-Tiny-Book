module.exports = {
  root: true,
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    quotes: 'off',
    '@typescript-eslint/quotes': ['error', 'single'],
    semi: 'off',
    '@typescript-eslint/semi': ['error'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
