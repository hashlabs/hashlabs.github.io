# Lab Coat - Jekyll

Lab Coat is the www.hashlabs.com website.

## How to use

1. Make sure you have bundler installed (gem install bundler)
2. `bundle install`
3. `jekyll serve --watch` to serve and watch for changes
4. run `jekyll build` when you want to build the site

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

# About

![hash labs logo](https://projects.invisionapp.com/assets/609036/7955492/AD8F5CE34B46D3F4AAC9175DE01DAFF8976C40BEDE3F7211CCA01AA5BAA7376E/thumbnail)

Lab Coat is maintained by [Hash Labs LLC](www.hashlabs.com)
