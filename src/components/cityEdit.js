
export class CityEditCtrl
{
  constructor($scope,$http,$location,$rootScope)
  {
      this.http=$http;
      this.scope=$scope;
      this.location=$location;
      $scope.cityModel=$rootScope.cityModel;
  }
  update()
  {
      var loc=this.location;
      $.ajax({
          type: 'POST',
          url: 'http://61.164.218.158:8080/AirServer/grafana/editCity',
          data: this.scope.cityModel,
          dataType:'json',
          success:function (da)
          {
              history.go(-1);
              alert('编辑成功');
          },
          error:function (re) {
              console.info(re);
          }
      });
  }
}
CityEditCtrl.templateUrl = 'public/plugins/grafana-management/components/cityEdit.html';


