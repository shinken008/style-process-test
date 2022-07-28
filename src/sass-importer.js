// const sass = require('node-sass');
const sass = require('sass');
const fs = require('fs')
const path = require('path')

const file = path.join(__dirname, './style/components/button.scss')
const data = fs.readFileSync(file, { encoding: 'utf-8' }).toString()

sass.render({
  // file,
  data,
  importer: (...args) => {
    const [url, prev] = args
    const prevFile = path.isAbsolute(prev) ? prev : file
    const _file = path.resolve(path.dirname(prevFile), url)

    console.log('_file >>>>>>>>>>', _file)
    
    return {
      file: _file,
      contents: fs.readFileSync(_file, { encoding: 'utf-8' }).toString()
    }
  }
}, function (error, result) { // node-style callback from v3.0.0 onwards
  if (error) {
    console.error(error); // used to be "code" in v2x and below
  }
  else {
    console.log(result.css.toString());
  }
});