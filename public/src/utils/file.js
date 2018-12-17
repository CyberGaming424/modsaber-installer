const fs = require('fs')
const mkdirp = require('mkdirp')
const { promisify } = require('util')
const access = promisify(fs.access)

/**
 * @param {fs.PathLike} path A path to a file. If a URL is provided, it must use the file: protocol.
 * URL support is experimental. If a file descriptor is provided, the underlying file will not be closed automatically.
 */
const exists = async path => {
  try {
    await access(path, fs.constants.F_OK)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
    else throw err
  }
}

module.exports = {
  readFile: promisify(fs.readFile),
  writeFile: promisify(fs.writeFile),
  access,
  exists,
  ensureDir: promisify(mkdirp),
  readDir: promisify(fs.readdir),
}
