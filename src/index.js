const PLUGIN_NAME = GM_info.name;

const underscript = window.underscript;
const plugin = underscript.plugin(PLUGIN_NAME, GM_info.version);

plugin.events.on(':preload', () => {
  // Do stuff
});
