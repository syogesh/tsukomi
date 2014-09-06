'use strict';
window.addEventListener("load", function() {
  var app = angular.module('tsukApp', [
  	'tsukApp.controllers',
  	'tsukApp.services',
  	'xeditable',
    'ngRoute']);

  var html = document.querySelector('html');
  html.setAttribute('ng-app', 'tsukApp');
  html.setAttribute('ng-csp', '');

  document.body.id = 'tsukBody';
  var viewport = document.getElementById('tsukBody');  
  viewport.setAttribute('ng-controller', 'postCtrl');

  app.run(function(editableOptions) {
  	editableOptions.theme = 'bs3';
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