const type = require('./type');

const VERSION = '1.0';

module.exports = (eventName, additionalAttributes = {}) => {
  const [domain, event, ...detail] = eventName.split('.');

  if (!domain || !event) {
    throw new Error(`Event name "${eventName}" is invalid.`);
  }

  const attributes = {
    version: type(VERSION),
    domain: type(domain),
    event: type(event)
  };

  return Object.assign(attributes,
    (detail.length > 0 ? { detail: type(detail) } : null),
    Object.keys(additionalAttributes).reduce((obj, key) => Object.assign(obj, {
      [key]: type(additionalAttributes[key]),
    }), {})
  );
};