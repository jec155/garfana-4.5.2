
export class LogViewCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.logModel = $rootScope.logModel;
  }
}
LogViewCtrl.templateUrl = 'public/plugins/grafana-management/components/logView.html';


