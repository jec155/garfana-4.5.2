import {baseURL} from "./common/constVal";
export class SiteDeviceManageCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.root=$rootScope;
      //console.info($rootScope.cityModel)
      this.http = $http;

      this.location = $location;

      $scope.deviceID=[];
      $scope.availableDevices={};
      $scope.siteDevices={};
      this.scope=$scope;
      $scope.siteMap = {
                        'AIR':'空气质量',
                        'WATER':'水环境',
                        'MULTI':'多功能'
                    };

      $http.get(baseURL+'getAvailableDevices').then(function (response) {
          angular.forEach(response.data.data, function(data,index,array){
              $scope.availableDevices[data.id]=data.name + "(" + $scope.siteMap[data .monType] + ")";

          });
      });
      $http.get(baseURL+'getDevicesBySiteID?siteid='+$rootScope.cityModel.id).then(function (response) {
          angular.forEach(response.data.data, function(data,index,array){
              $scope.siteDevices[data.id]=data.name + "(" + $scope.siteMap[data .monType] + ")";
          });
      });
  }

    getSelectedA()
    {
        let toAdd={};
        let select = document.getElementById("A");
        for(let i=0;i<select.length;i++){
            if(select.options[i].selected){
                toAdd[select[i].value]=select[i].text;
            }
        }

        for(let a in toAdd)//索引ID
        {
            this.scope.siteDevices[a]=toAdd[a];
            delete  this.scope.availableDevices[a];
        }
    }
    getSelectedAll()
    {
        let toAdd={};
        let select = document.getElementById("A");
        for(let i=0;i<select.length;i++){
            toAdd[select[i].value]=select[i].text;
        }

        for(let a in toAdd)
        {
            this.scope.siteDevices[a]=toAdd[a];
            delete  this.scope.availableDevices[a];
        }
    }
    getSelectedR()
    {
        let toAdd={};
        let select = document.getElementById("B");
        for(let i=0;i<select.length;i++){
            if(select.options[i].selected){
                toAdd[select[i].value]=select[i].text;
            }
        }

        for(let a in toAdd)
        {
            this.scope.availableDevices[a]=toAdd[a];
            delete  this.scope.siteDevices[a];
        }
    }
    getSelectedRAll()
    {
        let toAdd={};
        let select = document.getElementById("B");
        for(let i=0;i<select.length;i++){
            toAdd[select[i].value]=select[i].text;
        }

        for(var a in toAdd)
        {
            this.scope.availableDevices[a]=toAdd[a];
            delete  this.scope.siteDevices[a];
        }
    }

    commit()
    {
        for(let id in this.scope.siteDevices)
        {
            this.scope.deviceID.push(id);

        }

        $.ajax({
            type: 'GET',
            traditional:true,
            url: baseURL+'updateSiteDevice',
            //'http://127.0.0.1:8080/grafana/updateCitySites',
            data: {siteid: this.root.cityModel.id,ids:this.scope.deviceID},
            dataType:'json',
            success:function (da)
            {
                history.go(-1);
                alert('更新成功');
            },
            error:function (re) {
                console.info(re.responseText);
            }
        });
    }
    link(scope, elem, attrs, ctrl)
    {

    }
}
SiteDeviceManageCtrl.templateUrl = 'public/plugins/grafana-management/components/siteDeviceManage.html';


