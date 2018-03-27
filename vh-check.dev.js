(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global['vh-check'] = factory());
}(this, (function () { 'use strict';

  function testVh() {
    // test with fixed
    var fixedTest = document.createElement('div');
    fixedTest.style.cssText = 'position: fixed; top: 0; bottom: 0;';
    document.documentElement.insertBefore(fixedTest, document.documentElement.firstChild);
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

  function updateCssVar(cssVarName, offset) {
    document.documentElement.style.setProperty('--' + cssVarName, offset + 'px');
  }

  function vhCheck(cssVarName) {
    // configurable CSS var
    cssVarName = typeof cssVarName === 'string' ? cssVarName : 'vh-offset';
    var offset = testVh();
    // usefullness check
    if (!offset) return false;
    updateCssVar(cssVarName, offset);
    // Listen for orientation changes
    window.addEventListener('orientationchange', function() {
      var newOffset = testVh();
      updateCssVar(cssVarName, newOffset);
    }, false);
    return true;
  }

  return vhCheck;

})));
