/**
 * Public path for this filemanager.
 * @see https://cli.vuejs.org/config/#publicpath
 *
 * @const
 * @type {string}
 */
const PUBLIC_PATH = "/vendor/kibo-filemanager/";

/**
 * Output directory for build
 * @see https://cli.vuejs.org/config/#outputdir
 *
 * @const
 * @type {string}
 */
const OUTPUT_DIR =
  "/home/tomas/workspace-atom/express-bootstrap/public/vendor/kibo-filemanager";

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? PUBLIC_PATH : "/",
  outputDir: OUTPUT_DIR,
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
