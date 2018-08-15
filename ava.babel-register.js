require('@babel/register')({
  babelrc: false,
  presets: [`@ava/stage-4`, `@ava/transform-test-files`],
})
