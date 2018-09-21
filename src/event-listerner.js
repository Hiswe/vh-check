// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
var passiveSupported = false
var eventListeners = []

try {
  var options = Object.defineProperty({}, 'passive', {
    get: function() {
      passiveSupported = true
    },
  })

  window.addEventListener('test', options, options)
  window.removeEventListener('test', options, options)
} catch (err) {
  passiveSupported = false
}

export function addListener(eventName, callback) {
  eventListeners.push({ eventName: eventName, callback: callback })
  window.addEventListener(
    eventName,
    callback,
    passiveSupported ? { passive: true } : false
  )
}

export function removeAll() {
  eventListeners.forEach(function eventConfiguration(config) {
    window.removeEventListener(config.eventName, config.callback)
  })
  eventListeners = []
}
