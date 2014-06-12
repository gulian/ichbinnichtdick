angular.module('ibnd').controller('hitsController', function($scope, Hits) {

    'use strict';

    $scope.hits = [];
    // $scope.selectedContract  = {};
    // $scope.newContract  = {};

    Hits.list(function(hits){
        $scope.hits = hits;
    });

    // $scope.select = function(contract){
    //     $scope.selectedContract = angular.copy(contract);
    // };

    // $scope.save = function(contract){
    //     $scope.saving = true;
    //     Contracts.update({contract:contract}, function(){
    //         Contracts.get({id:contract.id},function(rcontract){
    //             // could be better
    //             for (var i = 0; i < $scope.contracts.length; i++) {
    //                 if($scope.contracts[i].id === rcontract.id){
    //                     $scope.contracts[i] = rcontract;
    //                 }
    //             }
    //             $scope.saving = false;
    //         });
    //     }, function(){
    //         $scope.saving = false;
    //     });
    // };

    // $scope.remove = function(id){
    //     Contracts.remove({id:id}, function(){
    //         $scope.selectedContract = false ;
    //         // could be better
    //         for (var i = 0; i < $scope.contracts.length; i++) {
    //             if($scope.contracts[i].id === id){
    //                 $scope.contracts.splice(i,1);
    //             }
    //         }
    //     }, function(){
    //         console.error(arguments);
    //     });
    // };

    // $scope.addContract = function(){
    //     Contracts.create({contract:$scope.newContract}, function(data){
    //         $scope.saving = false;
    //         Contracts.get({id:data.id},function(contract){
    //             $scope.contracts.push(contract);
    //         });
    //         $scope.newContract = {};
    //         $scope.showNewContractForm = false ;
    //     }, function(){
    //         $scope.saving = false;
    //     });
    // };

});
