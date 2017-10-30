import {baseURL} from "./common/constVal";

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
          url: baseURL+'addCity',
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
  }
}
CityAddCtrl.templateUrl = 'public/plugins/grafana-management/components/cityAdd.html';


