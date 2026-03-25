const { notFoundHandler } = require("./handlers/notFoundHandler");
const { sampleHandler } = require("./handlers/sampleHandler");

const routes = {
  sample: sampleHandler,
  notFoundHandler: notFoundHandler,
};

module.exports = routes;
