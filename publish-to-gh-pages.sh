#!/bin/bash
set -ev

# run build
npm run build

# push dist folder to github
cd dist
# git init
git init
# inside this git repo we'll pretend to be a new user
git config user.name "Travis CI"
git config user.email "travis@pinkyjie.com"

# The first and only commit to this new Git repo contains all the
# files present with the commit message "Deploy to GitHub Pages".
git add .
git commit -m "Deploy at `date +"%Y-%m-%d %H:%M"`"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GITHUB_TOKEN}@${GITHUB_REF}" gh-pages > /dev/null 2>&1

popd >/dev/null