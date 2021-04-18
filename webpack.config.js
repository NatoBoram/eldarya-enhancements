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
        options: { minify: true, noShortcut: true, },
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
// @version      0.0.1
// @description  Enhances the user experience of Eldarya
// @author       Nato Boram
// @icon         https://gitlab.com/NatoBoram/Eldarya-Face-Downloader/raw/master/assets/icon.png
// @supportURL   https://gitlab.com/NatoBoram/Eldarya-Face-Downloader/issues
// @require      https://raw.githubusercontent.com/twitter/hogan.js/master/lib/template.js
//
// HTTPS
// @match        https://eldarya.com.br/*
// @match        https://eldarya.de/*
// @match        https://eldarya.es/*
// @match        https://eldarya.hu/*
// @match        https://eldarya.it/*
// @match        https://eldarya.pl/*
// @match        https://eldarya.ru/*
// @match        https://eldarya.com/*
// @match        https://eldarya.fr/*
//
// HTTPS WWW
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
// @run-at       document-end
// @grant        none
// ==/UserScript==`,
    }),
  ],
};
