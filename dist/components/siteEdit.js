'use strict';

System.register([], function (_export, _context) {
    "use strict";

    var _createClass, SiteEditCtrl;

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

            _export('SiteEditCtrl', SiteEditCtrl = function () {
                function SiteEditCtrl($scope, $http, $location, $rootScope) {
                    _classCallCheck(this, SiteEditCtrl);

                    this.http = $http;
                    this.scope = $scope;
                    this.location = $location;
                    $scope.cityModel = $rootScope.cityModel;
                }

                _createClass(SiteEditCtrl, [{
                    key: 'update',
                    value: function update() {
                        var loc = this.location;
                        $.ajax({
                            type: 'POST',
                            url: 'http://61.164.218.158:8080/AirServer/grafana/editCity',
                            //'http://127.0.0.1:8080/grafana/editCity',
                            data: this.scope.cityModel,
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

                return SiteEditCtrl;
            }());

            _export('SiteEditCtrl', SiteEditCtrl);

            SiteEditCtrl.templateUrl = 'public/plugins/grafana-example-app/components/siteEdit.html';
        }
    };
});
//# sourceMappingURL=siteEdit.js.map
