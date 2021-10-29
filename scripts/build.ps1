#Requires -PSEdition Core

$env:NODE_OPTIONS = '--openssl-legacy-provider'
pnpx webpack

Copy-Item eldarya-enhancements.meta.js dist/eldarya-enhancements.meta.js

$(
  (Get-Content dist/eldarya-enhancements.meta.js -Raw)
  (Get-Content dist/eldarya-enhancements.user.js -Raw)
) | Out-File dist/eldarya-enhancements.user.js

$(
  (Get-Content dist/eldarya-enhancements.meta.js -Raw)
  (Get-Content dist/eldarya-enhancements.min.user.js -Raw)
) | Out-File dist/eldarya-enhancements.min.user.js
