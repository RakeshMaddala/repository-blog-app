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
  $http.get("/blogs").then($scope.successPostsHandler, function(response) {
			console.log("Error retrieving blogs.");
			});
  
  $scope.makeBlogEditable = function(currEvent,postIndex){
	$scope.posts[postIndex].editmode = true;
	currEvent.currentTarget.previousElementSibling.previousElementSibling.setAttribute('contentEditable','true') ;
	currEvent.currentTarget.previousElementSibling.previousElementSibling.focus();
  };
  
  $scope.updatePostsHandler = function(){
	  
  };
  
  $scope.submitBlogChanges = function(currEvent,postIndex){
	currEvent.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute('contentEditable','false');
	currBlogId = currEvent.currentTarget.dataset["mongoid"] ;
	var blogContent = $("#"+currBlogId).text() ;
	var title = $("#"+currBlogId).attr("data-title") ;
	var category = $("#"+currBlogId).attr("data-category") ;
	var modifiedBlog = {'_id':currBlogId,'title':title,'category':category,'postContent':blogContent,'editmode':false}
	$scope.posts[postIndex].editmode = false;
	$http.put("/blogs/"+currBlogId,modifiedBlog).then($scope.updatePostsHandler, function(response) {
			console.log("Error Submitting blog changes.");
		});
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
  
  $scope.createBlogPost = function(){
	  var newBlogContent = {title: $("#BlogTitle").val(), category: $("#BlogCategory").val(), postContent: $("#BlogContent").val(),'editmode':false}
	  $scope.posts.push(newBlogContent);
	  $http({
			url: '/blogs',
			method: "POST",
			data: { 'message' : newBlogContent }
		})
		.then(function(response) {
					
		});
  };
  
  $scope.deleteBlog = function(currEvent,postIndex){
	  currBlogId = currEvent.currentTarget.dataset["mongoid"] ;
	  $http.delete("/blogs/"+currBlogId).then($scope.updatePostsHandler, function(response) {
			console.log("Error deleting blog.");
		});
	  for (var i =0; i < $scope.posts.length; i++){
		   if ($scope.posts[i]._id === currBlogId) {
			  $scope.posts.splice(i,1);
			  break;
		   }
	  }
	  for (var i =0; i < $scope.tempPosts.length; i++){
		   if ($scope.tempPosts[i]._id === currBlogId) {
			  $scope.tempPosts.splice(i,1);
			  break;
		   }
	  }
  };
  
});