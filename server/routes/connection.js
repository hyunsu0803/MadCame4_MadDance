var mysql = require('mysql');
const {createConnection} = require('net');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lhmin35123!',
    database: 'MadDance'
});

module.exports = connection;