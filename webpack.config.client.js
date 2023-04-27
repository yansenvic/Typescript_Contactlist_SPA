const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "none",
  target: "web",
  entry: "./dist-js/client/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist", "public"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "dist", "index.html"),
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
