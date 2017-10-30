import {baseURL} from "./common/constVal";

export class SiteAddCtrl
{
  constructor($scope,$http,$location,$rootScope)
  {
      this.scope=$scope;
      this.location=$location;

      $scope.siteMonTypeMap = {
            "1" : "空气质量",
            "2" : "空气污染重点企业",
            "3" : "饮用水水质",
            "4" : "污水水质",
            "5" : "水污染重点企业",
            "6" : "主要流域重点断面水质"
        }
        $scope.siteTypeMap = {
            "PUBLIC" : "公有站点",
            "PRIVATE" : "私有站点"
        }
        $scope.statusMap = {
            "SITE_NORMAL" : "正常",
            "SITE_DISABLE" : "停用",
            "SITE_ERROR" : "异常"
        }
        $scope.areaTypeMap = {
            "TWO" : "适用于居住、商业、工业混杂区"
        }

      $scope.pageParams={};
      $scope.http=$http;
      $scope.URL='http://61.164.218.158:8080/AirServer/grafana/cityListByPage';
      $scope.siteModel={};
      $scope.dismiss=function () {
          $scope.showCityList=!$scope.showCityList;

      };
      $scope.choose=function (item) {
          //console.info(item);
          $scope.siteModel.cityId=item.id;
          $scope.siteModel.cityName=item.cityName;
          $scope.showCityList=!$scope.showCityList;
      };
      /*$scope.clearNoNum = function(attr) {
//先把非数字的都替换掉，除了数字和.
          attr = attr.replace(/[^\d.]/g, "");
//必须保证第一个为数字而不是.
          attr =attr.replace(/^\./g, "");
//保证只有出现一个.而没有多个.
          attr = attr.replace(/\.{2,}/g, "");
//保证.只出现一次，而不能出现两次以上
          attr = attr.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      }*/

  }
  save()
  {
      console.info(this.scope.siteModel);

      $.ajax({
          type: 'GET',
          url: baseURL+'addSite',
              //'http://127.0.0.1:8080/grafana/editCity',
          data: this.scope.siteModel,
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
  }
}
SiteAddCtrl.templateUrl = 'public/plugins/grafana-management/components/siteAdd.html';


