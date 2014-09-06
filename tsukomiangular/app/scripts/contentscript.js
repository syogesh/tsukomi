'use strict';
window.addEventListener("load", function() {
<<<<<<< HEAD
  var app = angular.module('tsukApp', []);
=======
  var app = angular.module('tsukApp', [
  	'tsukApp.controllers',
  	'tsukApp.services',
  	'xeditable',
    'ngRoute']);
>>>>>>> d5a59b1a2f552f68b40288cdc5dc05924553ae18

  var html = document.querySelector('html');
  html.setAttribute('ng-app', 'tsukApp');
  html.setAttribute('ng-csp', '');

  document.body.id = 'tsukBody';
  var viewport = document.getElementById('tsukBody');  
  viewport.setAttribute('ng-controller', 'postCtrl');

  app.controller("postCtrl", function($scope) {
  $scope.texts = [];
  $scope.newPost = { };
  console.log("tasks controller");

  $scope.isEmpty = function(str) {
    console.log(_.isBlank(str));
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
/*  //app.controller('MainController', function ($scope) {});

  var myDirective = document.createElement('div');
  myDirective.setAttribute('my-directive', '');
  viewport.appendChild(myDirective);

  app.directive('myDirective', function() {
    return {
      restrict: 'EA', 
      replace: true,
      template: 'Search with Bing'
    };
  });
*/
  angular.bootstrap(html, ['tsukApp'], []);
});
