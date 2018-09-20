'use strict'

import * as methods from './methods'

var defaultOptions = {
  cssVarName: 'vh-offset',
  redefineVh: false,
  method: methods.computeDifference,
  force: false,
  updateOnScroll: false,
  onUpdate: methods.noop,
}

function isString(value) {
  return typeof value === 'string' && value !== ''
}

export default function getOptions(options) {
  // old options handling: only redefine the CSS var name
  if (isString(options)) {
    return Object.assign({}, defaultOptions, {
      cssVarName: options,
    })
  }
  // be sure to have a configuration object
  if (typeof options !== 'object') return defaultOptions

  // make sure we have the right options to start with
  var finalOptions = {
    force: options.force === true,
    updateOnScroll: options.updateOnScroll === true,
    onUpdate:
      typeof options.onUpdate === 'function' ? options.onUpdate : methods.noop,
  }
  finalOptions.redefineVh = options.redefineVh === true
  finalOptions.method =
    methods[finalOptions.redefineVh ? 'redefineVhUnit' : 'computeDifference']
  finalOptions.cssVarName = isString(options.cssVarName)
    ? options.cssVarName
    : // when redefining vh unit we follow this article name convention
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      finalOptions.redefineVh
      ? 'vh'
      : defaultOptions.cssVarName
  return finalOptions
}
