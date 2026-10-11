const NAME_RULE = /^[A-Za-z0-9 ]{1,20}$/;

export function pluginName({ displayName }) {
  if (!NAME_RULE.test(displayName)) {
    throw new Error(`displayName "${displayName}" must be 1-20 letters, numbers or spaces`);
  }
  return displayName;
}

export function header(pkg) {
  const { name, description, version, author, repository, homepage, userscript = {} } = pkg;
  const release = repository && `https://github.com/${repository}/releases/latest/download/${name}`;
  const managed = {
    name: pluginName(pkg),
    description,
    version,
    author,
    homepage,
  };
  const tags = {
    namespace: [repository && `https://github.com/${repository.split('/')[0]}`],
    match: ['https://*.undercards.net/*'],
    exclude: ['https://*.undercards.net/*/*'],
    require: ['https://raw.githubusercontent.com/UCProjects/UnderScript/master/src/checkerV2.js'],
    updateURL: [release && `${release}.meta.js`],
    downloadURL: [release && `${release}.user.js`],
    grant: ['none'],
  };

  const appended = { match: true, exclude: true, require: true };

  Object.entries(userscript).forEach(([key, value]) => {
    if (key in managed) {
      throw new Error(`userscript.${key} is generated from package.json, edit the matching field there`);
    }
    const values = [value].flat();
    tags[key] = key in appended ? [...tags[key], ...values] : values;
  });

  const lines = [
    ...Object.entries(managed).map(([key, value]) => [key, [value]]),
    ...Object.entries(tags),
  ]
    .flatMap(([key, values]) => values.filter(Boolean).map((value) => `// @${key.padEnd(12)} ${value}`));
  return ['// ==UserScript==', ...lines, '// ==/UserScript=='].join('\n');
}
