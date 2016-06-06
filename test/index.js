var vhCkeck = require('../index');
console.log(vhCkeck)
var test = vhCkeck();
var p = document.createElement('p');
p.textContent = !test ? 'not needed' : 'needed';
document.body.appendChild(p);
