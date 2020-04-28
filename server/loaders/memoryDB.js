let Datastore = require('nedb'),
    Logger = require('../loaders/logger')

module.exports = () => {
    Logger.info('✌️ Database Loaded')
    return new Datastore({ filename: './db/dataStore', autoload: true })
}
