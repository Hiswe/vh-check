'use strict'

import * as methods from './methods'

var defaultOptions = Object.freeze({
  cssVarName: 'vh-offset',
  // redefineVh: false,
  method: methods.computeDifference,
  force: false,
  bind: true,
  updateOnTouch: false,
  onUpdate: methods.noop,
})

function isString(value) {
  return typeof value === 'string' && value !== ''
}

export default function getOptions(options) {
  // old options handling: only redefine the CSS var name
  if (isString(options)) {
    return {
      cssVarName: options,
      method: defaultOptions.method,
      force: defaultOptions.force,
      bind: defaultOptions.bind,
      updateOnTouch: defaultOptions.updateOnTouch,
      onUpdate: defaultOptions.onUpdate,
    }
  }
  // be sure to have a configuration object
  if (typeof options !== 'object') return defaultOptions

  // make sure we have the right options to start with
  var finalOptions = {
    force: options.force === true,
    bind: options.bind !== false,
    updateOnTouch: options.updateOnTouch === true,
    onUpdate:
      typeof options.onUpdate === 'function' ? options.onUpdate : methods.noop,
  }

  // method change
  var redefineVh = options.redefineVh === true
  finalOptions.method =
    methods[redefineVh ? 'redefineVhUnit' : 'computeDifference']
  finalOptions.cssVarName = isString(options.cssVarName)
    ? options.cssVarName
    : // when redefining vh unit we follow this article name convention
      // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      redefineVh
      ? 'vh'
      : defaultOptions.cssVarName
  return finalOptions
}
