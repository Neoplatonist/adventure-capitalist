let { dataSheet } = require('../db')

class UserService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async SignUp(username) {
        this.logger.debug('Signing up a user')

        try {
            await new Promise((resolve, reject) => {
                this.db.findOne({ username }, (error, doc) => {
                    if (error) {
                        return reject({ status: 404, message: error })
                    }

                    if (doc != null) {
                        return reject({ status: 404, message: 'username already taken' })
                    }

                    return resolve(doc)
                })
            })

            const createdUser = await new Promise((resolve, reject) => {
                this.db.insert({ username, dataSheet }, (error, newDoc) => {
                    if (error) {
                        return reject({ status: 404, message: error })
                    }

                    return resolve(newDoc)
                })
            })

            return createdUser
        } catch (error) {
            this.logger.error('error: %o', error)
            throw error
        }
    }

    async Login(username) {
        this.logger.debug('Login user by name')

        try {
            const user = await new Promise((resolve, reject) => {
                this.db.findOne({ username }, (error, doc) => {
                    if (error) {
                        return reject({ status: 404, message: error })
                    }

                    if (doc == null) {
                        return reject({ status: 404, message: 'user not found' })
                    }

                    return resolve(doc)
                })
            })

            return user
        } catch (error) {
            this.logger.error('error: %o', error)
            throw error
        }
    }
}

module.exports = UserService
