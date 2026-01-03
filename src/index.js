const { name } = require('../package.json');

const underscript = window.underscript;
const plugin = underscript.plugin(name, GM_info.script.version);

plugin.events.on(':preload', () => {
  // Do stuff
});
