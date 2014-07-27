angular.module('ibnd').controller('hitsController', function($scope, Hits) {

    'use strict';

    $scope.hits = [];
    $scope.newHit = {};


    // $scope.import = "04/03/14,91.0|04/04/14,89.6|04/05/14,89.2|04/06/14,90.4|04/07/14,91.0|04/08/14,91.1|04/09/14,89.6|04/10/14,90.4|04/11/14,89.5|04/12/14,88.5|04/13/14,88.8|04/14/14,90.1|04/15/14,89.9|04/16/14,89.7|04/17/14,89.3|04/18/14,89.8|04/19/14,89.5|04/20/14,88.9|04/21/14,90.4|04/22/14,90.4|04/23/14,89.5|04/24/14,89.9|04/25/14,89.9|04/26/14,91.0|04/27/14,90.5|04/28/14,91.1|04/29/14,89.8|04/30/14,89.5|05/01/14,90.2|05/02/14,89.0|05/03/14,91.4|05/04/14,91.4|05/05/14,90.7|05/06/14,91.5|05/07/14,89.6|05/08/14,89.6|05/09/14,90.2|05/10/14,89.3|05/11/14,88.7|05/12/14,88.2|05/13/14,87.7|05/14/14,90.1|05/15/14,89.2|05/16/14,87.9|05/17/14,87.6|05/18/14,87.8|05/19/14,86.4|05/20/14,87.4|05/21/14,88.0|05/22/14,87.4|05/23/14,87.0|05/24/14,86.8|05/25/14,86.2|05/26/14,85.8|05/27/14,87.4|05/28/14,87.0|05/29/14,85.8|05/30/14,86.2|05/31/14,85.8|06/01/14,85.4|06/02/14,86.3|06/03/14,86.4|06/04/14,86.8|06/05/14,86.1|06/06/14,86.7|06/07/14,85.5|06/08/14,86.3|06/09/14,85.3|06/10/14,85.9|06/11/14,85.5|06/12/14,85.5|06/13/14,84.6|06/14/14,85.5|06/15/14,84.6|06/16/14,85.7|06/17/14,85.6|06/18/14,85.7|06/19/14,85.3|06/20/14,83.5|06/21/14,86.4|06/22/14,84.2|06/23/14,84.2|06/24/14,85.0|06/25/14,84.7|06/26/14,86.0|06/27/14,85.1|06/28/14,85.0|06/29/14,84.2|06/30/14,82.6|07/01/14,83.1|";

    // $scope.import = $scope.import.split('|');

    // for(var val in $scope.import){
    //     $scope.import[val] = $scope.import[val].split(',');
    // }

    // for(var val in $scope.import){
    //     $scope.import[val] = {
    //         timestamp : new Date($scope.import[val][0]),
    //         details : {
    //             value:$scope.import[val][1],
    //         }
    //     }
    // }

    // for(var val in $scope.import){
    //      Hits.create({hit:$scope.import[val]});
    // }

    function parseData(hits){
        hits = hits || $scope.hits;
        $scope.hits = hits;

        var obj = [angular.copy($scope.hits[0]) , angular.copy($scope.hits[$scope.hits.length-1])];
        obj[0].details.value = '80' ;
        obj[1].details.value = '80' ;

        $scope.data = [{
           "values": $scope.hits
        },{
            "key": "Objectif", "values": obj
        }];


        $scope.lastWeekHits = angular.copy($scope.hits).splice($scope.hits.length-7, $scope.hits.length);
        obj = [angular.copy($scope.lastWeekHits[0]) , angular.copy($scope.lastWeekHits[$scope.lastWeekHits.length-1])];
        obj[0].details.value = '80' ;
        obj[1].details.value = '80' ;

        $scope.lastWeekData = [{
           "values": $scope.lastWeekHits
        },{
            "key": "Objectif", "values": obj
        }];


        $scope.lastMonthHits = angular.copy($scope.hits).splice($scope.hits.length-30, $scope.hits.length);
        obj = [angular.copy($scope.lastMonthHits[0]) , angular.copy($scope.lastMonthHits[$scope.lastMonthHits.length-1])];
        obj[0].details.value = '80' ;
        obj[1].details.value = '80' ;

        $scope.lastMonthData = [{
           "values": $scope.lastMonthHits
        },{
            "key": "Objectif", "values": obj
        }];
        $scope.$apply() ;
    }

    Hits.list(function(hits){
        parseData(hits);
    });

    $scope.colorFunction = function() {
        return function(d, i) {
            if(d.key == "Objectif"){
                return 'green'
            } else {
                return 'orange'
            }
        };
    }

    $scope.remove = function(hit, $index) {
        console.log(hit)
        Hits.remove({
            id: hit._id
        }, function() {
            $scope.hits.splice($index, 1);
            parseData();
        }, function() {
            console.error(arguments);
        });
    };

    $scope.addHit = function() {
        Hits.create({
            hit: $scope.newHit
        }, function(data) {
            $scope.saving = false;
            Hits.list(function(hits) {
                $scope.hits = hits;
                $scope.data = [{
                    "values": hits
                }];
            });
            parseData();
            $scope.newHit = {};
            $scope.showNewHitForm = false;
        }, function() {
            $scope.saving = false;
        });
    };

    $scope.yFunction = function() {
        return function(d) {
            return d.details.value;
        }
    };
    $scope.xFunction = function() {
        return function(d) {
            return new Date(d.timestamp).getTime();
        }
    };

    $scope.xAxisTickFormatFunction = function() {
        return function(d) {
            return d3.time.format('%d/%m')(new Date(d));
        }
    }
    $scope.yAxisTickFormatFunction = function() {
        return function(d) {
            return d + " kg";
        }
    }

    $scope.toolTipContentFunction = function() {
        return function(key, x, y, e, graph) {
            return e.point.details.description +
                '<p>' + y + ' at ' + x + '</p>'
        }
    }



});
