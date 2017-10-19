'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, CitySiteManageCtrl;

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

            _export('CitySiteManageCtrl', CitySiteManageCtrl = function () {
                function CitySiteManageCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, CitySiteManageCtrl);

                    this.root = $rootScope;
                    //this.root.cityModel=$rootScope.cityModel;
                    //console.info(this.root.cityModel);
                    this.http = $http;

                    this.location = $location;

                    $scope.availableSiteID = [];
                    $scope.citySiteID = [];
                    $scope.availableSites = {};
                    $scope.citySites = {};
                    this.scope = $scope;

                    $http.get('http://61.164.218.158:8080/AirServer/grafana/availableSites').then(function (response) {
                        angular.forEach(response.data.data, function (data, index, array) {
                            //data等价于array[index]
                            //$scope.availableSites.push({id:data.id,siteName:data.siteName});
                            $scope.availableSites[data.id] = data.siteName;
                        });
                        //console.info($scope.availableSites);
                        //$scope.availableSites=response.data.data;
                    });

                    $http.get('http://61.164.218.158:8080/AirServer/grafana/getSitesByCityID?cityid=' + $rootScope.cityModel.id).then(function (response) {
                        angular.forEach(response.data.data, function (data, index, array) {
                            //data等价于array[index]
                            // $scope.citySites.push({id:data.id,siteName:data.siteName});
                            $scope.citySites[data.id] = data.siteName;
                        });
                        //$scope.citySites=response.data.data;
                    });
                }

                _createClass(CitySiteManageCtrl, [{
                    key: 'getSelectedA',
                    value: function getSelectedA() {
                        console.info('fffff');
                        var toAdd = {};
                        var select = document.getElementById("A");
                        for (var i = 0; i < select.length; i++) {
                            if (select.options[i].selected) {
                                toAdd[select[i].value] = select[i].text;
                            }
                        }

                        for (var a in toAdd) {
                            this.scope.citySites[a] = toAdd[a];
                            delete this.scope.availableSites[a];
                        }
                    }
                }, {
                    key: 'getSelectedAll',
                    value: function getSelectedAll() {
                        var toAdd = {};
                        var select = document.getElementById("A");
                        for (var i = 0; i < select.length; i++) {
                            toAdd[select[i].value] = select[i].text;
                        }

                        for (var a in toAdd) {
                            this.scope.citySites[a] = toAdd[a];
                            delete this.scope.availableSites[a];
                        }
                    }
                }, {
                    key: 'getSelectedR',
                    value: function getSelectedR() {
                        var toAdd = {};
                        var select = document.getElementById("B");
                        for (var i = 0; i < select.length; i++) {
                            if (select.options[i].selected) {
                                toAdd[select[i].value] = select[i].text;
                            }
                        }

                        for (var a in toAdd) {
                            this.scope.availableSites[a] = toAdd[a];
                            delete this.scope.citySites[a];
                        }
                    }
                }, {
                    key: 'getSelectedRAll',
                    value: function getSelectedRAll() {
                        var toAdd = {};
                        var select = document.getElementById("B");
                        for (var i = 0; i < select.length; i++) {
                            toAdd[select[i].value] = select[i].text;
                        }

                        for (var a in toAdd) {
                            this.scope.availableSites[a] = toAdd[a];
                            delete this.scope.citySites[a];
                        }
                    }
                }, {
                    key: 'commit',
                    value: function commit() {
                        $.ajax({
                            type: 'POST',
                            url: 'http://61.164.218.158:8080/AirServer/grafana/deleteCityByID',
                            //'http://127.0.0.1:8080/grafana/addCity',
                            data: { id: item.id },
                            dataType: 'json',
                            success: function success(da) {
                                location.reload();
                                alert('更新成功');
                            },
                            error: function error(re) {
                                console.info(re);
                            }
                        });
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {}
                }]);

                return CitySiteManageCtrl;
            }());

            _export('CitySiteManageCtrl', CitySiteManageCtrl);

            CitySiteManageCtrl.templateUrl = 'public/plugins/grafana-example-app/components/citySiteManage.html';
        }
    };
});
//# sourceMappingURL=citySiteManage.js.map
