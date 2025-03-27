const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "js/[name].[contenthash].js", // 🔹 Cache busting with contenthash
    path: path.resolve(__dirname, "dist"),
    publicPath: "./", // 🔹 Important for React Router (Serves files correctly)
    clean: true, // 🔹 Cleans old files in `dist/` on every build
  },
  resolve: {
    extensions: [".js", ".jsx"], // Allows importing files without specifying extensions
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@componentUtils": path.resolve(__dirname, "src/components/utils"),
      "@context": path.resolve(__dirname, "src/context"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@fonts": path.resolve(__dirname, "src/fonts"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@navigations": path.resolve(__dirname, "src/navigations"),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Handles .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|otf|eot)$/i, // Handles font files
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash][ext]", // 🔹 Cache busting for fonts
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Handle images
        type: "asset/resource",
        generator: {
          filename: "images/[name].[hash][ext]", // 🔹 Cache busting for images
        },
      },
    ],
  },
  optimization: {
    minimize: true, // 🔹 Enable minification
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()], // 🔹 Minifies JS & CSS
    splitChunks: {
      chunks: "all", // 🔹 Split vendor and app code
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css", // 🔹 Extracted CSS with cache busting
    }),
    new Dotenv({
      systemvars: true, // Allows access to Vercel & GitHub Actions environment variables
    }),
  ],
};
