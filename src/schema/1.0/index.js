const type = require('./type');

const VERSION = '1.0';

module.exports = (eventName, additionalAttributes = {}) => {
  const [domain, event, ...detail] = eventName.split('.');

  if (!domain || !event) {
    throw new Error(`Event name "${eventName}" is invalid.`);
  }

  return {
    version: type(VERSION),
    domain: type(domain),
    event: type(event),
    ...(detail.length > 0 ? { detail: type(detail) } : null),
    ...Object.keys(additionalAttributes).reduce((obj, key) => ({
      ...obj,
      [key]: type(additionalAttributes[key]),
    }), {}),
  };
};