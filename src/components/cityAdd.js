
export class LogsPageCtrl
{
  constructor($scope,$http,$location) {
      this.http=$http;
      this.scope=$scope;
      $scope.cityModel={
          cityName:'',
          cityPingyin:'',
          province:'',
          country:'中国',
          east:0,
          west:0,
          south:0,
          north:0,
          comment:''
      }
  }
  save()
  {
      console.info(this.scope.cityModel);
      $http({
          method: 'POST',
          url: '/someUrl',
          data:this.scope.cityModel ,
      }).then(function successCallback(response) {
          // 请求成功执行代码
      }, function errorCallback(response) {
          // 请求失败执行代码
      });
  }
}
LogsPageCtrl.templateUrl = 'public/plugins/grafana-example-app/components/cityAdd.html';


