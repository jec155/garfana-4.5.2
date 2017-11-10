
export class CityViewCtrl
{
  constructor($scope,$http,$location,$rootScope) {
  	
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.cityModel = $rootScope.cityModel;
  }
}
CityViewCtrl.templateUrl = 'public/plugins/grafana-management/components/cityView.html';


