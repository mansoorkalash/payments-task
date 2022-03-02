const { isTruthy } = require('./isTruthy');

const { LOCAL, TRAVIS_PULL_REQUEST, PAYMENT_URL } = process.env;
const localUrl = 'http://payments-ui.docker';

const baseUrl = (() => {
  if (isTruthy(TRAVIS_PULL_REQUEST)) {
    return `https://payments-ui-${TRAVIS_PULL_REQUEST}.cdsshopqa.cdsglobalapps.net`;
  }

  if (LOCAL) {
    return localUrl;
  }

  return PAYMENT_URL && PAYMENT_URL !== localUrl
    ? PAYMENT_URL
    : 'https://payments-ui.cdsshopqa.cdsglobalapps.net';
})();

module.exports = { baseUrl };
