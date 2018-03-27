const NAME = `vh-check`

export default {
  input: `src/index.js`,
  output: {
    format: `umd`,
    file: `${ NAME }.js`,
    name: `${ NAME }`,
  },
}
