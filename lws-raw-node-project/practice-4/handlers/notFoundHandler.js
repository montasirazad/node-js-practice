const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "This is route is not found",
  });
};
module.exports = handler;
