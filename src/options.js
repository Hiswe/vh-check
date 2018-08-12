'use strict'

import * as methods from './methods'

var defaultOptions = {
  cssVarName: 'vh-offset',
  redefineVh: false,
  method: methods.computeDifference,
  force: false,
}

function isString(value) {
  return typeof value === 'string' && value !== ''
}

export default function getOptions(options) {
  // old options handling: only redefine the CSS var name
  if (isString(options)) {
    return Object.assign({}, defaultOptions, {
      cssVarName: options,
      force: options.force === true,
    })
  }
  // be sure to have a configuration object
  if (typeof options !== 'object') return defaultOptions

  // make sure we have the right options to start with
  var finaleOptions = {
    force: options.force === true,
  }
  finaleOptions.redefineVh = options.redefineVh === true
  finaleOptions.method =
    methods[finaleOptions.redefineVh ? 'redefineVhUnit' : 'computeDifference']
  finaleOptions.cssVarName = isString(options.cssVarName)
    ? options.cssVarName
    : // when redefining vh unit we follow this article name convention
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      finaleOptions.redefineVh
      ? 'vh'
      : defaultOptions.cssVarName

  return finaleOptions
}
