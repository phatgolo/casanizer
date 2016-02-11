var gulp = require("gulp");
var path = require("path");
var runSeq = require("run-sequence");
var jasmine = require("gulp-jasmine");
var SpecReporter = require('jasmine-spec-reporter');
var merge = require("merge2");
var typescript = require("typescript");


var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require("gulp-plumber");

var config = require("../config");

var gutil = require("gulp-util");

var tsProject = tsc.createProject("tsconfig.json", {
	sortOutput: true,
	typescript: typescript
});

gulp.task("test", ["lint"], (cb) => {
	return runSeq(
		"compile:test",
		["run:test"],
	cb);
});

gulp.task("run:test", () => {
	gulp.src(config.jsSpec.source.files)
	.pipe(jasmine({
		reporter: new SpecReporter()
	}));
});

gulp.task("compile:test", () => {
	var tsResult = gulp.src([config.tsd.source.files, config.tsSpecs.source.files])
		.pipe(plumber())
		.pipe(tsc(tsProject));

	return merge([
		tsResult.js
			.pipe(gulp.dest(config.tsSpecs.destination.commonjs))
	]);
});