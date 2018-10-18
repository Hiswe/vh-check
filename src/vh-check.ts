'use strict'

import { Configuration, Sizes, Result } from './types'
import getOptions from './options'
import * as events from './event-listener'

function updateCssVar(cssVarName: string, result): void {
  document.documentElement.style.setProperty(
    `--${cssVarName}`,
    `${result.value}px`
  )
}

function formatResult(sizes: Sizes, options: Configuration): Result {
  return {
    ...sizes,
    unbind: events.removeAll,
    recompute: options.method,
  }
}

export default function vhCheck(options?: string | Configuration): Result {
  const config = Object.freeze(getOptions(options))
  const result = formatResult(config.method(), config)

  // usefulness check
  if (!result.isNeeded && !config.force) {
    return result
  }
  updateCssVar(config.cssVarName, result)
  config.onUpdate(result)

  // enabled by default
  if (!config.bind) return result

  function onWindowChange() {
    window.requestAnimationFrame(function() {
      var sizes = config.method()
      updateCssVar(config.cssVarName, sizes)
      config.onUpdate(formatResult(sizes, config))
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
  if (config.updateOnTouch) {
    events.addListener('touchmove', onWindowChange)
  }

  return result
}
