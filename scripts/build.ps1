#Requires -PSEdition Core

pnpm run webpack

Copy-Item eldarya-enhancements.meta.js dist/eldarya-enhancements.meta.js

$(
  (Get-Content dist/eldarya-enhancements.meta.js -Raw)
  (Get-Content dist/eldarya-enhancements.min.user.js -Raw)
) | Out-File dist/eldarya-enhancements.min.user.js
