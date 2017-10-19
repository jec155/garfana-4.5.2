
export class CitySiteManageCtrl
{
  constructor($scope,$http,$location,$rootScope) {
      this.root=$rootScope;
      //this.root.cityModel=$rootScope.cityModel;
      //console.info(this.root.cityModel);
      this.http = $http;
      this.location = $location;
      $scope.availableSiteID=[];
      $scope.citySiteID=[];
      $scope.availableSites={};
      $scope.citySites={};
      this.scope=$scope;

      $http.get('http://61.164.218.158:8080/AirServer/grafana/availableSites').then(function (response) {
          angular.forEach(response.data.data, function(data,index,array){
            //data等价于array[index]
              //$scope.availableSites.push({id:data.id,siteName:data.siteName});
              $scope.availableSites[data.id]=data.siteName;

          });
            //console.info($scope.availableSites);
          //$scope.availableSites=response.data.data;
      });

      $http.get('http://61.164.218.158:8080/AirServer/grafana/getSitesByCityID?cityid='+$rootScope.cityModel.id).then(function (response) {
          angular.forEach(response.data.data, function(data,index,array){
              //data等价于array[index]
             // $scope.citySites.push({id:data.id,siteName:data.siteName});
              $scope.citySites[data.id]=data.siteName;
          });
          //$scope.citySites=response.data.data;
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

        for(let a in toAdd)
        {
            this.scope.citySites[a]=toAdd[a];
            delete  this.scope.availableSites[a];
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
            this.scope.citySites[a]=toAdd[a];
            delete  this.scope.availableSites[a];
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
            this.scope.availableSites[a]=toAdd[a];
            delete  this.scope.citySites[a];
        }
    }
    getSelectedRAll()
    {
        let toAdd={};
        let select = document.getElementById("B");
        for(let i=0;i<select.length;i++){
            toAdd[select[i].value]=select[i].text;
        }

        for(let a in toAdd)
        {
            this.scope.availableSites[a]=toAdd[a];
            delete  this.scope.citySites[a];
        }
    }

    commit()
    {
        for(let id in this.scope.citySites)
        {
            this.scope.citySiteID.push(id);

        }
        //if(this.scope.citySiteID.length<=0)
            //this.scope.citySiteID.push('-1');
        //console.info(this.root.cityModel.id);
        $.ajax({
            type: 'POST',
            traditional:true,
            url: 'http://61.164.218.158:8080/AirServer/grafana/updateCitySites',
            //'http://127.0.0.1:8080/grafana/updateCitySites',
            data: {cityid: this.root.cityModel.id,ids:this.scope.citySiteID},
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
CitySiteManageCtrl.templateUrl = 'public/plugins/grafana-example-app/components/citySiteManage.html';


