'use strict'

export function createTestElement(styles) {
  var testElement = document.createElement('div')
  testElement.style.cssText = styles
  document.documentElement.insertBefore(
    testElement,
    document.documentElement.firstChild
  )
  return testElement
}

export function removeTestElement(element) {
  document.documentElement.removeChild(element)
}
