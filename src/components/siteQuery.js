
export class SiteQueryCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      this.root=$rootScope;
      $scope.siteTip={  "siteCode":'',
                        "siteName":'',
                        "siteType":'',
                        "siteMonType":'',
                        "provice":'',
                        "city":'',
                        "status":'',
                        "dep":'',
                        "checkMan":''};
  }

  query()
  {
      this.root.siteTip=this.scope.siteTip;
      this.root.cityListUrl='http://61.164.218.158:8080/AirServer/grafana/searchSitesByPage';
         // 'http://127.0.0.1:8080/grafana/searchCities';
      history.go(-1);
  }
}
SiteQueryCtrl.templateUrl = 'components/siteQuery.html';


