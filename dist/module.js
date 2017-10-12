'use strict';

System.register(['./components/cityAdd', './components/cityList', './components/config'], function (_export, _context) {
  "use strict";

  var LogsPageCtrl, StreamPageCtrl, ExampleAppConfigCtrl;
  return {
    setters: [function (_componentsCityAdd) {
      LogsPageCtrl = _componentsCityAdd.LogsPageCtrl;
    }, function (_componentsCityList) {
      StreamPageCtrl = _componentsCityList.StreamPageCtrl;
    }, function (_componentsConfig) {
      ExampleAppConfigCtrl = _componentsConfig.ExampleAppConfigCtrl;
    }],
    execute: function () {
      _export('ConfigCtrl', ExampleAppConfigCtrl);

      _export('StreamPageCtrl', StreamPageCtrl);

      _export('LogsPageCtrl', LogsPageCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
