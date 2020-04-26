let express = require('express'),
    { Container } = require('typedi'),
    IndustryService = require('../../services/industry')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/industries', route)

    route.get(
        '/',
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/industries')

            try {
                const industryServiceInstance = new IndustryService(Container)
                const response = await industryServiceInstance
                    .GetAllIndustriesByUsername(req.sessionID)

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
