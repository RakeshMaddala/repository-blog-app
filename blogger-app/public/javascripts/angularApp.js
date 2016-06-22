var loremIpsumTitle = "Lorem Ipsum Title";
var loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

var myBlogApplication = angular.module("blog-app",[]) ;

myBlogApplication.controller('MainBlogCtrl', ['$scope',function($scope){
  $scope.title = 'Blog Application!';
  $scope.posts =    [
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Politics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Economics', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Pharmaceuticals', postContent: loremIpsum, editmode: false},
					  {title: loremIpsumTitle, category: 'Agriculture', postContent: loremIpsum, editmode: false}
					];
  $scope.tempPosts = $scope.posts ;
  $scope.allBlogCount = $scope.posts.length;
  $scope.politicsCount = $scope.posts.filter(function(el){
						      return el.category === "Politics"
						 }).length ; 
  $scope.economicsCount = $scope.posts.filter(function(el){
						      return el.category === "Economics"
						 }).length  ;
  $scope.agriCount =  $scope.posts.filter(function(el){
						      return el.category === "Agriculture"
						 }).length  ;
  $scope.pharmaCount = $scope.posts.filter(function(el){
						      return el.category === "Pharmaceuticals"
						 }).length  ;
  
  $scope.makeBlogEditable = function(currEvent,postIndex){
	$scope.posts[postIndex].editmode = true;
	currEvent.currentTarget.previousElementSibling.previousElementSibling.setAttribute('contentEditable','true') ;
	currEvent.currentTarget.previousElementSibling.previousElementSibling.focus();
  };
  
  $scope.submitBlogChanges = function(currEvent,postIndex){
	currEvent.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute('contentEditable','false');
	$scope.posts[postIndex].editmode = false;
  };
  
  $scope.filterBlogs = function(blogCategory, currEvent){
	  $scope.posts = $scope.tempPosts.filter(function(el){
								if(blogCategory === "All"){
									return true ;
								}else{
									return el.category === blogCategory ;
								}
						 }) ;
	  $(currEvent.target).parent().siblings().removeClass("active");
	  $(currEvent.target).parent().addClass("active") ;
  }
  
  $scope.addPost = function(){
	  $scope.posts.push({title: 'A new post!', category: 'Politics', postContent: loremIpsum});
  };
  
  $scope.addPostDialog = function(){
	  $scope.posts.push({title: 'A new post!', category: 'Politics', postContent: loremIpsum});
  };
  
}]);