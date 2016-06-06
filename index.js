(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.vhCheck = factory();
  }
}(this, function () {
  'use strict';
  return function vhCheck(cssVarName) {
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
    style.innerHTML = ':root { --' + cssVarName + ': ' + offset + 'px; }';
    document.body.insertBefore(style, document.body.firstChild);
    return true
  }
}));
