const cmd = require('hearst-automation/commands');

/**
 * @param {Object} element
 * @param {string} attribute the attribute to find
 *
 * @returns {string} attribute's value
 */
const getElementAttribute = async (element, attribute) => {
  await cmd.waitForElementPresent(element);
  return cmd.getAttribute(element, attribute);
};

module.exports = { getElementAttribute };
