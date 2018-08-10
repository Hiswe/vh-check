'use strict'

var allowedComputationMethods = ['compute-difference', 'redefine-vh-unit']

var defaultOptions = {
  cssVarName: 'vh-offset',
  method: allowedComputationMethods[0],
}

function isString(value) {
  return typeof value === `string` && value !== ''
}

function isAllowedMethod(methodName) {
  return (
    isString(methodName) && allowedComputationMethods.indexOf(methodName) > -1
  )
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
  var finaleOptions = {}
  finaleOptions.method = isAllowedMethod(options.method)
    ? options.method
    : defaultOptions.method
  finaleOptions.cssVarName = isString(options.cssVarName)
    ? options.cssVarName
    : finaleOptions.method === allowedComputationMethods[0]
      ? defaultOptions.cssVarName
      : // when redefining vh unit we follow this article name convention
        // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
        'vh'
  return finaleOptions
}
