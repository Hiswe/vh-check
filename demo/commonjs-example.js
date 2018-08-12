'use strict'

var vhCheck = require('../dist/vh-check.js')
var test = vhCheck()

var message = (!test ? 'not ' : '') + 'needed.<br/>Gap is: '
var value = document.documentElement.style.getPropertyValue('--vh-offset')
value = value ? value : '0px'
message = message + value
const domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.innerHTML = message
