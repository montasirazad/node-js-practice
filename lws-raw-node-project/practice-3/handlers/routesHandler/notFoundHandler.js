const handler = {};
handler.notFoundHandler = (requestProperties,callback) => {
  callback(404, {
    message: "The url you entered not found",
  });
  console.log("Not found handler");
};
module.exports = handler;
