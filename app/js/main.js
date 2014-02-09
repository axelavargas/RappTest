'use strict';

var app = angular.module('tweetsApp', ['ngSanitize']);

//app initializer, show splash and change to ship view
app.run(function(){
	$('.splash').fadeOut(0, function() {
        $('.search-tweets, .moon').fadeIn();
    });
});

//search form controller
app.controller('SearchTweetsCtrl', function($scope, searchTweetsService, $timeout) {
    $scope.search = function() {
        //get tweets from service
        searchTweetsService.get($scope.query, $scope).then(function(data, err) {
            //iterate over results and hightlight
            $.each(data, function(index, tweet) {
                tweet.text = highlight(tweet.text, $scope.query.toLowerCase(), 'searchword')
            });
            //bind data to view
            $scope.tweets = data;
            //render animations
            searchAnimations();
        });
    };

    //Animations when search is complete
    var searchAnimations = function() {
    	//show ship lights
        $('.light').slideDown();
        //show trees background and rapp logo
        $('.trees, .footer-container').fadeIn(function() {
        	//animate scroll to focus tweets
            $('html,body').animate({
                scrollTop: $('#tweets-container').offset().top
            }, 300);
        });
    }
});

//factory service to query twitter API
app.factory('searchTweetsService', function($http, $q) {
    return {
    	//function to query tweets
        get: function(query, scope) {
        	//create deferred to return
            var deferred = $q.defer();
            //remove linebreaks
            query = query.replace(/(\r\n|\n|\r)/gm, " ");
            //query API
            $http({
                method: 'GET',
                url: '/twapi?q="' + query + '"'
            }).
            //resolve promise with data
            success(function(data, status, headers, config) {
                deferred.resolve(data.statuses);
            });
            //return promise
            return deferred.promise;
        }
    }
});
