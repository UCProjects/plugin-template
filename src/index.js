import { displayName, version } from '../package.json';

// Plugin name and version come from package.json, so they match the userscript header.
// Read more: https://feildmaster.github.io/UnderScript/api/underscript/plugin
const plugin = underscript.plugin(displayName, version);

// Settings show up in the UnderScript settings window, under "Plugins".
// Read more: https://feildmaster.github.io/UnderScript/api/plugin/settings
const settings = plugin.settings();

const greeting = settings.add({
  key: 'greeting',
  name: 'Show greeting',
  description: 'Shows a message when the page loads',
  default: true,
});

// Read more: https://feildmaster.github.io/UnderScript/api/events
plugin.events.on(':preload', () => {
  if (greeting.value()) {
    plugin.toast('Hello from my plugin!');
  }
});
