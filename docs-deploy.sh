#!/usr/bin/env bash
set -x  # echo on

GIT_DEPLOY_REPO=${GIT_DEPLOY_REPO:-$(node -p -e "require('./package.json').repository.url")}

cd docs && \

rm -R .git
git init && \

git config user.name "Travis CI" && \
git config user.email "john.king.ca@gmail.com" && \

git add . && \
git commit -m "Deploy to GitHub Pages" && \

git push --force "https://${GH_TOKEN}@${GH_REF}" master:docs
