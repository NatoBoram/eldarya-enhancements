const path = require("path")

module.exports = {
  entry: "./src/main.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.html$/,
        loader: "mustache-loader",
        options: { minify: false, noShortcut: true, tiny: true },
      },
    ],
  },
  resolve: { extensions: [".tsx", ".ts", ".js"] },
  output: {
    filename: "eldarya-enhancements.user.js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: { minimize: false },
  mode: "production",
  plugins: [],
}
