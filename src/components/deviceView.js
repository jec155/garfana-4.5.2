
export class DeviceViewCtrl
{
  constructor($scope,$http,$location,$rootScope)
  {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.cityModel = $rootScope.cityModel;
      $scope.monTypeMap = {
                        'AIR':'空气质量',
                        'WATER':'水环境',
                        'MULTI':'多功能'
                    }
  }
}
DeviceViewCtrl.templateUrl = 'public/plugins/grafana-management/components/deviceView.html';




