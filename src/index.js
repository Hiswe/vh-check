'use strict'

import getOptions from './options'

function updateCssVar(cssVarName, result) {
  document.documentElement.style.setProperty(
    '--' + cssVarName,
    result.cssVarContent + 'px'
  )
}

export default function vhCheck(options) {
  options = Object.freeze(getOptions(options))
  var result = options.method()
  // usefulness check
  if (!result.offset && !options.force) {
    return options.getFullResult ? result : false
  }
  updateCssVar(options.cssVarName, result)
  // Listen for orientation changes
  window.addEventListener(
    'orientationchange',
    function() {
      var result = options.method()
      updateCssVar(options.cssVarName, result)
    },
    false
  )
  return options.getFullResult ? result : true
}
