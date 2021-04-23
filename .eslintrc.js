module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaVersion: 2020,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off", // Breaks code imported from Eldarya.
    "@typescript-eslint/no-var-requires": "off", // Breaks config files with `= require()`.
    "no-undef": "off", // Breaks config files with `module.exports`.
    // "@typescript-eslint/member-ordering": "error",
    "prettier/prettier": "error",
  },
};
