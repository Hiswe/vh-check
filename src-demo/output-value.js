module.exports = function outputValue(name) {
  return function(test) {
    console.log(test)
    var message = (!test.isNeeded ? 'not ' : '') + 'needed.<br/>'
    message = message + name + ' is: '
    message = message + test.value + 'px'
    const domCheckWrapper = document.querySelector('.js-check')
    domCheckWrapper.innerHTML = message
  }
}
