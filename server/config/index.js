let dotenv = require('dotenv')

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

module.exports = config = {
    port: parseInt(process.env.PORT, 10) || 3001,
    logs: {
        level: process.env.LOG_LEVEL || 'silly', // using winston logger
    },
    api: {
        prefix: '/api',
    },
    session: {
        secret: 'game closure',
        resave: true,

        // Rolling is typically used in conjuction with short session.
        // Using it here allows us to more easily keep track of
        // users in the db since the username is the sessionID.
        rolling: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 7 * 24 * 60 * 60 * 1000, // set to 1 week,
            // domain: process.env.DOMAIN || '127.0.0.1',
            httponly: true
        }
    }
}
