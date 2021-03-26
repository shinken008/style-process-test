'use strict'

// external tooling
const path = require('path')
const resolve = require('resolve')
const utils = require('./utils')

const moduleDirectories = ['web_modules', 'node_modules']

const extensions = ['.less']

function resolveModule(id, opts) {
  return new Promise((res, rej) => {
    resolve(id, opts, (err, path) => (err ? rej(err) : res(path)))
  })
}

module.exports = function (id, base, options) {
  const paths = options.path
  const ext = path.extname(id)
  const filename = path.basename(file)
  const basename = path.basename(id, ext)
  if (!ext) {
    throw new Error('Import or resolve source should have a extension.')
  }
  const exts = [
    // add the platform specific extension, first in the array to take precedence
    options.platform === 'android' ? '.android' + ext : '.ios' + ext,
    '.native' + ext,
    '.rn' + ext,
    ext
  ]

  const file = utils.findVariant(basename, exts, [base, ...paths])

  if (!file) {
    throw new Error(`
      Failed to find ${id}
      in [
    ${paths.join(',\n        ')}
  ]
    `)
  }

  const resolveOpts = {
    basedir: base,
    paths: paths,
    extensions,
    moduleDirectory: moduleDirectories,
    preserveSymlinks: false,
  }

  return resolveModule(`./${filename}`, resolveOpts)
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
