import moment from 'moment';
export class DeviceEditCtrl
{
  constructor($scope,$http,$rootScope)
  {
      this.scope=$scope;
      this.scope.deviceTip={
          siteName:'',siteId:'-1',name:'',monType:'',seqno:'',firmware:'',status:'',statusModel:{},productDate1:'',productDate2:'',
          useDate1:'',useDate2:'',lastCheckDate1:'',lastCheckDate2:'',monTypeModel:{},comment:''
      };//提交的参数
      this.scope.deviceTip=$rootScope.deviceTip;

      $scope.http=$http;
      $scope.URL='http://61.164.218.158:8080/AirServer/grafana/siteListByPage';
      $scope.pageParams={};

      $scope.dismiss=function () {
          $scope.siteShow=!$scope.siteShow;

      };
      $scope.choose=function (item) {
          //console.info(item);
          $scope.deviceTip.siteId=item.id;
          $scope.deviceTip.siteName=item.siteName;
          $scope.siteShow=!$scope.siteShow;
      };
      //选择日期
      $scope.absoluteFromChangedproductDate1=function absoluteFromChangedproductDate1(time)
      {
          $scope.deviceTip.productDate1=moment(time);
          $scope.productDate1=!$scope.productDate1;
      }
      $scope.absoluteFromChangeduseDate1=function absoluteFromChangeduseDate1(time)
      {
          $scope.deviceTip.useDate1=moment(time);
          $scope.useDate1=!$scope.useDate1;
      }
      $scope.absoluteFromChangedlastCheckDate1=function absoluteFromChangedlastCheckDate1(time)
      {
          $scope.deviceTip.lastCheckDate1=moment(time);
          $scope.lastCheckDate1=!$scope.lastCheckDate1;
      }
  }
  save()
  {
      this.scope.deviceTip.productDate1 = document.getElementById("i1").value;
      this.scope.deviceTip.useDate1= document.getElementById("i3").value;
      this.scope.deviceTip.lastCheckDate1= document.getElementById("i5").value;

      console.info(this.scope.deviceTip);
      $.ajax({
          type: 'POST',
          url: 'http://61.164.218.158:8080/AirServer/grafana/editDevice',
              //'http://127.0.0.1:8080/grafana/editDevice',
          data: this.scope.deviceTip,
          dataType:'json',
          success:function (da)
          {
              history.go(-1);
              alert('添加成功');
          },
          error:function (re) {
              console.info(re.responseText);
          }
      });
  }
}

DeviceEditCtrl.templateUrl = 'public/plugins/grafana-management/components/deviceEdit.html';




