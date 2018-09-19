import test from 'ava'
import sinon from 'sinon'
import browserEnv from 'browser-env'

import vhCheck from './index'

browserEnv({
  userAgent: `node.js`,
})

// we need to call the all the tests serially because:
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

function wait() {
  return new Promise(resolve => setTimeout(resolve, 10))
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
  window.dispatchEvent(new Event('orientationchange'))
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

test.serial(`orientation change`, async t => {
  t.context.check = vhCheck()
  t.is(t.context.spy.callCount, 1, `initialization call`)
  window.dispatchEvent(new Event(`orientationchange`))
  await wait()
  t.is(t.context.spy.callCount, 2, `called again after orientationchange`)
})

test.serial.skip(`touchmove`, async t => {
  t.context.check = vhCheck({
    updateOnScroll: true,
  })
  t.is(t.context.spy.callCount, 1, `initialization call`)
  // console.log(Touch)
  window.dispatchEvent(new TouchEvent(`touchmove`))
  await wait()
  t.is(t.context.spy.callCount, 2, `called again after touchmove`)
})
