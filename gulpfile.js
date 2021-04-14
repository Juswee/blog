'use strict';

const { src, dest } = require('gulp');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const removeComments = require('gulp-strip-css-comments');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');
const panini = require('panini');
const imagemin = require('gulp-imagemin');
const del = require('del');
const notify = require('gulp-notify');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();

/* Paths */
const distPath = '#app/';

const path = {
  build: {
    js: distPath + 'static/js/',
    css: distPath + 'static/css/',
    images: distPath + 'static/images/',
    fonts: distPath + 'static/fonts/',
  },
  src: {
    js: distPath + 'assets/js/*.js',
    css: distPath + 'assets/scss/*.scss',
    images:
      distPath +
      'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: distPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  watch: {
    js: distPath + 'assets/js/**/*.js',
    css: distPath + 'assets/scss/**/*.scss',
    images:
      distPath +
      'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: distPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  clean: ['./' + distPath + 'static/**/*.*', '!./' + distPath + 'static/*.db', '!./' + distPath + 'static/images/uploads/*.*'],
};

/* Tasks */
function css() {
  return src(path.src.css)
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(
      sass({
        includePaths: './node_modules/',
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(
      cssnano({
        zindex: false,
        discardComments: {
          removeAll: true,
        },
      })
    )
    .pipe(removeComments())
    .pipe(
      rename({
        suffix: '.min',
        extname: '.css',
      })
    )
    .pipe(dest(path.build.css))
}

function cssWatch() {
  return src(path.src.css)
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'SCSS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(
      sass({
        includePaths: './node_modules/',
      })
    )
    .pipe(
      rename({
        suffix: '.min',
        extname: '.css',
      })
    )
    .pipe(dest(path.build.css))
}

function js() {
  return src(path.src.js)
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'JS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(
      webpackStream({
        mode: 'development',
        output: {
          filename: 'app.js',
        },
        module: {
          rules: [
            {
              test: /\.(js)$/,
              exclude: /(node_modules)/,
              loader: 'babel-loader',
              query: {
                presets: ['@babel/preset-env'],
              },
            },
          ],
        },
      })
    )
    .pipe(dest(path.build.js))
}

function jsWatch() {
  return src(path.src.js, { base: distPath + 'assets/js/' })
    .pipe(
      plumber({
        errorHandler: function (err) {
          notify.onError({
            title: 'JS Error',
            message: 'Error: <%= error.message %>',
          })(err);
          this.emit('end');
        },
      })
    )
    .pipe(
      webpackStream({
        mode: 'production',
        output: {
          filename: 'app.js',
        },
      })
    )
    .pipe(dest(path.build.js))
}

function images() {
  return src(path.src.images)
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 95, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest(path.build.images))
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function clean() {
  return del(path.clean);
}

function watchFiles() {
  gulp.watch([path.watch.css], cssWatch);
  gulp.watch([path.watch.js], jsWatch);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles);

/* Exports Tasks */
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
