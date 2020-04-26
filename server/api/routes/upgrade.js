let express = require('express'),
    { Container } = require('typedi'),
    UpgradeService = require('../../services/upgrade')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/upgrades', route)

    route.get(
        '/',
        async (req, res) => {
            const logger = Container.get('logger')
            logger.debug('/upgrade')

            try {
                const upgradeServiceInstance = new UpgradeService(Container)
                const response = await upgradeServiceInstance
                    .GetAllUpgradesByUsername(req.sessionID)

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
