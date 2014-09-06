var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var urlParser = require("url");

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

router.route("/comments")
	.put(function(req, res) {
		// usage: siteurl/comments/url
		// will create new comment with text and x y position
		var urlIn = urlParser.parse(req.originalUrl, true).query["url"];
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

		res.send("success");
	})
	.get(function(req, res) {
		// usage: siteurl/comments/url
		// gets all comments from mongodb
		// return json of all comments
		var urlIn = urlParser.parse(req.originalUrl, true).query["url"];

		// console.log(urlParser.parse(req.originalUrl, true).query["url"]);

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("comments").aggregate([ { $match : { url: urlIn } }, { $sort : { votes: -1 } }, { $limit: 10 } ], function(err, items) {
				res.json(items);
			});
		});
	})
	.post(function(req, res) {
		// usage: siteurl/comments/url/id
		// updates a message with <id> by adding or subtracting a vote
		var urlIn = urlParser.parse(req.originalUrl, true).query["url"];
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

router.route("/replies/:commentId/:id?")
	.put(function(req, res) {
		var parentId = req.params.commentId;
		var text = req.body.text;

		if (parentId == null || text == null) {
			res.status(400).send("missing a parameter");
			return;
		}

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection('comments').update({ "_id": ObjectID(parentId) },
											 { $push: { replies: { id: Date.now(), text: text, votes: 0 } } },
											 function(err, result) {});
		});

		res.send("success");
	})
	.get(function(req, res) {
		var parentId = req.params.commentId;
		var replyId = req.params.id;

		if (parentId == null || replyId == null) {
			res.status(400).send("missing a parameter");
			return;
		}

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection('comments').find({ "_id": ObjectID(parentId) }).toArray(function (err, items) {
				var replies = items[0]['replies'];
				res.send(replies);
			});
		});
	})
	.post(function(req, res) {
		var parentId = req.params.commentId;
		var replyId = req.params.id;
		var voteIn = req.body.voteIn;

		if (parentId == null || replyId == null || voteIn == null) {
			res.status(400).send("missing a parameter");
			return;
		}

		mongodb.MongoClient.connect(mongoUri, function(err, db) {
			db.collection("comments").find({ "_id": ObjectID(parentId) }).toArray(function(err, items) {
				var item = items[0];
				for (var i = 0; i < item["replies"].length; ++i) {
					if (item['replies'][i]['id'] == replyId) {
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
				db.collection('comments').update({ "_id": ObjectID(parentId) }, updateDocument, function(err, result) {});
			});
		});

		res.send("success");
	});

// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// ============================================================
app.listen(port);
console.log("Starting server on port " + port);

