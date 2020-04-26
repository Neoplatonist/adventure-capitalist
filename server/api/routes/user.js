let express = require('express'),
    { Container } = require('typedi'),
    UserService = require('../../services/user')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/user', route)

    route.get(
        '/',
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/user GET')

            try {
                const userServiceInstance = new UserService(Container)
                const { data, status } = await userServiceInstance.GetUserByName(req.sessionID)

                if (status !== 'ok') {
                    return res.json(status).status(401)
                }

                return res.json(data).status(200)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )

    // This route is for the client to test whether
    //  the user has data saved in the db already.
    // If they do not, create a user in the db using
    //  the session id as the username.
    route.post(
        '/',
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/user POST')

            try {
                const userServiceInstance = new UserService(Container)
                const { status } = await userServiceInstance.SignUp(req.sessionID)

                if (status !== 'ok') {
                    return res.json(status).status(401)
                }

                return res.json(status).status(201)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )

    route.put(
        '/',
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/user PUT')

            try {
                const userServiceInstance = new UserService(Container)
                const { status } = await userServiceInstance.UpdateUserByName({
                    username: req.sessionID,
                    antimatter: req.body.antimatter,
                    timeStamp: new Date() / 1000
                })

                if (status !== 'ok') {
                    return res.json(status).status(401)
                }

                return res.json(status).status(201)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )
}
