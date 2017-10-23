
export class CityAddCtrl
{
  constructor($scope,$http,$location)
  {
      this.http=$http;
      this.scope=$scope;
      this.location=$location;
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
      var loc=this.location;
      $.ajax({
          type: 'POST',
          url: 'http://61.164.218.158:8080/AirServer/grafana/addCity',
              //'http://127.0.0.1:8080/grafana/addCity',
          data: this.scope.cityModel,
          dataType:'json',
          success:function (da)
          {
              history.go(-1);
              alert('添加成功');
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
CityAddCtrl.templateUrl = 'public/plugins/grafana-example-app/components/cityAdd.html';


