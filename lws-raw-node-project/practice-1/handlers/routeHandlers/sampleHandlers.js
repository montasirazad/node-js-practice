const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    message: "This is sample url",
  });
  console.log("sample handler");
};

module.exports = handler;
