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
  src="{{ '/img/some_image.png' | prepend: site.baseurl }}"
  srcset="{{ '/img/some_image.png' | prepend: site.baseurl | srcset }}"
>
```

Also take in mind this filter makes 2 assumptions:
1. Image path/name should only have 1 dot in it (the one just before the extension)
2. Image should have 2 other images named like it, but with @2x and @3x just before the extension

## How do I add images for Facebook and Twitter for an specific page?

Just add an image property to the page frontmatter. For example:

```
image: "/img/episode_preview_1200x630px.png"
```

[polyglot]: https://github.com/untra/polyglot
