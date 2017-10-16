'use strict';

System.register(['./components/cityAdd', './components/cityEdit', './components/cityView', './components/cityList', './components/cityQuery', './components/citySiteManage'], function (_export, _context) {
  "use strict";

  var CityAddCtrl, CityEditCtrl, CityViewCtrl, StreamPageCtrl, CityQueryCtrl, CitySiteManageCtrl;
  return {
    setters: [function (_componentsCityAdd) {
      CityAddCtrl = _componentsCityAdd.CityAddCtrl;
    }, function (_componentsCityEdit) {
      CityEditCtrl = _componentsCityEdit.CityEditCtrl;
    }, function (_componentsCityView) {
      CityViewCtrl = _componentsCityView.CityViewCtrl;
    }, function (_componentsCityList) {
      StreamPageCtrl = _componentsCityList.StreamPageCtrl;
    }, function (_componentsCityQuery) {
      CityQueryCtrl = _componentsCityQuery.CityQueryCtrl;
    }, function (_componentsCitySiteManage) {
      CitySiteManageCtrl = _componentsCitySiteManage.CitySiteManageCtrl;
    }],
    execute: function () {
      _export('StreamPageCtrl', StreamPageCtrl);

      _export('CityAddCtrl', CityAddCtrl);

      _export('CityEditCtrl', CityEditCtrl);

      _export('CityViewCtrl', CityViewCtrl);

      _export('CityQueryCtrl', CityQueryCtrl);

      _export('CitySiteManageCtrl', CitySiteManageCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
