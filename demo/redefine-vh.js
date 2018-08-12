import vhCheck from '../dist/vh-check.js'

const test = vhCheck({
  redefineVh: true,
})
const value = document.documentElement.style.getPropertyValue('--vh')

const p = document.createElement(`p`)
p.classList.add('with-vh-unit')
const message = `${!test ? 'not ' : ''} needed.<br/>1vh is: ${
  test ? value : window.innerHeight * 0.01 + 'px'
}`
p.innerHTML = message

const domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.appendChild(p)
