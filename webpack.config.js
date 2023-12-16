const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SveltePreprocess = require('svelte-preprocess');

module.exports = (env) => {
  const isDev = !!(env && env.development);

  return {
    mode: isDev ? 'development' : 'production',
    entry: {
      'build/bundle': ['./src/main.ts'],
    },
    output: {
      path: path.join(__dirname, '/public'),
      filename: '[name].js',
      chunkFilename: '[name].[id].js',
    },
    resolve: {
      alias: {
        svelte: path.resolve('node_modules', 'svelte/src/runtime'),
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
      conditionNames: ['svelte', 'browser', 'import'],
    },
    module: {
      rules: [
        {
          test: /\.(html|svelte)$/,
          use: {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: isDev,
              },
              emitCss: !isDev,
              hotReload: isDev,
              preprocess: SveltePreprocess(),
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
              loader: 'css-loader',
              options: {
                url: false, // necessary if you use url('/path/to/some/asset.png|jpg|gif')
              },
            },
            'less-loader',
          ],
        },
      ],
    },
    plugins: [new MiniCssExtractPlugin({ filename: './[name].css' })],
    devServer: {
      hot: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
    },
  };
};
