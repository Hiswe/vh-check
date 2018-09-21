'use strict'

import getOptions from './options'
import * as methods from './methods'
import * as events from './event-listerner'

function updateCssVar(cssVarName, result) {
  document.documentElement.style.setProperty(
    '--' + cssVarName,
    result.value + 'px'
  )
}

var eventListeners = []

export default function vhCheck(options) {
  options = Object.freeze(getOptions(options))
  var result = options.method()
  result.recompute = options.method
  result.unbind = methods.noop
  // usefulness check
  if (!result.isNeeded && !options.force) {
    return result
  }
  updateCssVar(options.cssVarName, result)
  options.onUpdate(result)

  function onWindowChange() {
    window.requestAnimationFrame(function() {
      var result = options.method()
      updateCssVar(options.cssVarName, result)
      options.onUpdate(result)
    })
  }

  // be sure we don't duplicates events listeners
  events.removeAll()
  // listen for orientation change
  // - this can't be configured
  // - because it's convenient and not a real performance bottleneck
  events.addListener('orientationchange', onWindowChange)

  // listen to touch move for scrolling
  // - listening to scrolling can be expansive…
  if (options.updateOnScroll) {
    events.addListener('touchmove', onWindowChange)
  }
  result.unbind = events.removeAll
  return result
}
