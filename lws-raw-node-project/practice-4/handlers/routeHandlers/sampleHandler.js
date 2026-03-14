const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  callback(200, {
    message: "This is sample route",
  });
  console.log("This is sample handler");
};
module.exports = handler;
