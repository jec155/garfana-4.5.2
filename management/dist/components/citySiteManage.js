'use strict';

System.register(['./common/constVal'], function (_export, _context) {
    "use strict";

    var baseURL, _createClass, CitySiteManageCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_commonConstVal) {
            baseURL = _commonConstVal.baseURL;
        }],
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
                    this.http = $http;
                    this.location = $location;
                    $scope.availableSiteID = [];
                    $scope.citySiteID = [];
                    $scope.availableSites = {};
                    $scope.citySites = {};
                    this.scope = $scope;

                    $http.get(baseURL + 'availableSites').then(function (response) {
                        angular.forEach(response.data.data, function (data, index, array) {
                            $scope.availableSites[data.id] = data.siteName;
                        });
                    });

                    $http.get(baseURL + 'getSitesByCityID?cityid=' + $rootScope.cityModel.id).then(function (response) {
                        angular.forEach(response.data.data, function (data, index, array) {
                            $scope.citySites[data.id] = data.siteName;
                        });
                        //$scope.citySites=response.data.data;
                    });
                }

                _createClass(CitySiteManageCtrl, [{
                    key: 'getSelectedA',
                    value: function getSelectedA() {
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
                        for (var id in this.scope.citySites) {
                            this.scope.citySiteID.push(id);
                        }
                        $.ajax({
                            type: 'POST',
                            traditional: true,
                            url: baseURL + 'updateCitySites',
                            data: { cityid: this.root.cityModel.id, ids: this.scope.citySiteID },
                            dataType: 'json',
                            success: function success(da) {
                                history.go(-1);
                                alert('更新成功');
                            },
                            error: function error(re) {
                                console.info(re.responseText);
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

            CitySiteManageCtrl.templateUrl = 'public/plugins/grafana-management/components/citySiteManage.html';
        }
    };
});
//# sourceMappingURL=citySiteManage.js.map
