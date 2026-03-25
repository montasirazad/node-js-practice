const environments = {};

environments.staging = {
  envName: "staging",
  port: 3000,
};

environments.development = {
  envName: "development",
  port: 5000,
};

const currentEnvironment =
  typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

const environmentToExport =
  typeof environments[currentEnvironment] === "object"
    ? environments[currentEnvironment]
    : "staging";

module.exports = environmentToExport;
