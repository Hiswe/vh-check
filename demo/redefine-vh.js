import vhCheck from '../dist/vh-check.js'
import outputValue from './output-value'

vhCheck({
  redefineVh: true,
  force: true,
  updateOnScroll: true,
  onUpdate: outputValue('1vh'),
})
