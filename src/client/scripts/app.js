var express = angular.module('express', []);

express.controller('HelloController', function ($scope) {
  $scope.name = 'World';
});
