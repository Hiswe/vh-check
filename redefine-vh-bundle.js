// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"e+W1":[function(require,module,exports) {
var define;
var global = arguments[3];
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
  (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.vhCheck = factory();
})(this, function () {
  'use strict';

  // don't know a better way to get the size of a CSS 100vh…

  function createTestElement() {
    var testElement = document.createElement('div');
    testElement.style.cssText = 'position: fixed; top: 0; height: 100vh; pointer-events: none;';
    document.documentElement.insertBefore(testElement, document.documentElement.firstChild);
    return testElement;
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
      isNeeded: offset !== 0
    };
  }

  function noop() {}

  function computeDifference() {
    var sizes = checkSizes();
    sizes.value = sizes.offset;
    return sizes;
  }

  function redefineVhUnit() {
    var sizes = checkSizes();
    sizes.value = sizes.windowHeight * 0.01;
    return sizes;
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
    onUpdate: noop
  };

  function isString(value) {
    return typeof value === 'string' && value !== '';
  }

  function getOptions(options) {
    // old options handling: only redefine the CSS var name
    if (isString(options)) {
      return Object.assign({}, defaultOptions, {
        cssVarName: options
      });
    }
    // be sure to have a configuration object
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') return defaultOptions;

    // make sure we have the right options to start with
    var finalOptions = {
      force: options.force === true,
      bind: options.bind !== false,
      updateOnTouch: options.updateOnTouch === true,
      onUpdate: typeof options.onUpdate === 'function' ? options.onUpdate : noop
    };

    // method change
    var redefineVh = options.redefineVh === true;
    finalOptions.method = methods[redefineVh ? 'redefineVhUnit' : 'computeDifference'];
    finalOptions.cssVarName = isString(options.cssVarName) ? options.cssVarName : // when redefining vh unit we follow this article name convention
    // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
    redefineVh ? 'vh' : defaultOptions.cssVarName;
    return finalOptions;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
  var passiveSupported = false;
  var eventListeners = [];

  /* istanbul ignore next */
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        passiveSupported = true;
      }
    });

    window.addEventListener('test', options, options);
    window.removeEventListener('test', options, options);
  } catch (err) {
    passiveSupported = false;
  }

  function addListener(eventName, callback) {
    eventListeners.push({ eventName: eventName, callback: callback });
    window.addEventListener(eventName, callback,
    /* istanbul ignore next */
    passiveSupported ? { passive: true } : false);
  }

  function removeAll() {
    eventListeners.forEach(function eventConfiguration(config) {
      window.removeEventListener(config.eventName, config.callback);
    });
    eventListeners = [];
  }

  function updateCssVar(cssVarName, result) {
    document.documentElement.style.setProperty('--' + cssVarName, result.value + 'px');
  }

  function formatResult(sizes, options) {
    return Object.assign({}, sizes, {
      unbind: removeAll,
      recompute: options.method
    });
  }

  function vhCheck(options) {
    options = Object.freeze(getOptions(options));
    var result = formatResult(options.method(), options);

    // usefulness check
    if (!result.isNeeded && !options.force) {
      return result;
    }
    updateCssVar(options.cssVarName, result);
    options.onUpdate(result);

    // enabled byt default
    if (!options.bind) return result;

    function onWindowChange() {
      window.requestAnimationFrame(function () {
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

    return result;
  }

  return vhCheck;
});
},{}],"uBAa":[function(require,module,exports) {
module.exports = function outputValue(name) {
  return function (test) {
    console.log(test);
    var message = (!test.isNeeded ? 'not ' : '') + 'needed.<br/>';
    message = message + name + ' is: ';
    message = message + test.value + 'px';
    var domCheckWrapper = document.querySelector('.js-check');
    domCheckWrapper.innerHTML = message;
  };
};
},{}],"ZNGm":[function(require,module,exports) {
'use strict';

var _vhCheck = require('../dist/vh-check.js');

var _vhCheck2 = _interopRequireDefault(_vhCheck);

var _outputValue = require('./output-value');

var _outputValue2 = _interopRequireDefault(_outputValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _vhCheck2.default)({
  redefineVh: true,
  force: true,
  updateOnTouch: true,
  onUpdate: (0, _outputValue2.default)('1vh')
});
},{"../dist/vh-check.js":"e+W1","./output-value":"uBAa"}]},{},["ZNGm"], null)