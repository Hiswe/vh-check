import merge from 'lodash.merge'
import { uglify } from 'rollup-plugin-uglify'
import typescript from 'rollup-plugin-typescript2'

const NAME = `vh-check`

const baseConfig = {
  input: `src/${NAME}.ts`,
  output: {
    format: `umd`,
    name: `vhCheck`,
  },
}

const npmConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${NAME}.js`,
  },
  plugins: [typescript()],
})

const minConfig = merge({}, baseConfig, {
  output: {
    file: `dist/${NAME}.min.js`,
  },
  plugins: [typescript(), uglify()],
})

export default [npmConfig, minConfig]
