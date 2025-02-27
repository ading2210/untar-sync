const common_options = {
  mode: "development",
  optimization: {mangleExports: false, minimize: false},
  entry: "./src/untar.js",
}

module.exports = [
  {
    ...common_options,
    name: "untar_var",
    output: {
      filename: "untar.js",
      library: {
        name: "untar",
        type: "var"
      }
    },
  },
  {
    ...common_options,
    name: "untar_es6",
    output: {
      filename: "untar.mjs",
      library: {
        type: "module"
      }
    },
    experiments: {
      outputModule: true
    }
  }
]