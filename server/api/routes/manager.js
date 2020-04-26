let express = require('express'),
    { Container } = require('typedi'),
    ManagerService = require('../../services/manager')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/managers', route)

    route.get(
        '/',
        async (req, res) => {
            const logger = Container.get('logger')
            logger.debug('/managers')

            try {
                const managerServiceInstance = new ManagerService(Container)
                const response = await managerServiceInstance
                    .GetAllManagersByUsername(req.sessionID)

                if (response.status !== 'ok') {
                    return res.json(response).status(401)
                }

                return res.json(response).status(200)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )
}
