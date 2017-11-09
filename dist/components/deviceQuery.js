'use strict';

System.register(['./common/constVal', 'moment'], function (_export, _context) {
    "use strict";

    var baseURL, moment, _createClass, DeviceQueryCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_commonConstVal) {
            baseURL = _commonConstVal.baseURL;
        }, function (_moment) {
            moment = _moment.default;
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

            _export('DeviceQueryCtrl', DeviceQueryCtrl = function () {
                function DeviceQueryCtrl($scope, $http, $rootScope) {
                    _classCallCheck(this, DeviceQueryCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.root = $rootScope;

                    $scope.deviceTip = {
                        siteName: '', siteId: '', name: '', monType: '', seqno: '', firmware: '', status: '', statusModel: {}, productDate1: '', productDate2: '',
                        useDate1: '', useDate2: '', lastCheckDate1: '', lastCheckDate2: '', monTypeModel: {}
                    }; //参数
                    $scope.searchSitesBySiteNameTip = {
                        siteName: ''
                    };
                    //选择站点
                    $scope.dismiss = function () {
                        $scope.siteShow = !$scope.siteShow;
                    };
                    $scope.choose = function (item) {
                        //console.info(item);
                        $scope.deviceTip.siteId = item.id;
                        $scope.deviceTip.siteName = item.siteName;
                        $scope.siteShow = !$scope.siteShow;
                    };
                    //选择日期
                    $scope.absoluteFromChangedproductDate1 = function absoluteFromChangedproductDate1(time) {
                        $scope.deviceTip.productDate1 = moment(time);
                        $scope.productDate1 = !$scope.productDate1;
                    };
                    $scope.absoluteFromChangedproductDate2 = function absoluteFromChangedproductDate2(time) {
                        $scope.deviceTip.productDate2 = moment(time);
                        $scope.productDate2 = !$scope.productDate2;
                    };
                    $scope.absoluteFromChangeduseDate1 = function absoluteFromChangeduseDate1(time) {
                        $scope.deviceTip.useDate1 = moment(time);
                        $scope.useDate1 = !$scope.useDate1;
                    };
                    $scope.absoluteFromChangeduseDate2 = function absoluteFromChangeduseDate2(time) {
                        $scope.deviceTip.useDate2 = moment(time);
                        $scope.useDate2 = !$scope.useDate2;
                    };
                    $scope.absoluteFromChangedlastCheckDate1 = function absoluteFromChangedlastCheckDate1(time) {
                        $scope.deviceTip.lastCheckDate1 = moment(time);
                        $scope.lastCheckDate1 = !$scope.lastCheckDate1;
                    };
                    $scope.absoluteFromChangedlastCheckDate2 = function absoluteFromChangedlastCheckDate2(time) {
                        $scope.deviceTip.lastCheckDate2 = moment(time);
                        $scope.lastCheckDate2 = !$scope.lastCheckDate2;
                    };

                    $scope.http = $http;
                    $scope.URL = 'http://61.164.218.158:8080/AirServer/grafana/siteListByPage';
                    $scope.pageParams = {};
                }

                _createClass(DeviceQueryCtrl, [{
                    key: 'query',
                    value: function query() {
                        this.scope.deviceTip.productDate1 = document.getElementById("i1").value;
                        this.scope.deviceTip.productDate2 = document.getElementById("i2").value;
                        this.scope.deviceTip.useDate1 = document.getElementById("i3").value;
                        this.scope.deviceTip.useDate2 = document.getElementById("i4").value;
                        this.scope.deviceTip.lastCheckDate1 = document.getElementById("i5").value;
                        this.scope.deviceTip.lastCheckDate2 = document.getElementById("i6").value;
                        this.root.deviceTip = this.scope.deviceTip;
                        this.root.deviceTip.status = this.scope.deviceTip.statusModel.id ? this.scope.deviceTip.statusModel.id : '';
                        this.root.deviceTip.monType = this.scope.deviceTip.monTypeModel.id ? this.scope.deviceTip.monTypeModel.id : '';
                        this.root.searchDeviceURL = baseURL + 'searchDevices';
                        //'http://127.0.0.1:8080/grafana/searchDevices';

                        history.go(-1);
                    }
                }, {
                    key: 'querybyname',
                    value: function querybyname() {
                        this.scope.searchSitesBySiteNameTip.siteName = window.$("#qn").val();
                        this.root.deviceTip = this.scope.searchSitesBySiteNameTip;
                        this.root.searchDeviceURL = baseURL + 'searchSitesBySiteName';
                    }
                }]);

                return DeviceQueryCtrl;
            }());

            _export('DeviceQueryCtrl', DeviceQueryCtrl);

            DeviceQueryCtrl.templateUrl = 'public/plugins/grafana-management/components/deviceQuery.html';
        }
    };
});
//# sourceMappingURL=deviceQuery.js.map
