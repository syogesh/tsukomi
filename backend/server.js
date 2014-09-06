
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
var mongoUri = "mongodb://localhost:" + mongodb_port + "/tdb";

// router setup
var router = express.Router();


router.route("/comments/:url/:id?")
	.put(function(req, res) {
		var urlIn = req.params.url;
		var textIn = req.body.text;
		var xPosIn = req.body.xPos;
		var yPosIn = req.body.yPos;

		if (urlIn == null || textIn == null
			|| xPosIn == null || yPosIn == null) {

			res.status(400).send("missing a parameter");
			return;
		}

		var newDocument = {
			text: textIn,
			position: [xPosIn, yPosIn],
			votes: 0,
			url: urlIn,
			replies: []
		};

		// check for failures
		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("comments").insert(newDocument, function(err, result) {});
		});

		res.send("hello");
	})
	.get(function(req, res) {
		// gets all comments from mongodb
		// return json of all comments
		var urlIn = req.params.url;
		console.log(req.params);
		db.collection("comments").find({ url: urlIn }).toArray(function (err, items) {

			res.json(items);
		});
	})
	.post(function(req, res) {
		var url = req.body.url;
		var id = req.body.id;
		var vote = req.body.vote; // int
		
	});


router.route("/replies/:url/:commentId/:id?")
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
