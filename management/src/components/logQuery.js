import {baseURL} from "./common/constVal";
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
      this.root.cityListUrl=baseURL+'searchLogs';
      history.go(-1);
  }
}
LogQueryCtrl.templateUrl = 'public/plugins/grafana-management/components/logQuery.html';



