var fs = require("fs");

var pkg = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
var srcRoot = "src";
var artifactRoot = "_artifact";
var distributionRoot = "dist";
const tsdMainFile = "typings/tsd.d.ts";
const moduleSystem = "commonjs";

module.exports = {
	destinations: {
		dist: distributionRoot,
		artifact: artifactRoot,
	},
	ts: {
		source: {
			root: srcRoot,
			files: `${srcRoot}/**/*.ts`,
		},
		destination: {
			root: artifactRoot,
			commonjs: `${artifactRoot}/commonjs`
		}
	},
	tsSpecs: {
		source: {
			root: srcRoot,
			files: `${srcRoot}/**/*.spec.ts`,
		},
		destination: {
			root: artifactRoot,
			commonjs: `${artifactRoot}/commonjs`
		}
	},
	tsd: {
		source: {
			files: tsdMainFile
		}
	},
	js: {
		source: {
			root: artifactRoot,
			files: `${artifactRoot}/**/*.js`
		},
		destination: {
			root: distributionRoot,
			commonjs: `${distributionRoot}/commonjs`
		}
	},
	jsSpec: {
		source: {
			root: artifactRoot,
			files: `${artifactRoot}/**/*.spec.js`
		}
	},	
	packageName: pkg.name
};