import eslint from "@eslint/js"
import prettier from "eslint-config-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

/* eslint-disable @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access */

export default tseslint.config(
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	{
		languageOptions: {
			globals: { ...globals.browser },
			parserOptions: { project: "./tsconfig.eslint.json" },
		},
	},

	eslint.configs.recommended,
	...tseslint.configs.strictTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	prettier,

	{
		rules: {
			// ESLint
			"func-style": ["error", "declaration"],
			eqeqeq: "error",

			// TypeScript ESLint
			//"@typescript-eslint/member-ordering": "warn",
			//"@typescript-eslint/no-use-before-define": "warn",
			"@typescript-eslint/array-type": "error",
			"@typescript-eslint/ban-tslint-comment": "error",
			"@typescript-eslint/class-literal-property-style": "error",
			"@typescript-eslint/class-methods-use-this": [
				"error",
				{
					ignoreClassesThatImplementAnInterface: true,
					ignoreOverrideMethods: true,
				},
			],
			"@typescript-eslint/consistent-indexed-object-style": "error",
			"@typescript-eslint/consistent-type-assertions": [
				"error",
				{ assertionStyle: "as", objectLiteralTypeAssertions: "never" },
			],
			"@typescript-eslint/consistent-type-definitions": "error",
			"@typescript-eslint/consistent-type-exports": "error",
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ fixStyle: "separate-type-imports" },
			],
			"@typescript-eslint/default-param-last": "error",
			"@typescript-eslint/dot-notation": "error",
			"@typescript-eslint/explicit-function-return-type": "error",
			"@typescript-eslint/explicit-member-accessibility": [
				"error",
				{ accessibility: "no-public" },
			],
			"@typescript-eslint/explicit-module-boundary-types": "error",
			"@typescript-eslint/method-signature-style": "error",
			"@typescript-eslint/no-base-to-string": "error",
			"@typescript-eslint/no-confusing-non-null-assertion": "error",
			"@typescript-eslint/no-dupe-class-members": "error",
			"@typescript-eslint/no-duplicate-enum-values": "error",
			"@typescript-eslint/no-dynamic-delete": "error",
			"@typescript-eslint/no-empty-function": [
				"error",
				{ allow: ["private-constructors", "protected-constructors"] },
			],
			"@typescript-eslint/no-extraneous-class": [
				"error",
				{ allowStaticOnly: true },
			],
			"@typescript-eslint/no-import-type-side-effects": "error",
			"@typescript-eslint/no-invalid-this": "error",
			"@typescript-eslint/no-invalid-void-type": "error",
			"@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
			"@typescript-eslint/no-redeclare": "error",
			"@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
			"@typescript-eslint/no-unnecessary-condition": "error",
			"@typescript-eslint/no-unnecessary-qualifier": "error",
			"@typescript-eslint/no-unnecessary-type-arguments": "error",
			"@typescript-eslint/no-unnecessary-type-constraint": "error",
			"@typescript-eslint/no-unsafe-argument": "error",
			"@typescript-eslint/no-unused-expressions": "error",
			"@typescript-eslint/no-useless-constructor": "error",
			"@typescript-eslint/no-useless-empty-export": "error",
			"@typescript-eslint/non-nullable-type-assertion-style": "error",
			"@typescript-eslint/parameter-properties": [
				"error",
				{ prefer: "parameter-property" },
			],
			"@typescript-eslint/prefer-for-of": "error",
			"@typescript-eslint/prefer-function-type": "error",
			"@typescript-eslint/prefer-includes": "error",
			"@typescript-eslint/prefer-nullish-coalescing": [
				"error",
				{ ignorePrimitives: true },
			],
			"@typescript-eslint/prefer-optional-chain": "error",
			"@typescript-eslint/prefer-readonly": "error",
			"@typescript-eslint/prefer-reduce-type-parameter": "error",
			"@typescript-eslint/prefer-regexp-exec": "error",
			"@typescript-eslint/prefer-return-this-type": "error",
			"@typescript-eslint/prefer-string-starts-ends-with": "error",
			"@typescript-eslint/prefer-ts-expect-error": "error",
			"@typescript-eslint/promise-function-async": "error",
			"@typescript-eslint/require-array-sort-compare": "error",
			"@typescript-eslint/restrict-template-expressions": [
				"error",
				{
					allowBoolean: true,
					allowNullish: true,
					allowNumber: true,
					allowRegExp: true,
				},
			],
			"@typescript-eslint/return-await": "error",
			"@typescript-eslint/switch-exhaustiveness-check": "error",
			"@typescript-eslint/typedef": "error",
			"@typescript-eslint/unified-signatures": "error",

			// Off
			"@typescript-eslint/no-non-null-assertion": "off", // Breaks code imported from Eldarya.
			"@typescript-eslint/no-require-imports": "off", // Breaks `= require()`.
			"@typescript-eslint/no-unnecessary-type-parameters": "off",
			"@typescript-eslint/no-unsafe-assignment": "off", // Breaks `= require()`.
			"@typescript-eslint/no-var-requires": "off", // Breaks config files with `= require()`.
			"@typescript-eslint/prefer-literal-enum-member": "off", // Breaks time enumerations
			"@typescript-eslint/no-mixed-enums": "off", // That's just how Eldarya was made.

			// Duplicate or redundant type constituents can offer valuable
			// documentation
			"@typescript-eslint/no-duplicate-type-constituents": "off",
			"@typescript-eslint/no-redundant-type-constituents": "off",

			"no-undef": "off", // Breaks config files with `module.exports`.
		},
	},

	{
		ignores: [
			".pnpm-store/",
			"dist/",
			"docs/",
			"node_modules/",
			"package-lock.json",
			"pnpm-lock.yaml",
			"public/",
			"src/templates/js/",
		],
	},
)
