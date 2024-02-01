const gulp = require("gulp");

const srcPath = "./src/templates/*.hbs";
const destPath = "lib/templates";

gulp.task("copy-templates", function () {
  return gulp.src(srcPath).pipe(gulp.dest(destPath));
});

gulp.task("default", gulp.series("copy-templates"));
