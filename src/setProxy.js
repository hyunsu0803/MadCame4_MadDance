const proxy = require('htto-proxy-middleware');

module.exports = function(app){
    app.use(
        proxy('/api', {
            target : 'http://172.10.18.165:80/'
        })
    )
}