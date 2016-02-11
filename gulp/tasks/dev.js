var gulp = require("gulp");
var util = require("gulp-util");
var config = require("../config");

gulp.task("watch", () => {
	gulp.watch(`${config.ts.source.files}`, ["scripts"])
		.on("change", reportChange)
		.on("error", swallowError);
});

gulp.task("tdd", () => {
	gulp.watch(`${config.ts.source.files}`, ["test"])
		.on("change", reportChange)
		.on("error", swallowError);
})

var reportChange = function (event) {
	console.log(`File ${event.path} was ${event.type}, running tasks...`);
};

var swallowError = function (error) {
	console.log(util.colors.red(`Error occurred while running watched task...`));
};