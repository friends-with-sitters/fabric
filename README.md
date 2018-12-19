# 👕 Fabric

A tiny node utility for reliably transforming events into SNS Message Attributes for our infrastructure.

## Schema v1.0

Messages published to Fabric **must** include the following required attributes, in-order to be valid. Additional attributes are optional.

**Domains and Events are described in camelCase.**

```json
{
  "version": "1.0",
  "domain": "user",
  "event": "confirmed"
}
```

## Basic Usage

```js
import SNS from 'aws-sdk/clients/sns';
import fabric from '@friendswithsitters/fabric';

const sns = new SNS({ region: 'us-east-1' });

const customer = {
  interests: ['rugby', 'football', 'basketball'],
  price: 210.75,
};

const message = { productName: 'rugby ball' };

return sns.publish({
  TopicArn: SOME_TOPIC_ARN,
  ...fabric('store.orderPlaced', message, customer),
}).promise();
```

This would produce the following SNS Payload.

> Note if the environment variable `FABRIC_TOPIC` is set, the property `TopicArn` is automatically populated.

```json
{
  "TopicArn": "some:topic:arn:1234567",
  "Message": "{\"productName\":\"rugby ball\"}",
  "MessageAttributes": {
    "version": {
      "DataType": "String",
      "StringValue": "1.0"
    },
    "domain": {
      "DataType": "String",
      "StringValue": "store"
    },
    "event": {
      "DataType": "String",
      "StringValue": "orderPlaced"
    },
    "interests": {
      "DataType": "String.Array",
      "StringValue": "[\"rugby\",\"football\",\"basketball\"]"
    },
    "price": {
      "DataType": "Number",
      "StringValue": "210.75"
    }
  }
}
```