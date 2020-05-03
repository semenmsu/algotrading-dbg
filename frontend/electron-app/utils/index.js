const fs = require('fs')
const path = require('path')


async function loadPlugins(plugins_path , method="bash") {
    let files = fs.readdirSync(plugins_path)
    let plugins = {}
    console.log("files ", files)
    for (let file_name of files) {
        let stat = fs.statSync(path.join(plugins_path, file_name))
        if (stat.isFile()) {
            const [name, ext] = file_name.split('.')
            if (name && ext && ext === "js") {
                plugins[name]  = await require(path.join(plugins_path, file_name))
            }
        }
    }
    Object.keys(plugins).map((key, index) => {
        plugins[key] = new (plugins[key])(method)
      });
    return plugins
}

module.exports = {
    loadPlugins
}