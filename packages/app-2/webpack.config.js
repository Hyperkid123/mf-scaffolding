const jsonpFunction = "wpJsonAppTwoSpace";

module.exports = {
  output: {
    jsonpFunction,
    library: "app",
    libraryTarget: "umd",
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
  }
};
