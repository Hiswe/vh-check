'use strict'

import * as domUtils from './dom-utils'

export function computeDifference() {
  // test with vh
  var vhTest = domUtils.createTestElement(
    'position: fixed; top: 0; height: 100vh;'
  )
  // in iOS vh will be bigger
  var windowHeight = window.innerHeight
  var vh = vhTest.offsetHeight
  var offset = vh - windowHeight

  // console.log({
  //   windowHeight: windowHeight,
  //   vh: vh,
  //   offset: offset,
  // })
  // clean
  domUtils.removeTestElement(vhTest)
  return offset
}

export function redefineVhUnit() {
  var windowHeight = window.innerHeight
  // console.log({
  //   innerHeight: window.innerHeight,
  //   clientHeight: document.documentElement.clientHeight,
  // })
  return windowHeight * 0.01
}
