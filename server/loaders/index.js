let expressLoader = require('./express'),
    dependencyInjectorLoader = require('./dependencyInjector'),
    dbLoader = require('./memoryDB'),
    Logger = require('./logger')

module.exports = async (app) => {
    await dependencyInjectorLoader({
        dbConnection: dbLoader(),
        models: []
    })

    await expressLoader(app)

    Logger.info('✌️ Finished loaders')
}
