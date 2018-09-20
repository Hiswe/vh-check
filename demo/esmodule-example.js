import vhCheck from '../dist/vh-check.js'
import outputValue from './output-value'

vhCheck({
  force: true,
  updateOnScroll: true,
  onUpdate: outputValue('gap'),
})
