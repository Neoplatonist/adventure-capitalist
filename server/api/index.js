let express = require('express'),
    { Container } = require('typedi'),
    auth = require('./routes/auth'),
    user = require('./routes/user'),
    industry = require('./routes/industry'),
    manager = require('./routes/manager'),
    upgrade = require('./routes/upgrade')

module.exports = () => {
    const logger = Container.get('logger')
    const app = express.Router()

    app.get('/v1/dbVersion', async (req, res) => {
        logger.debug('/dbVersion')

        const { version } = require('../db')
        res.json(version).status(200)
    })

    // API Routes
    auth(app)
    industry(app)
    manager(app)
    upgrade(app)
    user(app)

    return app
}
