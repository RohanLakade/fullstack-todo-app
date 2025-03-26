const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development", // Change to 'production' for production build
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./", // Ensure assets are served from root (important for React Router)
  },
  resolve: {
    extensions: [".js", ".jsx"], // Allows importing files without specifying extensions
    alias: {
      "@src": path.resolve(__dirname, "src/"),
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
  devtool: "inline-source-map", // 🔹 Enables better debugging
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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|otf|eot)$/i, // Handles font files
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Handle images
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]", // Store images inside `dist/images/`
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv(),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true, // Ensures proper handling of React Router routes
  },
};
