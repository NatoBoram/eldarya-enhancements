# Eldarya Enhancements

[![GreasyFork](https://img.shields.io/badge/dynamic/json?color=%23990000&label=GreasyFork&query=total_installs&suffix=%20installs&url=https%3A%2F%2Fgreasyfork.org%2Fscripts%2F426533.json)](https://greasyfork.org/scripts/426533)
[![OpenUserJS](https://img.shields.io/badge/dynamic/json?color=%232c3e50&label=OpenUserJS&query=%24.OpenUserJS.installs%5B0%5D.value&suffix=%20installs&url=https%3A%2F%2Fopenuserjs.org%2Fmeta%2FNatoBoram%2FEldarya_Enhancements.meta.json)](https://openuserjs.org/scripts/NatoBoram/Eldarya_Enhancements)
[![pipeline status](https://gitlab.com/NatoBoram/eldarya-enhancements/badges/master/pipeline.svg)](https://gitlab.com/NatoBoram/eldarya-enhancements/-/commits/master)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/NatoBoram/eldarya-enhancements)

Enhances the user experience of Eldarya.

![Banner](https://gitlab.com/NatoBoram/eldarya-enhancements/-/raw/master/images/carousel_eldarya_enhancements.png)

## Installation

1. Install [one of these](https://github.com/OpenUserJS/OpenUserJS.org/wiki/Userscript-Beginners-HOWTO#how-do-i-get-going)
2. Click [here](https://natoboram.gitlab.io/eldarya-enhancements/eldarya-enhancements.min.user.js)

The latest development version can be downloaded [here](https://gitlab.com/NatoBoram/eldarya-enhancements/-/jobs/artifacts/develop/raw/dist/eldarya-enhancements.min.user.js?job=deploy).

The script updates automatically.

## Features

- Adds carousel entries with useful features like download your guardian /
  download your face
- Replaces a few bank buttons with a link to the forum
- Import and export your outfit
- Export other guardians' outfits from their profile
- Import and export settings
- Mark favourite exploration points
- Wishlist for the market
- Overhaul of the dresser so you can see all items in a category at once
- Translated in French
- Unlimited amount of free favourite outfits
- Load the entire wardrobe in the background
- Exploration history

## Development

### Dependencies

This project uses [`pnpm`](https://pnpm.io/installation), but it'll probably work
with any NodeJS package manager.

### Building

To build, simply run `pnpm run build` or `pnpm run build:windows`, the resulting
userscript will be in the `dist/` folder. The build script prepends the `.meta.js`
file after the `webpack` command finishes because webpack's
[`BannerPlugin`](https://webpack.js.org/plugins/banner-plugin/)
[is broken](https://github.com/webpack/webpack/issues/6630)
but webpack's members refuse to acknowledge the problem.
