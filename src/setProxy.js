const proxy = require('htto-proxy-middleware');

module.exports = function(app){
    app.use(
        proxy('/api', {
            target : 'http://localhost:3002/'
        })
    )
}