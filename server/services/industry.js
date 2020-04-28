class IndustryService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetAllIndustriesByUsername(username) {
        this.logger.debug('Getting all indutries from the database')

        try {
            const industryList = await new Promise((resolve, reject) => {
                this.db.findOne({ username }, (error, doc) => {
                    if (error) {
                        return reject({ status: 404, message: error })
                    }

                    if (doc == null) {
                        return reject({ status: 404, message: 'user not found' })
                    }

                    // convert industry datasheet
                    const industries = doc.dataSheet.reduce((prev, curr) => {
                        return [...prev, { name: curr.name, ...curr.industry }]
                    }, [])

                    return resolve(industries)
                })
            })

            return industryList
        } catch (error) {
            this.logger.error('GetAllIndustriesByUsername error: %o', error)
            throw error
        }
    }

    async UpdateIndustryByName(userObj) {
        this.logger.debug('Updating industry db record for specified user')

        try {
            const updateUser = await new Promise((resolve, reject) => {
                this.db.update(
                    { username: userObj.name },
                    {
                        $set: {
                            antimatter: userObj.antimatter,
                            timeStamp: userObj.timeStamp
                        }
                    },
                    (error, doc) => {
                        if (error) {
                            reject({ status: 404, message: error })
                        }

                        resolve(doc)
                    })
            })

            return updateUser
        } catch (error) {
            this.logger.error('UpdateIndustryByName error: %o', error)
            throw error
        }
    }
}

module.exports = IndustryService
