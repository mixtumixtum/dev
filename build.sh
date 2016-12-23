#!/bin/bash

echo "creating dist folder if it does not exist"
mkdir -p dist
echo "copying index.html into dist/index.html..."
cp index.html dist/index.html
echo "building css into dist/build.css"
postcss -c postcss.js -l && cp build.css dist/build.css
echo "copying images/ into dist/images..."
cp -r images/ dist/images
echo "copying font/ into dist/font..."
cp -r font/ dist/font
echo "browserifying js into dist/index.js..."
browserify -v -t babelify index.js | uglifyjs > dist/index.js

echo "done. now cd into dist, git add, git commit and push built files"

