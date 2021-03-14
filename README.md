# WebNav
![.github/workflows/gh-pages.yml](https://github.com/AllanChain/webnav/workflows/.github/workflows/gh-pages.yml/badge.svg?branch=master)

A good start page for web navigation.

Try it out at https://allanchain.github.io/webnav/

## Features

- Import and export bookmarks and config via JSON files
- Easy editing site's icon, display name and search query
- Works with LinkPreview, for even easier icon and name editing
- Easy reordering
- Easy searching in any sites, as long as configured
- Highly customisable


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
- [X] Better bookmark editing
- [X] Solve damn cross site and https issue (AS LONG AS YOU FIND A GOOD PROXY)
- [X] Edit order
- [X] Config dialog
- [X] Error handling
- [ ] Upload Background image

## Project setup
```bash
yarn

# Compiles and hot-reloads for development
yarn serve

# Compiles and minifies for production
yarn build

# Lints and fixes files
yarn lint

# New version
## Also push tags
git config --global push.followTags true
## patch, minor and major version changes
yarn version patch
yarn version minor
yarn version major
```
