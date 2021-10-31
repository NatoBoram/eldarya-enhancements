import { readFileSync } from "fs"
import { resolve } from "path"
import { BannerPlugin, Configuration } from "webpack"

const base: Configuration = {
  entry: "./src/main.ts",
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    path: resolve(__dirname, "dist"),
  },
}

const development: Configuration = {
  ...base,
  module: {
    rules: [
      ...(base?.module?.rules ?? []),
      {
        test: /\.html$/,
        loader: "mustache-loader",
        options: { noShortcut: true },
      },
    ],
  },
  plugins: [
    new BannerPlugin({
      banner: readFileSync("eldarya-enhancements.meta.js", "utf8"),
      raw: true,
    }),
  ],
  devtool: "inline-source-map",
  output: {
    ...base.output,
    filename: "eldarya-enhancements.user.js",
  },
  mode: "development",
}

const production: Configuration = {
  ...base,
  module: {
    rules: [
      ...(base?.module?.rules ?? []),
      {
        test: /\.html$/,
        loader: "mustache-loader",
        options: { minify: true, noShortcut: true, tiny: true },
      },
    ],
  },
  output: {
    ...base.output,
    filename: "eldarya-enhancements.min.user.js",
  },
  mode: "production",
}

export default Object.freeze([development, production])
