import test from 'ava'
import sinon from 'sinon'

import vhCheck from './index'

function wait() {
  return new Promise(resolve => setTimeout(resolve, 10))
}

test.beforeEach(t => {
  t.context.initialWindowHeight = window.innerHeight
  t.context.spy = sinon.spy(document.documentElement.style, `setProperty`)
})

test.afterEach.always(t => {
  document.documentElement.style.setProperty.restore()
  window.innerHeight = t.context.initialWindowHeight
})

const CUSTOM_CSS_VAR_NAME = `foo`

test.serial(`default behavior – needed`, t => {
  const check = vhCheck()
  t.true(check.isNeeded)
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  t.is(t.context.spy.getCall(0).args[0], `--vh-offset`, `has the right name`)
  check.unbind()
})

test.serial(`default behavior – not needed`, async t => {
  window.innerHeight = 0
  const check = vhCheck()
  t.false(check.isNeeded)
  t.true(t.context.spy.notCalled, `don't set CSS custom var`)
  window.dispatchEvent(new Event('orientationchange'))
  await wait()
  t.true(t.context.spy.notCalled, `don't react on orientation change`)
})

test.serial(`force test when not needed`, t => {
  const initialWindowHeight = window.innerHeight
  window.innerHeight = 0
  const check = vhCheck({ force: true })
  t.false(check.isNeeded)
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  check.unbind()
})

test.serial(`change property name`, t => {
  const check = vhCheck(CUSTOM_CSS_VAR_NAME)
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  t.is(
    t.context.spy.getCall(0).args[0],
    `--${CUSTOM_CSS_VAR_NAME}`,
    `has the right name`
  )
  check.unbind()
})

test.serial(`change property name with options object`, t => {
  const check = vhCheck({
    cssVarName: CUSTOM_CSS_VAR_NAME,
  })
  t.true(t.context.spy.calledOnce, `set the CSS custom var`)
  t.is(
    t.context.spy.getCall(0).args[0],
    `--${CUSTOM_CSS_VAR_NAME}`,
    `has the right name`
  )
  check.unbind()
})

test.serial(`change method`, t => {
  const check = vhCheck({
    redefineVh: true,
  })
  t.is(check.value, check.windowHeight * 0.01)
  check.unbind()
})

test.serial(`orientation change`, async t => {
  vhCheck()
  t.is(t.context.spy.callCount, 1, `initialization call`)
  window.dispatchEvent(new Event(`orientationchange`))
  await wait()
  t.is(t.context.spy.callCount, 2, `called again after orientationchange`)
})
