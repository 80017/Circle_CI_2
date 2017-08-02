const r = require('rethinkdb');
const config = require('../src/config');

let connection;

r.connect({
    host: config.rethinkdb.servers[0].host,
    port: config.rethinkdb.servers[0].port,
    db: config.rethinkdb.db
}, function(err, conn) {
    if (err) throw err;
    connection = conn
// console.log(conn)
})

module.exports = connection

