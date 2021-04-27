module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaVersion: 2020,
  },
  ignorePatterns: ["webpack.config.js"],
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "warn",
    // "@typescript-eslint/member-ordering": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/class-literal-property-style": "error",
    "@typescript-eslint/consistent-indexed-object-style": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/member-delimiter-style": "error",
    "@typescript-eslint/method-signature-style": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "error",
    "@typescript-eslint/no-confusing-void-expression": "error",
    "@typescript-eslint/no-dynamic-delete": "error",
    "@typescript-eslint/no-implicit-any-catch": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unnecessary-condition": "error",
    "@typescript-eslint/no-unnecessary-qualifier": "error",
    "@typescript-eslint/no-unnecessary-type-arguments": "error",
    "@typescript-eslint/no-unnecessary-type-constraint": "error",
    "@typescript-eslint/non-nullable-type-assertion-style": "error",
    "@typescript-eslint/prefer-function-type": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/prefer-readonly": "error",
    "@typescript-eslint/prefer-reduce-type-parameter": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    "@typescript-eslint/promise-function-async": "error",
    "@typescript-eslint/sort-type-union-intersection-members": "error",
    "@typescript-eslint/type-annotation-spacing": "error",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    // Off
    "@typescript-eslint/no-non-null-assertion": "off", // Breaks code imported from Eldarya.
    "@typescript-eslint/no-unsafe-assignment": "off", // Breaks `= require()`.
    "@typescript-eslint/no-var-requires": "off", // Breaks config files with `= require()`.
    "no-undef": "off", // Breaks config files with `module.exports`.
  },
};
