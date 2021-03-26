const sass = require('node-sass');
sass.render({
  file: '/path/to/myFile.scss',
  data: `
@mixin reset-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

@mixin horizontal-list {
  @include reset-list;

  li {
    display: inline-block;
    margin: {
      left: -2px;
      right: 2em;
    }
  }
}

nav ul {
  @include horizontal-list;
}

.box {
  color: red;
  &_title {
    line-height: 24px;
  }
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