const assert = require('chai').assert;
const rp = require('request-promise');
const app = require('../src/app');
const r = require('rethinkdb');
const config = require('../src/config');
r.connect({
    host: config.rethinkdb.servers[0].host,
    port: config.rethinkdb.servers[0].port,
    db: config.rethinkdb.db
}, function(err, conn) {
    if (err) throw err;
    connection = conn;
})


describe('Feathers application tests', () => {
  before(function(done) {
    this.server = app.listen(3030);
    this.server.once('listening', () => done());
  });

  after(function(done) {
    this.server.close(done);
  });

  it('starts and shows the index page', () => {
    return rp('http://localhost:3030').then(body =>
      assert.ok(body.indexOf('<html>') !== -1)
    );
  });

  describe('404', function() {
    it('shows a 404 HTML page', () => {
      return rp({
        url: 'http://localhost:3030/path/to/nowhere',
        headers: {
          'Accept': 'text/html'
        }
      }).catch(res => {
        assert.equal(res.statusCode, 404);
        assert.ok(res.error.indexOf('<html>') !== -1);
      });
    });

    it('shows a 404 JSON error without stack trace', () => {
      return rp({
        url: 'http://localhost:3030/path/to/nowhere',
        json: true
      }).catch(res => {
        assert.equal(res.statusCode, 404);
        assert.equal(res.error.code, 404);
        assert.equal(res.error.message, 'Page not found');
        assert.equal(res.error.name, 'NotFound');
      });
    });
  });
});


//To check whether all necessary tables are exist in DB or not

