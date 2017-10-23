"use strict";

System.register([], function (_export, _context) {
    "use strict";

    var SiteViewCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [],
        execute: function () {
            _export("SiteViewCtrl", SiteViewCtrl = function SiteViewCtrl($scope, $http, $location, $rootScope) {
                _classCallCheck(this, SiteViewCtrl);

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
            });

            _export("SiteViewCtrl", SiteViewCtrl);

            SiteViewCtrl.templateUrl = 'public/plugins/grafana-management/components/siteView.html';
        }
    };
});
//# sourceMappingURL=siteView.js.map
