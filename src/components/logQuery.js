
export class LogQueryCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      this.root=$rootScope;
      $scope.cityTip={"cityName":'',
                        "cityPingyin":'',
                        "province":'',
                        "country":''};
  }

  query()
  {
      this.root.cityTip=this.scope.cityTip;
      this.root.cityListUrl='http://61.164.218.158:8080/AirServer/grafana/searchCities';
         // 'http://127.0.0.1:8080/grafana/searchCities';
      history.go(-1);
  }
}
LogQueryCtrl.templateUrl = 'public/plugins/grafana-example-app/components/logQuery.html';


