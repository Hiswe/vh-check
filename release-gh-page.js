'ust strict'

const ghpages = require('gh-pages')

console.log(`releasing to github-pages…`)

const folder = `dist-demo`
const options = {}
ghpages.publish(folder, options, err => {
  if (err) return console.log(err)
  console.log(`release to github-pages done`)
})
