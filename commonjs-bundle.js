(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var vhCheck = require('../dist/vh-check.js');
var test = vhCheck();

var p = document.createElement('p');
var message = (!test ? 'not ' : '') + 'needed.<br/>Gap is: ';
var value = document.documentElement.style.getPropertyValue('--vh-offset');
value = value ? value : '0px';
message = message + value;
p.innerHTML = message;

document.body.insertBefore(p, document.body.firstChild);

},{"../dist/vh-check.js":2}],2:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.vhCheck = factory());
}(this, (function () { 'use strict';

  function testVh() {
    // test with fixed
    var fixedTest = document.createElement('div');
    fixedTest.style.cssText = 'position: fixed; top: 0; bottom: 0;';
    document.documentElement.insertBefore(
      fixedTest,
      document.documentElement.firstChild
    );
    // test with vh
    var vhTest = document.createElement('div');
    vhTest.style.cssText = 'position: fixed; top: 0; height: 100vh';
    document.documentElement.insertBefore(
      vhTest,
      document.documentElement.firstChild
    );
    // in iOS vh will be bigger
    var topBottom = fixedTest.offsetHeight;
    var vh = vhTest.offsetHeight;
    var offset = vh - topBottom;
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
    // usefulness check
    if (!offset) return false;
    updateCssVar(cssVarName, offset);
    // Listen for orientation changes
    window.addEventListener(
      'orientationchange',
      function() {
        var newOffset = testVh();
        updateCssVar(cssVarName, newOffset);
      },
      false
    );
    return true;
  }

  return vhCheck;

})));

},{}]},{},[1]);
