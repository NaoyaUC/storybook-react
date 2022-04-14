module.exports = {
  //読み込むstoryを指定
  "stories": [
    // "../src/**/*.stories.mdx",
    // "../src/**/*.stories.@(js|jsx|ts|tsx)",
    '../src/components/**/*.stories.js'
  ],
  //アドオン
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  //vue angular Svelte
  framework: "@storybook/react",
  core: {
    "builder": "@storybook/builder-webpack5"
  }
}