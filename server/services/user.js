let { dataSheet } = require('../db')

class UserService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetUserByName(username) {
        this.logger.debug('Getting user by name')

        const findUser = await new Promise(resolve => {
            this.db.findOne({ username }, (error, doc) => {
                if (error) {
                    this.logger.error(error)
                    resolve({
                        status: error,
                        data: doc
                    })
                }

                resolve({
                    status: 'ok',
                    data: doc
                })
            })
        })

        return findUser
    }

    async SignUp(username) {
        this.logger.debug('Creating user db record')

        const findUser = await new Promise(resolve => {
            this.db.findOne({ username, antimatter: 0, timeStamp: 0 }, (error, doc) => {
                if (error) {
                    this.logger.error(error)
                    resolve({ status: error })
                }

                if (doc !== null) {
                    this.logger.error('username already in use')
                    resolve({ status: 'username already in use' })
                }

                resolve({ status: 'ok' })
            })
        })

        if (findUser.status !== 'ok') {
            return findUser
        }

        const createUser = await new Promise(resolve => {
            this.db.insert({ username, dataSheet }, (error, newDoc) => {
                if (error) {
                    this.logger.error(error)
                    resolve({ status: error })
                }

                resolve({ status: 'ok' })
            })
        })

        return createUser
    }

    async UpdateUserByName(userObj) {
        this.logger.debug('Updating user db record')

        const updateUser = await new Promise(resolve => {
            this.db.update(
                { username: userObj.name },
                {
                    $set: {
                        antimatter: userObj.antimatter,
                        timeStamp: userObj.timeStamp
                    }
                },
                (error, numReplaced) => {
                    if (error) {
                        this.logger.error(error)
                        resolve({ status: error })
                    }

                    if (numReplaced === 0) {
                        this.logger.error('no user found')
                        resolve({ status: 'no user found' })
                    }

                    resolve({ status: 'ok' })
                })
        })

        return updateUser
    }
}

module.exports = UserService
