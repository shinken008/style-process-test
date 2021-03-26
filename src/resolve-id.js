'use strict'

// external tooling
const path = require('path')
const resolve = require('resolve')
const utils = require('./utils')

const moduleDirectories = ['web_modules', 'node_modules']

function resolveModule(id, opts) {
  return new Promise((res, rej) => {
    resolve(id, opts, (err, path) => (err ? rej(err) : res(path)))
  })
}

module.exports = function (id, base, options) {
  const paths = options.path

  const resolveOpts = {
    basedir: base,
    moduleDirectory: moduleDirectories.concat(options.addModulesDirectories),
    paths: paths,
    // extensions: ['.css', '.pcss'],
    packageFilter: function processPackage(pkg) {
      if (pkg.style) pkg.main = pkg.style
      else if (!pkg.main || !/\.css$/.test(pkg.main)) pkg.main = 'index.css'
      return pkg
    },
    preserveSymlinks: false,
  }

  const ext = path.extname(id)
  const platform =  ''
  const exts = [
    // add the platform specific extension, first in the array to take precedence
    options.platform === 'android' ? '.android' + ext : '.ios' + ext,
    '.native' + ext,
    '.rn' + ext,
    ext
  ]
  const file = utils.findVariant(path.basename(id, ext), exts, [base, ...paths])
  if (!file) {
    throw new Error(`
      Failed to find ${id}
      in [
    ${paths.join(',\n        ')}
  ]
    `)
  }
  const fileName =  path.basename(file)

  return resolveModule(`./${fileName}`, resolveOpts)
    .catch(() => resolveModule(id, resolveOpts))
    .catch(() => {
      if (paths.indexOf(base) === -1) paths.unshift(base)

      throw new Error(
        `Failed to find '${id}'
  in [
    ${paths.join(',\n        ')}
  ]`
      )
    })
}
