import vhCheck from '../dist/vh-check.js'

const test = vhCheck()
const value = document.documentElement.style.getPropertyValue('--vh-offset')
const message = `${!test ? 'not ' : ''} needed.<br/>Gap is: ${
  test ? value : '0px'
}`
const domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.innerHTML = message
