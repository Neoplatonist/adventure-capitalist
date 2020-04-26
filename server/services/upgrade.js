class UpgradeService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetAllUpgradesByUsername(username) {
        this.logger.debug('Getting all indutries from the database')

        const findUpgradesForUser = await new Promise(resolve => {
            // Did not use projections since I need to insert
            //  upgrade name property into each upgrade.
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
                            return [...prev, { name: curr.name, ...curr.upgrade }]
                        }, [])
                    })
                }
            })
        })

        return findUpgradesForUser
    }
}

module.exports = UpgradeService
