'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var CityViewCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('CityViewCtrl', CityViewCtrl = function CityViewCtrl($scope, $http, $location, $rootScope) {
                _classCallCheck(this, CityViewCtrl);

                this.http = $http;
                this.scope = $scope;
                this.location = $location;
                $scope.cityModel = $rootScope.cityModel;
            });

            _export('CityViewCtrl', CityViewCtrl);

            CityViewCtrl.templateUrl = 'public/plugins/grafana-management/components/cityView.html';
        }
    };
});
//# sourceMappingURL=cityView.js.map
