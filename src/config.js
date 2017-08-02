module.exports = {
    rethinkdb: {
        db: "bidding_backend",
        servers: [
          {
            host:  process.env.RDB_HOST,
            port: 28015,
          }
        ]
    }
}
