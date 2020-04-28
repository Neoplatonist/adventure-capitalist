let express = require('express'),
    { Container } = require('typedi'),
    ManagerService = require('../../services/manager'),
    middleware = require('../middlewares'),
    jwt = require('jsonwebtoken')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/managers', route)

    route.get(
        '/',
        middleware.validate,
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/managers GET')

            try {
                const { username } = jwt.decode(req.headers['authorization'].split(' ')[1])
                const managerServiceInstance = new ManagerService(Container)
                const managerList = await managerServiceInstance
                    .GetAllManagersByUsername(username)

                return res.status(200).json(managerList)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )
}
