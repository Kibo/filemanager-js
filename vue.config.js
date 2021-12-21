module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    output: {
      filename: "filemanager.js",
    },
  },
  filenameHashing: false,
  lintOnSave: false,
  css: {
    extract: false,
  },
};
