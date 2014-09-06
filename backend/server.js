
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set our port
var port = 8080;
var mongodb_port = 27017;

// mongodb setup
var uri = "mongodb://localhost:" + mongodb_port + "/tdb";


// router setup
var router = express.Router();

router.route("/comment")
	.put(function(req, res) {
		var url = req.body.url;
		var text = req.body.text;
		var xPos = req.body.xPos;
		var yPos = req.body.yPos;
		// save to mongodb
		// check for failures
	})
	.get(function(req, res) {
		// gets all comments from mongodb
		// return json of all comments
		mongodb.MongoClient.connect(uri, function(err, db) {
			db.collection('websites').find({}).toArray(function (err, items) {
				res.json(items);
			});
		});
	})
	.post(function(req, res) {
		var url = req.body.url;
		var id = req.body.id;
		var vote = req.body.vote; // int
		// save to mongodb
	});


router.route("replies")
	.put(function(req, res) {

	})
	.get(function(req, res) {

	})
	.post(function(req, res) {

	});



// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// ============================================================
app.listen(port);
console.log("Starting server on port " + port);
