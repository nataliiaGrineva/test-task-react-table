module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true
    },
    extends: [
      'prettier',
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended'
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: ['react', 'prettier', 'import'],
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  };