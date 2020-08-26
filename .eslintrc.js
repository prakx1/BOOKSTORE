/*  eslint linebreak-style: ["error", "unix"] */
module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: ["airbnb-base", "prettier", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ["warn", "always"],
    quotes: ["warn", "double"],
    "linebreak-style": ["warn", "windows"],
    "func-names": "warn",
  },
};
