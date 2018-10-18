// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
let passiveSupported: boolean = false
let eventListeners: EventDescription[] = []

interface EventDescription {
  eventName: string
  callback: EventListener
}

/* istanbul ignore next */
try {
  const options = Object.defineProperty({}, `passive`, {
    get() {
      passiveSupported = true
    },
  })

  window.addEventListener(`test`, options, options)
  window.removeEventListener(`test`, options, options)
} catch (err) {
  passiveSupported = false
}

export function addListener(eventName: string, callback: EventListener) {
  eventListeners.push({
    eventName,
    callback,
  })
  window.addEventListener(
    eventName,
    callback,
    /* istanbul ignore next */
    passiveSupported ? { passive: true } : false
  )
}

export function removeAll() {
  eventListeners.forEach(config => {
    window.removeEventListener(config.eventName, config.callback)
  })
  eventListeners = []
}
