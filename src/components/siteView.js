
export class SiteViewCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.cityModel = $rootScope.cityModel;
  }
}
SiteViewCtrl.templateUrl = 'public/plugins/grafana-example-app/components/siteView.html';


