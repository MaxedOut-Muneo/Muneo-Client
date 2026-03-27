import * as prettierPluginTailwindcss from 'prettier-plugin-tailwindcss';

/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
  tabWidth: 2,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'lf',
  plugins: [prettierPluginTailwindcss],
};

export default config;
