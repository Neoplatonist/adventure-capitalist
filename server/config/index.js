let dotenv = require('dotenv')

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

module.exports = config = {
    jwtSecret: 'game closure',
    port: parseInt(process.env.PORT, 10) || 3001,
    logs: {
        level: process.env.LOG_LEVEL || 'silly', // using winston logger
    },
    api: {
        prefix: '/api',
    }
}
