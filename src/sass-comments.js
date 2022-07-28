// const sass = require('node-sass');
const sass = require('sass');
const path = require('path')

const file = path.join(__dirname, './style/components/button.scss')

sass.render({
  file,
  data: `
  .rule {
    /*  #ifndef  h5  */ h1 {margin: 0 0 20px;font-size: 40Px;line-height: 1.2;}/*  #endif  */ .test{}
  }
  `,
}, function (error, result) { // node-style callback from v3.0.0 onwards
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
    console.log(error.column);
    console.log(error.message);
    console.log(error.line);
  }
  else {
    console.log(result.css.toString());
    // console.log(result.map.toString());
    // // or better
    // console.log(JSON.stringify(result.map)); // note, JSON.stringify accepts Buffer too
  }
});