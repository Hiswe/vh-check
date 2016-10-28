var vhCheck = require('../vh-check.js');
var test = vhCheck();
var p = document.createElement('p');
var message = !test ? 'not needed. Gap is: ' : 'needed. Gap is: ';
var value = document.documentElement.style.getPropertyValue('--vh-offset');
value = value ? value : '0px';
message = message + value;
p.textContent = message;
document.body.insertBefore(p, document.body.firstChild);
