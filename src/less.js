const less = require('less')
const path = require('path')
const utils = require('./utils')
const { basename } = require('path')

function resolveStyle(id, opts) {
  const { basedir, platform, paths = [] } = opts
  const { dir, name, ext } = path.parse(id)
  const incPaths = [path.resolve(basedir, dir)].concat(paths)

  const exts = [
    // add the platform specific extension, first in the array to take precedence
    platform === 'android' ? '.android' + ext : '.ios' + ext,
    '.rn' + ext,
    ext
  ]
  const file = utils.findVariant(name, exts, incPaths)
  if (!file) {
    throw new Error(`
    样式文件没有找到，请检查文件路径: ${id}
      在 [
        ${incPaths.join(',\n       ')}
      ]
    `)
  }

  return file
}

function Converter () { }

Converter.prototype = {
  process: function (src, { fileInfo }) {
    // src = src.replace(/@import\s?['|"]([\w-_]+|[\w-_/]+\/|\.\.?\/)([^./]*?)['|"];/gi, function replacement(match, pathOrName, name) {
      
    // })
    // TODO: 替换是注释的忽略
    // 从 src 里面拿到 import source 进行更改替换
    // 正则 /@import\s+['"]\s*(\/|\.\.?\/[\w-\.]*)\s*['"]\s*;/gi
    // src = src.replace
    const basedir = fileInfo.currentDirectory
    if (!basedir) {
      return src
    }
    src = src.replace(/@import\s+['"]\s*(\/|\.\.?\/[\w-\.]*)\s*['"]\s*;/gi, (match, id) => {
      const relativePath = path.relative(basedir, resolveStyle(id, { basedir, platform: 'android' })).replace(/\\/g, '/')
      return `@import '${relativePath}';`
    })
    // resolveStyle(id, { basedir, platform: 'android' })
    console.log(src, '\n')
    // process file
    // return [src].concat(replacements()).reduce(function (source, item) {
    // return [src].concat(replacements()).reduce(function (source, item) {
    //   return source.replace(item.pattern, item.replacement)
    // })
    return src
  }
}

console.log(path.resolve(__dirname, '../src'))


class Importer {
  process(src, { fileInfo }) {
    const basedir = fileInfo.currentDirectory
    if (!basedir) {
      return src
    }
    src = src.replace(/@import\s['"]([^'|"]*)['"]/gi, (match, id) => {
    // src = src.replace(/@import\s+['"]\s*(\/|\.\.?\/[\w-\.]*)\s*['"]\s*;/gi, (match, id) => {
      const relativePath = path.relative(basedir, resolveStyle(id.trim(), { basedir, platform: 'android' })).replace(/\\/g, '/')
      return `@import '${relativePath}';`
    })
    return src
  }
}

const lessplugin = {
  install: (less, pluginManager) => {
    pluginManager.addPreProcessor(new Importer(), 2000)
  },
  minVersion: [2, 7, 1]
}

const code = `
  @import "./b.less";
  .a {
    color: red;
  }
`

less
  .render(code, {
    plugins: [lessplugin],
    paths: [__dirname]
  })
  .then(({ css }) => {
    console.log(css)
  })