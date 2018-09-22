'use strict'

import getOptions from './options'
import * as events from './event-listerner'

function updateCssVar(cssVarName, result) {
  document.documentElement.style.setProperty(
    '--' + cssVarName,
    result.value + 'px'
  )
}

function formatResult(sizes, options) {
  return Object.assign({}, sizes, {
    unbind: events.removeAll,
    recompute: options.method,
  })
}

export default function vhCheck(options) {
  options = Object.freeze(getOptions(options))
  var result = formatResult(options.method(), options)

  // usefulness check
  if (!result.isNeeded && !options.force) {
    return result
  }
  updateCssVar(options.cssVarName, result)
  options.onUpdate(result)

  // enabled byt default
  if (!options.bind) return result

  function onWindowChange() {
    window.requestAnimationFrame(function() {
      var sizes = options.method()
      updateCssVar(options.cssVarName, sizes)
      options.onUpdate(formatResult(sizes, options))
    })
  }

  // be sure we don't duplicates events listeners
  result.unbind()

  // listen for orientation change
  // - this can't be configured
  // - because it's convenient and not a real performance bottleneck
  events.addListener('orientationchange', onWindowChange)

  // listen to touch move for scrolling
  // – disabled by default
  // - listening to scrolling can be expansive…
  if (options.updateOnTouch) {
    events.addListener('touchmove', onWindowChange)
  }

  return result
}
