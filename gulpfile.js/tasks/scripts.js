'use strict';

const { paths: { source, destination } } = require('../paths');
const { src, dest } = require('gulp');
const gulpIf = require('gulp-if');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const isDev = !process.env.NODE_ENV;

const scripts = () =>
  src([
    `${source.scripts}utils.js`,
    `${source.scripts}formulas.js`,
    `${source.scripts}validation.js`,
    `${source.scripts}hamburger.js`,
    `${source.scripts}segments.js`,
    `${source.scripts}sections-handler.js`,
    `${source.scripts}calculate.js`,
    `${source.scripts}results.js`,
    `${source.scripts}main.js`], { sourcemaps: true })
    .pipe(babel())
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulpIf(isDev, dest(destination.scripts, { sourcemaps: true }), dest(destination.scripts)));

module.exports = scripts;
