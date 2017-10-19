'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var SiteViewCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export('SiteViewCtrl', SiteViewCtrl = function SiteViewCtrl($scope, $http, $location, $rootScope) {
                _classCallCheck(this, SiteViewCtrl);

                this.http = $http;
                this.scope = $scope;
                this.location = $location;
                $scope.cityModel = $rootScope.cityModel;
            });

            _export('SiteViewCtrl', SiteViewCtrl);

            SiteViewCtrl.templateUrl = 'public/plugins/grafana-example-app/components/siteView.html';
        }
    };
});
//# sourceMappingURL=siteView.js.map
