var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var srcRoot = "src";
var artifactRoot = "_artifact";
const tsdMainFile = "typings/tsd.d.ts";

module.exports = {
	output: {
		root: "dist",
	},
	src: {
		root: srcRoot,
		ts: `${srcRoot}/**/*.ts`,
		tsd: tsdMainFile
	},
	artifact: {
		root: artifactRoot,
		commonjs: `${artifactRoot}/commonjs`
	},
	test: {
		files: `${srcRoot}/**/*.spec.{ts,d.ts}`,
		output: `${artifactRoot}/**/*.spec.js`
	},
	doc: "./doc",
	packageName: pkg.name
};