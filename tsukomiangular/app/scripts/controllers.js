angular.module("tsukApp.controllers", []).controller("postCtrl", function($scope, taskService) {
	$scope.tasks = taskService.get();
	$scope.newTask = { };
	
	$scope.currentPage = 0;
	$scope.pageSize = 10;

	$scope.isEmpty = function(str) {
		return _.isBlank(str);
	};

	$scope.addPost = function(m) {
		console.log("adding post");
		console.log(m);
		if (m.length > 0) {
			$scope.tasks.push({
				text: m
			});
		};	
		$scope.newTask.text = "";
		console.log("succeeded post");
	};

});