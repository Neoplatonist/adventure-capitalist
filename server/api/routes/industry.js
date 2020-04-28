let express = require('express'),
    { Container } = require('typedi'),
    IndustryService = require('../../services/industry'),
    middleware = require('../middlewares'),
    jwt = require('jsonwebtoken')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/industries', route)

    route.get(
        '/',
        middleware.validate,
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/industries GET')

            try {
                const { username } = jwt.decode(req.headers['authorization'].split(' ')[1])
                const industryServiceInstance = new IndustryService(Container)
                const industryList = await industryServiceInstance
                    .GetAllIndustriesByUsername(username)

                return res.status(200).json(industryList)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )
}
