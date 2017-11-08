'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var LogViewCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('LogViewCtrl', LogViewCtrl = function LogViewCtrl($scope, $http, $location, $rootScope) {
                _classCallCheck(this, LogViewCtrl);

                this.http = $http;
                this.scope = $scope;
                this.location = $location;
                $scope.logModel = $rootScope.logModel;
            });

            _export('LogViewCtrl', LogViewCtrl);

            LogViewCtrl.templateUrl = 'public/plugins/grafana-management/components/logView.html';
        }
    };
});
//# sourceMappingURL=logView.js.map
