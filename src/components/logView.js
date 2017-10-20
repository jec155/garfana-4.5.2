
export class LogViewCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.cityModel = $rootScope.cityModel;
  }
}
LogViewCtrl.templateUrl = 'public/plugins/grafana-example-app/components/logView.html';


