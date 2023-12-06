// webpack.config.js
const path = require("path");

module.exports = {
	mode: "production", // or 'development' for debugging
	entry: "./index.ts",
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
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},
};
