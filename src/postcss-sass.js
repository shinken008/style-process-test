const postcss = require('postcss');
const postcssSass = require('@csstools/postcss-sass');

const code = `
.a {
  color: red;
}
`

postcss([
  postcssSass()
]).process(code, {
  syntax: 'postcss-scss'
}).then(result => {
  console.log(result)
})