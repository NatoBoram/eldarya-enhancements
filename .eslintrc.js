module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off", // Breaks code imported from Eldarya.
    "@typescript-eslint/no-var-requires": "off", // Breaks config files with `= require()`.
    "no-undef": "off", // Breaks config files with `module.exports`.
  },
};
