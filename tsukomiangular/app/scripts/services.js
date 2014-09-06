angular.module("tsukApp.services", []).factory("taskService", function() {
	var STORAGE_ID = 'tsukApp.tasks', factory = { };
	
	factory.get = function() {
		return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');		
	};

	factory.put = function(tasks) {
		localStorage.setItem(STORAGE_ID, JSON.stringify(tasks));
	};

	return factory;
});