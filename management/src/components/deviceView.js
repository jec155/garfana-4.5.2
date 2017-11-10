
export class DeviceViewCtrl
{
  constructor($scope,$http,$location,$rootScope)
  {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      $scope.deviceTip = $rootScope.deviceTip;
      $scope.monTypeMap = {
                        'AIR':'空气质量',
                        'WATER':'水环境',
                        'MULTI':'多功能'
                    }

      //console.info($scope.deviceTip);
      $scope.toEdit=function()
      {
          $location.path('plugins/grafana-management/page/deviceedit').replace();
      };
  }
}
DeviceViewCtrl.templateUrl = 'public/plugins/grafana-management/components/deviceView.html';




