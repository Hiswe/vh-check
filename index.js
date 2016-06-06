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

  function testVh() {
    // test with fixed
    var fixedTest = document.createElement('div')
    fixedTest.style.cssText = 'position: fixed; top: 0; bottom: 0;'
    document.documentElement.insertBefore(fixedTest, document.documentElement.firstChild)
    // test with vh
    var vhTest = document.createElement('div');
    vhTest.style.cssText = 'position: fixed; top: 0; height: 100vh';
    document.documentElement.insertBefore(vhTest, document.documentElement.firstChild);
    // in iOS vh will be bigger
    var topBottom = fixedTest.offsetHeight;
    var vh        = vhTest.offsetHeight;
    var offset    = vh - topBottom;
    // clean
    document.documentElement.removeChild(fixedTest);
    document.documentElement.removeChild(vhTest);
    return offset;
  }

  return function vhCheck(cssVarName) {
    // configurable CSS var
    cssVarName = typeof cssVarName === 'string' ? cssVarName : 'vh-offset';
    var offset = testVh();
    // usefullness check
    if (!offset) return false;
    var style = document.createElement('style');
    style.innerHTML = ':root { --' + cssVarName + ': ' + offset + 'px; }';
    document.body.insertBefore(style, document.body.firstChild);
    // Listen for orientation changes
    window.addEventListener('orientationchange', function() {
      var newOffset = testVh();
      style.innerHTML = ':root { --' + cssVarName + ': ' + newOffset + 'px; }';
    }, false);
    return true;
  }
}));
