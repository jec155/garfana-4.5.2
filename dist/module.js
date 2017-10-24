'use strict';

System.register(['./components/cityList', './components/cityView', './components/cityAdd', './components/cityEdit', './components/cityQuery', './components/citySiteManage', './components/deviceList', './components/deviceAdd', './components/deviceQuery', './components/deviceView', './components/siteAdd', './components/siteEdit', './components/siteView', './components/siteList', './components/siteQuery', './components/siteCityManage', './components/logList', './components/logQuery', './components/logView', './components/common/custom.css!', 'angular', './components/common/pager', './components/common/input_date'], function (_export, _context) {
    "use strict";

    var CityListCtrl, CityViewCtrl, CityAddCtrl, CityEditCtrl, CityQueryCtrl, CitySiteManageCtrl, DeviceStreamPageCtrl, DeviceAddCtrl, DeviceQueryCtrl, DeviceViewCtrl, SiteAddCtrl, SiteEditCtrl, SiteViewCtrl, SiteStreamPageCtrl, SiteQueryCtrl, SiteCityManageCtrl, LogStreamPageCtrl, LogQueryCtrl, LogViewCtrl, angular, pageDirective, inputDateDirective;
    return {
        setters: [function (_componentsCityList) {
            CityListCtrl = _componentsCityList.CityListCtrl;
        }, function (_componentsCityView) {
            CityViewCtrl = _componentsCityView.CityViewCtrl;
        }, function (_componentsCityAdd) {
            CityAddCtrl = _componentsCityAdd.CityAddCtrl;
        }, function (_componentsCityEdit) {
            CityEditCtrl = _componentsCityEdit.CityEditCtrl;
        }, function (_componentsCityQuery) {
            CityQueryCtrl = _componentsCityQuery.CityQueryCtrl;
        }, function (_componentsCitySiteManage) {
            CitySiteManageCtrl = _componentsCitySiteManage.CitySiteManageCtrl;
        }, function (_componentsDeviceList) {
            DeviceStreamPageCtrl = _componentsDeviceList.DeviceStreamPageCtrl;
        }, function (_componentsDeviceAdd) {
            DeviceAddCtrl = _componentsDeviceAdd.DeviceAddCtrl;
        }, function (_componentsDeviceQuery) {
            DeviceQueryCtrl = _componentsDeviceQuery.DeviceQueryCtrl;
        }, function (_componentsDeviceView) {
            DeviceViewCtrl = _componentsDeviceView.DeviceViewCtrl;
        }, function (_componentsSiteAdd) {
            SiteAddCtrl = _componentsSiteAdd.SiteAddCtrl;
        }, function (_componentsSiteEdit) {
            SiteEditCtrl = _componentsSiteEdit.SiteEditCtrl;
        }, function (_componentsSiteView) {
            SiteViewCtrl = _componentsSiteView.SiteViewCtrl;
        }, function (_componentsSiteList) {
            SiteStreamPageCtrl = _componentsSiteList.SiteStreamPageCtrl;
        }, function (_componentsSiteQuery) {
            SiteQueryCtrl = _componentsSiteQuery.SiteQueryCtrl;
        }, function (_componentsSiteCityManage) {
            SiteCityManageCtrl = _componentsSiteCityManage.SiteCityManageCtrl;
        }, function (_componentsLogList) {
            LogStreamPageCtrl = _componentsLogList.LogStreamPageCtrl;
        }, function (_componentsLogQuery) {
            LogQueryCtrl = _componentsLogQuery.LogQueryCtrl;
        }, function (_componentsLogView) {
            LogViewCtrl = _componentsLogView.LogViewCtrl;
        }, function (_componentsCommonCustomCss) {}, function (_angular) {
            angular = _angular.default;
        }, function (_componentsCommonPager) {
            pageDirective = _componentsCommonPager.pageDirective;
        }, function (_componentsCommonInput_date) {
            inputDateDirective = _componentsCommonInput_date.inputDateDirective;
        }],
        execute: function () {

            angular.module("grafana.directives").directive('inputDatetime', inputDateDirective);
            angular.module('grafana.directives').directive('pager', pageDirective);

            _export('CityListCtrl', CityListCtrl);

            _export('CityAddCtrl', CityAddCtrl);

            _export('CityViewCtrl', CityViewCtrl);

            _export('CityEditCtrl', CityEditCtrl);

            _export('CityQueryCtrl', CityQueryCtrl);

            _export('CitySiteManageCtrl', CitySiteManageCtrl);

            _export('DeviceStreamPageCtrl', DeviceStreamPageCtrl);

            _export('DeviceQueryCtrl', DeviceQueryCtrl);

            _export('SiteAddCtrl', SiteAddCtrl);

            _export('SiteEditCtrl', SiteEditCtrl);

            _export('SiteViewCtrl', SiteViewCtrl);

            _export('SiteStreamPageCtrl', SiteStreamPageCtrl);

            _export('SiteQueryCtrl', SiteQueryCtrl);

            _export('SiteCityManageCtrl', SiteCityManageCtrl);

            _export('LogStreamPageCtrl', LogStreamPageCtrl);

            _export('LogQueryCtrl', LogQueryCtrl);

            _export('LogViewCtrl', LogViewCtrl);

            _export('DeviceAddCtrl', DeviceAddCtrl);

            _export('DeviceViewCtrl', DeviceViewCtrl);
        }
    };
});
//# sourceMappingURL=module.js.map
