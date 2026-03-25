const handler = {};
handler.notfoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "Route not found",
  });
};

module.exports = handler;
