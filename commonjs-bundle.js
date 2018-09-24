(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict'

var vhCheck = require('../dist/vh-check.js')
var outputValue = require('./output-value')

vhCheck({
  force: true,
  updateOnTouch: true,
  onUpdate: outputValue('gap'),
})

},{"../dist/vh-check.js":3,"./output-value":2}],2:[function(require,module,exports){
module.exports = function outputValue(name) {
  return function(test) {
    console.log(test)
    var message = (!test.isNeeded ? 'not ' : '') + 'needed.<br/>'
    message = message + name + ' is: '
    message = message + test.value + 'px'
    const domCheckWrapper = document.querySelector('.js-check')
    domCheckWrapper.innerHTML = message
  }
}

},{}],3:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vhCheck = factory());
}(this, (function () { 'use strict';

  // don't know a better way to get the size of a CSS 100vh…
  function createTestElement() {
    var testElement = document.createElement('div');
    testElement.style.cssText =
      'position: fixed; top: 0; height: 100vh; pointer-events: none;';
    document.documentElement.insertBefore(
      testElement,
      document.documentElement.firstChild
    );
    return testElement
  }

  function removeTestElement(element) {
    document.documentElement.removeChild(element);
  }

  //  in some browsers this will be bigger than window.innerHeight
  function checkSizes() {
    var vhTest = createTestElement();
    var windowHeight = window.innerHeight;
    var vh = vhTest.offsetHeight;
    var offset = vh - windowHeight;
    removeTestElement(vhTest);
    return {
      vh: vh,
      windowHeight: windowHeight,
      offset: offset,
      isNeeded: offset !== 0,
    }
  }

  function noop() {}

  function computeDifference() {
    var sizes = checkSizes();
    sizes.value = sizes.offset;
    return sizes
  }

  function redefineVhUnit() {
    var sizes = checkSizes();
    sizes.value = sizes.windowHeight * 0.01;
    return sizes
  }

  var methods = /*#__PURE__*/Object.freeze({
    noop: noop,
    computeDifference: computeDifference,
    redefineVhUnit: redefineVhUnit
  });

  var defaultOptions = {
    cssVarName: 'vh-offset',
    // redefineVh: false,
    method: computeDifference,
    force: false,
    bind: true,
    updateOnTouch: false,
    onUpdate: noop,
  };

  function isString(value) {
    return typeof value === 'string' && value !== ''
  }

  function getOptions(options) {
    // old options handling: only redefine the CSS var name
    if (isString(options)) {
      return Object.assign({}, defaultOptions, {
        cssVarName: options,
      })
    }
    // be sure to have a configuration object
    if (typeof options !== 'object') return defaultOptions

    // make sure we have the right options to start with
    var finalOptions = {
      force: options.force === true,
      bind: options.bind !== false,
      updateOnTouch: options.updateOnTouch === true,
      onUpdate:
        typeof options.onUpdate === 'function' ? options.onUpdate : noop,
    };

    // method change
    var redefineVh = options.redefineVh === true;
    finalOptions.method =
      methods[redefineVh ? 'redefineVhUnit' : 'computeDifference'];
    finalOptions.cssVarName = isString(options.cssVarName)
      ? options.cssVarName
      : // when redefining vh unit we follow this article name convention
        // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
        redefineVh
        ? 'vh'
        : defaultOptions.cssVarName;
    return finalOptions
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
  var passiveSupported = false;
  var eventListeners = [];

  /* istanbul ignore next */
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function() {
        passiveSupported = true;
      },
    });

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }

  function addListener(eventName, callback) {
    eventListeners.push({ eventName: eventName, callback: callback });
    window.addEventListener(
      eventName,
      callback,
      /* istanbul ignore next */
      passiveSupported ? { passive: true } : false
    );
  }

  function removeAll() {
    eventListeners.forEach(function eventConfiguration(config) {
      window.removeEventListener(config.eventName, config.callback);
    });
    eventListeners = [];
  }

  function updateCssVar(cssVarName, result) {
    document.documentElement.style.setProperty(
      '--' + cssVarName,
      result.value + 'px'
    );
  }

  function formatResult(sizes, options) {
    return Object.assign({}, sizes, {
      unbind: removeAll,
      recompute: options.method,
    })
  }

  function vhCheck(options) {
    options = Object.freeze(getOptions(options));
    var result = formatResult(options.method(), options);

    // usefulness check
    if (!result.isNeeded && !options.force) {
      return result
    }
    updateCssVar(options.cssVarName, result);
    options.onUpdate(result);

    // enabled byt default
    if (!options.bind) return result

    function onWindowChange() {
      window.requestAnimationFrame(function() {
        var sizes = options.method();
        updateCssVar(options.cssVarName, sizes);
        options.onUpdate(formatResult(sizes, options));
      });
    }

    // be sure we don't duplicates events listeners
    result.unbind();

    // listen for orientation change
    // - this can't be configured
    // - because it's convenient and not a real performance bottleneck
    addListener('orientationchange', onWindowChange);

    // listen to touch move for scrolling
    // – disabled by default
    // - listening to scrolling can be expansive…
    if (options.updateOnTouch) {
      addListener('touchmove', onWindowChange);
    }

    return result
  }

  return vhCheck;

})));

},{}]},{},[1]);
