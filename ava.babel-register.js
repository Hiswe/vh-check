require('@babel/register')({
  babelrc: false,
  presets: [`@ava/transform-test-files`, `@ava/stage-4`],
})
