import test from 'ava'

import getOptions from './options'

const CUSTOM_CSS_VAR_NAME = `foo`

test(`compute difference – no options`, t => {
  const options = getOptions()
  t.is(options.cssVarName, `vh-offset`)
  t.is(options.method.name, `computeDifference`)
  t.is(options.redefineVh, false)
  t.is(options.force, false)
})

test(`compute difference – string option support`, t => {
  const options = getOptions(CUSTOM_CSS_VAR_NAME)
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method.name, `computeDifference`)
  t.is(options.redefineVh, false)
  t.is(options.force, false)
})

test(`compute difference – change css var with object`, t => {
  const options = getOptions({ cssVarName: CUSTOM_CSS_VAR_NAME })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method.name, `computeDifference`)
  t.is(options.redefineVh, false)
  t.is(options.force, false)
})

test(`compute difference – change force & getFullResult`, t => {
  const options = getOptions({ force: true, getFullResult: true })
  t.is(options.cssVarName, `vh-offset`)
  t.is(options.method.name, `computeDifference`)
  t.is(options.redefineVh, false)
  t.is(options.force, true)
})

test(`vh-unit – change method only`, t => {
  const options = getOptions({
    redefineVh: true,
  })
  t.is(options.cssVarName, `vh`)
  t.is(options.method.name, `redefineVhUnit`)
  t.is(options.redefineVh, true)
  t.is(options.force, false)
})

test(`vh-unit – change method & var name`, t => {
  const options = getOptions({
    redefineVh: true,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method.name, `redefineVhUnit`)
  t.is(options.redefineVh, true)
  t.is(options.force, false)
})

test(`vh-unit – misspell options`, t => {
  const options = getOptions({
    redefinevh: `bar`,
    cssvarname: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, `vh-offset`)
  t.is(options.method.name, `computeDifference`)
  t.is(options.redefineVh, false)
  t.is(options.force, false)
})

test(`vh-unit – misspell redefinevh with css var`, t => {
  const options = getOptions({
    redefinevh: `bar`,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method.name, `computeDifference`)
  t.is(options.redefineVh, false)
  t.is(options.force, false)
})
