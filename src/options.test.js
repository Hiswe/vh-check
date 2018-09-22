import test from 'ava'

import getOptions from './options'
import * as methods from './methods'

const CUSTOM_CSS_VAR_NAME = `foo`

test(`compute difference – no options`, t => {
  const options = getOptions()
  t.deepEqual(
    options,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`compute difference – string option support`, t => {
  const options = getOptions(CUSTOM_CSS_VAR_NAME)
  t.deepEqual(
    options,
    {
      cssVarName: CUSTOM_CSS_VAR_NAME,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`compute difference – change css var with object`, t => {
  const options = getOptions({ cssVarName: CUSTOM_CSS_VAR_NAME })
  t.deepEqual(
    options,
    {
      cssVarName: CUSTOM_CSS_VAR_NAME,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`compute difference – change force`, t => {
  const options = getOptions({ force: true })
  t.deepEqual(
    options,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: true,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`vh-unit – change method only`, t => {
  const options = getOptions({
    redefineVh: true,
  })
  t.deepEqual(
    options,
    {
      cssVarName: `vh`,
      method: methods.redefineVhUnit,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`vh-unit – change method & var name`, t => {
  const options = getOptions({
    redefineVh: true,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.deepEqual(
    options,
    {
      cssVarName: CUSTOM_CSS_VAR_NAME,
      method: methods.redefineVhUnit,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`vh-unit – misspell options`, t => {
  const options = getOptions({
    redefinevh: `bar`,
    cssvarname: CUSTOM_CSS_VAR_NAME,
  })
  t.deepEqual(
    options,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`vh-unit – misspell redefinevh with css var`, t => {
  const options = getOptions({
    redefinevh: `bar`,
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.deepEqual(
    options,
    {
      cssVarName: CUSTOM_CSS_VAR_NAME,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`update on touch`, t => {
  const options = getOptions({
    updateOnTouch: true,
  })
  t.deepEqual(
    options,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: true,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`update no binding`, t => {
  const options = getOptions({
    bind: false,
  })
  t.deepEqual(
    options,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: false,
      bind: false,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `has the right return options`
  )
})

test(`update callback`, t => {
  function customUpdateFunction() {}
  const options = getOptions({
    onUpdate: customUpdateFunction,
  })
  t.deepEqual(
    options,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: customUpdateFunction,
    },
    `has the right return options`
  )
  const badOptions = getOptions({
    onUpdate: `bad parameter`,
  })
  t.deepEqual(
    badOptions,
    {
      cssVarName: `vh-offset`,
      method: methods.computeDifference,
      force: false,
      bind: true,
      updateOnTouch: false,
      onUpdate: methods.noop,
    },
    `revert to noop if onUpdate isn't a function`
  )
})
