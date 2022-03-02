/**
 * Convert a string setting to a boolean
 *
 * @param {string} setting Setting
 * @return {boolean} True if truthy
 */
const isTruthy = (setting) => {
  if (!setting) {
    return false;
  }

  const normalized = setting.toString().toLowerCase();
  switch (normalized) {
    case 'false':
    case 'f':
    case 'no':
    case 'n':
    case 'disabled':
    case '0':
      return false;

    default:
      return true;
  }
};

module.exports = { isTruthy };
