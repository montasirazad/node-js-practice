const environments = {};

environments.staging = {
  port: 3000,
  envName: "staging",
};

environments.development = {
  port: 5000,
  envName: "dev",
};

const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : "staging";

module.exports = environmentToExport;
