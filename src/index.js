const Schema = require('./schema');

const { FABRIC_TOPIC, FABRIC_SCHEMA = '1.0' } = process.env;

const { [FABRIC_SCHEMA]: schema } = Schema;

module.exports = (eventName, body, additionalAttributes = {}) => {
  if (!schema) {
    throw new Error(`Fabric schema version "${FABRIC_SCHEMA}" invalid or missing.`);
  }

  const params = {
    Message: JSON.stringify(body),
    MessageAttributes: schema(eventName, additionalAttributes),
  };

  return Object.assign(params, 
    (FABRIC_TOPIC ? { TopicArn: FABRIC_TOPIC } : null)
  );
};