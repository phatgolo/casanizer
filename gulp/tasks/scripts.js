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

gulp.task("scripts", (cb) => {
	return runSeq(
		["compile:ts"/*, "compile:dts"*/],
		cb);
});

gulp.task("scripts:rel", (cb) => {
	return runSeq(
		"scripts",
		cb);
});

gulp.task("compile:ts", () => {
	const tsProject = getTscOptions();

	const tsResult = gulp.src([config.src.tsd, config.src.ts, `!${config.test.files}`])
	// .pipe(plumber())
		.pipe(gulpdebug({ title: "ts1:" }))
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(gulpdebug({ title: "ts2:" }))
			.pipe(gulp.dest(config.artifact.commonjs)),
	]);
});

// d.ts generation using dts-generator
gulp.task("compile:dts", () => {
	return dtsGen.generate({
		name: `${config.packageName}`,
		baseDir: `${config.src.root}/`,
		files: ["./index.ts", `../${config.src.tsd}`],
		out: `${config.artifact.root}/${config.packageName}.d.ts`,
		main: `${config.packageName}/index`,
	});
});

function getTscOptions() {
	return tsc.createProject("tsconfig.json", {
		sortOutput: true,
		typescript: typescript
	});
}