const chromedriver = require('chromedriver')
const merge = require('deepmerge')
const wdioConf = require('./wdio.conf.js')

exports.config = merge(wdioConf.config, {
  path: '/',
  services: ['chromedriver'],
  connectionRetryTimeout: 50000,

  capabilities: [{
    // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    // grid with only 5 firefox instances available you can make sure that not more than
    // 5 instances get started at a time.
    browserName: 'chrome',
    maxInstances: 5,
    chromeOptions: {
      args: [
        'start-maximized',
        '--enable-logging',
        '--v=1',
        "disable-extensions",
        "--no-sandbox",
        "window-size=1366,768"
      ]
    }
  }],

  onPrepare (config, capabilities) { // eslint-disable-line no-unused-vars
    chromedriver.start(["--port=" + config.port])
  },
  onComplete (result, capabilities, specs) { // eslint-disable-line no-unused-vars
    chromedriver.stop()
  }
}, { clone: false })
