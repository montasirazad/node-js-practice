const { sampleHandler } = require("./handlers/sampleHandler");
const { userHandler } = require("./handlers/userHandler");

const routes = { sample: sampleHandler, user: userHandler };

module.exports = routes;
