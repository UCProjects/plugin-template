# UnderScript plugin template

Make your own plugin for [UnderScript](https://github.com/UCProjects/UnderScript). You don't need to know how to program to get started.

- [The quick way](#the-quick-way)
  - [Make it yours](#make-it-yours)
- [Sharing your plugin](#sharing-your-plugin)
  - [Updates for the people using it](#updates-for-the-people-using-it)
  - [Community Plugins menu](#community-plugins-menu)
- [For developers](#for-developers)
  - [Setup](#setup)
  - [Commands](#commands)
  - [Try it in your browser](#try-it-in-your-browser)
  - [Extra header tags](#extra-header-tags)
  - [Release](#release)

## The quick way

1. Install [UnderScript](https://feildmaster.github.io/UnderScript/) and a userscript manager like [Tampermonkey](https://www.tampermonkey.net/)
1. In Chrome, Edge and Opera, let Tampermonkey run userscripts, or none of them will load. Right-click the Tampermonkey icon and choose "Manage extension". If there's an "Allow User Scripts" toggle, turn it on. If there isn't one, turn on "Developer mode" at the top right of `chrome://extensions` (`edge://extensions`, `opera://extensions`). If scripts stop running after you change either setting, turn "Allow User Scripts" off and on again
1. Open [my-plugin.user.js](single-file/my-plugin.user.js) and copy everything in it
1. In Tampermonkey, create a new script and paste it over what's there, then save
1. Reload [undercards](https://undercards.net/), you should see a "Hello from my plugin!" toast

### Make it yours

Change these in the file, they're all near the top:

- `@name`, `@description`, `@author`, `@namespace` in the header: what Tampermonkey shows for your script
- `@version`: raise it every time you publish a change
- The name in `underscript.plugin('My Plugin', ...)`: what UnderScript shows for your plugin. At most 20 characters, only letters, numbers and spaces, and no two plugins can share a name
- The settings and the code inside `:preload`: replace the example with your own

Comments in the file explain each part. When you want to do more, the [Plugin API docs](https://feildmaster.github.io/UnderScript/api/underscript/plugin) list everything a plugin can do.

## Sharing your plugin

### Updates for the people using it

Put your file somewhere public, like a [GitHub](https://github.com/) repository or a [gist](https://gist.github.com/), and add these two lines to the header with the link to the raw file:

```js
// @updateURL    https://example.com/my-plugin.user.js
// @downloadURL  https://example.com/my-plugin.user.js
```

Tampermonkey will then offer the new version whenever you raise `@version`.

### Community Plugins menu

UnderScript has a "Community Plugins" menu where players can find and install plugins. To get yours listed, open a pull request to [UnderScript](https://github.com/UCProjects/UnderScript) that adds an entry to `plugins.json`:

```json
{
  "name": "My Plugin",
  "author": "Your Name",
  "updateURL": "https://example.com/my-plugin.user.js"
}
```

`name` must be exactly the name you pass to `underscript.plugin()`.

## For developers

If you want a proper project, with a bundler, editor autocomplete and automatic releases, the project template is at the root of this repository. Click "Use this template" on GitHub to start your own copy.

### Setup
1. Install [Node.js](https://nodejs.org/) 24 (20.19 and 22.13 or newer also work)
1. Edit [package.json](package.json): `name` (the file name), `displayName` (the plugin name, at most 20 characters of letters, numbers and spaces), `description`, `author`, `repository` (`owner/repo`) and `homepage`
1. Run `npm install`
1. Edit code in [index.js](src/index.js)

### Commands
- `npm start`: rebuild `dist` on every change
- `npm run build`: build `dist/<name>.user.js` and `dist/<name>.meta.js`
- `npm run lint`: check the code style
- `npm run check`: type check against the UnderScript API
- `npm run types`: download the latest UnderScript type definitions into `types`, this also happens on `npm install`

The userscript header is generated from `package.json`, so there is nothing to keep in sync by hand.

### Try it in your browser
Tampermonkey can load the file you build straight from your disk, so you don't have to paste it in after every change.

1. Make sure Tampermonkey can run userscripts, as in [the quick way](#the-quick-way)
1. Allow Tampermonkey to access file URLs: in your browser's extensions page, open Tampermonkey's details and turn on "Allow access to file URLs"
1. In Tampermonkey, create a new script and replace everything in it with the following, using the real path to your `dist` folder (on Windows it looks like `file:///C:/Users/you/my-plugin/dist/my-plugin.user.js`):

```js
// ==UserScript==
// @name     My Plugin (dev)
// @match    https://*.undercards.net/*
// @exclude  https://*.undercards.net/*/*
// @grant    none
// @require  https://raw.githubusercontent.com/UCProjects/UnderScript/master/src/checkerV2.js
// @require  file:///path/to/my-plugin/dist/my-plugin.user.js
// ==/UserScript==
```

1. Run `npm start`, then reload [undercards](https://undercards.net/) whenever it has rebuilt

Things to know:

- Tampermonkey only reads the header of the small script above, not the one in `dist`. If you change tags in `package.json`, copy them from `dist/<name>.meta.js` into the dev script by hand
- Turn off any installed copy of the same plugin while you test, because two plugins can't share a name
- Your plugin needs UnderScript installed and turned on, the same as for players

### Extra header tags
Add any userscript tag to the `userscript` object in [package.json](package.json). Use a list when you need the same tag more than once:

```json
"userscript": {
  "require": ["https://unpkg.com/lodash@4.17.21/lodash.min.js"],
  "run-at": "document-body",
  "grant": ["GM_xmlhttpRequest", "GM_getValue"],
  "connect": "api.example.com"
}
```

- `match`, `exclude` and `require` are added after the defaults. The default `require` is the UnderScript check, which shows players a friendly message when UnderScript is missing
- `grant` replaces the default, which is `none`
- `namespace`, `updateURL` and `downloadURL` are built from `repository`, set them yourself to point somewhere else, or set `updateURL` and `downloadURL` to `false` to leave them out
- Every other tag is added as written
- `name`, `description`, `version`, `author` and `homepage` come from the fields at the top of `package.json`, and the build tells you if you set them in `userscript`

Without a `repository`, `namespace`, `updateURL` and `downloadURL` are left out.

### Release
1. Run `npm version patch` (or `minor`, `major`), this updates the version and creates a tag
1. Run `git push --follow-tags`

GitHub builds the plugin and publishes `<name>.user.js` and `<name>.meta.js` to a release. Players install from, and get updates from, the latest release.

Don't want GitHub releases? Delete [release.yml](.github/workflows/release.yml), run `npm run build`, and host the files in `dist` wherever you like. Point `updateURL` and `downloadURL` at them in `userscript` (see above) so players still get updates.
