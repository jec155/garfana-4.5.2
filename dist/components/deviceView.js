'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var DeviceViewCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('DeviceViewCtrl', DeviceViewCtrl = function DeviceViewCtrl($scope, $http, $location, $rootScope) {
                _classCallCheck(this, DeviceViewCtrl);

                this.http = $http;
                this.scope = $scope;
                this.location = $location;
                $scope.deviceTip = $rootScope.deviceTip;
                $scope.monTypeMap = {
                    'AIR': '空气质量',
                    'WATER': '水环境',
                    'MULTI': '多功能'

                    //console.info($scope.deviceTip);
                };$scope.toEdit = function () {
                    $location.path('plugins/grafana-management/page/deviceedit').replace();
                };
            });

            _export('DeviceViewCtrl', DeviceViewCtrl);

            DeviceViewCtrl.templateUrl = 'public/plugins/grafana-management/components/deviceView.html';
        }
    };
});
//# sourceMappingURL=deviceView.js.map
