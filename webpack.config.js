module.exports = {
  entry: "./src/phoneNumberFormatter.js",
  output: {
    path: "./lib/",
    filename: "phoneNumberFormatter.js"
  },
  module: {
    loaders: [
      {
        enforce: "pre",
        test: /\.js$/,
         loader: "eslint-loader",
         exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  eslint: {
    configFile: './.eslintrc.json'
  }
};
