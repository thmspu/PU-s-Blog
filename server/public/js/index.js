angular.module('app',  ['ngRoute'])
.config(function($routeProvider, $httpProvider) {
	$routeProvider.when('/', {
		templateUrl: 'template/profile.html',
		controller: 'indexCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
})
.factory('fac', function($q, $http) {

    var res = {};

	res.look = function() {
		return $http.post('/look');
	}

	res.del = function (name) {
		return $http.post('/delete/'+ name);
	}


	res.delAll = function () {
		return $http.post('/delete/all');
	}

	res.add = function (form) {
		return $http.post('/add', {params:form});
	}
   
    return res;
})
.controller('indexCtrl', function($scope, fac) {
    $scope.arr=[];
    $scope.exist = true;
    $scope.form={};
    $scope.form.type=true;
    $scope.isEditable = [];
   
    $scope.find = function() {
    	fac.look().then(function(data) {
            $scope.arr = data.data;
            console.log(data.data);
    	})
    }

    $scope.edit = function(index) {
    	$scope.isEditable[index] = !$scope.isEditable[index];
    }

    $scope.confirm = function(index) {
    	$scope.isEditable[index] = !$scope.isEditable[index];
    	$scope.add($scope.arr[index]);
    }

    $scope.del = function(f) {
    	console.log(f);
    	fac.del(f).then(function(data) {
           $scope.find();
    	});
    }

    $scope.add = function(f) {
    	console.log(f._id);
            fac.add(f).then(function(data) {
        	$scope.form={};
        	if(data) {
        		$scope.find();
        		console.log("success saving");
        	}
        	else{
                console.log("failed saving");
        	}
        });
    }
    
    
    $scope.deleteAll = function() {
    fac.delAll().then(function() {
    	$scope.find();
    });
    }

    $scope.find();

});