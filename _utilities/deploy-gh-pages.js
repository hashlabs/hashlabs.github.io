import ghpages from 'gh-pages';

const options = {
  branch: 'gh-pages'
};

console.log(`Uploading to '${options.branch}' 🚀`);

ghpages.publish('_site', options, () => {
  console.log(`🎉🎉🎉 Successfully deployed to '${options.branch}' 🎉🎉🎉`);
});
