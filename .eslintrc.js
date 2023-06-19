module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['react', 'unused-imports'],
  rules: {
    'react/jsx-uses-vars': 'error', //'warning' //var쓰지 마라
    'react/jsx-uses-react': 'error', //리액트 기본 문법 써라
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'ignore',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'unused-imports/no-unused-imports-ts': ['error'],
  },
};
