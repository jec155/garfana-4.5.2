'use strict';

System.register(['moment', './common/constVal'], function (_export, _context) {
    "use strict";

    var moment, baseURL, _createClass, DeviceAddCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_moment) {
            moment = _moment.default;
        }, function (_commonConstVal) {
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

            _export('DeviceAddCtrl', DeviceAddCtrl = function () {
                function DeviceAddCtrl($scope, $http, $location) {
                    _classCallCheck(this, DeviceAddCtrl);

                    this.scope = $scope;
                    this.scope.deviceTip = {
                        siteName: '', siteId: '-1', name: '', monType: '', seqno: '', firmware: '', status: '', statusModel: {}, productDate1: '', productDate2: '',
                        useDate1: '', useDate2: '', lastCheckDate1: '', lastCheckDate2: '', monTypeModel: {}, comment: ''
                    }; //提交的参数

                    $scope.http = $http;
                    $scope.URL = baseURL + 'siteListByPage';
                    $scope.pageParams = {};

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
                    $scope.absoluteFromChangeduseDate1 = function absoluteFromChangeduseDate1(time) {
                        $scope.deviceTip.useDate1 = moment(time);
                        $scope.useDate1 = !$scope.useDate1;
                    };
                    $scope.absoluteFromChangedlastCheckDate1 = function absoluteFromChangedlastCheckDate1(time) {
                        $scope.deviceTip.lastCheckDate1 = moment(time);
                        $scope.lastCheckDate1 = !$scope.lastCheckDate1;
                    };
                }

                _createClass(DeviceAddCtrl, [{
                    key: 'save',
                    value: function save() {
                        this.scope.deviceTip.productDate1 = document.getElementById("i1").value;
                        this.scope.deviceTip.useDate1 = document.getElementById("i3").value;
                        this.scope.deviceTip.lastCheckDate1 = document.getElementById("i5").value;
                        this.scope.deviceTip.status = this.scope.deviceTip.statusModel.id ? this.scope.deviceTip.statusModel.id : '';
                        this.scope.deviceTip.monType = this.scope.deviceTip.monTypeModel.id ? this.scope.deviceTip.monTypeModel.id : '';

                        $.ajax({
                            type: 'POST',
                            url: baseURL + 'addDevice',
                            data: this.scope.deviceTip,
                            dataType: 'json',
                            success: function success(da) {
                                history.go(-1);
                                alert('添加成功');
                            },
                            error: function error(re) {
                                console.info(re);
                            }
                        });
                    }
                }]);

                return DeviceAddCtrl;
            }());

            _export('DeviceAddCtrl', DeviceAddCtrl);

            DeviceAddCtrl.templateUrl = 'public/plugins/grafana-management/components/deviceAdd.html';
        }
    };
});
//# sourceMappingURL=deviceAdd.js.map
