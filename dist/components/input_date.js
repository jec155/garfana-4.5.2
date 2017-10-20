'use strict';

System.register(['moment', 'app/core/utils/datemath'], function (_export, _context) {
  "use strict";

  var moment, dateMath;
  ///<reference path="../../../headers/common.d.ts" />

  function inputDateDirective() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function link($scope, $elem, attrs, ngModel) {
        var format = 'YYYY-MM-DD HH:mm:ss';
        //console.info(ngModel);
        var fromUser = function fromUser(text) {
          //console.info('ere');
          if (text.indexOf('now') !== -1) {
            if (!dateMath.isValid(text)) {
              ngModel.$setValidity("error", false);
              return undefined;
            }
            ngModel.$setValidity("error", true);
            return text;
          }

          var parsed;
          if ($scope.ctrl.isUtc) {
            parsed = moment.utc(text, format);
          } else {
            parsed = moment(text, format);
          }

          if (!parsed.isValid()) {
            ngModel.$setValidity("error", false);
            return undefined;
          }

          ngModel.$setValidity("error", true);
          return parsed;
        };

        var toUser = function toUser(currentValue) {
          if (moment.isMoment(currentValue)) {
            return currentValue.format(format);
          } else {
            return currentValue;
          }
        };

        ngModel.$parsers.push(fromUser);
        ngModel.$formatters.push(toUser);
      }
    };
  }

  _export('inputDateDirective', inputDateDirective);

  return {
    setters: [function (_moment) {
      moment = _moment.default;
    }, function (_appCoreUtilsDatemath) {
      dateMath = _appCoreUtilsDatemath;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=input_date.js.map
