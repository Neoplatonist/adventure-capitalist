let session = require('express-session'),
    FileStore = require('session-file-store')(session),
    config = require('../../config'),
    Logger = require('../../loaders/logger')

module.exports = (app) => {
    let sess = config.session
    sess.store = new FileStore()

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1) // trust first proxy
        // sess.cookie.secure = true // serve secure cookies
    }

    app.use(session(sess))
    Logger.info('✌️ Session Middleware Loaded')
}
