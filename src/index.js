const PLUGIN_NAME = '';
checkUnderscript(PLUGIN_NAME);

const underscript = window.underscript;
const plugin = underscript.plugin(PLUGIN_NAME, GM_info.version);

plugin.events.on(':loaded', () => {
  // Do stuff
});
