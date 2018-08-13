const { JSDOM } = require( 'jsdom' )

const dom   = `<!doctype html><html><body></body></html>`
const jsdom = new JSDOM( dom, {
  pretendToBeVisual: true,
})
const { window } = jsdom

// http://airbnb.io/enzyme/docs/guides/jsdom.html

function copyProps(src, target) {
  const props = {}
  Object
    .getOwnPropertyNames( src )
    .filter( prop => typeof target[ prop ] === `undefined` )
    .forEach( prop => {
      props[ prop ] = Object.getOwnPropertyDescriptor( src, prop )
    })
  Object.defineProperties( target, props )
}

global.window     = window
global.document   = window.document
global.navigator  = {
  userAgent: `node.js`,
}
copyProps( window, global )
