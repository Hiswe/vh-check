'use strict'

import * as domUtils from './dom-utils'

export function computeDifference() {
  // test with fixed
  var fixedTest = domUtils.createTestElement(
    'position: fixed; top: 0; bottom: 0;'
  )
  // test with vh
  var vhTest = domUtils.createTestElement(
    'position: fixed; top: 0; height: 100vh;'
  )
  // in iOS vh will be bigger
  var topBottom = fixedTest.offsetHeight
  var vh = vhTest.offsetHeight
  var offset = vh - topBottom
  // clean
  domUtils.removeTestElement(fixedTest)
  domUtils.removeTestElement(vhTest)
  return offset
}

export function redefineVhUnit() {
  // document.documentElement.clientHeight
  return window.innerHeight * 0.01
}
