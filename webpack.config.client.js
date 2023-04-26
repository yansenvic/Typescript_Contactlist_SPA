const path = require("path");

module.exports = {
  mode: "none",
  target: "web",
  entry: "./dist-js/client/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist", "public"),
  },
};
