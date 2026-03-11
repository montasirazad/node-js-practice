const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, { message: "Requested url not found" });
};

module.exports = handler;
