const {Command, flags} = require('@oclif/command')
const fs = require('fs-extra')

class CombineJsonFilesCommand extends Command {
  async run() {
    const cwdFiles = await fs.readdir(process.cwd())
    const jsonFiles = cwdFiles.filter(fileName => fileName.includes('.json'))

    const jsonArray = []

    for (const jsonFile of jsonFiles) {
      const fileContents = await fs.readJSON(jsonFile)

      if (Array.isArray(fileContents)) {
        fileContents.forEach(item => jsonArray.push(item))
      } else {
        jsonArray.push(fileContents)
      }
    }

    await fs.writeJSON('__all.json', jsonArray)
  }
}

CombineJsonFilesCommand.description = `Describe the command here
...
Extra documentation goes here
`

CombineJsonFilesCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = CombineJsonFilesCommand
