const handler = {};
handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    msg: "Route not found.",
  });
};

module.exports = handler;
