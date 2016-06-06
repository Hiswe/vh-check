# VH CHECK

Safari iOS has a bug about computing the CSS `100vh` value.

This script will measure the difference and put it in a CSS var.

### why not use viewport-units-buggyfill?

It's doing a very good job:

https://github.com/rodneyrehm/viewport-units-buggyfill

But it has some problems with media-queries:

https://github.com/rodneyrehm/viewport-units-buggyfill/issues/13

## use

```js

var vhCheck = require('vh-check');
vhCheck()

```

this will print a style tag like this if needed:

```html
<style>
  :root { --vh-offset: 49px; }
</style>
```

### configuration

You can pass the CSS var name as a param to `vhCheck()`

```js
vhCheck('ios-gap')
```

will print:


```html
<style>
  :root { --ios-gap: 49px; }
</style>
```

## example

#### In your javascript

```js

var vhCheck = require('vh-check');
vhCheck()

```

#### In your CSS

```css
/* declare a default fallback once */
:root {
  --vh-offset: 0px;
}
/* use the offset to be sure that 100vh is fitting the whole screen */
main {
  min-height: calc(100vh);
  /* make sure that CSS var are supported */
  @supports (height: var(--vh-offset)) {
    min-height: calc(100vh - var(--vh-offset));
  }
}

```

## support

#### In short: only iOS 9.3+

#### More details:

- [**vh** – should be IE9+](http://caniuse.com/#search=vh). Only iOS7+ has that buggy behaviour
- [**@supports** – IE Edge +](http://caniuse.com/#feat=css-supports-api). In my example < IE Edge will fallback to vh without CSS var. Because this behave badly only in iOS, this will work :)
- [**CSS Variables** – iOS 9.3+](http://caniuse.com/#feat=css-variables). not IE and not < iOS 9.3. So this buggyfill will work only on the latest version of iOS :S
