let express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    routes = require('../api'),
    config = require('../config'),
    Logger = require('./logger')

module.exports = (app) => {
    // Health Check endpoints
    app.get('/status', (req, res) => {
        res.status(200).end()
    })
    app.head('/status', (req, res) => {
        res.status(200).end()
    })

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy')

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors())

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json())
    // Load API routes
    app.use(config.api.prefix, routes())

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Hello stranger. Uh this is awkward...you broke our site! Just kidding. The page you are looking for does not exist: Error 404 :P')
        err['status'] = 404
        next(err)
    })

    /// error handlers
    app.use((err, req, res, next) => {
        // Handle 401 thrown by express-jwt library
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end()
        }
        return next(err)
    })

    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message,
            },
        })
    })

    Logger.info('✌️ Express loaded')
}
