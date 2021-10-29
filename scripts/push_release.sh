#!/bin/sh

git checkout develop
git push

git checkout master
git push
git push --tags

git checkout develop
git status
