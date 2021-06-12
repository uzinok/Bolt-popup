const {
  src,
  dest,
  parallel,
  series,
  watch
} = require('gulp');
// clean
const del = require('del');
// less
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
// html
const htmlmin = require('gulp-htmlmin');
// js
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');
// browserSync
const browserSync = require('browser-sync').create();
// error
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

/**
 * clean
 */
const clean = () => {
  return del('build');
}
exports.clean = clean;

/**
 * less
 */
const lessToCss = () => {
  return src('src/less/style.less')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'Less',
          message: err.message
        }
      })
    }))
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(csso())
    .pipe(dest('build/css'))
    .pipe(browserSync.stream());
}
exports.lessToCss = lessToCss;

/**
 * html
 */
const htmlTo = () => {
  return src('src/*.html')
    .pipe(htmlmin({
      removeComments: false,
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
    .pipe(browserSync.stream());
}
exports.htmlTo = htmlTo;

const scripts = () => {
  return src('src/js/main.js')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'js',
          message: err.message
        }
      })
    }))
    .pipe(concat('main.js', {
      newLine: ';'
    }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js'
      },
      exclude: ['tasks']
    }))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
}
exports.scripts = scripts;

/**
 * browserSync
 */
const server = () => {
  browserSync.init({
    server: {
      baseDir: './build/'
    }
  });

  watch('src/less/**/*.less', lessToCss);
  watch('src/*.html', htmlTo);
  watch('src/js/**/*.js', scripts);
}
exports.server = server;

/**
 * default
 */
exports.default = series(clean, parallel(lessToCss, scripts, htmlTo), server);

/**
 * build
 */
/**
 * less to build
 */

const lessToCssBuild = () => {
  return src('src/less/style.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ['last 5 versions']
    }))
    .pipe(csso())
    .pipe(dest('build/css'))
}
exports.lessToCssBuild = lessToCssBuild;

/**
 * scripts to build
 */


const scriptsBuild = () => {
  return src('src/js/main.js')
    .pipe(plumber({
      errorHandler: notify.onError(function (err) {
        return {
          title: 'js',
          message: err.message
        }
      })
    }))
    .pipe(concat('main.js', {
      newLine: ';'
    }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(minify({
      ext: {
        src: '.js',
        min: '.min.js'
      },
      exclude: ['tasks']
    }))
    .pipe(dest('build/js'))
    .pipe(browserSync.stream());
}
exports.scriptsBuild = scriptsBuild;

/**
 * html to build
 */
const htmlToBuild = () => {
  return src('src/*.html')
    .pipe(htmlmin({
      removeComments: false,
      collapseWhitespace: true
    }))
    .pipe(dest('build'))
}
exports.htmlToBuild = htmlToBuild;

exports.build = series(clean, parallel(lessToCssBuild, scriptsBuild, htmlToBuild));