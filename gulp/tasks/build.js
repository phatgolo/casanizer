var gulp = require("gulp");
var runSeq = require("run-sequence");

var config = require("../config");

gulp.task("build", (cb) => {
	return runSeq(
		["scripts"],
		cb);
});

gulp.task("build:rel", (cb) => {
	return runSeq(
		["scripts", "compile:test"],
		"build:copy-dist",
		cb);
});

gulp.task("rebuild", (cb) => {
	return runSeq(
		"clean",
		"build",
		cb);
});

gulp.task("build:copy-dist", () => {
	return gulp.src([
			`${config.artifact.root}/**/*`,
			`!${config.test.output}`])
		.pipe(gulp.dest(config.output.root));
});