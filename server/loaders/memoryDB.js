let Datastore = require('nedb'),
    Logger = require('../loaders/logger')

module.exports = async () => {
    // mongoose or redis connector goes here

    Logger.info('✌️ Database Loaded')
    return await new Datastore({ filename: './db/dataStore', autoload: true })
}
