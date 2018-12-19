const Schema = require('./schema');

const { FABRIC_TOPIC, FABRIC_SCHEMA = '1.0' } = process.env;

const { [FABRIC_SCHEMA]: schema } = Schema;

module.exports = (eventName, body, additionalAttributes = {}) => {
  if (!schema) {
    throw new Error(`Fabric schema version "${FABRIC_SCHEMA}" invalid or missing.`);
  }
  return {
    Message: JSON.stringify(body),
    MessageAttributes: schema(eventName, additionalAttributes),
    ...(FABRIC_TOPIC ? { TopicArn: FABRIC_TOPIC } : null),
  };
};