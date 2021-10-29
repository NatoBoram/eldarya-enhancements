#!/bin/sh

env NODE_OPTIONS='--openssl-legacy-provider' pnpx webpack

cp eldarya-enhancements.meta.js dist/eldarya-enhancements.meta.js

cat dist/eldarya-enhancements.meta.js dist/eldarya-enhancements.user.js >dist/temp.user.js
mv dist/temp.user.js dist/eldarya-enhancements.user.js

cat dist/eldarya-enhancements.meta.js dist/eldarya-enhancements.min.user.js >dist/temp.min.user.js
mv dist/temp.min.user.js dist/eldarya-enhancements.min.user.js
