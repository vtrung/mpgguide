
var mpgApp = angular.module('mpgApp', []);
mpgApp.controller('CarListController', function($scope, $http){
    var carList = this;
    $scope.years = [];
    $scope.makes = [];
    $scope.cars = [];
    $scope.models = [];
    $scope.trans = [];
    $scope.selectedYear = "";
    $scope.selectedMake = "";
    $scope.selectedModel = "";
    $scope.selectedTran = "";
    $scope.selectedCar = "";

    //SecondCar
    $scope.makes2 = [];
    $scope.cars2 = [];
    $scope.models2 = [];
    $scope.trans2 = [];
    $scope.selectedYear2 = "";
    $scope.selectedMake2 = "";
    $scope.selectedModel2 = "";
    $scope.selectedTran2 = "";
    $scope.selectedCar2 = "";

    $scope.init = function () {
      $http.get("/data/getYears")
        .then(function(response){
          console.log(response);
          $scope.years = response.data;
          console.log($scope.years);
        });
    }
    $scope.init();

    $scope.$watch('selectedYear', function(){
      $http.get("/data/getMakes?year="+$scope.selectedYear)
        .then(function(response){
          console.log(response);
          $scope.makes = response.data;
          $scope.selectedMake = "";
          $scope.selectedModel = "";
          $scope.selectedCar = "";
        });
    });

    $scope.$watch('selectedMake', function(){
      $http.get("/data/getModels?year="+$scope.selectedYear+"&make=" + $scope.selectedMake)
        .then(function(response){
          console.log(response);
          $scope.cars = response.data;
          var umodel = [];
          $scope.cars.forEach(function(element){
            if(umodel[element.model] != true){
              $scope.models.push(element.model);
              umodel[element.model] = true;
            }
          });
          $scope.models.sort();
          $scope.selectedModel = "";
          $scope.selectedCar = "";
        });
    });

    $scope.$watch('selectedModel', function(){
      $scope.trans = [];
      $scope.selectedCar = "";
      //console.log("element");
      $scope.cars.forEach(function(element){
        //console.log(element);
        if(element.model == $scope.selectedModel){
          $scope.trans.push(element);
        }
      });
      if($scope.trans.length == 1){
        $scope.selectedTran = $scope.trans[0].id;
        $scope.selectedCar = $scope.trans[0];
      }
    });

    $scope.$watch('selectedTran', function(){
      $scope.trans.forEach(function(element){
        //console.log(element);
        if(element.id == $scope.selectedTran){
          $scope.selectedCar = element;
        }
      });
    });

    //SecondCar watch
    $scope.$watch('selectedYear2', function(){
      $http.get("/data/getMakes?year="+$scope.selectedYear2)
        .then(function(response){
          console.log(response);
          $scope.makes2 = response.data;
          $scope.selectedMake2 = "";
          $scope.selectedModel2 = "";
          $scope.selectedCar2 = "";
        });
    });

    $scope.$watch('selectedMake2', function(){
      $http.get("/data/getModels?year="+$scope.selectedYear2+"&make=" + $scope.selectedMake2)
        .then(function(response){
          console.log(response);
          $scope.cars2 = response.data;
          var umodel = [];
          $scope.cars2.forEach(function(element){
            if(umodel[element.model] != true){
              $scope.models2.push(element.model);
              umodel[element.model] = true;
            }
          });
          $scope.selectedModel2 = "";
          $scope.selectedCar2 = "";
        });
    });

    $scope.$watch('selectedModel2', function(){
      $scope.trans2 = [];
      $scope.selectedCar2 = "";
      //console.log("element");
      $scope.cars2.forEach(function(element){
        //console.log(element);
        if(element.model == $scope.selectedModel2){
          $scope.trans2.push(element);
        }
      });
      if($scope.trans2.length == 1){
        $scope.selectedTran2 = $scope.trans2[0].id;
        $scope.selectedCar2 = $scope.trans2[0];
      }
    });

    $scope.$watch('selectedTran2', function(){
      $scope.trans2.forEach(function(element){
        console.log(element);
        if(element.id == $scope.selectedTran2){
          $scope.selectedCar2 = element;
        }
      });
    });

    $scope.$watch('selectedCar', function(){
      $scope.combined1 = ($scope.selectedCar.city * (.01 * $scope.cityratio))  + ($scope.selectedCar.hwy * (.01*$scope.hwyratio));
      $scope.cost1 = ($scope.miles/$scope.combined1) * $scope.fuelprice;
      if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
        $scope.diff = $scope.combined2 - $scope.combined1;
        if($scope.diff != 0)
          $scope.savings = $scope.cost1-$scope.cost2;//(1000/$scope.diff) * $scope.fuelprice;
      }
    });

    $scope.$watch('selectedCar2', function(){
      $scope.combined2 = ($scope.selectedCar2.city * (.01 * $scope.cityratio)) + ($scope.selectedCar2.hwy * (.01*$scope.hwyratio));
      $scope.cost2 = ($scope.miles/$scope.combined2) * $scope.fuelprice;
      if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
        $scope.diff = $scope.combined2 - $scope.combined1;
        if($scope.diff != 0)
          $scope.savings = $scope.cost1-$scope.cost2;//(1000/$scope.diff) * $scope.fuelprice;
      }
    });

    //Result Calculate
    $scope.combined1 = 0;
    $scope.combined2 = 0;
    $scope.cost1 = 0;
    $scope.cost2 = 0;
    $scope.fuelprice = 3.50;
    $scope.miles = 1000;
    $scope.savings = 0;
    $scope.cityratio = 45;
    $scope.hwyratio = 55;

    $scope.getDifferent = function(){
      if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
        $scope.combined1 = $scope.selectedCar.city * 0.55 + $scope.selectedCar.hwy * 0.45;
        $scope.combined2 = $scope.selectedCar2.city * 0.55 + $scope.selectedCar2.hwy * 0.45;
        $scope.diff = $scope.combined2 - $scope.combined1;
        if($scope.diff != 0)
          $scope.savings = ($scope.fuelprice/$scope.diff) * $scope.miles;
      }
    };

    $scope.$watch('fuelprice', function(){
      if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
        $scope.combined1 = ($scope.selectedCar.city * (.01 * $scope.cityratio))  + ($scope.selectedCar.hwy * (.01*$scope.hwyratio));
        $scope.combined2 = ($scope.selectedCar2.city * (.01 * $scope.cityratio)) + ($scope.selectedCar2.hwy * (.01*$scope.hwyratio));
        $scope.cost1 = ($scope.miles/$scope.combined1) * $scope.fuelprice;
        $scope.cost2 = ($scope.miles/$scope.combined2) * $scope.fuelprice;
        if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
          $scope.diff = $scope.combined2 - $scope.combined1;
          if($scope.diff != 0)
            $scope.savings = $scope.cost1-$scope.cost2;//(1000/$scope.diff) * $scope.fuelprice;
        }
      }
    });
    $scope.$watch('miles', function(){
      if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
        $scope.combined1 = ($scope.selectedCar.city * (.01 * $scope.cityratio))  + ($scope.selectedCar.hwy * (.01*$scope.hwyratio));
        $scope.combined2 = ($scope.selectedCar2.city * (.01 * $scope.cityratio)) + ($scope.selectedCar2.hwy * (.01*$scope.hwyratio));
        $scope.cost1 = ($scope.miles/$scope.combined1) * $scope.fuelprice;
        $scope.cost2 = ($scope.miles/$scope.combined2) * $scope.fuelprice;
        if($scope.selectedCar != "" && $scope.selectedCar2 != ""){
          $scope.diff = $scope.combined2 - $scope.combined1;
          if($scope.diff != 0)
            $scope.savings = $scope.cost1-$scope.cost2;//(1000/$scope.diff) * $scope.fuelprice;
        }
      }
    });

  });
