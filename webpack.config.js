const path = require("path")

module.exports = {
  entry: ["regenerator-runtime/runtime.js", path.resolve(__dirname, "src/index.ts")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "maxtap.min.js",
    library: "Maxtap",
    libraryTarget: "var",
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[hash:base64]", // default
                auto: true // default
              },
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  watch: false,
  mode: "production",
  optimization: {
    minimize: true,
  },
}
