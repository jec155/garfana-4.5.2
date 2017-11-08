
export class SiteViewCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.siteModel = $rootScope.siteModel;
      $scope.siteMonTypeMap = {
            "1" : "空气质量",
            "2" : "空气污染重点企业",
            "3" : "饮用水水质",
            "4" : "污水水质",
            "5" : "水污染重点企业",
            "6" : "主要流域重点断面水质"
        }
        $scope.siteTypeMap = {
            "PUBLIC" : "公有站点",
            "PRIVATE" : "私有站点"
        }
        $scope.statusMap = {
            "SITE_NORMAL" : "正常",
            "SITE_DISABLE" : "停用",
            "SITE_ERROR" : "异常"
        }
        $scope.areaTypeMap = {
            "TWO" : "适用于居住、商业、工业混杂区"
        }
        $scope.autoUpdMap = {
            true : "是",
            false : "否"
        };
      $scope.toEdit=function () {
          $location.path('plugins/grafana-management/page/siteedit').replace();
      }
  }
}
SiteViewCtrl.templateUrl = 'public/plugins/grafana-management/components/siteView.html';


