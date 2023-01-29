const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const resolveTsconfigPathsToAlias = require('./resolveTsconfigPathsToWebpackAlias.js')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const tsconfigPathAliases = resolveTsconfigPathsToAlias({
  tsconfigPath: '../tsconfig.json', // Using custom path
  projectRoot: path.join(__dirname, '../'), // Using custom path
})

module.exports = {
  entry: path.resolve(__dirname, '..', './src/app/index.tsx'),
  resolve: {
    alias: {
      ...tsconfigPathAliases,
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015',
              sourcemap: true,
            },
          },
          {
            loader: 'esbuild-typescript-loader',
            options: {
              loader: 'ts',
              sourcemap: true,
            },
          },
        ],
      },
      {
        test: /\.tsx$/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'jsx',
              target: 'es2015',
              sourcemap: true,
            },
          },
          {
            loader: 'esbuild-typescript-loader',
            options: {
              loader: 'tsx',
              sourcemap: true,
            },
          },
        ],
      },

      { /* https://webpack.js.org/loaders/sass-loader/ */
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          `style-loader`, /* Creates `style` nodes from JS strings */

          { /* Translates CSS into CommonJS */
            loader: `css-loader`,
            options: {
              modules: {
                localIdentName: "[local]-[hash:base64:5]",
              },
            },
          },
          { /* Compiles Sass to CSS */
            loader: `sass-loader`,
            options: {
              api: `modern`, /* 🟡 https://webpack.js.org/loaders/sass-loader/#api */
              implementation: require.resolve(`sass`),
              sassOptions: {
                fiber: false,
              },
            },
          },
        ],
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/app/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        { from: './locales', to: 'locales' },
        { from: './favicon.ico', to: './favicon.ico' },
      ],
    }),
    new ForkTsCheckerWebpackPlugin(),
  ],

  stats: {
    logging: `error`,
    loggingDebug: [
      `sass-loader`, /* https://webpack.js.org/loaders/sass-loader/#how-to-enable-debug-output */
    ],
  },
}
