const path = require("path")

module.exports = {
  entry: ["regenerator-runtime/runtime.js", path.resolve(__dirname, "src/index.ts")],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "plugin.js",
    library: "Maxtap",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css']
  },

  //👋 👋 👋
  
  module: {
    rules: [
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.(less|scss|css)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
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
    ],
  },
  watch: false,
  mode: "production",
  optimization: {
    minimize: true,
  },
}
