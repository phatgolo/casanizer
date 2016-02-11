var gulp = require("gulp");
var runSeq = require("run-sequence");

var config = require("../config");

gulp.task("build", (cb) => {
	return runSeq(
		"compile:ts",
		["compile:test"],
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
			`${config.destination.artifact}/**/*`,
			`!${config.jsSpec.source.files}`])
		.pipe(gulp.dest(config.output.root));
});