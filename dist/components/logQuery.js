'use strict';

System.register(['angular', 'moment', './input_date'], function (_export, _context) {
  "use strict";

  var angular, moment, inputDateDirective, _createClass, LogQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_angular) {
      angular = _angular.default;
    }, function (_moment) {
      moment = _moment.default;
    }, function (_input_date) {
      inputDateDirective = _input_date.inputDateDirective;
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

      _export('LogQueryCtrl', LogQueryCtrl = function () {
        function LogQueryCtrl($scope, $http, $location, $rootScope, contextSrv) {
          _classCallCheck(this, LogQueryCtrl);

          this.http = $http;
          this.scope = $scope;
          this.location = $location;
          this.root = $rootScope;
          $scope.cityTip = { "username": '',
            "ip": '',
            "startTime": '',
            "endTime": '',
            "operation": '' };
        }

        _createClass(LogQueryCtrl, [{
          key: 'deviceTipDate1',
          value: function deviceTipDate1(data) {
            this.scope.startTime = moment(data);
          }
        }, {
          key: 'deviceTipDate2',
          value: function deviceTipDate2(data) {
            this.scope.endTime = moment(data);
          }
        }, {
          key: 'query',
          value: function query() {
            this.root.cityTip = this.scope.cityTip;
            this.root.cityListUrl = 'http://61.164.218.158:8080/AirServer/grafanalogs/searchLogs';
            // 'http://127.0.0.1:8080/grafana/searchCities';
            history.go(-1);
          }
        }]);

        return LogQueryCtrl;
      }());

      _export('LogQueryCtrl', LogQueryCtrl);

      LogQueryCtrl.templateUrl = 'public/plugins/grafana-example-app/components/logQuery.html';

      angular.module("grafana.directives").directive('inputDatetime', inputDateDirective);
    }
  };
});
//# sourceMappingURL=logQuery.js.map
