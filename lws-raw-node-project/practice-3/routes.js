const { sampleHandler } = require("./handlers/routesHandler/sampleHandler");
const { tokenHandler } = require("./handlers/routesHandler/tokenHandler");
const { userHandler } = require("./handlers/routesHandler/userHandler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
  token: tokenHandler,
};

module.exports = routes;
