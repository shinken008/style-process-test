const less = require('less')
const path = require('path')
const utils = require('./utils')

const code = `
  .rule {
    /*  #ifndef  h5  */ h1 {margin: 0 0 20px;font-size: 40Px;line-height: 1.2;}/*  #endif  */ .test{}
  }
`

less
  .render(code, {
    paths: [__dirname]
  })
  .then(({ css }) => {
    console.log(css)
  })