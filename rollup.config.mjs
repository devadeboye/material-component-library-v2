import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
// import typescript from "rollup-plugin-typescript2";
// import importCss from "rollup-plugin-import-css";
// import postcss from "rollup-plugin-postcss";

const input = "./index.ts";
const output = {
	file: "./dist/index.js",
	format: "cjs",
	exports: "named",
};

export default {
	input,
	output,
	plugins: [
		resolve(),
		commonjs(),
		typescript({
			// Specify TypeScript options (optional)
			tsconfig: "tsconfig.json", // Adjust the path to your tsconfig.json file
			exclude: [
				"src/*.tsx",
				"src/*.css",
				"src/reportWebVitals.ts",
				"src/setupTests.ts",
			], // Specify files or patterns to exclude
		}),
		// importCss(),
		// postcss({
		// 	modules: true, // enable CSS modules if needed
		// 	extract: "dist/main.css", // specify the output path for the CSS file
		// 	exclude: "src/index.css",
		// }),
	],
};
