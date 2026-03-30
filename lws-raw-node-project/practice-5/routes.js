const { sampleHandler } = require("./handlers/sampleHandler");
const { tokenHandler } = require("./handlers/tokenHandler");
const { userHandler } = require("./handlers/userHandler");
const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
