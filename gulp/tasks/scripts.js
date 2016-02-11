var gulp = require("gulp");
var tsc = require("gulp-typescript");
var gulpdebug = require("gulp-debug");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");

var runSeq = require("run-sequence");
var merge = require("merge2");
var typescript = require("typescript");
var dtsGen = require("dts-generator");

var config = require("../config");

gulp.task("scripts", ["lint"], (cb) => {
	return runSeq(
		["compile:ts"],
	cb);
});

gulp.task("scripts:rel", (cb) => {
	return runSeq(
		"scripts",
		cb);
});

gulp.task("compile:ts", () => {
	const tsProject = getTscOptions();

	const tsResult = gulp.src([config.tsd.source.files, config.ts.source.files, `!${config.tsSpecs.source.files}`])
		.pipe(plumber())
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(gulp.dest(config.ts.destination.commonjs)),
	]);
});

// // d.ts generation using dts-generator
// gulp.task("compile:dts", () => {
// 	return dtsGen.generate({
// 		name: `${config.packageName}`,
// 		baseDir: `${config.src.root}/`,
// 		files: ["./index.ts", `../${config.src.tsd}`],
// 		out: `${config.artifact.root}/${config.packageName}.d.ts`,
// 		main: `${config.packageName}/index`,
// 	});
// });

function getTscOptions() {
	return tsc.createProject("tsconfig.json", {
		sortOutput: true,
		typescript: typescript
	});
}