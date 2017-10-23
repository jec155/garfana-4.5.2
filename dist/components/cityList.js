'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, CityListCtrl;

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

            _export('CityListCtrl', CityListCtrl = function () {
                function CityListCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, CityListCtrl);

                    this.root = $rootScope;
                    this.location = $location;
                    this.http = $http;
                    $scope.http = $http;
                    this.selall = false; //全选标志
                    this.checkedItems = [];
                    $scope.URL = $rootScope.cityListUrl ? $rootScope.cityListUrl : 'http://61.164.218.158:8080/AirServer/grafana/cityListByPage';
                    $scope.pageParams = $rootScope.cityTip ? $rootScope.cityTip : {
                        cityName: '', cityPingyin: '',
                        province: '', country: ''
                    };
                }

                _createClass(CityListCtrl, [{
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
                    key: 'absoluteFromChanged',
                    value: function absoluteFromChanged() {
                        this.from = moment().utc(this.absolute.fromJs);
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
                    value: function link(scope, elem, attrs, ctrl) {}
                }]);

                return CityListCtrl;
            }());

            _export('CityListCtrl', CityListCtrl);

            CityListCtrl.templateUrl = 'components/cityList.html';
        }
    };
});
//# sourceMappingURL=cityList.js.map
