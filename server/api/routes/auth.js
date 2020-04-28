const express = require('express'),
  { Container } = require('typedi'),
  AuthService = require('../../services/auth'),
  jwt = require('jsonwebtoken'),
  config = require('../../config')

const route = express.Router()

module.exports = async (app) => {
  app.use('/v1/auth', route)

  route.post(
    '/signup',
    async (req, res, next) => {
      const logger = Container.get('logger')
      logger.debug('/SignUp POST')

      try {
        const username = req.body.username
        if (!username) {
          return res.status(401).json('no user specified')
        }

        const authServiceInstance = new AuthService(Container)
        const createdUser = await authServiceInstance.SignUp(username)

        const token = jwt.sign({ username: createdUser.username }, config.jwtSecret)

        return res.status(201).json({ token })
      } catch (error) {
        logger.error('error: %o', error)
        return next(error)
      }
    }
  )

  route.post(
    '/login',
    async (req, res, next) => {
      const logger = Container.get('logger')
      logger.debug('/Login POST')

      try {
        const username = req.body.username
        if (!username) {
          return res.status(401).json('no user specified')
        }

        const authServiceInstance = new AuthService(Container)
        const user = await authServiceInstance.Login(username)

        const token = jwt.sign({ username: user.username }, config.jwtSecret)

        return res.status(201).json({ token })
      } catch (error) {
        logger.error('error: %o', error)
        return next(error)
      }
    }
  )
}
