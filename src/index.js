'use strict'

import getOptions from './options'

function noop() {}

function updateCssVar(cssVarName, result) {
  document.documentElement.style.setProperty(
    '--' + cssVarName,
    result.value + 'px'
  )
}

export default function vhCheck(options) {
  options = Object.freeze(getOptions(options))
  var result = options.method()
  result.recompute = options.method
  result.unbind = noop
  // usefulness check
  if (!result.isNeeded && !options.force) {
    return result
  }
  updateCssVar(options.cssVarName, result)
  // Listen for orientation changes
  function onOrientationChange() {
    var result = options.method()
    updateCssVar(options.cssVarName, result)
  }
  
  window.addEventListener('orientationchange', onOrientationChange, false)
  document.body.addEventListener('touchmove', onOrientationChange, false)

  result.unbind = function unbindOrientationchange() {
    window.removeEventListener('orientationchange', onOrientationChange)
    document.body.removeEventListener('touchmove', onOrientationChange)
  }
  
  return result
}
