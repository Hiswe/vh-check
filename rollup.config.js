import merge from 'lodash.merge'
import { rollup } from 'rollup'
import uglify from 'rollup-plugin-uglify'

const NAME = `vh-check`

const baseConfig = {
  input: `src/index.js`,
  output: {
    format: `umd`,
    name: `${ NAME }`,
  },
}

const devConfig = merge({}, baseConfig, {
  output: {
    file: `${ NAME }.dev.js`,
  },
})

const prodConfig = merge({}, baseConfig, {
  output: {
    file: `${ NAME }.js`,
  },
  plugins: [
    uglify(),
  ],
})

export default [ devConfig, prodConfig ]
