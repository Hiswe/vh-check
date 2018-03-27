import merge from 'lodash.merge'
import { rollup } from 'rollup'
import uglify from 'rollup-plugin-uglify'
import cleanup from 'rollup-plugin-cleanup'

const NAME = `vh-check`

const baseConfig = {
  input: `src/index.js`,
  output: {
    format: `umd`,
    name: `${ NAME }`,
  },
}

const npmConfig = merge({}, baseConfig, {
  output: {
    file: `${ NAME }.js`,
  },
  plugins: [
    cleanup(),
  ],
})

const minConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${ NAME }.min.js`,
  },
  plugins: [
    uglify(),
  ],
})

export default [ npmConfig, minConfig ]
