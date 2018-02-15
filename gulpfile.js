let gulp = require('gulp');
let rollup = require('rollup');
let rollupNodeResolve = require('rollup-plugin-node-resolve');
let rollupBabel = require('rollup-plugin-babel');
let rollupCommonjs = require('rollup-plugin-commonjs');
let rollupReplace = require('rollup-plugin-replace');
let rollupVue = require('rollup-plugin-vue');
let rollupUglify = require('rollup-plugin-uglify');
let rollupSass = require('rollup-plugin-sass');
let browserSync = require('browser-sync').create();
let autoprefixer = require('gulp-autoprefixer');
let plumber = require('gulp-plumber');
let cssmin = require('gulp-cssmin');
let sass = require('gulp-sass');
let path = require('path');
let fs = require('fs');
let shell = require('gulp-shell');

gulp.task('js', function () {
  return rollup.rollup({
    entry: "./src/script.js",
    plugins: [
      rollupNodeResolve(),
      rollupCommonjs(),
      rollupUglify(),
      rollupVue({
        css: 'src/scss/vuestyle.scss'
      }),
      rollupSass(),
      rollupBabel({
        exclude: 'node_modules/**',
      }),
      rollupReplace({
        'process.env.NODE_ENV': JSON.stringify('development'),
        'process.env.VUE_ENV': JSON.stringify('browser')
      }),
    ],
  })
    .then(function (bundle) {
      bundle.write({
        format: "iife",
        dest: "./build/js/script.js",
        sourceMap: 'inline'
      });
    })
});

gulp.task('scss', function () {
  gulp.src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(cssmin())
    .pipe(autoprefixer())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('img', function() {
  gulp.src('src/img/**/*')
    .pipe(gulp.dest('build/img'));
});

gulp.task('templates', function () {
  gulp.src('src/templates/**/*')
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
  gulp.watch('src/scss/**/*', ['scss']);
  gulp.watch('src/js/**/*', ['js']);
  gulp.watch('src/templates/**/*.html', ['templates']);
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./build"
    },
    files: ['./build/**/*'],
    reloadDebounce: 500,
    open: false
  });
});

gulp.task("test", shell.task("npm test"));

gulp.task('default', ['scss', 'js', 'templates', 'img']);
gulp.task('dev', ['default', 'watch', 'serve', 'test']);
