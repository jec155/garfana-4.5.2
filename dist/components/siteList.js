"use strict";

System.register(["./common/constVal"], function (_export, _context) {
    "use strict";

    var baseURL, _createClass, SiteStreamPageCtrl;

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

            _export("SiteStreamPageCtrl", SiteStreamPageCtrl = function () {
                function SiteStreamPageCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteStreamPageCtrl);

                    this.root = $rootScope;

                    this.location = $location;
                    this.http = $http;
                    $scope.http = $http;
                    this.selall = false; //全选标志
                    this.checkedItems = [];
                    $scope.URL = $rootScope.cityListUrl ? $rootScope.cityListUrl : baseURL + 'siteListByPage';
                    $scope.pageParams = $rootScope.siteTip ? $rootScope.siteTip : {};
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
                }

                _createClass(SiteStreamPageCtrl, [{
                    key: "selectAll",
                    value: function selectAll(all, names) {
                        all ? Object.assign(this.checkedItems, names) : this.checkedItems.splice(0, this.checkedItems.length);
                        //console.info(this.checkedItems);
                    }
                }, {
                    key: "updateSelection",
                    value: function updateSelection(event, x, ctrl) {
                        var item = event.target;

                        item.checked ? ctrl.checkedItems.push(x) : ctrl.checkedItems.splice(x, 1);
                    }
                }, {
                    key: "deleteCity",
                    value: function deleteCity(item) {
                        if (confirm('确定删除此项?')) {
                            $.ajax({
                                type: 'GET',
                                url: baseURL + 'deleteSiteByID',
                                data: { siteid: item.id },
                                dataType: 'json',
                                success: function success(da) {
                                    location.reload();
                                    alert('删除成功');
                                },
                                error: function error(re) {
                                    console.info(re);
                                }
                            });
                        }
                    }
                }, {
                    key: "deleteSelCities",
                    value: function deleteSelCities() {
                        if (confirm('确定删除选中项目?')) {
                            var ids = [];
                            for (var i = 0; i < this.checkedItems.length; i++) {
                                ids.push(this.checkedItems[i].id);
                            }

                            $.ajax({
                                type: 'POST',
                                traditional: true,
                                url: 'http://61.164.218.158:8080/AirServer/grafana/deleteSelCities',
                                // 'http://127.0.0.1:8080/grafana/deleteSelCities',
                                data: { ids: ids },
                                success: function success(da) {
                                    location.reload();
                                    alert('删除成功');
                                },
                                error: function error(re) {
                                    console.info(re.responseText);
                                }
                            });
                        }
                    }
                }, {
                    key: "setModel",
                    value: function setModel(item) {
                        this.root.cityModel = item;
                    }
                }, {
                    key: "link",
                    value: function link(scope, elem, attrs, ctrl) {}
                }]);

                return SiteStreamPageCtrl;
            }());

            _export("SiteStreamPageCtrl", SiteStreamPageCtrl);

            SiteStreamPageCtrl.templateUrl = 'components/siteList.html';
        }
    };
});
//# sourceMappingURL=siteList.js.map
