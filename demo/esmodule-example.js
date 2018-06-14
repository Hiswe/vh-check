import vhCheck from '../dist/vh-check.js'

const test = vhCheck();
const value = document.documentElement.style.getPropertyValue('--vh-offset');

const p = document.createElement(`p`);
const message = `${!test ? 'not ' : ''} needed.<br/>Gap is: ${test ? value: '0px'}`;
p.innerHTML = message;

document.body.insertBefore(p, document.body.firstChild);
