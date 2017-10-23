'use strict';

System.register(['moment'], function (_export, _context) {
  "use strict";

  var moment, _createClass, LogQueryCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_moment) {
      moment = _moment.default;
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
            history.go(-1);
          }
        }]);

        return LogQueryCtrl;
      }());

      _export('LogQueryCtrl', LogQueryCtrl);

      LogQueryCtrl.templateUrl = 'public/plugins/grafana-management/components/logQuery.html';
    }
  };
});
//# sourceMappingURL=logQuery.js.map
