import test from 'ava'

import getOptions from './options'

const CUSTOM_CSS_VAR_NAME = `foo`

test(`no options`, t => {
  const options = getOptions()
  t.is(options.cssVarName, `vh-offset`)
  t.is(options.method, `compute-difference`)
})

test(`string option support`, t => {
  const options = getOptions(CUSTOM_CSS_VAR_NAME)
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method, `compute-difference`)
})

test(`vh-unit – change method only`, t => {
  const options = getOptions({
    method: `redefine-vh-unit`,
  })
  t.is(options.cssVarName, `vh`)
  t.is(options.method, `redefine-vh-unit`)
})

test(`vh-unit – change method & var name`, t => {
  const options = getOptions({
    method: `redefine-vh-unit`,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method, `redefine-vh-unit`)
})

test(`vh-unit – misspell method name`, t => {
  const options = getOptions({
    method: `bar`,
  })
  t.is(options.cssVarName, `vh-offset`)
  t.is(options.method, `compute-difference`)
})

test(`vh-unit – misspell method name with css var`, t => {
  const options = getOptions({
    method: `bar`,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.is(options.cssVarName, CUSTOM_CSS_VAR_NAME)
  t.is(options.method, `compute-difference`)
})
