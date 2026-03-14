const handler = {};
handler.sampleHandler = (requestProperties,callback) => {
  callback(200, {
    message: "This is a sample handler",
  });
  console.log("sample handler");
};
module.exports = handler;
