"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, CityQueryCtrl;

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

            _export("CityQueryCtrl", CityQueryCtrl = function () {
                function CityQueryCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, CityQueryCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.location = $location;
                    this.root = $rootScope;
                    $scope.cityTip = { "cityName": '',
                        "cityPingyin": '',
                        "province": '',
                        "country": '' };
                }

                _createClass(CityQueryCtrl, [{
                    key: "query",
                    value: function query() {
                        this.root.cityTip = this.scope.cityTip;
                        this.root.cityListUrl = 'http://61.164.218.158:8080/AirServer/grafana/searchCities';
                        //'http://127.0.0.1/grafana/searchCities';
                        history.go(-1);
                    }
                }]);

                return CityQueryCtrl;
            }());

            _export("CityQueryCtrl", CityQueryCtrl);

            CityQueryCtrl.templateUrl = 'public/plugins/grafana-management/components/cityQuery.html';
        }
    };
});
//# sourceMappingURL=cityQuery.js.map
