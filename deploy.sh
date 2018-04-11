git checkout gh-pages
git subtree split --prefix dist -b gh-pages
git add . 
git commit -am "publish"
git push -f origin gh-pages:gh-pages
git checkout master
git branch -D gh-pages