const sass = require('sass');
sass.render({
  file: '/path/to/myFile.scss',
  data: `
  @use 'sass:math';
  $font-sizes: (
    28px: 38px,
    24px: 32px,
    22px: 30px,
    20px: 28px,
    18px: 24px,
    16px: 22px,
    14px: 20px,
    12px: 16px,
    10px: 14px
  ) !default;
  
  @function strip-units($number){
    @return math.div($number, ($number * 0 + 1));
  }
  
  @mixin font(
    $font-size,
    $line-height: map-get($map: $font-sizes, $key: $font-size)
  ) {
    font-size: $font-size;
    line-height: $line-height;
  }
  
  
  @each $font-size, $line-height in $font-sizes {
    .font-size-h#{strip-units($font-size)} {
      @include font($font-size, $line-height);
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