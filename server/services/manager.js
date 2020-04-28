class ManagerService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetAllManagersByUsername(username) {
        this.logger.debug('Getting all managers from the database')

        try {
            const managerList = await new Promise((resolve, reject) => {
                // Did not use projections since I need to insert
                //  manager name property into each manager.
                this.db.findOne({ username }, (error, doc) => {
                    if (error) {
                        return reject({ status: 404, message: error })
                    }

                    if (doc == null) {
                        return reject({ status: 404, message: 'user not found' })
                    }

                    // convert manager datasheet
                    const managers = doc.dataSheet.reduce((prev, curr) => {
                        return [...prev, { name: curr.name, ...curr.manager }]
                    }, [])

                    return resolve(managers)
                })
            })

            return managerList
        } catch (error) {
            this.logger.error('GetAllManagersByUsername error: %o', error)
            throw error
        }
    }
}

module.exports = ManagerService
