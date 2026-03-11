const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, { message: "This is sample Handler" });
};

module.exports = handler;
