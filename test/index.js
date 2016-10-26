var vhCkeck = require('../vh-check.js');
var test = vhCkeck();
var p = document.createElement('p');
p.textContent = !test ? 'not needed' : 'needed';
document.body.insertBefore(p, document.body.firstChild);
