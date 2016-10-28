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

this will set a css `var` if needed:

```css
.offset {
  height: var(--vh-offset);
}

```

The CSS var will be updated on orientation change

### configuration

You can pass the CSS var name as a param to `vhCheck()`

```js
vhCheck('ios-gap')
```

In your CSS you will have to reference:

```css
main {
  min-height: calc(100vh - var(--ios-gap));
}
```

## example

#### In your javascript

```js
vhCheck()
```

#### In your CSS

```css
main {
  /* for browser supporting VH without buggy behaviour & no supporting of CSS var */
  min-height: calc(100vh);
  /* calc will handle correctly an undefined css var */
  /* buggyFill will work on iOS 9.3+ only */
  /* will degrade on a buggy 100vh on older version of iOS */
  min-height: calc(100vh - var(--vh-offset));
}
```

## support

#### In short: only iOS 9.3+

#### More details:

- [**vh** – should be IE9+](http://caniuse.com/#search=vh). Only iOS7+ has that buggy behaviour
- [**CSS Variables** – iOS 9.3+](http://caniuse.com/#feat=css-variables). not IE and not < iOS 9.3. So this buggyfill will work only on the latest version of iOS :S

## demo

- clone the project
- npm install
- npm test
- go to `localhost:8080`
