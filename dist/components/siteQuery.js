"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, SiteQueryCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("SiteQueryCtrl", SiteQueryCtrl = function () {
                function SiteQueryCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteQueryCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.location = $location;
                    this.root = $rootScope;
                    $scope.cityTip = { "siteCode": '',
                        "siteName": '',
                        "siteType": '',
                        "siteMonType": '',
                        "provice": '',
                        "city": '',
                        "status": '',
                        "dep": '',
                        "checkMan": '' };
                }

                _createClass(SiteQueryCtrl, [{
                    key: "query",
                    value: function query() {
                        this.root.cityTip = this.scope.cityTip;
                        this.root.cityListUrl = 'http://61.164.218.158:8080/AirServer/grafana/searchSitesByPage';
                        // 'http://127.0.0.1:8080/grafana/searchCities';
                        history.go(-1);
                    }
                }]);

                return SiteQueryCtrl;
            }());

            _export("SiteQueryCtrl", SiteQueryCtrl);

            SiteQueryCtrl.templateUrl = 'public/plugins/grafana-example-app/components/siteQuery.html';
        }
    };
});
//# sourceMappingURL=siteQuery.js.map
