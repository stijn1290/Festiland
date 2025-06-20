// eslint-disable-next-line no-undef
const { defineConfig } = require('cypress')
// eslint-disable-next-line no-undef
const customViteConfig = require('../../vite.config.js')

// eslint-disable-next-line no-undef
module.exports = defineConfig({
    component: {
        devServer: {
            framework: 'react',
            bundler: 'vite',
            // optionally pass in vite config
            viteConfig: customViteConfig,
            // or a function - the result is merged with
            // any `vite.config` file that is detected
            viteConfig: async () => {
                // ... do things ...
                const modifiedConfig = await injectCustomConfig(baseConfig)
                return modifiedConfig
            },
        },
    },
})