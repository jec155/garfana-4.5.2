
export class CityViewCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.cityModel = $rootScope.cityModel;
      console.info("fdfdfknign00000");
  }
}
CityViewCtrl.templateUrl = 'public/plugins/grafana-example-app/components/cityView.html';


