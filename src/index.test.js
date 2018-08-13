import test from 'ava'
import sinon from 'sinon'

import vhCheck from './index'

const CUSTOM_CSS_VAR_NAME = `foo`

test(`default behavior – needed`, t => {
  const spy = sinon.spy(document.documentElement.style, 'setProperty')
  const result = vhCheck()
  t.true(result.isNeeded)
  t.true(spy.calledOnce, `set the CSS custom var`)
  t.is(spy.getCall(0).args[0], `--vh-offset`, `has the right name`)
  document.documentElement.style.setProperty.restore()
})

test(`default behavior – not needed`, t => {
  const initialWindowHeight = window.innerHeight
  window.innerHeight = 0
  const spy = sinon.spy(document.documentElement.style, 'setProperty')
  const result = vhCheck()
  t.false(result.isNeeded)
  t.true(spy.notCalled, `set the CSS custom var`)
  document.documentElement.style.setProperty.restore()
  window.innerHeight = initialWindowHeight
})

test(`force test when not needed`, t => {
  const initialWindowHeight = window.innerHeight
  window.innerHeight = 0
  const spy = sinon.spy(document.documentElement.style, 'setProperty')
  const result = vhCheck({ force: true })
  t.false(result.isNeeded)
  t.true(spy.calledOnce, `set the CSS custom var`)
  document.documentElement.style.setProperty.restore()
  window.innerHeight = initialWindowHeight
})

test(`change property name`, t => {
  var spy = sinon.spy(document.documentElement.style, 'setProperty')
  vhCheck(CUSTOM_CSS_VAR_NAME)
  t.true(spy.calledOnce, `set the CSS custom var`)
  t.is(spy.getCall(0).args[0], `--${CUSTOM_CSS_VAR_NAME}`, `has the right name`)
  document.documentElement.style.setProperty.restore()
})

test(`change property name with options object`, t => {
  const spy = sinon.spy(document.documentElement.style, 'setProperty')
  vhCheck({
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.true(spy.calledOnce, `set the CSS custom var`)
  t.is(spy.getCall(0).args[0], `--${CUSTOM_CSS_VAR_NAME}`, `has the right name`)
  document.documentElement.style.setProperty.restore()
})

test(`change method`, t => {
  const result = vhCheck({
    redefineVh: true,
  })
  t.is(result.value, result.windowHeight * 0.01)
})
