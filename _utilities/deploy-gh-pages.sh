date="$(date +'%Y-%m-%d')"
time="$(date +'%H:%M:%S')"
mkdir tmp
cp -a _site/. tmp/
cd tmp
git init
git add . && git commit -m "Site updated on $(date) at $(time)"
git remote add origin git@github.com:hashlabs/hashlabs.github.io.git
git push origin master:refs/heads/master --force
cd ..
rm -rf tmp
