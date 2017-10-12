'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, LogsPageCtrl;

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

            _export('LogsPageCtrl', LogsPageCtrl = function () {
                function LogsPageCtrl($scope, $http, $location) {
                    _classCallCheck(this, LogsPageCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    $scope.cityModel = {
                        cityName: '',
                        cityPingyin: '',
                        province: '',
                        country: '中国',
                        east: 0,
                        west: 0,
                        south: 0,
                        north: 0,
                        comment: ''
                    };
                }

                _createClass(LogsPageCtrl, [{
                    key: 'save',
                    value: function save() {
                        console.info(this.scope.cityModel);
                    }
                }]);

                return LogsPageCtrl;
            }());

            _export('LogsPageCtrl', LogsPageCtrl);

            LogsPageCtrl.templateUrl = 'public/plugins/grafana-example-app/components/cityAdd.html';
        }
    };
});
//# sourceMappingURL=cityAdd.js.map
