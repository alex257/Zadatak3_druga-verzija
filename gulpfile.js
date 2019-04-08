const gulp = require("gulp");

browserSync = require("browser-sync").create();
sass = require("gulp-sass");
cleanCSS = require("gulp-clean-css");

autoprefixer = require("gulp-autoprefixer");
sourcemaps = require("gulp-sourcemaps");

terser = require("gulp-terser");
minify = require("gulp-minify");
//gulpCopy = require('gulp-copy');


function style() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sourcemaps.init())

    .pipe(sass().on("error", sass.logError))

    .pipe(
      autoprefixer({
        browsers: ["last 2 version", "> 5%"],
        cascade: false
      })
    )

    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("src/css"))

    .pipe(browserSync.stream());
}

function es() {
  return gulp
    .src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write())
    .pipe(minify())

    .pipe(gulp.dest("dist/js"));
}

/*function copyHtml(){
        return gulp.src('src/*.html')
        .pipe(gulpCopy())
        .pipe(gulp.dest('dist'))
        //.dest('dist/')
        .pipe(browserSync.stream());;
      }*/

function copyHtml() {
  return gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());
}

function copyImages() {
  return gulp.src("src/img/*.{gif,jpg,png,svg}").pipe(gulp.dest("dist/img"));
}

function copyFonts() {
  return gulp
    .src("src/fonts/*.{txt,woff,woff2,ttf}")
    .pipe(gulp.dest("dist/fonts"));
}

function copyCss() {
  return gulp.src("src/css/*.css").pipe(gulp.dest("dist/css"))
  .pipe(browserSync.stream());
}

/*
function copyJs() {
  return gulp.src("src/js/main-min.js").pipe(gulp.dest("dist/js"));
}*/

function watch() {
  browserSync.init({
    server: "./src"
  });

  gulp.watch("src/scss/**/*.scss", style);
  gulp.watch("src/*.html").on("change", browserSync.reload);
  gulp.watch("src/*.html", copyHtml);
  gulp.watch("src/img/*.{gif,jpg,png,svg}", copyImages);
  gulp.watch("src/fonts/*.{txt,woff,woff2,ttf}", copyFonts);
  gulp.watch("src/css/*.css", copyCss);
  gulp.watch("src/js/*.js").on("change", browserSync.reload);
  //gulp.watch("src/js/main-min.js", copyJs);
}

exports.style = style;
exports.es = es;
exports.watch = watch;
exports.copyHtml = copyHtml;
exports.copyImages = copyImages;
exports.copyFonts = copyFonts;
exports.copyCss = copyCss;
//exports.copyJs = copyJs;

// exports.default = build;

const build = gulp.parallel(
  style,
  es,
  watch,
  copyHtml,
  copyImages,
  copyFonts,
  copyCss,
  //copyJs
);

gulp.task(build);
gulp.task("default", build);
