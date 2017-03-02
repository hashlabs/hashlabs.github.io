# Lab Coat - Jekyll

Lab Coat is the www.hashlabs.com website.

## How to use

1. Make sure you have bundler installed (gem install bundler)
2. `bundle install`
3. `rbenv rehash`
4. `jekyll serve --watch` to serve and watch for changes
5. run `jekyll build` when you want to build the site

## SASS

Jekyll compiles SASS when serving/building. Put your partials in the `_sass` folder, and your `main.scss` file in `css` folder. Your `main.scss` file should have the front matter declaration (dashes at the top of the file) to work correctly.

### Example

```sass
---
---

@import 'bla';
```

## Data

Jekyll has a convenient `_data` folder, that we can use to have dynamic
things (like team members or projects) to be rendered without harcoding
them in the template.

You can add `yml` files in the `_data` folder, and query the contents of
these files using `site.data.{filename}`.

### Example


# Known Issues

*Be aware we are including all bootstrap files whithin the repo at `_sass/_bootstrap-sass`.
This folder will be removed and refactored in the future, currently problem is due to how gh-pages handles jekyll dependencies.*

# About

![hash labs logo](https://www.hashlabs.com/images/hashlabs_logo_horizontal_02.png)

Lab Coat is maintained by [Hash Labs LLC](http://www.hashlabs.com)
