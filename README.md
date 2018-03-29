# vh-check

[![npm version](https://badge.fury.io/js/vh-check.svg)](https://badge.fury.io/js/vh-check)

Safari iOS has a bug about computing the CSS `100vh` value.

This script will measure the difference and put it in a CSS var.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [why not use viewport-units-buggyfill?](#why-not-use-viewport-units-buggyfill)
- [Use](#use)
  - [as a global variable](#as-a-global-variable)
  - [as a Javascript module](#as-a-javascript-module)
  - [How is it working](#how-is-it-working)
  - [configuration](#configuration)
- [example](#example)
  - [In your javascript](#in-your-javascript)
  - [In your CSS](#in-your-css)
- [browser support](#browser-support)
  - [In short: only iOS 9.3+](#in-short-only-ios-93)
  - [More details:](#more-details)
- [demo](#demo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## why not use viewport-units-buggyfill?

It's doing a very good job:

https://github.com/rodneyrehm/viewport-units-buggyfill

But it has some problems with media-queries:

https://github.com/rodneyrehm/viewport-units-buggyfill/issues/13

## Use

### as a global variable

```html
<script src="https://unpkg.com/vh-check/dist/vh-check.min.js"></script>
<script>
  (function () {
    // initialize the test
    var isNeeded = vhCheck('vh-test');
  }());
</script>

```

### as a Javascript module

```
npm install vh-check
```

```js
var vhCheck   = require('vh-check');
// isNeeded will be true || false
var isNeeded  = vhCheck();
```

### How is it working

- It will update the __vh-check var__ if needed
- The CSS var will be updated on orientation change
- The CSS var __will not__ be updated on scroll event  

### configuration

You can pass the CSS var name as a param to `vhCheck()`

```js
vhCheck('ios-gap')
```

In your CSS you will have to reference:

```css
:root {
  --ios-gap: 0px;
}
main {
  min-height: calc(100vh - var(--ios-gap));
}
```

## example

### In your javascript

```js
vhCheck()
```

### In your CSS

```css
:root {
  --vh-offset: 0px;
}
main {
  /* If you need to support browser without CSS var support */
  min-height: calc(100vh);
  /* buggyFill will work on iOS 9.3+ only */
  min-height: calc(100vh - var(--vh-offset));
}
```

## browser support

### In short: only iOS 9.3+

### More details:

- [**vh** – should be IE9+](http://caniuse.com/#search=vh). Only iOS7+ has that buggy behavior
- [**CSS Variables** – iOS 9.3+](http://caniuse.com/#feat=css-variables). not IE and not < iOS 9.3. So this buggyfill will work only on the latest version of iOS :S

## demo

- clone the project
- `npm install`
- `npm run demo`
- go to: http://localhost:8080
