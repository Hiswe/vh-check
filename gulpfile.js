'use strict'

const gulp = require('gulp')
const pug = require('gulp-pug')
const args = require('yargs').argv
const Parcel = require('parcel-bundler')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const through = require('through2')
const beautify = require('js-beautify')

function onError(err) {
  if (err.annotated) {
    console.log(err.annotated)
  } else if (err.message) {
    console.log(err.message)
  } else {
    console.log(err)
  }
  return this.emit('end')
}

function beautifyHtml(opts = {}) {
  function modifyFile(file, enc, cb) {
    if (file.isNull()) return cb(null, file) // pass along
    if (file.isStream()) {
      return cb(new Error(`gulp-beautify: Streaming not supported`))
    }
    var str = file.contents.toString(`utf8`)
    file.contents = new Buffer.from(beautify.html(str, opts))
    cb(null, file)
  }

  return through.obj(modifyFile)
}

const isGhRelease = args[`gh-release`] === true
const DEMO = `dist-demo`

console.log(`building for ${isGhRelease ? 'GITHUB' : 'local demo'}`)
const html = () => {
  return gulp
    .src([`src-demo/*.pug`, `!src-demo/_*.pug`])
    .pipe(
      pug({
        locals: {
          root: isGhRelease ? `https://hiswe.github.io/vh-check` : ``,
        },
      })
    )
    .pipe(beautifyHtml({ indent_size: 2 }))
    .pipe(gulp.dest(DEMO))
}

const css = () => {
  return gulp.src([`src-demo/*.css`]).pipe(gulp.dest(DEMO))
}

const jsRuler = () => {
  return gulp.src([`src-demo/ruler.js`]).pipe(gulp.dest(DEMO))
}

function jsCommonJs() {
  return browserify({
    cache: {},
    packageCache: {},
    debug: false,
    entries: ['./src-demo/commonjs-example.js'],
  })
    .bundle()
    .on('error', onError)
    .pipe(source('commonjs-bundle.js'))
    .pipe(gulp.dest(DEMO))
}

function jsEsModule() {
  const entryFiles = [
    `./src-demo/esmodule-example.js`,
    `./src-demo/redefine-vh.js`,
  ]
  const bundler = new Parcel(entryFiles, {
    outDir: `./${DEMO}`,
    watch: false,
    minify: false,
    sourceMaps: false,
  })
  return bundler.bundle()
}

const js = gulp.parallel(jsRuler, jsEsModule, jsCommonJs)

exports.demo = gulp.parallel(html, css, js)
