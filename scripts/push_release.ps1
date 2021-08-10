#Requires -PSEdition Core

git checkout master
git push
git push --tags

git checkout develop
git push

git status
