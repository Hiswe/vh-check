import vhCheck from '../dist/vh-check.js'

const result = vhCheck({
  redefineVh: true,
  force: true,
})
console.log(result)
const message = `${!result.isNeeded ? 'not ' : ''} needed.<br/>1vh is: ${
  result.value
}px`
const domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.innerHTML = message
