import test from 'ava'
import sinon from 'sinon'
import browserEnv from 'browser-env'
import omit from 'lodash.omit'

import vhCheck from './index'
import * as methods from './methods'

browserEnv({
  userAgent: `node.js`,
  pretendToBeVisual: true,
})

// we need to run all the tests serially because:
// • window & document are defined globally by browser-env
// • since it's global, any attempt to parallelize tests will result in error.
//   sinon.spy() will be called on already spied methods
//   → and error
// • rewire could be a way to define globals on the vh-check code…
//   …while maintaining isolation BUT
//   it doesn't play well with babel 7 import
//   see:
//   – limitations
//     https://github.com/jhnns/rewire#limitations
//   - no babel 7 support from babel-plugin-rewire
//     https://github.com/speedskater/babel-plugin-rewire/issues/209

function wait(time = 20) {
  return new Promise(resolve => setTimeout(resolve, time))
}

test.beforeEach(t => {
  t.context.initialWindowHeight = window.innerHeight
  t.context.spy = sinon.spy(document.documentElement.style, `setProperty`)
})

test.afterEach.always(t => {
  t.context.check.unbind()
  document.documentElement.style.setProperty.restore()
  window.innerHeight = t.context.initialWindowHeight
})

const CUSTOM_CSS_VAR_NAME = `foo`

test.serial(`returned object`, t => {
  const check = vhCheck()
  t.context.check = check
  t.deepEqual(
    omit(check, [`unbind`]),
    {
      vh: 0,
      windowHeight: 768,
      offset: -768,
      isNeeded: true,
      value: -768,
      recompute: methods.computeDifference,
    },
    `has the right return value`
  )
})

test.serial(`default behavior – needed`, t => {
  t.context.check = vhCheck()
  t.true(t.context.check.isNeeded)
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  t.is(t.context.spy.getCall(0).args[0], `--vh-offset`, `has the right name`)
})

test.serial(`default behavior – not needed`, async t => {
  window.innerHeight = 0
  t.context.check = vhCheck()
  t.false(t.context.check.isNeeded)
  t.true(t.context.spy.notCalled, `don't set CSS custom var`)
  window.dispatchEvent(new Event('resize'))
  await wait()
  t.true(t.context.spy.notCalled, `don't react on orientation change`)
})

test.serial(`force test when not needed`, t => {
  window.innerHeight = 0
  t.context.check = vhCheck({ force: true })
  t.false(t.context.check.isNeeded)
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
})

test.serial(`change property name`, t => {
  t.context.check = vhCheck(CUSTOM_CSS_VAR_NAME)
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  t.is(
    t.context.spy.getCall(0).args[0],
    `--${CUSTOM_CSS_VAR_NAME}`,
    `has the right name`
  )
})

test.serial(`change property name with options object`, t => {
  t.context.check = vhCheck({
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  t.is(
    t.context.spy.getCall(0).args[0],
    `--${CUSTOM_CSS_VAR_NAME}`,
    `has the right name`
  )
})

test.serial(`change method`, t => {
  t.context.check = vhCheck({
    redefineVh: true,
  })
  t.is(t.context.check.value, t.context.check.windowHeight * 0.01)
})

test.serial(`orientationchange`, async t => {
  t.context.check = vhCheck()
  t.is(t.context.spy.callCount, 1, `initialization call`)
  window.dispatchEvent(new Event(`orientationchange`))
  await wait()
  t.is(t.context.spy.callCount, 2, `called again after orientationchange`)
})

test.serial(`can manually unbind`, async t => {
  t.context.check = vhCheck()
  t.context.check.unbind()
  window.dispatchEvent(new TouchEvent(`orientationchange`))
  await wait()
  t.is(t.context.spy.callCount, 1, `called again after orientationchange`)
})

test.serial(`touchmove`, async t => {
  t.context.check = vhCheck({
    updateOnScroll: true,
  })
  t.is(t.context.spy.callCount, 1, `initialization call`)
  window.dispatchEvent(new TouchEvent(`touchmove`))
  await wait()
  t.is(t.context.spy.callCount, 2, `called again after touchmove`)
})

test.serial(`don't allow multiple binds with default config`, async t => {
  const firstCheck = vhCheck()
  t.context.check = firstCheck
  t.is(t.context.spy.callCount, 1, `initialization call`)
  const secondCheck = vhCheck()
  t.is(t.context.spy.callCount, 2, `second call`)
  window.dispatchEvent(new TouchEvent(`orientationchange`))
  await wait()
  t.is(t.context.spy.callCount, 3, `only 1 event is bind at a time`)
  secondCheck.unbind()
})

test.serial(`don't allow multiple binds with updateOnScroll`, async t => {
  const firstCheck = vhCheck({
    updateOnScroll: true,
  })
  t.context.check = firstCheck
  const secondCheck = vhCheck({
    updateOnScroll: true,
  })
  window.dispatchEvent(new TouchEvent(`touchmove`))
  await wait()
  t.is(t.context.spy.callCount, 3, `only 1 event is bind at a time`)
  secondCheck.unbind()
})
