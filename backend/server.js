var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var mongodb = require("mongodb");
var ObjectID = require("mongodb").ObjectID;

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

		console.log(urlIn);
		console.log(textIn);
		console.log(xPosIn);
		console.log(yPosIn);
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

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("comments").find({ url: urlIn }).toArray(function (err, items) {
				res.json(items);
			});
		});
	})
	.post(function(req, res) {
		var urlIn = req.params.url;
		var idIn = req.body.id;
		var voteIn = req.body.vote;

		if (urlIn == null || idIn == null || voteIn == null) {
			res.status(400).send("missing a parameter");
			return;
		}

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("comments").find({ "_id": ObjectID(idIn) }).toArray(function(err, items) {
				var item = items[0];

				var updateDocument = {
					text: item.text,
					position: item.position,
					votes: parseInt(item.votes) + parseInt(voteIn),
					url: item.url,
					replies: item.replies
				}

				db.collection('comments').update({ "_id": ObjectID(idIn) }, updateDocument, function(err, result) {});
			});
		});
		res.send("success");
	});

router.route("/replies/:url/:commentId/:id?")
	.put(function(req, res) {
		var parent_id = req.params.commentId;
		var text = req.body.text;

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection('comments').update({ "_id": ObjectID(parent_id) }, 
											 { $push: { replies: { id: Date.now(), text: text, votes: 1 } } },
											 function(err, result) {});
		});

		res.send("replies put done");
	})
	.get(function(req, res) {
		var parent_id = req.params.commentId;
		var reply_id = req.params.id;

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection('comments').find({ "_id": ObjectID(parent_id) }).toArray(function (err, items) {
				var replies = items[0]['replies'];
				res.send(replies);
			});
		});
	})
	.post(function(req, res) {
		var parent_id = req.params.commentId;
		var reply_id = req.params.id;
		var voteIn = req.body.voteIn;

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("comments").find({ "_id": ObjectID(parent_id) }).toArray(function(err, items) {
				var item = items[0];
				for (var i = 0; i < item["replies"].length; ++i) {
					if (item['replies'][i]['id'] == reply_id) {
						item['replies'][i]['votes'] = parseInt(item['replies'][i]['votes']) + parseInt(voteIn);
						var updateDocument = {
							text: item.text,
							position: item.position,
							votes: item.votes,
							url: item.url,
							replies: item.replies
						}
						break;
					}
				}
				db.collection('comments').update({ "_id": ObjectID(parent_id) }, updateDocument, function(err, result) {});
			});
		});

		res.send("replies post done");
	});

// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// ============================================================
app.listen(port);
console.log("Starting server on port " + port);

/*
		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("websites").find({ "_id": ObjectID(parent_id) }).toArray(function(err, items) {
				var item = items[0];
				console.log(items[0]);
				for (var i = 0; i < item.comments.length; ++i) {
					if (item['comments'][i]['id'] == reply_id) {
						item['comments'][i]['upvotes'] = parseInt(item['comments'][i]['upvotes']) + parseInt(voteIn);
						console.log("votes: " + item['comments'][i]['upvotes']);
						var updateDocument = {
							text: item.text,
							position: item.position,
							upvotes: item.upvotes,
							url: item.url,
							comments: item.comments
						}
						break;
					}
				}
				db.collection('websites').update({ "_id": ObjectID(parent_id) }, updateDocument, function(err, result) {});
			});
		});
		*/
