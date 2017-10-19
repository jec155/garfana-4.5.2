'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, CityAddCtrl;

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

            _export('CityAddCtrl', CityAddCtrl = function () {
                function CityAddCtrl($scope, $http, $location) {
                    _classCallCheck(this, CityAddCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.location = $location;
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

                _createClass(CityAddCtrl, [{
                    key: 'save',
                    value: function save() {
                        var loc = this.location;
                        $.ajax({
                            type: 'POST',
                            url: 'http://61.164.218.158:8080/AirServer/grafana/addCity',
                            //'http://127.0.0.1:8080/grafana/addCity',
                            data: this.scope.cityModel,
                            dataType: 'json',
                            success: function success(da) {
                                history.go(-1);
                                alert('添加成功');
                            },
                            error: function error(re) {
                                console.info(re);
                            }
                        });
                        /*this.http.post('http://127.0.0.1:8080/grafana/addCity',this.scope.cityModel).then(function (response) {
                            console.info(response);
                        });*/
                    }
                }]);

                return CityAddCtrl;
            }());

            _export('CityAddCtrl', CityAddCtrl);

            CityAddCtrl.templateUrl = 'public/plugins/grafana-example-app/components/cityAdd.html';
        }
    };
});
//# sourceMappingURL=cityAdd.js.map
