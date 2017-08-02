'use strict';
var bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express();

app.use(bodyParser.urlencoded({extended: true}));

app.put ('/mypath', function(req, res){  //Handling post request to create league
    createDoc (req, res);
});

app.post ('/mypath', function(req, res){  //Handling post request to create league
    createDoc (req, res);
});

var createDoc = function (req, res) {
    console.log(req.body);
    var myparam = req.body.myparam; //league id to create new league
    if (!myparam) {
        res.status(400).json({error : 'myparam is missing'});
        return;
    }
};

app.listen(3000, "localhost", function(){
    console.log("SERVER IS RUNNING" );
});

module.exports = app;