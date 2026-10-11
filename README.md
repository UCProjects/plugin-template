# UnderScript plugin template

Make your own plugin for [UnderScript](https://github.com/UCProjects/UnderScript). You don't need to know how to program to get started.

## The quick way

1. Install [UnderScript](https://github.com/UCProjects/UnderScript) and a userscript manager like [Tampermonkey](https://www.tampermonkey.net/)
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

If you'd rather use `npm` and a bundler, the project template is at the root of this repository.

### Setup
1. Edit [package.json](package.json)
1. Edit code in [index.js](src/index.js)

### Build
1. Install [Node.js](https://nodejs.org/)
1. Run `npm install`, then `npm start` to build on every change

### Release
1. Run `npm run build`
1. Find the script in the `dist` directory
