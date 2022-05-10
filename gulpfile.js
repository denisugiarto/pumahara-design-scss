//list dependences
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const imagewebp = require("gulp-webp");
const nunjucksRender = require("gulp-nunjucks-render");

//create function
//html

function htmlTemplate() {
  return src("src/templates/pages/**/*.html")
    .pipe(nunjucksRender({ path: ["src/templates/components"] }))
    .pipe(dest("dist"));
}
//scss
function compilescss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix("last 2 versions"))
    .pipe(minify())
    .pipe(dest("dist/assets/css"));
}

//web images
function webpImage() {
  return src("src/images/*.{jpg, png}")
    .pipe(imagewebp())
    .pipe(dest("dist/assets/images"));
}

//svg
function svgCopy() {
  return src("src/images/*.svg").pipe(dest("dist/assets/images"));
}

//font fontello
function fontCopy() {
  return src("src/fonts/**/*").pipe(dest("dist/assets/fonts"));
}

//create watch task
function watchTask() {
  watch("src/templates/**/**/*", htmlTemplate);
  watch("src/scss/*.scss", compilescss);
  watch("src/images/*.{jpg, png}", webpImage);
  watch("src/images/*.svg", svgCopy);
  watch("src/fonts/**/*", fontCopy);
}

//default gulp
exports.default = series(
  htmlTemplate,
  compilescss,
  webpImage,
  svgCopy,
  fontCopy,
  watchTask
);
