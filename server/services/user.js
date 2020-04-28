let { dataSheet } = require('../db')

class UserService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetUserByName(username) {
        this.logger.debug('Getting user by name')

        try {
            const user = await new Promise((resolve, reject) => {
                this.db.findOne({ username }, (error, doc) => {
                    if (error) {
                        reject({ status: 404, message: error })
                    }

                    resolve(doc)
                })
            })

            return user
        } catch (error) {
            this.logger.error('error: %o', error)
            throw error
        }
    }

    async UpdateUserByName(userObj) {
        this.logger.debug('Updating user db record')

        try {
            const updatedUser = await new Promise((resolve, reject) => {
                this.db.update(
                    { username: userObj.name },
                    {
                        $set: {
                            antimatter: userObj.antimatter,
                            timeStamp: userObj.timeStamp,
                            dataSheet: userObj.dataSheet
                        }
                    },
                    (error, numReplaced) => {
                        if (error) {
                            reject({ status: 404, message: error })
                        }

                        if (numReplaced === 0) {
                            throw new Error({ status: 404, message: 'user not found' })
                        }

                        resolve({ status: 200, data: numReplaced })
                    })
            })


            return updatedUser
        } catch (error) {
            this.logger.error('error: %o', error)
            throw error
        }
    }
}

module.exports = UserService
