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

  const key = `${PLUGIN_NAME}.alerted`;
  if (sessionStorage.getItem(key)) return;

  let alerted = true;
  if (window.SimpleToast) {
    SimpleToast({
      title: 'Missing Requirements',
      text: 'UnderScript is required for this script to work',
      footer: PLUGIN_NAME,
    });
  } else if (window.BootstrapDialog) {
    BootstrapDialog.show({
      title: 'Oh No!',
      type: BootstrapDialog.TYPE_WARNING,
      message: 'UnderScript required',
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