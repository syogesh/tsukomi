angular.module("tsukApp.controllers", []).controller("postCtrl", function($scope) {
	$scope.texts = [];
	$scope.newPost = { };
	console.log("tasks controller");

	$scope.isEmpty = function(str) {
		console.log(_.isBlank(str))
		return _.isBlank(str);
	};

	$scope.addPost = function(m) {
		console.log("adding post");
		console.log(m);
		if (m.length > 0) {
			$scope.texts.push({
				text: m
			});
		};	
		$scope.newPost.text = "";
		console.log("succeeded post");
	};

});