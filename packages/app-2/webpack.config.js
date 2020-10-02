const path = require("path");
const jsonpFunction = "wpJsonAppTwoSpace";

module.exports = {
  output: {
    jsonpFunction,
    library: "app",
    libraryTarget: "umd",
  },
  resolve: {
    alias: {
      react: path.resolve("../../node_modules/react"),
      "react-dom": path.resolve("../../node_modules/react-dom"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
