'use strict';

System.register(['./pager.css!'], function (_export, _context) {
    "use strict";

    var pagesLength;
    function pageDirective() {
        return {
            restrict: 'E',
            templateUrl: 'public/plugins/grafana-management/components/common/pager.html',
            link: function link(scope, iElement, iAttrs, controller) {
                scope.myPage = {};
                scope.myPage.numberOfPages = 0;
                scope.myPage.totalItems = 0;
                scope.myPage.jumpPageNum = 1;

                scope.pageParams.currentPage = 1;
                scope.pageParams.itemsPerPage = 10;

                scope.changeCurrentPage = function (p) {
                    if (p == '...') {
                        return;
                    } else {
                        scope.pageParams.currentPage = p;
                    }
                    getPagination(scope.URL);
                };
                scope.prevPage = function () {
                    if (scope.pageParams.currentPage > 1) {
                        scope.pageParams.currentPage -= 1;
                    } else {
                        scope.pageParams.currentPage = 1;
                    }
                    getPagination(scope.URL);
                };
                // nextPage
                scope.nextPage = function () {
                    if (scope.pageParams.currentPage < scope.myPage.numberOfPages) {
                        scope.pageParams.currentPage += 1;
                    } else {
                        scope.pageParams.currentPage = scope.myPage.numberOfPages;
                    }
                    getPagination(scope.URL);
                };

                // 跳转页
                scope.jumpToPage = function () {
                    if (scope.myPage.jumpPageNum > 0 || scope.myPage.jumpPageNum <= scope.myPage.numberOfPages) {
                        scope.pageParams.currentPage = scope.myPage.jumpPageNum;
                        getPagination(scope.URL);
                    } else {
                        scope.myPage.showError = true;
                    }
                };
                // 修改每页显示的条数
                scope.changeItemsPerPage = function () {
                    getPagination(scope.URL);
                };
                getPagination(scope.URL);

                function getPagination(url) {
                    //console.info(url);
                    //console.info(scope.pageParams);
                    scope.http.get(url, { params: scope.pageParams }).then(function (response) {
                        scope.names = response.data.data;
                        scope.myPage.totalItems = response.data.totalItems; //当获取总数据后，修改默认值
                        scope.myPage.totalItems = parseInt(scope.myPage.totalItems);
                        // numberOfPages,总共分多少页
                        scope.myPage.numberOfPages = Math.ceil(scope.myPage.totalItems / scope.pageParams.itemsPerPage);
                        if (scope.pageParams.currentPage < 1) {
                            scope.pageParams.currentPage = 1;
                        }

                        if (scope.pageParams.currentPage > scope.myPage.numberOfPages) {
                            scope.pageParams.currentPage = scope.myPage.numberOfPages;
                        }

                        scope.pageList = [];
                        var i;
                        if (scope.myPage.numberOfPages <= pagesLength) {
                            // 判断总页数如果小于等于分页的长度，若小于则直接显示
                            for (i = 1; i <= scope.myPage.numberOfPages; i++) {
                                scope.pageList.push(i);
                            }
                        } else {
                            // 总页数大于分页长度（此时分为三种情况：1.左边没有...2.右边没有...3.左右都有...）
                            // 计算中心偏移量
                            var offset = (pagesLength - 1) / 2;
                            if (scope.pageParams.currentPage <= offset) {
                                // 左边没有...
                                for (i = 1; i <= offset + 1; i++) {
                                    scope.pageList.push(i);
                                }
                                scope.pageList.push('...');
                                scope.pageList.push(scope.myPage.numberOfPages);
                                //    >实际总页数-每页的一半
                            } else if (scope.pageParams.currentPage > scope.myPage.numberOfPages - offset) {
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
                                    scope.pageList.push(scope.pageParams.currentPage - i);
                                }
                                scope.pageList.push(scope.pageParams.currentPage);
                                for (i = 1; i <= offset / 2; i++) {
                                    scope.pageList.push(scope.pageParams.currentPage + i);
                                }

                                scope.pageList.push('...');
                                scope.pageList.push(scope.myPage.numberOfPages);
                            }
                        }
                    });
                }
            },
            scope: false
        };
    }

    _export('pageDirective', pageDirective);

    return {
        setters: [function (_pagerCss) {}],
        execute: function () {
            pagesLength = 9;
        }
    };
});
//# sourceMappingURL=pager.js.map
