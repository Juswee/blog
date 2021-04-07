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
const shell = require('gulp-shell');

/* Paths */
const srcPath = '#src/';
const distPath = '#app/';

const path = {
  build: {
    html: distPath + 'templates/',
    html_blocks: distPath + 'templates/partials/',
    js: distPath + 'static/js/',
    css: distPath + 'static/css/',
    images: distPath + 'static/images/',
    fonts: distPath + 'static/fonts/',
  },
  src: {
    html: srcPath + '*.html',
    html_blocks: srcPath + 'partials/*.html',
    js: srcPath + 'assets/js/*.js',
    css: srcPath + 'assets/scss/*.scss',
    images:
      srcPath +
      'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  watch: {
    html: srcPath + '**/*.html',
    html_blocks: srcPath + 'partials/*.html',
    js: srcPath + 'assets/js/**/*.js',
    css: srcPath + 'assets/scss/**/*.scss',
    images:
      srcPath +
      'assets/images/**/*.{jpg,png,svg,gif,ico,webp,webmanifest,xml,json}',
    fonts: srcPath + 'assets/fonts/**/*.{eot,woff,woff2,ttf,svg}',
  },
  clean: {
    html: './' + distPath + 'templates/',
    assets: './' + distPath + 'static/',
  },
};

/* Tasks */
function html() {
  panini.refresh();
  return src(path.src.html, { base: srcPath })
    .pipe(plumber())
    .pipe(
      panini({
        root: srcPath,
        layouts: srcPath + 'layouts/',
        partials: srcPath + 'partials/',
        helpers: srcPath + 'helpers/',
        data: srcPath + 'data/',
      })
    )
    .pipe(dest(path.build.html))
}

function html_blocks() {
  return src(path.src.html_blocks)
    .pipe(dest(path.build.html_blocks))
}

function css() {
  return src(path.src.css, { base: srcPath + 'assets/scss/' })
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
  return src(path.src.css, { base: srcPath + 'assets/scss/' })
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
  return src(path.src.js, { base: srcPath + 'assets/js/' })
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
  return src(path.src.js, { base: srcPath + 'assets/js/' })
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
  del(path.clean.assets);
  return del(path.clean.html);
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.html_blocks], html_blocks);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, html_blocks, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles);

/* Exports Tasks */
exports.html = html;
exports.html_blocks = html_blocks;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
