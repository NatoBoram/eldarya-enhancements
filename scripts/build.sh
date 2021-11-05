#!/bin/sh

pnpx webpack

cp eldarya-enhancements.meta.js dist/eldarya-enhancements.meta.js

cat dist/eldarya-enhancements.meta.js dist/eldarya-enhancements.min.user.js >dist/temp.min.user.js
mv dist/temp.min.user.js dist/eldarya-enhancements.min.user.js
