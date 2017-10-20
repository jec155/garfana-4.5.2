"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, SiteAddCtrl;

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

            _export("SiteAddCtrl", SiteAddCtrl = function () {
                function SiteAddCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteAddCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.location = $location;
                    $scope.cityModel = $rootScope.cityModel;

                    $scope.siteMonTypeMap = {
                        "1": "空气质量",
                        "2": "空气污染重点企业",
                        "3": "饮用水水质",
                        "4": "污水水质",
                        "5": "水污染重点企业",
                        "6": "主要流域重点断面水质"
                    };
                    $scope.siteTypeMap = {
                        "PUBLIC": "公有站点",
                        "PRIVATE": "私有站点"
                    };
                    $scope.statusMap = {
                        "SITE_NORMAL": "正常",
                        "SITE_DISABLE": "停用",
                        "SITE_ERROR": "异常"
                    };
                    $scope.areaTypeMap = {
                        "TWO": "适用于居住、商业、工业混杂区"
                    };
                    $scope.autoUpdMap = {
                        true: "是",
                        false: "否"
                    };
                }

                _createClass(SiteAddCtrl, [{
                    key: "save",
                    value: function save() {
                        var cityAuto = {
                            true: 1,
                            false: 0
                        };
                        var loc = this.location;
                        var cityTip = {
                            "siteCode": this.scope.cityModel.siteCode,
                            "siteName": this.scope.cityModel.siteName,
                            "siteType": this.scope.cityModel.siteType,
                            "siteMontype": this.scope.cityModel.siteMonType,
                            "cityId": -1,
                            "createTime": this.scope.cityModel.siteCreateTime,
                            "siteLatitude": this.scope.cityModel.siteLatitude,
                            "siteLongitude": this.scope.cityModel.siteLongitude,
                            "autoUpd": cityAuto[this.scope.cityModel.autoUpd],
                            "comment": this.scope.cityModel.comment,
                            "managerment": this.scope.cityModel.managerment };
                        $.ajax({
                            type: 'GET',
                            url: 'http://61.164.218.158:8080/AirServer/grafana/addSite',
                            //'http://127.0.0.1:8080/grafana/editCity',
                            data: cityTip,
                            dataType: 'json',
                            success: function success(da) {
                                //loc.path('plugins/grafana-example-app/page/live-stream');
                                history.go(-1);
                                alert('编辑成功');
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

                return SiteAddCtrl;
            }());

            _export("SiteAddCtrl", SiteAddCtrl);

            SiteAddCtrl.templateUrl = 'public/plugins/grafana-example-app/components/siteAdd.html';
        }
    };
});
//# sourceMappingURL=siteAdd.js.map
