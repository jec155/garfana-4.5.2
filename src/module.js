import {CityListCtrl} from './components/cityList';
import {CityViewCtrl} from './components/cityView';
import {CityAddCtrl} from './components/cityAdd';
import {CityEditCtrl} from './components/cityEdit';
import {CityQueryCtrl} from './components/cityQuery';
import {CitySiteManageCtrl} from './components/citySiteManage';
import {DeviceStreamPageCtrl} from './components/deviceList';
import {DeviceAddCtrl} from './components/deviceAdd';
import {DeviceQueryCtrl} from './components/deviceQuery';
import {SiteAddCtrl} from './components/siteAdd';
import {SiteEditCtrl} from './components/siteEdit';
import {SiteViewCtrl} from './components/siteView';
import {SiteStreamPageCtrl} from './components/siteList';
import {SiteQueryCtrl} from './components/siteQuery';
import {SiteCityManageCtrl} from './components/siteCityManage';
import {LogStreamPageCtrl} from './components/logList';
import {LogQueryCtrl} from './components/logQuery';
import {LogViewCtrl} from './components/logView';

import './components/common/custom.css!';
import angular from 'angular';
import {pageDirective} from './components/common/pager';
import {inputDateDirective} from './components/common/input_date';

angular.module("grafana.directives").directive('inputDatetime', inputDateDirective);
angular.module('grafana.directives').directive('pager', pageDirective);

export {
    CityListCtrl,
    CityAddCtrl,
    CityViewCtrl,
    CityEditCtrl,
    CityQueryCtrl,
    CitySiteManageCtrl,
    DeviceStreamPageCtrl,
    DeviceQueryCtrl,
    SiteAddCtrl,
    SiteEditCtrl,
    SiteViewCtrl,
    SiteStreamPageCtrl,
    SiteQueryCtrl,
    SiteCityManageCtrl,
    LogStreamPageCtrl,
    LogQueryCtrl,
    LogViewCtrl,
    DeviceAddCtrl
};
