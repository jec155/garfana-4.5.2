"use strict";

System.register(["./common/constVal"], function (_export, _context) {
    "use strict";

    var baseURL, _createClass, SiteEditCtrl;

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

            _export("SiteEditCtrl", SiteEditCtrl = function () {
                function SiteEditCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteEditCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.location = $location;
                    $scope.siteModel = $rootScope.cityModel;
                    //$scope.siteModel.autoUpd=0;
                    //console.info($scope.siteModel);
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

                    $scope.pageParams = {};
                    $scope.http = $http;
                    $scope.URL = 'http://61.164.218.158:8080/AirServer/grafana/cityListByPage';

                    $scope.dismiss = function () {
                        $scope.showCityList = !$scope.showCityList;
                    };
                    $scope.choose = function (item) {
                        //console.info(item);
                        $scope.siteModel.cityId = item.id;
                        $scope.siteModel.cityName = item.cityName;
                        $scope.showCityList = !$scope.showCityList;
                    };
                }

                _createClass(SiteEditCtrl, [{
                    key: "update",
                    value: function update() {
                        //console.info(this.scope.siteModel)
                        $.ajax({
                            type: 'GET',
                            url: baseURL + 'editSite',
                            //'http://127.0.0.1:8080/grafana/editCity',
                            data: this.scope.siteModel,
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
                    }
                }]);

                return SiteEditCtrl;
            }());

            _export("SiteEditCtrl", SiteEditCtrl);

            SiteEditCtrl.templateUrl = 'public/plugins/grafana-management/components/siteEdit.html';
        }
    };
});
//# sourceMappingURL=siteEdit.js.map
