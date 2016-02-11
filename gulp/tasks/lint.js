var gulp = require("gulp");
var tslint = require("gulp-tslint");
var stylish = require("gulp-tslint-stylish");

var config = require("../config");

gulp.task("lint", () => {
	return gulp.src([config.ts.source.files])
		.pipe(tslint())
		.pipe(tslint.report(stylish, {
			emitError: false,
			sort: true,
			bell: true
		}));
});