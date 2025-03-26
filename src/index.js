const { name } = require('../package.json');

const underscript = window.underscript;
const plugin = underscript.plugin(name, GM_info.version);

plugin.events.on(':preload', () => {
  // Do stuff
});
