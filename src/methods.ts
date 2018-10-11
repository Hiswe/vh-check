import { ComputeSizeMethod, Sizes, ComputeCallback } from './vh-check-types'

// don't know a better way to get the size of a CSS 100vh…
function createTestElement(): HTMLElement {
  const testElement: HTMLElement = document.createElement('div')
  testElement.style.cssText =
    'position: fixed; top: 0; height: 100vh; pointer-events: none;'
  document.documentElement.insertBefore(
    testElement,
    document.documentElement.firstChild
  )
  return testElement
}

function removeTestElement(element: HTMLElement) {
  document.documentElement.removeChild(element)
}

//  in some browsers this will be bigger than window.innerHeight
function checkSizes(): Sizes {
  const vhTest = createTestElement()
  const windowHeight = window.innerHeight
  const vh = vhTest.offsetHeight
  const offset = vh - windowHeight
  removeTestElement(vhTest)
  return {
    vh,
    windowHeight,
    offset,
    isNeeded: offset !== 0,
    value: 0,
  }
}

// export

export function noop<ComputeCallback>(): void {}

export function computeDifference<ComputeSizeMethod>(): Sizes {
  const sizes = checkSizes()
  sizes.value = sizes.offset
  return sizes
}

export function redefineVhUnit<ComputeSizeMethod>(): Sizes {
  const sizes = checkSizes()
  sizes.value = sizes.windowHeight * 0.01
  return sizes
}
