var less = require('less')
  , fs = require('fs')
  , path = require('path')

var src = './b.less' //some less source file
var result = less.parse(fs.readFileSync(path.resolve(__dirname, src)).toString(), {
  filename: path.resolve(src)
}, function (e, tree) {
  if (e) {
    throw e.message
  }
  console.log(tree)
})

