'use strict';

System.register(['./components/cityAdd', './components/cityEdit', './components/cityView', './components/cityList', './components/cityQuery', './components/citySiteManage', './components/siteList', './components/siteQuery'], function (_export, _context) {
  "use strict";

  var CityAddCtrl, CityEditCtrl, CityViewCtrl, StreamPageCtrl, CityQueryCtrl, CitySiteManageCtrl, SiteListDevice, SiteQueryDevice;
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
    }, function (_componentsSiteList) {
      SiteListDevice = _componentsSiteList.SiteListDevice;
    }, function (_componentsSiteQuery) {
      SiteQueryDevice = _componentsSiteQuery.SiteQueryDevice;
    }],
    execute: function () {
      _export('StreamPageCtrl', StreamPageCtrl);

      _export('CityAddCtrl', CityAddCtrl);

      _export('CityEditCtrl', CityEditCtrl);

      _export('CityViewCtrl', CityViewCtrl);

      _export('CityQueryCtrl', CityQueryCtrl);

      _export('CitySiteManageCtrl', CitySiteManageCtrl);

      _export('SiteListDevice', SiteListDevice);

      _export('SiteQueryDevice', SiteQueryDevice);
    }
  };
});
//# sourceMappingURL=module.js.map
