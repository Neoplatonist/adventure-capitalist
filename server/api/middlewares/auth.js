const jwt = require('jsonwebtoken'),
    config = require('../../config'),
    logger = require('../../loaders/logger')


function validate(req, res, next) {
    try {
        if (!req.headers["authorization"]) {
            throw new Error('Invalid or no authorization token')
        }

        console.debug('headers:', req.headers['authorization'].split(' ')[1])

        const verified = jwt.verify(
            req.headers['authorization'].split(' ')[1],
            config.jwtSecret
        )

        if (verified) {
            next()
        } else {
            throw new Error('Invalid or no authorization token')
        }
    } catch (error) {
        logger.error(error)
        res.status(401).json(error)
    }
}

module.exports = validate
