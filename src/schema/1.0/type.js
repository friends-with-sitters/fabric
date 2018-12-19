module.exports = val => {
  switch (val.constructor) {
    case String:
      return {
        DataType: 'String',
        StringValue: val,
      };
    case Number:
      return {
        DataType: 'Number',
        StringValue: val.toString(),
      };
    case Array:
      return {
        DataType: 'String.Array',
        StringValue: JSON.stringify(val),
      };
    case Buffer:
    case Blob:
      return {
        DataType: 'Binary',
        BinaryValue: val,
      }
    default:
      throw new Error(`Unrecognised type "${val.constructor}" for value "${val}"`);
  }
};