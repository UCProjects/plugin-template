// ==UserScript==
// @name         My Plugin - UnderScript Plugin
// @description  What my plugin does
// @namespace    https://github.com/YOUR-NAME
// @version      1.0.0
// @author       YOUR NAME
// @match        https://*.undercards.net/*
// @exclude      https://*undercards.net/*/*
// @require      https://raw.githubusercontent.com/UCProjects/UnderScript/master/src/checkerV2.js
// @grant        none
// ==/UserScript==

(() => {
  // Your plugin's name: at most 20 characters, only letters, numbers and spaces.
  // No two plugins can share a name, so make it your own.
  // The version comes from @version above, so there is only one place to change it.
  const plugin = underscript.plugin('My Plugin', GM_info.script.version);

  // Settings show up in the UnderScript settings window, under "Plugins".
  // More types (text, slider, select, ...): https://feildmaster.github.io/UnderScript/api/plugin/settings
  const settings = plugin.settings();

  const greeting = settings.add({
    key: 'greeting', // Only needs to be unique inside your plugin.
    name: 'Show greeting', // What the player sees.
    description: 'Shows a message when the page loads', // Optional longer text under the name.
    default: true, // A true/false setting is shown as a checkbox.
  });

  // ':preload' runs once, as soon as the page starts loading.
  // All events: https://feildmaster.github.io/UnderScript/api/events
  plugin.events.on(':preload', () => {
    // greeting.value() gives the current setting, so changes apply without editing code.
    if (greeting.value()) {
      // A toast is a small message in the corner of the page.
      plugin.toast('Hello from my plugin!');
    }
  });

  // Add your own code below.
})();
