class IndustryService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetAllIndustriesByUsername(username) {
        this.logger.debug('Getting all indutries from the database')

        const findIndustriesForUser = await new Promise(resolve => {
            // Did not use projections since I need to insert
            //  industry name property into each industry.
            this.db.findOne({ username }, (error, doc) => {
                if (error) {
                    this.logger.error(error)
                    resolve({
                        status: error,
                        data: []
                    })
                }

                if (doc === null) {
                    this.logger.error('user not found')
                    resolve({
                        status: 'user not found',
                        data: []
                    })
                } else {
                    resolve({
                        status: 'ok',
                        data: doc.dataSheet.reduce((prev, curr) => {
                            return [...prev, { name: curr.name, ...curr.industry }]
                        }, [])
                    })
                }
            })
        })

        return findIndustriesForUser
    }

    async UpdateIndustryByName(userObj) {
        this.logger.debug('Updating industry db record for specified user')

        const updateUser = await new Promise(resolve => {
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
                        this.logger.error(error)
                        resolve({ status: error })
                    }

                    resolve({ status: 'ok' })
                })
        })

        return updateUser
    }
}

module.exports = IndustryService
