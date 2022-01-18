const path = require('path')
const { spawnSync } = require('child_process')

exports.runFormat =  () => {
    return new Promise(resolve => {
      resolve(spawnSync('sh', [`${path.join(__dirname, 'runFormat.sh')}`], {
        cwd: path.join(__dirname, '..')
      }))
    })
  }