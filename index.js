(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'vhCkeck'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('vhCkeck'));
  } else {
    // Browser globals
    factory(root);
  }
}(this, function (exports, vhCkeck) {
  'use strict';
  // use vhCkeck in some fashion.
  // attach properties to the exports object to define
  // the exported module properties.
  exports.vhCkeck = function (cssVarName) {
    // configurable CSS var
    cssVarName = typeof cssVarName === 'string' ? cssVarName : 'vh-offset';
    // test with fixed
    var fixedTest = document.createElement('div')
    fixedTest.style.cssText = 'position: fixed; top: 0; bottom: 0;'
    document.documentElement.insertBefore(fixedTest, document.documentElement.firstChild)
    // test with vh
    var vhTest = document.createElement('div');
    vhTest.style.cssText = 'position: fixed; top: 0; height: 100vh';
    document.documentElement.insertBefore(vhTest, document.documentElement.firstChild);
    // in iOS vh will be bigger
    const topBottom = fixedTest.offsetHeight;
    const vh        = vhTest.offsetHeight;
    const offset    = vh - topBottom;
    // clean
    document.documentElement.removeChild(fixedTest);
    document.documentElement.removeChild(vhTest);
    // usefullness check
    if (!offset) return false;
    var style = document.createElement('style');
    style.innerHTML = ':root { --' + options.cssVarName + ': ' + offset + 'px; }';
    document.body.insertBefore(style, document.body.firstChild);
    return true
  };
}));
