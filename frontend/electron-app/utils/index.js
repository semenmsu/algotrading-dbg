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

function exitHandler(options, exitCode) {

    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}

class StreamWorker {
    constructor(timeout) {
        this.ref_count = 1
        this.timeout = timeout
        this.setHandler = this.setHandler.bind(this)
        this.timeoutHandler = this.timeoutHandler.bind(this)
        this.incrementRef = this.incrementRef.bind(this)
        this.decrementRef = this.decrementRef.bind(this)
        this.shouldBeFree = this.shouldBeFree.bind(this)
        this.free = this.free.bind(this)
        

    }

    timeoutHandler() {
        if (this.requestHandler) {
            this.requestHandler()
        }
        this.timer = setTimeout(this.timeoutHandler, this.timeout)
    }

    setHandler(requestHandler) {
        this.requestHandler = requestHandler
        this.timer = setTimeout(this.timeoutHandler, 100)
    }

    incrementRef() {
        this.ref_count++;
    }

    decrementRef() {
        this.ref_count--;
    }

    shouldBeFree() {
        return this.ref_count === 0
    }

    free() {
        console.log("stream is clean!")
        if (this.timer) {
            clearTimeout(this.timer)
        }
        
    }
}

module.exports = {
    loadPlugins,
    exitHandler,
    StreamWorker
}