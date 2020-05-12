const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const ejs = require('gulp-ejs');
const cleanCss = require('gulp-clean-css');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const minimist = require('minimist');
const browserSync = require('browser-sync').create();
const runSequence = require('gulp4-run-sequence');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const path = require('path');
const destDir = './dist/';
const prodDir = './htdocs/';
const config = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
}
const options = minimist(process.argv.slice(2), config);
let isProd = (options.env === 'prod') ? true : false;
console.log('[build env]', options.env, '[isProd]', isProd);

const webpackConfig = require('./webpack.config');

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: destDir
    }
  });
});

gulp.task('sass', () => {
  return gulp.src(['src/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(rename(function (path) {
      path.dirname = 'assets/css'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 version', 'iOS >= 11', 'Android >= 5'],
      cascade: false
    }))
    .pipe(gulpif(isProd, cleanCss()))
    .pipe(gulpif(!isProd, gulp.dest(destDir)))
    .pipe(gulpif(isProd, gulp.dest(prodDir)))
});

gulp.task('webpack', () => {
  return webpackStream(webpackConfig, webpack)
    .on('error', function handleError() {
      this.emit('end');
    })
    .pipe(gulpif(!isProd, gulp.dest(destDir)))
    .pipe(gulpif(isProd, gulp.dest(prodDir)))
});

gulp.task('ejs', () => {
  return gulp.src(['src/templates/pages/**/*.ejs', '!src/templates/**/_*.ejs'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(ejs())
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(gulpif(!isProd, gulp.dest(destDir)))
    .pipe(gulpif(isProd, gulp.dest(prodDir)))
})

gulp.task('images', () => {
  return gulp.src(['src/images/**/*'])
    .pipe(gulpif(!isProd, gulp.dest(destDir + 'assets/images/')))
    .pipe(gulpif(isProd, gulp.dest(prodDir + 'assets/images/')))
});

gulp.task('bs-reload', () => {
  browserSync.reload();
});

gulp.task('build', gulp.series(
  gulp.parallel('sass', 'webpack', 'ejs', 'images')
));

gulp.task('default', gulp.series(
  gulp.parallel('browser-sync', 'sass', 'webpack', 'ejs', 'images', () => {
    watch(['src/styles/**/*.scss'], () => {
      return runSequence(
        'sass',
        'bs-reload'
      );
    });
    watch(['src/js/**/*'], () => {
      return runSequence(
        'webpack',
        'bs-reload'
      )
    });
    watch(['src/templates/**/*.ejs'], () => {
      return runSequence(
        'ejs',
        'bs-reload'
      );
    });
    watch(['src/images/**/*'], () => {
      return runSequence(
        'images',
        'bs-reload'
      );
    });
  })
));