// webpack.config.js
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "production", // or 'development' for debugging
	entry: "./src/lib/index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
		library: "material-component-library-v2",
		libraryTarget: "umd",
		umdNamedDefine: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: ".npmignore", to: "" },
				{ from: "package.json", to: "" },
			],
		}),
	],
};
