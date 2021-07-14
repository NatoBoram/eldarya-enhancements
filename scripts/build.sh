#!/bin/sh

pnpx webpack

cp eldarya-enhancements.meta.js dist/eldarya-enhancements.meta.js
cat dist/eldarya-enhancements.meta.js dist/eldarya-enhancements.user.js > dist/temp.user.js
mv dist/temp.user.js dist/eldarya-enhancements.user.js
