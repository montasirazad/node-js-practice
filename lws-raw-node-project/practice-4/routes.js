const { checkHandler } = require("./handlers/checkHandler");
const { sampleHandler } = require("./handlers/sampleHandler");
const { tokenHandler } = require("./handlers/tokenHandler");
const { userHandler } = require("./handlers/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
  check: checkHandler,
};

module.exports = routes;
