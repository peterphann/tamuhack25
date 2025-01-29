/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

export default {
  plugins: ["prettier-plugin-tailwindcss"],
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'avoid',
};
