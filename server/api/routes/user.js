let express = require('express'),
    { Container } = require('typedi'),
    UserService = require('../../services/user'),
    middleware = require('../middlewares'),
    jwt = require('jsonwebtoken')

const route = express.Router()

module.exports = async (app) => {
    app.use('/v1/user', route)

    route.get(
        '/',
        async (req, res, next) => {
            const logger = Container.get('logger')
            logger.debug('/user GET')

            try {
                const { username } = jwt.decode(req.headers['authorization'].split(' ')[1])
                const userServiceInstance = new UserService(Container)
                const user = await userServiceInstance
                    .GetUserByName(username)

                return res.status(200).json(user)
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
                const { username } = jwt.decode(req.headers['authorization'].split(' ')[1])
                const userServiceInstance = new UserService(Container)

                const industryList = req.body.industryList
                const managerList = req.body.managerList
                const upgradeList = req.body.upgradeList

                const dataSheet = industryList.map(industry => {
                    const name = industry.name
                    const manager = managerList.filter(manager => manager.name = name)
                    const upgrade = upgradeList.filter(upgrade => upgrade.name = name)

                    delete industry.name
                    delete manager.name
                    delete upgrade.name

                    return {
                        name,
                        industry,
                        manager,
                        upgrade
                    }
                })

                const userObj = await userServiceInstance.UpdateUserByName({
                    username,
                    antimatter: req.body.antimatter,
                    timeStamp: new Date() / 1000,
                    dataSheet
                })

                return res.status(201).json(userObj)
            } catch (error) {
                logger.error('error: %o', error)
                return next(error)
            }
        }
    )
}
