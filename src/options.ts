import { Configuration } from './types'

import * as methods from './methods'

export function isString(text: any): text is string {
  return typeof text === `string` && text.length > 0
}

export function isFunction(f: any): boolean {
  return typeof f === `function`
}

const defaultOptions: Configuration = Object.freeze({
  cssVarName: 'vh-offset',
  redefineVh: false,
  method: methods.computeDifference,
  force: false,
  bind: true,
  updateOnTouch: false,
  onUpdate: methods.noop,
})

function getOptions(options?: string | Configuration): Configuration {
  // old options handling: only redefine the CSS var name
  if (isString(options)) {
    return {
      ...defaultOptions,
      cssVarName: options,
    }
  }
  // be sure to have a configuration object
  if (typeof options !== 'object') return defaultOptions

  // make sure we have the right options to start with
  const finalOptions: Configuration = {
    force: options.force === true,
    bind: options.bind !== false,
    updateOnTouch: options.updateOnTouch === true,
    onUpdate: isFunction(options.onUpdate) ? options.onUpdate : methods.noop,
  }

  // method change
  const redefineVh = options.redefineVh === true
  finalOptions.method =
    methods[redefineVh ? 'redefineVhUnit' : 'computeDifference']
  finalOptions.cssVarName = isString(options.cssVarName)
    ? options.cssVarName
    : redefineVh
      ? /*
        when redefining vh unit we follow this article name convention
        https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
      */
        'vh'
      : defaultOptions.cssVarName
  return finalOptions
}

export default getOptions
