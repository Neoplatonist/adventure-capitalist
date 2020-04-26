class ManagerService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetAllManagersByUsername(username) {
        this.logger.debug('Getting all indutries from the database')

        const findManagersForUser = await new Promise(resolve => {
            // Did not use projections since I need to insert
            //  manager name property into each manager.
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
                            return [...prev, { name: curr.name, ...curr.manager }]
                        }, [])
                    })
                }
            })
        })

        return findManagersForUser
    }
}

module.exports = ManagerService
