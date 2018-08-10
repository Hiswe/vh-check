'use strict'

import getOptions from './options'
import domUtils from './dom-utils'

var methods = {
  'compute-difference': function computeDifference() {
    // test with fixed
    var fixedTest = document.createElement('div')
    fixedTest.style.cssText = 'position: fixed; top: 0; bottom: 0;'
    document.documentElement.insertBefore(
      fixedTest,
      document.documentElement.firstChild
    )
    // test with vh
    var vhTest = document.createElement('div')
    vhTest.style.cssText = 'position: fixed; top: 0; height: 100vh'
    document.documentElement.insertBefore(
      vhTest,
      document.documentElement.firstChild
    )
    // in iOS vh will be bigger
    var topBottom = fixedTest.offsetHeight
    var vh = vhTest.offsetHeight
    var offset = vh - topBottom
    // clean
    document.documentElement.removeChild(fixedTest)
    document.documentElement.removeChild(vhTest)
    return offset
  },
  'redefine-vh-unit': function redefineVhUnit() {
    return window.innerHeight * 0.01
  },
}

function testVh() {
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

function updateCssVar(cssVarName, offset) {
  document.documentElement.style.setProperty('--' + cssVarName, offset + 'px')
}

export default function vhCheck(options) {
  options = Object.freeze(getOptions(options))
  var offset = testVh()
  // usefulness check
  if (!offset) return false
  updateCssVar(options.cssVarName, offset)
  // Listen for orientation changes
  window.addEventListener(
    'orientationchange',
    function() {
      var newOffset = testVh()
      updateCssVar(options.cssVarName, newOffset)
    },
    false
  )
  return true
}
