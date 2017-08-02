// Initializes the `bidManagementAllAuctionServices` service on path `/auctions`
const createService = require('feathers-rethinkdb');
const hooks = require('./bid-management-all-auction-services.hooks');
const filters = require('./bid-management-all-auction-services.filters');
const auth = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const feathers = require('feathers');
const r = require('rethinkdb');
const config = require('../../config');
const path = require('path');

const swagger = require('feathers-swagger');
const rest = require('feathers-rest');

module.exports = function() {
    
    const app = this;
    const Model = app.get('rethinkdbClient');
    const paginate = app.get('paginate');

    const options = {
        name: 'bid_management_all_auction_services',
        Model,
        paginate
    };

    let connection;

    r.connect({
        host: config.rethinkdb.servers[0].host,
        port: config.rethinkdb.servers[0].port,
        db: config.rethinkdb.db
    }, function(err, conn) {
        if (err) throw err;
        connection = conn
    })
    // Initialize our service with any options it requires
    app.use('/auctions', createService(options));
    // Get our initialized service so that we can register hooks and filters
    const service = app.service('auctions');
    
    let singleEntryInJobQueue;
    createNewAuctionHook = (hookData) => {
        singleEntryInJobQueue = true;
        hookData.data.allBids = [];
        hookData.data.createdAt = new Date().getTime();

        hookData.data.winningBid = {};
    }

    afterCreateJobQueue = (hook) => {
        r.table("AuctionQueue").filter({
        "auctionId": hook.result.id
        }).run(connection, function(err, result) {
        })
        
        if (singleEntryInJobQueue == true) {
            singleEntryInJobQueue = false
            r.table("AuctionQueue").insert({
                "auctionId": hook.result.id,
                "dateEnable": hook.result.endBidDate
            }).run(connection, function(err, result) {
            }).then(response => {
                singleEntryInJobQueue = false
            })
        }
    }

    app.configure(rest())
        .configure(swagger({
            docsPath: '/docs',
            prefix: /api\/v\d\//,
            versionPrefix: /v\d/,
            uiIndex: true,
            info: {
                title: 'Bid Management API',
                description: 'Test all the apis with swagger'
            }
        }))
        .use('/auctions', service);



    service.hooks({
        before: {
            all: [],
            find: [],
            get: [],
            create: [
                hook => createNewAuctionHook(hook),
            ],
            update: [],
            patch: [],
            remove: []
        },
        after: {
            all: [],
            find: [],
            get: [],
            create: [
                hook => afterCreateJobQueue(hook),
            ],
            update: [],
            patch: [],
            remove: []
        },
        error: {
            all: [],
            find: [],
            get: [],
            create: [],
            update: [],
            patch: [],
            remove: []
        }
    })

    //service.hooks(hooks);

    if (service.filter) {
        service.filter(filters);
    }
};
