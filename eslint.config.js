import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'types/**'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.greasemonkey,
        $: 'readonly',
        jQuery: 'readonly',
        underscript: 'readonly',
        BootstrapDialog: 'readonly',
        SimpleToast: 'readonly',
      },
    },
  },
  {
    files: ['rollup.config.js', 'scripts/**'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
