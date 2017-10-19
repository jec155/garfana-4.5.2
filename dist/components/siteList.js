'use strict';

System.register(['./my-pagination.css!', './cityList.css!'], function (_export, _context) {
    "use strict";

    var _createClass, SiteListDevice;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_myPaginationCss) {}, function (_cityListCss) {}],
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

            _export('SiteListDevice', SiteListDevice = function () {
                function SiteListDevice($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteListDevice);

                    this.root = $rootScope;
                    //分页
                    $scope.myPage = {
                        currentPage: 1, //访问第几页数据，从1开始
                        totalItems: 0, //数据库中总共有多少条数据
                        itemsPerPage: 10, //默认每页展示多少条数据，可更改
                        pagesLength: 15,
                        perPageOptions: [10, 15, 25] //可选择的每页展示多少条数据
                    };
                    this.location = $location;
                    this.http = $http;
                    this.selall = false; //全选标志
                    this.checkedItems = [];
                    $scope.cityListUrl = $rootScope.cityListUrl ? $rootScope.cityListUrl : 'http://61.164.218.158:8080/AirServer/grafana/deivceListByPage';
                    $scope.cityTip = $rootScope.cityTip ? $rootScope.cityTip : {};
                    $scope.siteMap = {
                        'AIR': '空气质量',
                        'WATER': '水环境',
                        'MULTI': '多功能'
                    };
                }

                _createClass(SiteListDevice, [{
                    key: 'selectAll',
                    value: function selectAll(all, names) {
                        all ? Object.assign(this.checkedItems, names) : this.checkedItems.splice(0, this.checkedItems.length);
                        //console.info(this.checkedItems);
                    }
                }, {
                    key: 'updateSelection',
                    value: function updateSelection(event, x, ctrl) {
                        var item = event.target;

                        item.checked ? ctrl.checkedItems.push(x) : ctrl.checkedItems.splice(x, 1);
                    }
                }, {
                    key: 'deleteCity',
                    value: function deleteCity(item) {
                        if (confirm('确定删除此项?')) {
                            $.ajax({
                                type: 'POST',
                                url: 'http://61.164.218.158:8080/AirServer/grafana/deleteCityByID',
                                //'http://127.0.0.1:8080/grafana/addCity',
                                data: { id: item.id },
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
                    key: 'deleteSelCities',
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
                    key: 'setModel',
                    value: function setModel(item) {
                        this.root.cityModel = item;
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        var myPage = {};
                        myPage.pageNub = 1;
                        myPage.getPageNub = function () {
                            return myPage.pageNub;
                        };
                        myPage.setPageNub = function (n) {
                            myPage.pageNub = n;
                        };
                        scope.myPage.currentPage = myPage.pageNub;
                        // 定义分页的长度必须为奇数 (default:9)
                        scope.myPage.pagesLength = parseInt(scope.myPage.pagesLength) ? parseInt(scope.myPage.pagesLength) : 9;
                        if (scope.myPage.pagesLength % 2 === 0) {
                            // 如果不是奇数的时候处理一下
                            scope.myPage.pagesLength = scope.myPage.pagesLength - 1;
                        }
                        if (!scope.myPage.perPageOptions) {
                            scope.myPage.perPageOptions = [10, 15, 20];
                        }
                        scope.changeCurrentPage = function (p) {
                            if (p == '...') {
                                return;
                            } else {
                                scope.myPage.currentPage = p;
                                myPage.setPageNub(scope.myPage.currentPage);
                            }
                            getPagination(scope.cityListUrl);
                        };
                        scope.prevPage = function () {
                            if (scope.myPage.currentPage > 1) {
                                scope.myPage.currentPage -= 1;
                            } else {
                                scope.myPage.currentPage = 1;
                            }
                            myPage.setPageNub(scope.myPage.currentPage);
                            getPagination(scope.cityListUrl);
                        };
                        // nextPage
                        scope.nextPage = function () {
                            if (scope.myPage.currentPage < scope.myPage.numberOfPages) {
                                scope.myPage.currentPage += 1;
                            } else {
                                scope.myPage.currentPage = scope.myPage.numberOfPages;
                            }
                            myPage.setPageNub(scope.myPage.currentPage);
                            getPagination(scope.cityListUrl);
                        };

                        // 跳转页
                        scope.jumpToPage = function () {
                            if (scope.myPage.jumpPageNum > 0 || scope.myPage.jumpPageNum <= scope.myPage.numberOfPages) {
                                scope.myPage.currentPage = scope.myPage.jumpPageNum;
                                myPage.setPageNub(scope.myPage.currentPage);
                                getPagination(scope.cityListUrl);
                                //scope.myPage.jumpPageNum='';
                            } else {
                                scope.myPage.showError = true;
                            }
                        };
                        // 修改每页显示的条数
                        scope.changeItemsPerPage = function () {
                            getPagination(scope.cityListUrl);
                        };
                        getPagination(scope.cityListUrl);

                        function getPagination(url) {

                            ctrl.http.get(url, { params: { "page": scope.myPage.currentPage, "limit": scope.myPage.itemsPerPage,
                                    "name": scope.cityTip.name, "monType": scope.cityTip.monType,
                                    "seqno": scope.cityTip.seqno, "firmware": scope.cityTip.firmware,
                                    "siteName": scope.cityTip.siteName, "status": scope.cityTip.status,
                                    "productDate": scope.cityTip.productDate, "useDate": scope.cityTip.useDate,
                                    "lastModifierId": scope.cityTip.lastModifierId, "checkUserName": scope.cityTip.checkUserName } }).then(function (response) {

                                scope.names = response.data.data;
                                scope.myPage.totalItems = response.data.totalItems; //当获取总数据后，修改默认值
                                scope.myPage.currentPage = parseInt(myPage.pageNub);
                                // pg.totalItems
                                scope.myPage.totalItems = parseInt(scope.myPage.totalItems);

                                // numberOfPages,总共分多少页
                                scope.myPage.numberOfPages = Math.ceil(scope.myPage.totalItems / scope.myPage.itemsPerPage);
                                //console.info(scope.myPage.totalItems);
                                // judge currentPage > scope.numberOfPages
                                if (scope.myPage.currentPage < 1) {
                                    scope.myPage.currentPage = 1;
                                }

                                if (scope.myPage.currentPage > scope.myPage.numberOfPages) {
                                    scope.myPage.currentPage = scope.myPage.numberOfPages;
                                }

                                scope.pageList = [];
                                var i;
                                if (scope.myPage.numberOfPages <= scope.myPage.pagesLength) {
                                    // 判断总页数如果小于等于分页的长度，若小于则直接显示
                                    for (i = 1; i <= scope.myPage.numberOfPages; i++) {
                                        scope.pageList.push(i);
                                    }
                                } else {
                                    // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                                    // 计算中心偏移量
                                    var offset = (scope.myPage.pagesLength - 1) / 2;
                                    if (scope.myPage.currentPage <= offset) {
                                        // 左边没有...
                                        for (i = 1; i <= offset + 1; i++) {
                                            scope.pageList.push(i);
                                        }
                                        scope.pageList.push('...');
                                        scope.pageList.push(scope.myPage.numberOfPages);
                                        //    >实际总页数-每页的一半
                                    } else if (scope.myPage.currentPage > scope.myPage.numberOfPages - offset) {
                                        scope.pageList.push(1);
                                        scope.pageList.push('...');
                                        for (i = offset + 1; i >= 1; i--) {
                                            scope.pageList.push(scope.myPage.numberOfPages - i);
                                        }
                                        scope.pageList.push(scope.myPage.numberOfPages);
                                    } else {
                                        // 最后一种情况，两边都有...
                                        scope.pageList.push(1);
                                        scope.pageList.push('...');

                                        for (i = Math.ceil(offset / 2); i >= 1; i--) {
                                            scope.pageList.push(scope.myPage.currentPage - i);
                                        }
                                        scope.pageList.push(scope.myPage.currentPage);
                                        for (i = 1; i <= offset / 2; i++) {
                                            scope.pageList.push(scope.myPage.currentPage + i);
                                        }

                                        scope.pageList.push('...');
                                        scope.pageList.push(scope.myPage.numberOfPages);
                                    }
                                }
                            });
                        }
                    }
                }]);

                return SiteListDevice;
            }());

            _export('SiteListDevice', SiteListDevice);

            SiteListDevice.templateUrl = 'components/siteList.html';
        }
    };
});
//# sourceMappingURL=siteList.js.map
