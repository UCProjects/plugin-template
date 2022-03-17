const PLUGIN_NAME = '';
const underscript = window.underscript;

function setup() {
  const plugin = underscript.plugin(PLUGIN_NAME, GM_info.version);

  plugin.events.on(':loaded', () => {
    // Do stuff
  });
}

function warn() {
  console.error(`${PLUGIN_NAME}: UnderScript required`);

  const key = 'underscript.required';
  if (sessionStorage.getItem(key)) return;
  const message = "Looks like you don't have UnderScript installed, or you deactivated it! In order for plugins to work, you need to have it up and running. Until then, the features of this userscript will simply not work. Thank you for your understanding.";

  let alerted = true;
  if (window.SimpleToast) {
    SimpleToast({
      title: 'Missing Requirements',
      text: message,
      footer: PLUGIN_NAME,
    });
  } else if (window.BootstrapDialog) {
    BootstrapDialog.show({
      title: 'Oh No!',
      type: BootstrapDialog.TYPE_WARNING,
      message,
      buttons: [{
        label: 'Proceed',
        cssClass: 'btn-primary',
        action(dialog) {
          dialog.close();
        },
      }],
    });
  } else {
    alerted = false;
  }

  if (alerted) sessionStorage.setItem(key, '1');
}

if (underscript) {
  setup();
} else {
  warn();
}
