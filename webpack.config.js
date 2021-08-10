const path = require("path")

const webpack = {
  entry: "./src/main.ts",
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
}

const development = {
  ...webpack,
  module: {
    rules: [
      ...webpack.module.rules,
      {
        test: /\.html$/,
        loader: "mustache-loader",
        options: { noShortcut: true },
      },
    ],
  },
  devtool: "inline-source-map",
  output: {
    ...webpack.output,
    filename: "eldarya-enhancements.user.js",
  },
  mode: "development",
}

const production = {
  ...webpack,
  module: {
    rules: [
      ...webpack.module.rules,
      {
        test: /\.html$/,
        loader: "mustache-loader",
        options: { minify: true, noShortcut: true, tiny: true },
      },
    ],
  },
  output: {
    ...webpack.output,
    filename: "eldarya-enhancements.min.user.js",
  },
  mode: "production",
}

module.exports = [development, production]
