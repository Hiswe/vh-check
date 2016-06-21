# VH CHECK

Safari iOS has a bug about computing the CSS `100vh` value.

This script will measure the difference and put it in a CSS var.

### why not use viewport-units-buggyfill?

It's doing a very good job:

https://github.com/rodneyrehm/viewport-units-buggyfill

But it has some problems with media-queries:

https://github.com/rodneyrehm/viewport-units-buggyfill/issues/13

## Use

##### as a global variable

Download the `vh-check.js` file and then:

```html
<script src="/vh-check.js"></script>
<script>
  (function () {
    // initialize the test
    var isNeeded = vhCheck('vh-test');
  }());
</script>

```

##### commonJS

```
npm install hiswe/vh-check
```

```js
var vhCheck   = require('vh-check');
// isNeeded will be true || false
var isNeeded  = vhCheck();
```

### Result

this will print a style tag like this if needed:

```html
<style>
  :root { --vh-offset: 49px; }
</style>
```

The CSS var will be updated on orientation change

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
vhCheck()
```

#### In your CSS

```css
/* declare a default fallback once */
:root {
  --vh-offset: 0px;
}
/* for browser supporting VH without buggy behaviour & no supporting of CSS var */
main {
  min-height: calc(100vh);
}
/* make sure that CSS var are supported */
/* buggyFill will work on iOS 9.3+ only */
/* will degrade on a buggy 100vh on older version of iOS */
@supports (height: var(--vh-offset)) {
  main {
    min-height: calc(100vh - var(--vh-offset));
  }
}

```

##### note: it can be written more consisely on any CSS processor that support nesting

```stylus

:root {
  --vh-offset: 0px;
}
main {
  min-height: calc(100vh);
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
