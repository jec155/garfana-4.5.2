import angular from 'angular';
import moment from 'moment';
export class LogQueryCtrl
{
  constructor($scope,$http,$location,$rootScope,contextSrv) {
      this.http = $http;
      this.scope = $scope;
      this.location = $location;
      this.root=$rootScope;
      $scope.cityTip={  "username":'',
                        "ip":'',
                        "startTime":'',
                        "endTime":'',
                        "operation":''};
  }
  deviceTipDate1(data){
    this.scope.startTime = moment(data);
    
  }
  deviceTipDate2(data){
    this.scope.endTime = moment(data);
  }

  query()
  {   
      this.root.cityTip=this.scope.cityTip;
      this.root.cityListUrl='http://61.164.218.158:8080/AirServer/grafanalogs/searchLogs';
         // 'http://127.0.0.1:8080/grafana/searchCities';
      history.go(-1);
  }
}
LogQueryCtrl.templateUrl = 'public/plugins/grafana-example-app/components/logQuery.html';
import {inputDateDirective} from './input_date';
angular.module("grafana.directives").directive('inputDatetime', inputDateDirective);


