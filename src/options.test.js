import test from 'ava'

import getOptions from './options'
import * as methods from './methods'

const CUSTOM_CSS_VAR_NAME = `foo`

test(`compute difference – no options`, t => {
  const options = getOptions()
  t.is(options.cssVarName, `vh-offset`, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`compute difference – string option support`, t => {
  const options = getOptions(CUSTOM_CSS_VAR_NAME)
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`compute difference – change css var with object`, t => {
  const options = getOptions({ cssVarName: CUSTOM_CSS_VAR_NAME })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`compute difference – change force & getFullResult`, t => {
  const options = getOptions({ force: true, getFullResult: true })
  t.is(options.cssVarName, `vh-offset`, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, true, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`vh-unit – change method only`, t => {
  const options = getOptions({
    redefineVh: true,
  })
  t.is(options.cssVarName, `vh`, `css var name`)
  t.is(options.method, methods.redefineVhUnit, `method`)
  t.is(options.redefineVh, true, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`vh-unit – change method & var name`, t => {
  const options = getOptions({
    redefineVh: true,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME, `css var name`)
  t.is(options.method, methods.redefineVhUnit, `method`)
  t.is(options.redefineVh, true, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`vh-unit – misspell options`, t => {
  const options = getOptions({
    redefinevh: `bar`,
    cssvarname: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, `vh-offset`, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`vh-unit – misspell redefinevh with css var`, t => {
  const options = getOptions({
    redefinevh: `bar`,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, false, `update on scroll`)
})

test(`update on scroll`, t => {
  const options = getOptions({
    updateOnScroll: true,
  })
  t.is(options.cssVarName, `vh-offset`, `css var name`)
  t.is(options.method, methods.computeDifference, `method`)
  t.is(options.redefineVh, false, `redefine vh`)
  t.is(options.force, false, `force`)
  t.is(options.updateOnScroll, true, `update on scroll`)
})

test(`update callback`, t => {
  const defaultOptions = getOptions()
  t.is(defaultOptions.onUpdate.name, `noop`, `has a noop callback by default`)
  const options = getOptions({
    onUpdate: function customUpdateFunction() {},
  })
  t.is(
    options.onUpdate.name,
    `customUpdateFunction`,
    `has the user CB function if specified`
  )
  const badOptions = getOptions({
    onUpdate: `bad parameter`,
  })
  t.is(
    badOptions.onUpdate.name,
    `noop`,
    `revert to noop if onUpdate isn't a function`
  )
})
