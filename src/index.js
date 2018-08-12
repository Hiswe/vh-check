'use strict'

import getOptions from './options'

function updateCssVar(cssVarName, offset) {
  document.documentElement.style.setProperty('--' + cssVarName, offset + 'px')
}

export default function vhCheck(options) {
  options = Object.freeze(getOptions(options))
  var offset = options.method()
  // usefulness check
  if (!offset) return false
  updateCssVar(options.cssVarName, offset)
  // Listen for orientation changes
  window.addEventListener(
    'orientationchange',
    function() {
      var newOffset = options.method()
      updateCssVar(options.cssVarName, newOffset)
    },
    false
  )
  return true
}
