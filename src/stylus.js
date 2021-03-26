const stylus = require('stylus');
const nib = require('nib');

const code = `
  @import './b.styl';
  .a {
    color: red;
  }
`
const paths = [
  __dirname,
];

stylus(code)
  .set('filename', __dirname + '/test.styl')
  // .import('b.rn.styl')
  .set('paths', paths)
  .use(nib())
  .render(function (err, css) {
    if (err) throw err;
    console.log(css);
  });