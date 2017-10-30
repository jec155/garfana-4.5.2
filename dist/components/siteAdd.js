"use strict";

System.register(["./common/constVal"], function (_export, _context) {
    "use strict";

    var baseURL, _createClass, SiteAddCtrl;

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

            _export("SiteAddCtrl", SiteAddCtrl = function () {
                function SiteAddCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteAddCtrl);

                    this.scope = $scope;
                    this.location = $location;

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
                    $scope.siteModel = {};
                    $scope.dismiss = function () {
                        $scope.showCityList = !$scope.showCityList;
                    };
                    $scope.choose = function (item) {
                        //console.info(item);
                        $scope.siteModel.cityId = item.id;
                        $scope.siteModel.cityName = item.cityName;
                        $scope.showCityList = !$scope.showCityList;
                    };
                    /*$scope.clearNoNum = function(attr) {
                    //先把非数字的都替换掉，除了数字和.
                        attr = attr.replace(/[^\d.]/g, "");
                    //必须保证第一个为数字而不是.
                        attr =attr.replace(/^\./g, "");
                    //保证只有出现一个.而没有多个.
                        attr = attr.replace(/\.{2,}/g, "");
                    //保证.只出现一次，而不能出现两次以上
                        attr = attr.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    }*/
                }

                _createClass(SiteAddCtrl, [{
                    key: "save",
                    value: function save() {
                        console.info(this.scope.siteModel);

                        $.ajax({
                            type: 'GET',
                            url: baseURL + 'addSite',
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

                return SiteAddCtrl;
            }());

            _export("SiteAddCtrl", SiteAddCtrl);

            SiteAddCtrl.templateUrl = 'public/plugins/grafana-management/components/siteAdd.html';
        }
    };
});
//# sourceMappingURL=siteAdd.js.map
