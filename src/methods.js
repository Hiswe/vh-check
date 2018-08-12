'use strict'

// don't know a better way to make have the size of a CSS 100vh
// better than creating a dom element
function createTestElement() {
  var testElement = document.createElement('div')
  testElement.style.cssText =
    'position: fixed; top: 0; height: 100vh; pointer-events: none;'
  document.documentElement.insertBefore(
    testElement,
    document.documentElement.firstChild
  )
  return testElement
}

function removeTestElement(element) {
  document.documentElement.removeChild(element)
}

//  in some browsers this will be bigger than window.innerHeight
function checkSizes() {
  var vhTest = createTestElement()
  var windowHeight = window.innerHeight
  var vh = vhTest.offsetHeight
  removeTestElement(vhTest)
  return {
    vh: vh,
    windowHeight: innerHeight,
    offset: vh - windowHeight,
  }
}

export function computeDifference() {
  var sizes = checkSizes()
  sizes.cssVarContent = sizes.offset
  return sizes
}

export function redefineVhUnit() {
  var sizes = checkSizes()
  sizes.cssVarContent = sizes.offset === 0 ? 0 : sizes.windowHeight * 0.01
  return sizes
}
