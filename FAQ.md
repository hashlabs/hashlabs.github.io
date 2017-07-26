# FAQ :thinking:

## How do I add translated data? :globe_with_meridians:

1. Add 2 data files that are named the same on `_data/en` and `_data/es`, for example `_data/en/some_page.yml` and `_data/es/some_page.yml`
2. Add variables that are named the same to these files like so:

```
//_data/en/some_page.yml
var: "some english variable"

//_data/es/some_page.yml
var: "una variable en español"
```

3. Use this variable on the pages like `{{ site.data.some_page.foo }}`, then the polyglot gem will automatically translate the variable depending on the site current language. Note that the en or es folder was not needed on the path to the variable.

## An specific variable doesn't need translations, do I still need to add it on both language folders?

No, just add it on a data file on the root of the `_data` folder and use it normally.

## Should I translate URL's?

No, the [polyglot] gem will automatically translate urls, so just put url's like
these on data files/html:

```
// on html
<a href="{{ some_data.url | prepend: site.baseurl }}"></a>

// on a data file
url: "/some_link"
```

## But I need a certain url to not get translated?

Just add some extra spaces before rendering the variable like so:

```
// Won't get translated
<a href=" {{ page.url | prepend: site.baseurl }} "></a>

// Will get translated
<a href="{{ page.url | prepend: site.baseurl }}"></a>
```

Even tho this is not documented on polyglot's docs, they use on their
example site, specifically on a language switcher
[here](https://github.com/untra/polyglot/blob/master/site/_includes/sidebar.html#L41)

## How do I use the srcset filter?

Use as shown below:

```
<img
  src="{{ '/assets/img/some_image.png' | prepend: site.baseurl }}"
  srcset="{{ '/assets/img/some_image.png' | prepend: site.baseurl | srcset }}"
>
```

Also take in mind this filter makes 2 assumptions:
1. Image path/name should only have 1 dot in it (the one just before the extension)
2. Image should have 2 other images named like it, but with @2x and @3x just before the extension

## How do I add images or other data for Facebook and Twitter within an specific page?

Just add an image property to the page frontmatter. For example:

```
image: "/assets/img/episode_preview_1200x630px.png"
```

Or perhaps things like "description" will be added in the same way:

```
description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod..."
```

## Why do I need to run `yarn serve` and `yarn watch` at the same time?

* `yarn serve` starts the jekyll server passing development config to it
* `yarn watch` copies the `_assets` folder to `assets` and starts webpack in watch mode

## Why was webpack added to the project?

We needed autoprefixing of CSS files, so we tried adding some jekyll plugins, but as the
available plugins were quite old and unmantained they took a long time to build ([40-60]+ secs).
Aside from this, we also needed to add JS uglyfying and cache with Service Workers, and at
the time of making this project Webpack was the better choice as it could handle all of this,
and even more if needed.

With webpack and some plugins we are able to add:
* SCSS processing, minifying and autprefixing
* JS uglyfying
* A plugin to add sw-precache

## How do I add a new script to the page?

Add the script to the `_scripts` folder, then be sure to add it to the entry section
on the webpack configuration (`webpack.config.js`) like so:

```
entry: {
  // ... other scripts
  'new-script': './_scripts/new-script.js'
},
```

Then if you are already running `yarn watch`, cancel it and run it again.

## I have this specific script that cant get uglified, what should I do?

Go to the webpack configuration, and then add it to the `CopyWebpackPlugin` options
like so:

```
new CopyWebpackPlugin([
  { from: './_scripts/some-script.js', to: 'js/some-script.js' }
])
```

In this project we use this to exclude a file from webpack processing, as we need it
as it's cause its a p5.js sketch.

## Why do we have a `postcss.config.js` file?

As we needed to handle autoprefixing, the most updated plugin was a postcss plugin,
so we are only using the `postcss-loader` to handle autoprefixing.

## Why do assets fetch from CDN have a external=true parameter?

This is because we're using a serviceworker to cache all the site assets when they get fetch. Having this property makes it easier to match all the urls with a REGEX pattern.

In case you include any external assets that are needed for UI, include this property as well.

E.G:

```javascript
<script defer src="https://code.jquery.com/jquery-3.1.1.min.js?external=true"></script>
```

## How to add a title in a page?

Just go to the folder where the page is located, for example for the index page it would be `/home`.

Within the translated files `-en` and `-es`, add a title key with your title:

```
title: "Home" # Will be used as title for this page
description: "Home description" # Will be used as description for this page
```

## How do I add new images?

1. Add the images to the `_assets/img/` folder
2. Run `yarn optimize-images` to generate optimized images

## Do optimized images overwrite original images?

No, when images from `_assets/img/` get optimized, they get saved
to `_assets/optimized_img/` (this folder is gitignored), and from there
we copy them to `assets/img/` with webpack.

[polyglot]: https://github.com/untra/polyglot
