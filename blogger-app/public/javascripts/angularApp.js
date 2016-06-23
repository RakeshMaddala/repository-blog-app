var myBlogApplication = angular.module("blog-app",[]) ;

myBlogApplication.service("blogsservice", function($http) {
		this.processBlogs = function() {
			
		}
});

myBlogApplication.controller('MainBlogCtrl', function($http,$scope,blogsservice){
  $scope.title = 'Blog Application!';
  $scope.successPostsHandler = function(response){
	  $scope.posts = response.data ;
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
  };
  $http.get("/getAllBlogPosts").then($scope.successPostsHandler, function(response) {
			console.log("Error retrieving contacts.");
			});
  
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
  
});