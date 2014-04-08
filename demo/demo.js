'use strict';

angular.module('demoApp', ['simpleCharts']);

angular.module('demoApp').controller('AppController', ['$scope',
    function($scope) {
        $scope.series = [
            [
                [
                    1396627200000,
                    9
                ],
                [
                    1396630800000,
                    3
                ],
                [
                    1396634400000,
                    4
                ],
            ]
        ];
    }
]);
