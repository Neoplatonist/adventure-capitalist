let { Container } = require('typedi'),
    LoggerInstance = require('./logger')

module.exports = ({ dbConnection, models }) => {
    try {
        // Set database models individually in the container for injection later

        Container.set('dbConnection', dbConnection)

        Container.set('logger', LoggerInstance)
    } catch (error) {
        LoggerInstance.error('Error on dependency injector loader: %o', error)
        throw error
    }
}
