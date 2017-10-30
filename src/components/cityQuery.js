import {baseURL} from "./common/constVal";
export class CityQueryCtrl
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
      this.root.cityListUrl=baseURL+'searchCities';
          //'http://127.0.0.1/grafana/searchCities';
      history.go(-1);
  }
}
CityQueryCtrl.templateUrl = 'public/plugins/grafana-management/components/cityQuery.html';


