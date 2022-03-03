/* eslint-disable import/no-extraneous-dependencies */
/* global browser, protractor */
const tags = require('hearst-automation/utilities/mochaDynamicTesting')();

const testRetries = process.env.UI_TESTS_RETRIES || 3;
const timeout = process.env.PROTRACTOR_TIMEOUT || 90000;

exports.config = {
  // tests
  suites: {
    smoke: './smoke/paymentPage/**.js',
  },

  framework: 'mocha',
  mochaOpts: {
    timeout,
    asyncOnly: true,
    reporter: 'spec',
    retries: testRetries,
    grep: tags,
  },

  capabilities: {
    browserName: process.env.BROWSER_NAME || 'chrome',
    chromeOptions: {
      args: ['--window-size=1366,768', '--no-sandbox'],
    },
  },

  //   selenium server address
  seleniumAddress:
    process.env.SELENIUM_ADDRESS || 'http://localhost:4444/wd/hub',

  // test set up
  onPrepare() {
    // ignore synchronization; this is only needed for angular apps
    browser.ignoreSynchronization = true;

    // define global vars
    global.wd = browser.driver;
    global.defaultWaitTimeout = 50000;
    global.ec = protractor.ExpectedConditions;
    global.payPalEmail = process.env.PAYPAL_EMAIL;
    global.payPalPassword = process.env.PAYPAL_PASSWORD;
  },
};
