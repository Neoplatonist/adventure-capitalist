let express = require('express'),
    { Container } = require('typedi'),
    user = require('./routes/user'),
    industry = require('./routes/industry'),
    manager = require('./routes/manager'),
    upgrade = require('./routes/upgrade'),
    middlewares = require('./middlewares')

module.exports = () => {
    const logger = Container.get('logger')
    let app = express.Router()

    // Global Middlewares
    middlewares.session(app)

    app.get('/v1/dbVersion', async (req, res) => {
        logger.debug('/dbVersion')

        const { version } = require('../db')
        res.json(version).status(200)
    })

    // API Routes
    industry(app)
    manager(app)
    upgrade(app)
    user(app)

    return app
}
