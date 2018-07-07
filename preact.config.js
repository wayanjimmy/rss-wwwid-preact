// prevents https://github.com/developit/preact-cli/issues/244
const netlifyPlugin = require('preact-cli-plugin-netlify')

export default config => {
  config.node.process = 'mock'
  netlifyPlugin(config)
}
