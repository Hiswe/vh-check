import vhCheck from '../dist/vh-check.js'

const test = vhCheck()
const message = `${!test.isNeeded ? 'not ' : ''} needed.<br/>Gap is: ${
  test.value
}px`
const domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.innerHTML = message
