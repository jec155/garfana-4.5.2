'use strict';

System.register(['./common/constVal'], function (_export, _context) {
    "use strict";

    var baseURL, _createClass, SiteDeviceManageCtrl;

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

            _export('SiteDeviceManageCtrl', SiteDeviceManageCtrl = function () {
                function SiteDeviceManageCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteDeviceManageCtrl);

                    this.root = $rootScope;
                    //console.info($rootScope.cityModel)
                    this.http = $http;

                    this.location = $location;

                    $scope.deviceID = [];
                    $scope.availableDevices = {};
                    $scope.siteDevices = {};
                    this.scope = $scope;
                    $scope.siteMap = {
                        'AIR': '空气质量',
                        'WATER': '水环境',
                        'MULTI': '多功能'
                    };

                    $http.get(baseURL + 'getAvailableDevices').then(function (response) {
                        angular.forEach(response.data.data, function (data, index, array) {
                            $scope.availableDevices[data.id] = data.name + "(" + $scope.siteMap[data.monType] + ")";
                        });
                    });
                    $http.get(baseURL + 'getDevicesBySiteID?siteid=' + $rootScope.cityModel.id).then(function (response) {
                        angular.forEach(response.data.data, function (data, index, array) {
                            $scope.siteDevices[data.id] = data.name + "(" + $scope.siteMap[data.monType] + ")";
                        });
                    });
                }

                _createClass(SiteDeviceManageCtrl, [{
                    key: 'getSelectedA',
                    value: function getSelectedA() {
                        var toAdd = {};
                        var select = document.getElementById("A");
                        for (var i = 0; i < select.length; i++) {
                            if (select.options[i].selected) {
                                toAdd[select[i].value] = select[i].text;
                            }
                        }

                        for (var a in toAdd) //索引ID
                        {
                            this.scope.siteDevices[a] = toAdd[a];
                            delete this.scope.availableDevices[a];
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
                            this.scope.siteDevices[a] = toAdd[a];
                            delete this.scope.availableDevices[a];
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
                            this.scope.availableDevices[a] = toAdd[a];
                            delete this.scope.siteDevices[a];
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
                            this.scope.availableDevices[a] = toAdd[a];
                            delete this.scope.siteDevices[a];
                        }
                    }
                }, {
                    key: 'commit',
                    value: function commit() {
                        for (var id in this.scope.siteDevices) {
                            this.scope.deviceID.push(id);
                        }

                        $.ajax({
                            type: 'GET',
                            traditional: true,
                            url: baseURL + 'updateSiteDevice',
                            //'http://127.0.0.1:8080/grafana/updateCitySites',
                            data: { siteid: this.root.cityModel.id, ids: this.scope.deviceID },
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

                return SiteDeviceManageCtrl;
            }());

            _export('SiteDeviceManageCtrl', SiteDeviceManageCtrl);

            SiteDeviceManageCtrl.templateUrl = 'public/plugins/grafana-management/components/siteDeviceManage.html';
        }
    };
});
//# sourceMappingURL=siteDeviceManage.js.map
