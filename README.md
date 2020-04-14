# webnav
![.github/workflows/gh-pages.yml](https://github.com/AllanChain/webnav/workflows/.github/workflows/gh-pages.yml/badge.svg?branch=master)
## What can it do

- read website info from a json file
- search box utility
    - type search query in the search box
    - press corresponding website icon
    - and you can search that website
    - if you *did not enter the query or search url not set*, you will be navigated to that website as usual

## JSON file

[schema](src/bookmark.schema.json)

```json
[
    {
        "title": "Google",
        "url": "https://www.google.com",
        "search": "search?q=",
        "icon": "icon/Google.ico"
    }
]
```

## TODO
- [ ] Better bookmark editing
- [ ] Solve damn cross site and https issue
- [X] Edit order
- [ ] Config dialog
- [ ] Error handling

## Project setup
```
npm install

# Compiles and hot-reloads for development
npm run serve

# Compiles and minifies for production
npm run build

# Lints and fixes files
npm run lint
```
