class UpgradeService {
    constructor(container) {
        this.db = container.get('dbConnection')
        this.logger = container.get('logger')
    }

    async GetAllUpgradesByUsername(username) {
        this.logger.debug('Getting all upgrades from the database')

        try {
            const upgradeList = await new Promise((resolve, reject) => {
                // Did not use projections since I need to insert
                //  upgrade name property into each upgrade.
                this.db.findOne({ username }, (error, doc) => {
                    if (error) {
                        return reject({ status: 404, message: error })
                    }

                    if (doc == null) {
                        return reject({ status: 404, message: 'user not found' })
                    }

                    // convert industry datasheet
                    const upgrades = doc.dataSheet.reduce((prev, curr) => {
                        return [...prev, { name: curr.name, ...curr.upgrade }]
                    }, [])

                    return resolve(upgrades)
                })
            })

            return upgradeList
        } catch (error) {
            this.logger.error('GetAllUpgradesByUsername error: %o', error)
            throw error
        }
    }
}

module.exports = UpgradeService
