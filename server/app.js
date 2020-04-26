let config = require('./config'),
    express = require('express'),
    Logger = require('./loaders/logger')

async function startServer() {
    const app = express()

    let loaders = await require('./loaders')
    loaders(app)

    app.listen(config.port, err => {
        if (err) {
            Logger.error(err)
            process.exit(1)
            return
        }

        Logger.info(`
      ####################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ####################################
    `)
    })
}

startServer()
