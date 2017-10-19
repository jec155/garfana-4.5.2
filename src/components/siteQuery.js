
export class SiteQueryDevice
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      this.root=$rootScope;
      $scope.cityTip={"name":'',
                      "monType":'',
                      "seqno":'',
                      "firmware":'',
                      "siteName":'',
                      "status":'',
                      "productDate":'',
                      "useDate":'',
                      "lastModifierId":'',
                      "checkUserName":''};

  }
  query()
  {
      this.root.cityTip=this.scope.cityTip;
      this.root.cityListUrl='http://61.164.218.158:8080/AirServer/grafana/searchDevices';
         // 'http://127.0.0.1:8080/grafana/searchCities';
      history.go(-1);
  }
}
SiteQueryDevice.templateUrl = 'public/plugins/grafana-example-app/components/siteQuery.html';


