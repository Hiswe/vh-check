'use strict'

const gulp = require('gulp')
const pug = require('gulp-pug')
const htmlBeautify = require('gulp-html-beautify')
const args = require('yargs').argv

const isGhRelease = args[`gh-release`] === true
const DEMO = `dist-demo`

console.log(`building for ${isGhRelease ? 'GITHUB' : 'local demo'}`)
const html = () => {
  return gulp
    .src([`demo/*.pug`, `!demo/_*.pug`])
    .pipe(
      pug({
        locals: {
          root: isGhRelease ? `https://hiswe.github.io/vh-check` : ``,
        },
      })
    )
    .pipe(htmlBeautify({ indent_size: 2 }))
    .pipe(gulp.dest(DEMO))
}

const css = () => {
  return gulp.src([`demo/*.css`]).pipe(gulp.dest(DEMO))
}

const js = () => {
  return gulp.src([`demo/ruler.js`]).pipe(gulp.dest(DEMO))
}

exports.demo = gulp.parallel(html, css, js)
