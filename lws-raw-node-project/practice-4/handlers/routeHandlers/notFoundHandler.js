const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    message: "This is route is not found",
  });
  console.log("This is not found route");
};
module.exports = handler;
