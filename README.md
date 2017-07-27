# Lab Coat - Jekyll

Lab Coat is the www.hashlabs.com website.

## Set up Development Enviroment

1. Make sure you have bundler installed (gem install bundler)
2. `yarn` (or `npm install`)
3. `bundle install`
4. `rbenv rehash`
5. `cp _config.development.example.yml _config.development.yml`, then update that file variable values
5. `yarn serve` to serve and watch for changes

## SASS

Jekyll compiles SASS when serving/building. Put your partials in the `_sass` folder, and your `main.scss` file in `css` folder. Your `main.scss` file should have the front matter declaration (dashes at the top of the file) to work correctly.

### Example

```sass
---
---

@import 'bla';
```

## Production Build

Run `yarn build-production` then the ready for production site will be in the `_site` folder

## Staging

To deploy to staging make sure you have access to the firebase labcoat-staging project and then run `yarn deploy`

## Data

Jekyll has a convenient `_data` folder, that we can use to have dynamic
things (like team members or projects) to be rendered without harcoding
them in the template.

You can add `yml` files in the `_data` folder, and query the contents of
these files using `site.data.{filename}`.

## FAQ

Check the [FAQ](FAQ.md)

### Example

# About

![hash labs logo](https://www.hashlabs.com/images/hashlabs_logo_horizontal_02.png)

Lab Coat is maintained by [Hash Labs LLC](http://www.hashlabs.com)
