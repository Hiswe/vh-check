'use strict'

var vhCheck = require('../dist/vh-check.js')
var outputValue = require('./output-value')

vhCheck({
  force: true,
  onUpdate: outputValue('gap'),
})
