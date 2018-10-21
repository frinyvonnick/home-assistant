import fs from 'fs'
import rimraf from 'rimraf'

const createFolder = path => {
  if (fs.existsSync(path)) rimraf.sync(path)
  fs.mkdirSync(path)
}

// eslint-disable-next-line
export { createFolder }
