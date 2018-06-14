'use strict'

const gulp = require('gulp')
const pug = require('gulp-pug')
const args = require('yargs').argv

const isGhRelease = args[`gh-release`] === true

console.log(`building for ${isGhRelease ? 'GITHUB' : 'local demo'}` )
const html = () => {
  return gulp
  .src([`demo/*.pug`, `!demo/_*.pug`])
  .pipe( pug({
    locals: {
      root: isGhRelease ? `https://hiswe.github.io/vh-check` : ``
    }
  }) )
  .pipe( gulp.dest(`dist-demo`))
}

const css = () => {
  return gulp
  .src([`demo/*.css`])
  .pipe( gulp.dest(`dist-demo`))
}

exports.demo = gulp.parallel(html, css)
