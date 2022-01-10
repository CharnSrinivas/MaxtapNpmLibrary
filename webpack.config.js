const path = require("path")

module.exports = {
  entry: ["regenerator-runtime/runtime.js", path.resolve(__dirname, "lib/index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "plugin.js",
    library: "Maxtap",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "babel-loader",

      },
    ],
  },
  watch: false,
  mode: "production",
  optimization: {
    minimize: true,
  },
}
