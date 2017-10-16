
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
              //'http://127.0.0.1:8080/grafana/editCity',
          data: this.scope.cityModel,
          dataType:'json',
          success:function (da)
          {
              //loc.path('plugins/grafana-example-app/page/live-stream');
              history.go(-1);
              alert('编辑成功');
          },
          error:function (re) {
              console.info(re);
          }
      });
      /*this.http.post('http://127.0.0.1:8080/grafana/addCity',this.scope.cityModel).then(function (response) {
          console.info(response);
      });*/
  }
}
CityEditCtrl.templateUrl = 'public/plugins/grafana-example-app/components/cityEdit.html';


