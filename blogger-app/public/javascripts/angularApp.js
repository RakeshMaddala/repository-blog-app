var loremIpsumTitle = "Lorem Ipsum Title";
var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
var myBlogApplication = angular.module("blog-app",[]) ;

myBlogApplication.controller('MainBlogCtrl', ['$scope',function($scope){
  $scope.title = 'Blog Application!';
  $scope.posts = $scope.posts = [
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum}
					];
  $scope.allBlogCount = $scope.posts.length;
  $scope.politicsCount = 5 ;
  $scope.economicsCount = 5 ;
  $scope.agriCount = 5 ;
  $scope.pharmaCount = 5 ;
  $scope.toggleEdits = false;
  
  $scope.addPost = function(){
	  $scope.posts.push({title: 'A new post!', category: 'Politics', postContent: loremIpsum});
  };
  
  $scope.addPostDialog = function(){
	  $scope.posts.push({title: 'A new post!', category: 'Politics', postContent: loremIpsum});
  };
  
  $scope.makeBlogEditable = function(currEvent){
	currEvent.currentTarget.previousElementSibling.previousElementSibling.setAttribute('contentEditable','true')
	currEvent.currentTarget.nextElementSibling.setAttribute('ng-show','true') ;
	currEvent.currentTarget.setAttribute('ng-show','false') ;
  };
  
  $scope.submitBlogChanges = function(currEvent){
	currEvent.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute('contentEditable','false');
	currEvent.currentTarget.previousElementSibling.setAttribute('ng-show','true') ;
	currEvent.currentTarget.setAttribute('ng-show','false') ;
  };
  
}]);