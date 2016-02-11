var gulp = require("gulp");
var runSeq = require("run-sequence");
var fs = require("fs");
var changelog = require("conventional-changelog");
var bump = require("gulp-bump");
var args = require("../args");

gulp.task("prepare-release", (cb) => {
	return runSeq(
		"clean",
		"build:rel",
		"bump-version",
		cb);
});

gulp.task("bump-version", () => {
	return gulp.src(["./package.json", "./bower.json"])
		.pipe(bump({type: args.bump, preid: args.versionSuffix})) //major|minor|patch|prerelease
		.pipe(gulp.dest("./"));
});