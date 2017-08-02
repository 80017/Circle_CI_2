const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');	
const app = require('../src/app');
var data_ins = require('./data_insert_bids.js');
chai.use(chaiHttp);

// describe('\'bidManagementAllBidsServices\' service', () => {
//   it('registered the service', () => {
//     const service = app.service('bids');

//     assert.ok(service, 'Registered the service');
//   });
// });


// Get data with API call.

// describe('GET with chaiHttp', function() {

//     it('should get data', function(done) {
//     chai.request('http://localhost:3030')
//   		.get('/bids')
//   		.end(function (err, res) {
// 		     console.log("error ", err)
// 		     console.log("Data ",JSON.parse(res.text))
// 		     assert.notEqual(null,res.text)
// 		     done();
// 		  })
//     });
// });


// describe('POST with chaiHttp', function() {

//     it('should post data', function(done) {
//     chai.request('http://localhost:3030')
//   		.post('/bids')
//   		.send({				
// 				"auctionId" : "ec5afdc8-f1a2-45c8-a070-81afab59fa4a",
// 			     "bidderId" : "autouser94",
// 			     "upperLimit" : 6000,
// 			     "bidIncrementByBidder" : 30,
// 			     "isAuto" : true,
// 			     "cutOffTime" : 1500723495000,
// 			     "numOfAllowedBids" : 10,
// 			     "placedBidByBidder" : 5500
// 			})
//   		.end(function (err, res) {
// 		     // expect(res).to.have.status(200);
// 		     console.log("Data POST ",res.text)
// 		     assert.notEqual(null,res.text)
// 		     console.log("err" , err)
// 		     done();
// 		  })
//     });
// });

//Get data with Service call

describe('Service to GET all data from bid_management_all_bids_services table', function() {

    it('should get data', function() {
    const service = app.service('bids');
     return app.service('bids').find().then(data => {
     	assert.notEqual(null,data)
    });
    });
});

// describe('Service to POST data to bid_management_all_bids_services table', function() {

//     it('should post data', function() {
//     const service = app.service('bids');

//      return app.service('bids').create(data_ins).then((err, data) => {
//      	assert.notEqual(null,data)
//     });
//     });
// });




