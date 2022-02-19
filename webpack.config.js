// var path = require("path");
// var htmlWebpackPlugin = require("html-webpack-plugin");
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config = {
  entry: path.resolve(__dirname, "src", "index.ts"), // src/index.js is the path of our js file from Step 3
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"), // you can name this however you want
    filename: "bundle.js", // this as well
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
export default config;
