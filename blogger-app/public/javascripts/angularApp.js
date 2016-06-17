var myBlogApplication = angular.module("blog-app",[]) ;

myBlogApplication.controller('MainBlogCtrl', ['$scope',function($scope){
  $scope.title = 'Blog Application!';
}]);

