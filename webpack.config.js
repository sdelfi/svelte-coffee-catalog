const path = require("path");
const sveltePreprocess = require("svelte-preprocess");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const SvelteCheckPlugin = require("svelte-check-plugin");

module.exports = (env) => {
  const isDev = !!(env && env.development);

  const projectExtensions = [".mjs", ".js", ".ts", ".svelte"];

  return {
    mode: isDev ? "development" : "production",
    entry: path.join(__dirname, "src/main.ts"),
    output: {
      clean: true,
      path: path.join(__dirname, "/build"),
      filename: "[contenthash].js",
      chunkFilename: "[name].[id].js",
    },
    resolve: {
      plugins: [
        new TsconfigPathsPlugin({
          extensions: projectExtensions,
        }),
      ],
      extensions: projectExtensions,
      mainFields: ["svelte", "browser", "module", "main"],
      conditionNames: ["svelte", "browser", "import"],
      alias: {
        svelte: path.join(__dirname, "node_modules", "svelte/src/runtime"),
      },
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: "html-loader",
        },
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: path.join(__dirname, "node_modules"),
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
        {
          test: /\.svelte$/,
          use: {
            loader: "svelte-loader",
            options: {
              compilerOptions: {
                dev: isDev,
              },
              hotReload: isDev,
              preprocess: sveltePreprocess(),
            },
          },
        },
        {
          // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
          test: /node_modules\/svelte\/.*\.mjs$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.less$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
              },
            },
            "less-loader",
          ],
        },
        {
          test: /\.(jpg|jpeg|png|svg)$/,
          use: "file-loader",
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({ filename: "./[contenthash].css" }),
      new HtmlWebpackPlugin({ template: "./public/index.html" }),
      new SvelteCheckPlugin(),
    ],
    devServer: {
      hot: true,
      static: {
        watch: true,
        directory: path.join(__dirname, "build"),
      },
    },
    optimization: !isDev
      ? {
          minimize: true,
          usedExports: true,
          minimizer: [new TerserPlugin({ parallel: true }), new CssMinimizerPlugin()],
        }
      : {},
  };
};
