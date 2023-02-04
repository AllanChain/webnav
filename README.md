# WebNav
[![Test App with Cypress](https://github.com/AllanChain/webnav/actions/workflows/test.yml/badge.svg)](https://github.com/AllanChain/webnav/actions/workflows/test.yml)
[![Build and Deploy to gh-pages](https://github.com/AllanChain/webnav/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/AllanChain/webnav/actions/workflows/gh-pages.yml)

A good start page for web navigation.

Try it out at https://allanchain.github.io/webnav/

## Features

- Import and export bookmarks and config via JSON files
- Easy editing site's icon, display name and search query
- Works with [Favicon Grabber](https://favicongrabber.com), for even easier icon and name editing
- Easy reordering
- Easy searching in any sites, as long as configured
- Highly customizable
- Able to add proxy


## JSON file

It is possible to host your own bookmarks:

[schema](src/schemas/bookmark.schema.json)

```json
[
    {
        "title": "Pypi",
        "url": "https://pypi.org",
        "search": "/search?q={}",
        "icon": "https://pypi.org/static/images/favicon.6a76275d.ico"
    }
]
```

## TODO

See [the project](https://github.com/AllanChain/webnav/projects/1?fullscreen=true)

## Default Backgroud Image

Photo by [Juliana Chyzhova](https://unsplash.com/photos/uL4CRLxEuvs) on [Unsplash](https://unsplash.com/)

## Project setup

VSCode i18n-ally

```json
{
  "i18n-ally.localesPaths": "src/locales",
  "i18n-ally.keystyle": "nested",
  "i18n-ally.sourceLanguage": "en"
}
```

