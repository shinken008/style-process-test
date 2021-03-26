// https://github.com/postcss/postcss

const postcss = require('postcss');
const postcssImport = require('postcss-import');
const resolveId = require('./resolve-id');


const code = `
  @import './b.css';
  .a {
    color: red;
  }
`

postcss([postcssImport({
  resolve: function resolve(id, base, options) {
    return resolveId(id, base, { ...options, platform: 'android' })
  },
})])
  .process(code, { from: './src/a.css' })
  .then(ret => {
    const css = ret.css;
    console.log(css);
  })


