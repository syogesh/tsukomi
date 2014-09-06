angular.module("tsukApp.controllers", []).controller("postCtrl", function($scope) {
	$scope.posts = taskService.get();
	$scope.newTask = { };
	
	$scope.currentPage = 0;
	$scope.pageSize = 10;

	$scope.isEmpty = function(str) {
		return _.isBlank(str);
	};

	$scope.addPost = function(m) {
		console.log(m);
		if (m.length > 0) {
			$scope.posts.push({
				text: m
			});
		};	
		$scope.newTask.text = "";
		console.log("succeeded post");
	};

});