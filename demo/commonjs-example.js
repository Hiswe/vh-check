'use strict'

var vhCheck = require('../dist/vh-check.js')
var test = vhCheck()

var p = document.createElement('p')
var message = (!test ? 'not ' : '') + 'needed.<br/>Gap is: '
var value = document.documentElement.style.getPropertyValue('--vh-offset')
value = value ? value : '0px'
message = message + value
p.innerHTML = message

var domCheckWrapper = document.querySelector('.js-check')
domCheckWrapper.appendChild(p)
