const path = require("path");

module.exports = {
  entry: "./src/renderer",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
      {
        test: /\.node$/,
        use: "node-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  target: "electron-renderer",
};
