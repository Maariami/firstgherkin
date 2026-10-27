exports.config = {
  runner: "local",
  specs: ["./test/specs/**/*.spec.js"],
  maxInstances: 1,
  capabilities: [
    {
      browserName: "chrome",
    },
  ],
  baseUrl: "https://practicesoftwaretesting.com",
  waitforTimeout: 10000,
  framework: "mocha",
  reporters: ["spec"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
