let express = require('express'),
    { Container } = require('typedi'),
    UpgradeService = require('../../services/upgrade'),
    middleware = require('../middlewares'),
    jwt = require('jsonwebtoken')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/upgrades', route)

    route.get(
        '/',
        middleware.validate,
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/upgrade GET')

            try {
                const { username } = jwt.decode(req.headers['authorization'].split(' ')[1])
                const upgradeServiceInstance = new UpgradeService(Container)
                const upgradeList = await upgradeServiceInstance
                    .GetAllUpgradesByUsername(username)

                return res.status(200).json(upgradeList)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )
}
