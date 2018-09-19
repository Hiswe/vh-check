# vh-check

[![npm version](https://badge.fury.io/js/vh-check.svg)](https://badge.fury.io/js/vh-check)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [the problem](#the-problem)
- [why not use viewport-units-buggyfill?](#why-not-use-viewport-units-buggyfill)
- [use](#use)
  - [as a global variable](#as-a-global-variable)
  - [as a commonJS module](#as-a-commonjs-module)
  - [as a ES module module](#as-a-es-module-module)
  - [how it works](#how-it-works)
- [example](#example)
  - [in your javascript](#in-your-javascript)
  - [in your CSS](#in-your-css)
- [configuration](#configuration)
  - [as a string](#as-a-string)
  - [as an object](#as-an-object)
    - [cssVarName](#cssvarname)
    - [force](#force)
    - [redefineVh](#redefinevh)
    - [updateOnScroll](#updateonscroll)
- [about browser support](#about-browser-support)
- [demo](#demo)
  - [github pages](#github-pages)
  - [local](#local)
- [related](#related)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## the problem

Browsers don't always compute the [vh unit](https://developer.mozilla.org/en-US/docs/Web/CSS/length#vh) the same way.
Some mobile browsers compute the `vh` CSS unit without taking care of the url bar.
That means that a `100vh` div will overflow the viewport by the size of the url bar.

This is the current behavior for:

- [Safari iOS](https://bugs.webkit.org/show_bug.cgi?id=141832)
- [Chrome android >= 56](https://developers.google.com/web/updates/2016/12/url-bar-resizing)

As explained in the chrome post, that make sense but make it hard to have a full hero top block.

This script will measure the difference and put it in a CSS var.

## why not use viewport-units-buggyfill?

It's doing a very good job:

https://github.com/rodneyrehm/viewport-units-buggyfill

But it has some problems with media-queries:

https://github.com/rodneyrehm/viewport-units-buggyfill/issues/13

## use

### as a global variable

```html
<script src="https://unpkg.com/vh-check/dist/vh-check.min.js"></script>
<script>
  (function () {
    // initialize the test
    var check = vhCheck('vh-test');
  }());
</script>
```

### as a commonJS module

```
npm install vh-check
```

```js
var check = require('vh-check')
// isNeeded will be true || false
var isNeeded = vhCheck()
```

### as a ES module module

```
npm install vh-check
```

```js
import vhCheck from 'vh-check'
const check = vhCheck()
```

### how it works

- It will update the `vh-check` CSS custom property if needed
- `vh-check` will be updated on orientation change
- `vh-check` **will not** be updated on scroll event by default

### returned object

vh-check will return a full object:

```js
{
  isNeeded: false, // wether or not it's needed
  value: 0, // the CSS var value
  vh: 480, // a 100vh div size
  windowHeight: 480, // same value as window.innerHeight
  offset: 0, // difference between the above sizes
  // call this to programmatically get all the values and set the CSS var
  // - this can be useful if you want to add your own listeners
  //   that will trigger a computation
  recompute: function computeDifference(),
  // call this to remove any window listeners created by vh-check
  unbind: function unbindVhCheckListeners(),
},
```

## example

### in your javascript

```js
vhCheck()
```

### in your CSS

```css
:root {
  --vh-offset: 0px;
}
main {
  /* If you need to support browser without CSS var support */
  height: 100vh;
  /* enable vh fix */
  height: calc(100vh - var(--vh-offset));
}
```

## configuration

### as a string

You can pass the CSS var name as a param to `vhCheck()` (default `vh-check`)

```js
vhCheck('browser-address-bar')
```

In your CSS you will have to reference:

```css
:root {
  --browser-address-bar: 0px;
}
main {
  min-height: calc(100vh - var(--browser-address-bar));
}
```

### as an object

`vh-check` allows you to have a more control of what it's doing.

```js
vhCheck({
  cssVarName: 'vh-offset',
  force: false,
  redefineVh: false,
  updateOnScroll: false,
})
```

#### cssVarName

**type:** `string`  
**default:** `'vh-offset'`

Change the CSS var name

#### force

**type:** `boolean`  
**default:** `false`

Set the CSS var even if `100vh` computation is good

#### redefineVh

**type:** `boolean`  
**default:** `false`

Change the CSS var value.
Instead of being the total size of the gap, it will be 1% of the real window size.
You can find more explanation in this [CSS Trick article](https://css-tricks.com/the-trick-to-viewport-units-on-mobile/)

_Important_

If you don't set a `cssVarName`, the CSS custom property will be named `vh`
So in your CSS it will be:

```css
.my-element {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
```

#### updateOnScroll

**type:** `boolean`  
**default:** `false`

Add an event listener on `touchmove` to recompute the sizes

## about browser support

- **vh unit** – supported since [IE9+](http://caniuse.com/#search=vh)
- **calc** – supported since [IE9+](https://caniuse.com/#search=calc)
- **CSS custom properties** – supported since [IE Edge](http://caniuse.com/#feat=css-variables) and iOS 9.3+
  IE11 & below will need a fallback without CSS var
- **concerned browsers** – as for now:
  - Safari since iOS7+
  - Chrome Android since version 56

## demo

### github pages

https://hiswe.github.io/vh-check/

### local

- clone the project
- `npm install`
- `npm run demo`
- go to: http://localhost:8080

## related

- [ios-inner-height](https://www.npmjs.com/package/ios-inner-height)
