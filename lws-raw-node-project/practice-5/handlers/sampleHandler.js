const handler = {};
handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    msg: "Sample handler",
  });
};

module.exports = handler;
