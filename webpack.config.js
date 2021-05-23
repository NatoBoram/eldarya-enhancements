const path = require("path");
const stripIndent = require("common-tags").stripIndent;
const webpack = require("webpack");

module.exports = {
  entry: "./src/main.ts",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: "mustache-loader",
        options: { minify: true, noShortcut: true },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "eldarya-enhancements.user.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  plugins: [
    new webpack.BannerPlugin({
      raw: true,
      banner: stripIndent`
// ==UserScript==
// @name         Eldarya Enhancements
// @namespace    https://gitlab.com/NatoBoram/eldarya-enhancements
// @license      GPL-3.0-or-later
// @version      1.0.0
// @author       Nato Boram
// @description  Enhances the user experience of Eldarya.
// @icon         https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/avatar.png
// @updateURL    https://gitlab.com/NatoBoram/eldarya-enhancements/-/jobs/artifacts/master/raw/dist/eldarya-enhancements.user.js?job=deploy
// @downloadURL  https://gitlab.com/NatoBoram/eldarya-enhancements/-/jobs/artifacts/master/raw/dist/eldarya-enhancements.user.js?job=deploy
// @supportURL   https://gitlab.com/NatoBoram/Eldarya-Face-Downloader/issues
//
// @match        https://www.eldarya.com.br/*
// @match        https://www.eldarya.de/*
// @match        https://www.eldarya.es/*
// @match        https://www.eldarya.hu/*
// @match        https://www.eldarya.it/*
// @match        https://www.eldarya.pl/*
// @match        https://www.eldarya.ru/*
// @match        https://www.eldarya.com/*
// @match        https://www.eldarya.fr/*
//
// @grant        none
// ==/UserScript==`,
    }),
  ],
};
